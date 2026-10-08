/**
 * Física e renderização da malha de concreto.
 * Módulo puro (sem React): estruturas em TypedArrays, zero alocação por frame.
 */

export const CONFIG_MALHA = {
  /** Distância entre pontos (px CSS). */
  espaco: 30,
  /** Raio de influência do cursor (px). */
  raio: 180,
  /** Intensidade da repulsão magnética. Equilíbrio ≈ 20px de deslocamento máx. */
  forcaRepulsao: 1.2,
  /** Constante da mola que devolve o ponto à origem. */
  rigidez: 0.045,
  /** Fator de amortecimento por frame @60fps (0–1). */
  amortecimento: 0.86,
  /** A cada N colunas/linhas, o ponto vira uma cruz "de prancheta". */
  frequenciaCruz: 5,
  /** Meio-comprimento da cruz (px). */
  tamanhoCruz: 3.5,
  /** Lado do ponto em repouso (px). */
  tamanhoPonto: 1.25,
  /** Limiares de deslocamento (px, manhattan) para cada nível de brilho. */
  limiaresBrilho: [1.5, 6, 12] as const,
  /** Energia média abaixo da qual a malha é considerada em repouso. */
  limiarRepouso: 0.01,
} as const;

export const NIVEIS_BRILHO = CONFIG_MALHA.limiaresBrilho.length + 1;

export interface Malha {
  total: number;
  origemX: Float32Array;
  origemY: Float32Array;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  /** 1 = desenhar como cruz, 0 = ponto. */
  cruz: Uint8Array;
  /** Nível de brilho calculado na simulação, consumido no desenho. */
  nivel: Uint8Array;
}

export interface EstadoCursor {
  x: number;
  y: number;
  /** 0–1: rampa suave de entrada/saída da influência do cursor. */
  influencia: number;
}

export function criarMalha(largura: number, altura: number): Malha {
  const { espaco, frequenciaCruz } = CONFIG_MALHA;
  const colunas = Math.ceil(largura / espaco) + 1;
  const linhas = Math.ceil(altura / espaco) + 1;
  const total = colunas * linhas;

  // Centraliza a malha na viewport para margens simétricas.
  const deslocX = (largura - (colunas - 1) * espaco) / 2;
  const deslocY = (altura - (linhas - 1) * espaco) / 2;

  const malha: Malha = {
    total,
    origemX: new Float32Array(total),
    origemY: new Float32Array(total),
    x: new Float32Array(total),
    y: new Float32Array(total),
    vx: new Float32Array(total),
    vy: new Float32Array(total),
    cruz: new Uint8Array(total),
    nivel: new Uint8Array(total),
  };

  for (let linha = 0; linha < linhas; linha++) {
    for (let coluna = 0; coluna < colunas; coluna++) {
      const i = linha * colunas + coluna;
      const px = deslocX + coluna * espaco;
      const py = deslocY + linha * espaco;
      malha.origemX[i] = malha.x[i] = px;
      malha.origemY[i] = malha.y[i] = py;
      malha.cruz[i] = coluna % frequenciaCruz === 0 && linha % frequenciaCruz === 0 ? 1 : 0;
    }
  }

  return malha;
}

/**
 * Integra um passo da simulação (Euler semi-implícito com mola amortecida).
 * @param dt passo normalizado para 60fps (1 = 16.67ms) — mantém a física
 *           idêntica em telas de 60, 120 ou 144Hz.
 * @returns energia média da malha (usada para pausar o loop em repouso).
 */
export function simularMalha(malha: Malha, cursor: EstadoCursor, dt: number): number {
  const { raio, forcaRepulsao, rigidez, amortecimento, limiaresBrilho } = CONFIG_MALHA;
  const [l1, l2, l3] = limiaresBrilho;
  const raio2 = raio * raio;
  const amort = Math.pow(amortecimento, dt);
  const forcaBase = forcaRepulsao * cursor.influencia * dt;
  const cursorAtivo = cursor.influencia > 0.001;
  const { origemX, origemY, x, y, vx, vy, nivel, total } = malha;

  let energia = 0;

  for (let i = 0; i < total; i++) {
    const px = x[i];
    const py = y[i];
    let velX = vx[i];
    let velY = vy[i];

    if (cursorAtivo) {
      const dx = px - cursor.x;
      const dy = py - cursor.y;
      const d2 = dx * dx + dy * dy;
      // Checagem por distância ao quadrado: sqrt só para quem está no raio.
      if (d2 < raio2 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const t = 1 - d / raio;
        const f = (t * t * forcaBase) / d; // queda quadrática + normalização
        velX += dx * f;
        velY += dy * f;
      }
    }

    // Mola: atração elástica de volta à origem.
    velX += (origemX[i] - px) * rigidez * dt;
    velY += (origemY[i] - py) * rigidez * dt;
    velX *= amort;
    velY *= amort;

    const nx = px + velX * dt;
    const ny = py + velY * dt;
    x[i] = nx;
    y[i] = ny;
    vx[i] = velX;
    vy[i] = velY;

    const desloc = Math.abs(nx - origemX[i]) + Math.abs(ny - origemY[i]);
    nivel[i] = desloc > l3 ? 3 : desloc > l2 ? 2 : desloc > l1 ? 1 : 0;
    energia += desloc + Math.abs(velX) + Math.abs(velY);
  }

  return energia / total;
}

/**
 * Desenha a malha em lotes por nível de brilho:
 * um único `fill()` por cor — mínimo de trocas de estado no contexto 2D.
 */
export function desenharMalha(
  ctx: CanvasRenderingContext2D,
  malha: Malha,
  largura: number,
  altura: number,
  corFundo: string,
  cores: readonly string[],
): void {
  const { tamanhoPonto, tamanhoCruz } = CONFIG_MALHA;
  const { x, y, cruz, nivel, total } = malha;

  ctx.fillStyle = corFundo;
  ctx.fillRect(0, 0, largura, altura);

  for (let n = 0; n < NIVEIS_BRILHO; n++) {
    const lado = tamanhoPonto + n * 0.4;
    const meio = lado / 2;
    const cruzMeio = tamanhoCruz + n * 0.75;

    ctx.fillStyle = cores[n];
    ctx.beginPath();

    for (let i = 0; i < total; i++) {
      if (nivel[i] !== n) continue;
      const px = x[i];
      const py = y[i];
      if (cruz[i] === 1) {
        ctx.rect(px - cruzMeio, py - 0.5, cruzMeio * 2, 1);
        ctx.rect(px - 0.5, py - cruzMeio, 1, cruzMeio * 2);
      } else {
        ctx.rect(px - meio, py - meio, lado, lado);
      }
    }

    ctx.fill();
  }
}
