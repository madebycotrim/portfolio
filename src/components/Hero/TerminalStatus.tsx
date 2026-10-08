import { useState, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './TerminalStatus.module.css';

type AbaTerminal = 'telemetria' | 'diagnostico' | 'stack';

interface LinhaHistorico {
  comando: string;
  saida: string;
  isPre?: boolean;
}

const CONTEUDO_ABAS = {
  telemetria: [
    { prefixo: '[OK]', texto: 'Host status: online e respondendo a requisições', destaque: true },
    { prefixo: '[NET]', texto: 'TCP handshake time: 0.3ms · Zero packet loss registrado' },
    { prefixo: '[SYS]', texto: 'Heap memory: 34MB alocados · 0 reflows forçados' },
    { prefixo: '[SLA]', texto: 'Disponibilidade histórica de sistemas: 99.85%' },
  ],
  diagnostico: [
    { prefixo: '[SUP]', texto: 'Cultura de suporte: investigação na raiz, nunca gambiarra', destaque: true },
    { prefixo: '[DEV]', texto: 'Interfaces desenhadas com tratamento de erro ponta a ponta' },
    { prefixo: '[SEC]', texto: 'Zero vazamento de credenciais · Sanitização estrita de inputs' },
    { prefixo: '[A11Y]', texto: 'Teclado nativo e contraste mineral validado WCAG' },
  ],
  stack: [
    { prefixo: '[CORE]', texto: 'React · TypeScript · CSS Modules · Custom Properties', destaque: true },
    { prefixo: '[ANIM]', texto: 'GSAP ScrollTrigger · Lenis Smooth Scroll · Motion' },
    { prefixo: '[SYS]', texto: 'Linux Shell · Redes TCP/IP · WebSockets · Canvas 2D' },
    { prefixo: '[TEST]', texto: 'Lighthouse 99+ · Zero layout shift (CLS = 0)' },
  ],
};

const NEOFETCH_ART = `   __  __ ____   mateus@concreto
  |  \\/  / ___|  ----------------
  | |\\/| \\___ \\  OS: Brasília/DF · Brasil
  | |  | |___) | Host: Mateus Cotrim Portfolio Rig
  |_|  |_|____/  Kernel: 6.8.0-industrial-rt
                 Uptime: SESI · PGR · UNIEURO · ETB
                 Shell: zsh / cotrim-terminal
                 Perfil: Dev Front-end & Suporte N1 / Infra
                 Stack: React.js · Tailwind CSS · Active Directory · Node.js
                 Status: Estágio em TI (SESI Saúde / Brasília)`;

export function TerminalStatus() {
  const [abaAtiva, setAbaAtiva] = useState<AbaTerminal>('telemetria');
  const [comandoDigitado, setComandoDigitado] = useState('');
  const [historico, setHistorico] = useState<LinhaHistorico[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const executarComando = (cmdTexto: string) => {
    const cmd = cmdTexto.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear' || cmd === 'cls') {
      setHistorico([]);
      setComandoDigitado('');
      return;
    }

    let saida = '';
    let isPre = false;

    switch (cmd) {
      case 'help':
        saida = `COMANDOS DISPONÍVEIS:
  whoami     - Perfil profissional e síntese da carreira em TI
  carreira   - Linha do tempo dos marcos profissionais (ETB, PGR, UNIEURO, SESI)
  repos      - Lista repositórios públicos (madebycotrim e mateuscotrim)
  projects   - Soluções principais em produção e bento grid
  github     - Links diretos para os dois perfis no GitHub
  printlog   - Informações da plataforma SaaS de impressão 3D
  ping       - Teste de conectividade e latência ICMP
  neofetch   - Especificações do ambiente de desenvolvimento
  stack      - Lista completa da stack tecnológica (Web, Infra & Suporte)
  sla        - Telemetria de atendimento corporativo
  suporte    - Visão de suporte corporativo aliada ao desenvolvimento
  clear      - Limpa o histórico de comandos`;
        isPre = true;
        break;

      case 'repos':
      case 'repositories':
        saida = `REPOSITÓRIOS PÚBLICOS GITHUB:
[madebycotrim] (Maker, SaaS & Soluções)
  • printlog               - SaaS gestão fazendas 3D e precificação (TS/React) -> printlog.com.br
  • Catraki---SESI         - Controle de acesso e telemetria de catracas (TypeScript/Node)
  • nave-pas               - App educacional gamificado para o PAS UnB (TypeScript/React)
  • scae                   - Sistema corporativo de atendimento e suporte (TypeScript)
  • softhub-psicologia     - Clínica-escola UNIEURO Fábrica de Software (Web)
  • softhub-calculadora    - Calculadora paramétrica de honorários (Web)
  • sem                    - Módulo utilitário core (TypeScript)

[mateuscotrim] (Código, Concorrência & Acadêmico)
  • Precificador-3D        - Calculadora maker de custos de impressão 3D
  • Atividade-3-Paralelizar-log - Processamento paralelo concorrente em Python (speedup 4.2x)
  • Atividade-2-Avaliar-soma   - Benchmarking de soma paralela em Python
  • Fabrica-de-Software    - Componentes e projetos Fábrica UNIEURO
  • UNIEURO                - Projetos acadêmicos Sistemas de Informação
  • BRASIL.IA              - Estudos e algoritmos em C#
  • eletConnect            - Plataforma web de serviços elétricos
  • auto-mecanica-tavares  - Website de serviços automotivos`;
        isPre = true;
        break;

      case 'projects':
        saida = `PROJETOS PRINCIPAIS EM DESTAQUE:
1. PrintLog OS        [SaaS Maker 3D]       -> https://printlog.com.br
2. Catraki SESI      [Controle I/O & TI]   -> github.com/madebycotrim/Catraki---SESI
3. NAVE Jornada PAS  [EdTech PAS UnB]      -> github.com/madebycotrim/nave-pas
4. SoftHub Psi       [Clínica UNIEURO]     -> github.com/madebycotrim/softhub-psicologia
5. Log Analyzer      [Concorrência Python] -> github.com/mateuscotrim/Atividade-3...
6. SCAE Corp         [Atendimento Full]    -> github.com/madebycotrim/scae`;
        isPre = true;
        break;

      case 'github':
        saida = `PERFIS GITHUB DE MATEUS COTRIM:
• https://github.com/madebycotrim  -> Projetos maker, SaaS (PrintLog, NAVE, Catraki SESI)
• https://github.com/mateuscotrim  -> Repositórios acadêmicos, concorrência, C#, Python`;
        isPre = true;
        break;

      case 'printlog':
        saida = `PRINTLOG OS — SISTEMA PARA FAZENDAS DE IMPRESSÃO 3D:
• URL: https://printlog.com.br
• Repositório: https://github.com/madebycotrim/printlog
• Stack: TypeScript, React.js, Tailwind CSS, Vite, Node.js
• Recursos: Cálculo de filamento (g), tempo de máquina, consumo kWh, margem comercial e orçamentos automáticos.`;
        isPre = true;
        break;

      case 'whoami':
        saida =
          'Mateus Recalde da Fonseca Cotrim — Profissional de Carreira em Tecnologia da Informação: Técnico de Suporte N1 & Infraestrutura (SESI, PGR/MPF, ETB) e Desenvolvedor de Software (React.js, TypeScript, Node.js, C#). Formações em Sistemas de Informação (UNIEURO), ADS (CEUB) e Técnico em Informática (ETB). Visão 360° — do hardware físico ao código.';
        break;

      case 'carreira':
      case 'timeline':
        saida = `MARCOS DE CARREIRA // MATEUS COTRIM:
[01] ETB (2021-2023 / 2024-2025): Infraestrutura & Hardware
     • Manutenção preventiva/corretiva, montagem de computadores, redes locais e laboratórios (+250 PCs revisados).
[02] PGR / MPF (2024-2025): Suporte Corporativo N1 & Service Desk
     • Atendimento técnico a +400 usuários corporativos, VPN MPF, redes TCP/IP e cumprimento de 98.8% de SLA.
[03] UNIEURO Fábrica de Software (2024-Ativo): Engenharia Web
     • Desenvolvimento de sistemas em React.js, Tailwind CSS, clínica-escola de Psicologia e consumo de APIs.
[04] SESI Saúde (2026-Ativo): TI Corporativa Integrada & Dev Web
     • Administração de Active Directory (domínio/GPO), suporte presencial e desenvolvimento web (React.js, Catraki SESI).`;
        isPre = true;
        break;

      case 'ping':
        saida = `PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.18 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.21 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.16 ms
--- 127.0.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, min/avg/max = 0.16/0.18/0.21 ms`;
        isPre = true;
        break;

      case 'neofetch':
        saida = NEOFETCH_ART;
        isPre = true;
        break;

      case 'stack':
        saida =
          'Front-end: React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS | Back-end: Node.js, C#, APIs REST, MySQL, PostgreSQL | Infra: Active Directory, Redes TCP/IP, DNS, DHCP, VPN, Windows 10/11, Microsoft 365, Service Desk N1.';
        break;

      case 'sla':
        saida =
          'TELEMETRIA CORPORATIVA: +400 usuários atendidos na PGR com 98.8% de SLA cumprido. Estações de trabalho gerenciadas via Active Directory e sistemas em produção no SESI.';
        break;

      case 'suporte':
        saida =
          'FILOSOFIA: "A vivência corporativa em suporte técnico proporciona uma visão aprofundada das dores dos usuários e facilita a transformação de requisitos de negócio em software de alto impacto."';
        break;

      default:
        saida = `bash: comando não reconhecido: '${cmd}'. Digite 'help' para ver os comandos disponíveis.`;
        break;
    }

    setHistorico((prev) => [...prev, { comando: cmdTexto, saida, isPre }]);
    setComandoDigitado('');
  };

  const aoEnviarFormulario = (e: FormEvent) => {
    e.preventDefault();
    executarComando(comandoDigitado);
  };

  return (
    <div className={styles.containerTerminal} data-hero-fade>
      <div className={styles.barraTopo}>
        <div className={styles.controles} aria-hidden="true">
          <span className={styles.pontoControle} />
          <span className={styles.pontoControle} />
          <span className={styles.pontoControle} />
        </div>

        <div className={styles.tituloJanela}>
          <span className={styles.indicadorStatus} aria-hidden="true" />
          <span className={styles.textoStatus}>SYSTEM: ONLINE</span>
          <span className={styles.separadorBarra}>/</span>
          <span className={styles.hostname}>mateus-cotrim.local</span>
        </div>

        <div className={styles.abas} role="tablist" aria-label="Abas do Terminal de Diagnóstico">
          {(['telemetria', 'diagnostico', 'stack'] as const).map((aba) => (
            <button
              key={aba}
              type="button"
              role="tab"
              aria-selected={abaAtiva === aba}
              aria-controls={`painel-${aba}`}
              id={`aba-${aba}`}
              className={`${styles.botaoAba} ${abaAtiva === aba ? styles.abaSelecionada : ''}`}
              onClick={() => {
                setAbaAtiva(aba);
                setHistorico([]);
              }}
            >
              {aba.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.corpoTerminal}>
        <div className={styles.linhaComando}>
          <span className={styles.prompt}>mateus@concreto:~$</span>
          <span className={styles.comando}>sysctl --diagnose --module={abaAtiva}</span>
        </div>

        {/* Linhas padrão da aba selecionada quando não há comandos manuais */}
        {historico.length === 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={abaAtiva}
              id={`painel-${abaAtiva}`}
              role="tabpanel"
              aria-labelledby={`aba-${abaAtiva}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={styles.linhasSaida}
            >
              {CONTEUDO_ABAS[abaAtiva].map((linha, idx) => (
                <div key={idx} className={styles.linhaSaida}>
                  <span
                    className={`${styles.prefixo} ${
                      linha.destaque ? styles.prefixoDestaque : ''
                    }`}
                  >
                    {linha.prefixo}
                  </span>
                  <span className={styles.textoSaida}>{linha.texto}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Histórico de comandos interativos digitados */}
        {historico.map((item, idx) => (
          <div key={idx} className={styles.linhasSaida}>
            <div className={styles.linhaComando}>
              <span className={styles.prompt}>mateus@concreto:~$</span>
              <span className={styles.comando}>{item.comando}</span>
            </div>
            {item.isPre ? (
              <pre className={styles.saidaPreformatada}>{item.saida}</pre>
            ) : (
              <div className={styles.linhaSaida}>
                <span className={styles.prefixo}>[OUT]</span>
                <span className={styles.textoSaida}>{item.saida}</span>
              </div>
            )}
          </div>
        ))}

        {/* Prompt interativo com input de texto */}
        <form onSubmit={aoEnviarFormulario} className={styles.formPrompt}>
          <span className={styles.prompt}>mateus@concreto:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={comandoDigitado}
            onChange={(e) => setComandoDigitado(e.target.value)}
            placeholder="digite um comando (ex: help, whoami, ping, neofetch)..."
            className={styles.inputComando}
            aria-label="Linha de comando do terminal"
            autoComplete="off"
            spellCheck="false"
          />
        </form>

        {/* Chips de atalho rápido para comandos */}
        <div className={styles.botoesComandoRapido}>
          <span className={styles.rotuloRapido}>COMANDOS RÁPIDOS:</span>
          {['help', 'whoami', 'carreira', 'repos', 'projects', 'github', 'neofetch', 'clear'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              className={styles.chipComando}
              onClick={() => executarComando(cmd)}
            >
              ${cmd}
            </button>
          ))}
        </div>

        <div className={styles.rodapeTerminal}>
          <span className={styles.cursorPiscante} aria-hidden="true" />
          <span className={styles.instrucaoRodape}>
            [TERMINAL INTERATIVO: DIGITE OU CLIQUE NOS COMANDOS RÁPIDOS]
          </span>
        </div>
      </div>
    </div>
  );
}
