import { useEffect, useRef } from 'react';
import { prefereMovimentoReduzido } from '../../lib/gsap';
import {
  CONFIG_MALHA,
  criarMalha,
  desenharMalha,
  simularMalha,
  type EstadoCursor,
  type Malha,
} from './malha';
import styles from './ConcreteGridBg.module.css';

/** Suavização do cursor (0–1 por frame @60fps): o campo "persegue" o mouse. */
const SUAVIZACAO_CURSOR = 0.2;
/** Velocidade da rampa de entrada/saída da influência. */
const SUAVIZACAO_INFLUENCIA = 0.08;
/** Teto de DPR: acima de 2 o custo cresce sem ganho perceptível em pontos de 1px. */
const DPR_MAXIMO = 2;
/** Teto do dt para evitar "explosões" após a aba voltar de segundo plano. */
const DT_MAXIMO = 3;

const lerToken = (nome: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(nome).trim();

/**
 * Fundo em Canvas com malha elástica reagindo ao cursor.
 *
 * Performance:
 * - Canvas `position: fixed` em camada própria → zero reflow, independente do Lenis.
 * - Leitura de input apenas grava números; toda a lógica roda no rAF.
 * - O loop DORME quando a malha está em repouso e acorda no próximo movimento.
 * - Contexto `alpha: false` acelera a composição pelo navegador.
 */
export function ConcreteGridBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !ctx) return;

    const corFundo = lerToken('--cor-fundo');
    const cores = [
      lerToken('--concreto-700'),
      lerToken('--concreto-600'),
      lerToken('--concreto-500'),
      lerToken('--concreto-300'),
    ] as const;

    let largura = 0;
    let altura = 0;
    let malha: Malha = criarMalha(1, 1);
    let rafId = 0;
    let rodando = false;
    let ultimoTempo = 0;

    const alvo = { x: -9999, y: -9999, ativo: false };
    const cursor: EstadoCursor = { x: -9999, y: -9999, influencia: 0 };

    const redimensionar = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAXIMO);
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      malha = criarMalha(largura, altura);
    };

    const passo = (agora: number): void => {
      const dt = Math.min((agora - ultimoTempo) / 16.667, DT_MAXIMO);
      ultimoTempo = agora;

      // Interpolação exponencial independente de framerate.
      const sCursor = 1 - Math.pow(1 - SUAVIZACAO_CURSOR, dt);
      const sInfluencia = 1 - Math.pow(1 - SUAVIZACAO_INFLUENCIA, dt);
      cursor.x += (alvo.x - cursor.x) * sCursor;
      cursor.y += (alvo.y - cursor.y) * sCursor;
      cursor.influencia += ((alvo.ativo ? 1 : 0) - cursor.influencia) * sInfluencia;

      const energia = simularMalha(malha, cursor, dt);
      desenharMalha(ctx, malha, largura, altura, corFundo, cores);

      const emRepouso =
        !alvo.ativo && cursor.influencia < 0.001 && energia < CONFIG_MALHA.limiarRepouso;

      if (emRepouso) {
        rodando = false;
        return;
      }
      rafId = requestAnimationFrame(passo);
    };

    const acordar = (): void => {
      if (rodando || document.hidden) return;
      rodando = true;
      ultimoTempo = performance.now();
      rafId = requestAnimationFrame(passo);
    };

    const dormir = (): void => {
      cancelAnimationFrame(rafId);
      rodando = false;
    };

    redimensionar();

    // Modo acessível: desenha a malha estática uma vez e não escuta o cursor.
    if (prefereMovimentoReduzido()) {
      desenharMalha(ctx, malha, largura, altura, corFundo, cores);
      return;
    }

    const aoMover = (e: PointerEvent): void => {
      // Primeiro contato: posiciona o cursor suavizado direto no ponto,
      // evitando que ele "viaje" pela tela desde (-9999, -9999).
      if (!alvo.ativo && cursor.influencia < 0.001) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
      alvo.x = e.clientX;
      alvo.y = e.clientY;
      alvo.ativo = true;
      acordar();
    };

    const aoSair = (): void => {
      alvo.ativo = false;
      acordar();
    };

    const aoSoltarToque = (e: PointerEvent): void => {
      if (e.pointerType !== 'mouse') aoSair();
    };

    let rafResize = 0;
    const aoRedimensionar = (): void => {
      cancelAnimationFrame(rafResize);
      rafResize = requestAnimationFrame(() => {
        redimensionar();
        desenharMalha(ctx, malha, largura, altura, corFundo, cores);
      });
    };

    const aoMudarVisibilidade = (): void => {
      if (document.hidden) dormir();
      else acordar();
    };

    const raiz = document.documentElement;
    window.addEventListener('pointermove', aoMover, { passive: true });
    window.addEventListener('pointerup', aoSoltarToque, { passive: true });
    window.addEventListener('pointercancel', aoSair, { passive: true });
    window.addEventListener('blur', aoSair);
    window.addEventListener('resize', aoRedimensionar);
    raiz.addEventListener('pointerleave', aoSair);
    document.addEventListener('visibilitychange', aoMudarVisibilidade);

    acordar(); // primeiro frame

    return () => {
      dormir();
      cancelAnimationFrame(rafResize);
      window.removeEventListener('pointermove', aoMover);
      window.removeEventListener('pointerup', aoSoltarToque);
      window.removeEventListener('pointercancel', aoSair);
      window.removeEventListener('blur', aoSair);
      window.removeEventListener('resize', aoRedimensionar);
      raiz.removeEventListener('pointerleave', aoSair);
      document.removeEventListener('visibilitychange', aoMudarVisibilidade);
    };
  }, []);

  return (
    <div className={styles.raiz} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vinheta} />
    </div>
  );
}
