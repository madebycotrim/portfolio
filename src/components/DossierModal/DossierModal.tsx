import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import styles from './DossierModal.module.css';

interface DossierModalProps {
  aberto: boolean;
  aoFechar: () => void;
}

export function DossierModal({ aberto, aoFechar }: DossierModalProps) {
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const aoTecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') aoFechar();
    };
    window.addEventListener('keydown', aoTecla);
    return () => window.removeEventListener('keydown', aoTecla);
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  const copiarResumo = async () => {
    const texto = `DOSSIÊ TÉCNICO // MATEUS RECALDE DA FONSECA COTRIM
Desenvolvedor de Software (Front-end / Full-stack) & Técnico de Suporte N1 / Infraestrutura de TI
Telefone: (61) 99907-6252 | E-mail: mateusrfcotrim@gmail.com
LinkedIn: https://linkedin.com/in/mateus-cotrim
GitHub Maker & SaaS: https://github.com/madebycotrim (PrintLog: https://printlog.com.br)
GitHub Código & Acadêmico: https://github.com/mateuscotrim
Brasília – DF | CNH B

RESUMO PROFISSIONAL:
Desenvolvedor de Software em formação com experiência prática na construção de aplicações web modernas, manutenção de sistemas em produção e consumo de APIs. Criador da plataforma SaaS PrintLog (printlog.com.br) e desenvolvedor de soluções em TypeScript, React.js, JavaScript (ES6+), HTML5, CSS3 e Tailwind CSS. Vivência corporativa em suporte técnico (SESI, PGR/MPF, ETB), unindo usabilidade front-end a resiliência operacional de infraestrutura.

EXPERIÊNCIA PROFISSIONAL:
• 03/2026 — Atual | SESI Saúde (Serviço Social da Indústria): Estagiário de TI — Suporte, Infraestrutura, Catracas I/O & Desenvolvimento Web (React.js, Node.js, Active Directory, Redes).
• 05/2024 — 06/2025 | Procuradoria-Geral da República (PGR / MPF): Estagiário de TI — Suporte N1 presencial/remoto a +400 usuários, triagem via Service Desk, VPN e redes.
• 05/2024 — 06/2025 | Escola Técnica de Brasília (CEP/ETB): Estagiário de TI — Suporte, manutenção preventiva/corretiva de computadores e infraestrutura de laboratórios.
• 10/2024 — Atual | Fábrica de Software — UNIEURO: Desenvolvedor Front-end Voluntário (React, Tailwind CSS, JavaScript, Git/GitHub).

PROJETOS EM DESTAQUE:
• PrintLog OS (printlog.com.br): Plataforma SaaS para gestão de custos e fazendas de impressão 3D (TypeScript, React, Node.js).
• Catraki SESI: Sistema de telemetria e controle de catracas no SESI Saúde (TypeScript).
• NAVE — Jornada PAS: App gamificado para vestibulandos do PAS UnB (TypeScript, React).
• SoftHub Psicologia: Sistema de prontuários eletrônicos para clínica-escola UNIEURO.
• Log Analyzer Paralelo: Pesquisa de speedup paralelo em Python (concorrência e logs).

FORMAÇÃO ACADÊMICA:
• Sistemas de Informação (Bacharelado) — UNIEURO (em andamento, 6º semestre)
• Análise e Desenvolvimento de Sistemas (Tecnólogo) — CEUB (Concluído, 2022 — 2025)
• Técnico em Informática — Escola Técnica de Brasília CEP/ETB (Concluído, 2021 — 2023)

CONHECIMENTOS TÉCNICOS:
React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Node.js, C#, Python, APIs REST, MySQL, PostgreSQL, Active Directory, Redes TCP/IP, VPN, DNS, DHCP, Service Desk N1, Windows 10/11, Microsoft 365, Git & GitHub.`;

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Fallback
    }
  };

  const imprimir = () => {
    window.print();
  };

  return (
    <div className={styles.overlay} onClick={aoFechar} role="dialog" aria-modal="true" aria-labelledby="dossie-titulo">
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.barraTopo}>
          <div className={styles.metaJanela}>
            <span className={styles.pontoVerde} aria-hidden="true" />
            <span className={styles.idDossie}>DOSSIER://MATEUS_COTRIM.CV</span>
          </div>

          <div className={styles.acoesTopo}>
            <button type="button" className={styles.botaoAcao} onClick={copiarResumo}>
              {copiado ? '✓ COPIADO' : 'COPIAR TEXTO'}
            </button>
            <button type="button" className={styles.botaoAcao} onClick={imprimir}>
              IMPRIMIR / PDF
            </button>
            <button
              type="button"
              className={styles.botaoFechar}
              onClick={aoFechar}
              aria-label="Fechar dossiê técnico"
            >
              ESC [×]
            </button>
          </div>
        </div>

        <div className={styles.conteudo}>
          <header className={styles.cabecalhoDossie}>
            <span className={styles.tagCargo}>
              // PORTFÓLIO DE CARREIRA // INFRAESTRUTURA, SUPORTE CORPORATIVO &amp; ENGENHARIA DE SOFTWARE
            </span>
            <h1 id="dossie-titulo" className={styles.nomeTitulo}>
              Mateus Recalde da Fonseca Cotrim
            </h1>
            <div className={styles.contatoMeta}>
              <span>Brasília — DF · CNH B</span>
              <span>·</span>
              <span>(61) 99907-6252</span>
              <span>·</span>
              <span>mateusrfcotrim@gmail.com</span>
            </div>
            <div className={styles.contatoMeta} style={{ fontSize: 'var(--texto-2xs)' }}>
              <a href="https://linkedin.com/in/mateus-cotrim" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--status-info)' }}>
                linkedin.com/in/mateus-cotrim
              </a>
              <span>·</span>
              <a href="https://github.com/madebycotrim" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--status-info)' }}>
                github.com/madebycotrim (Maker/SaaS)
              </a>
              <span>·</span>
              <a href="https://github.com/mateuscotrim" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--status-info)' }}>
                github.com/mateuscotrim (Código)
              </a>
            </div>
          </header>

          <section className={styles.secaoDossie}>
            <h2 className={styles.tituloSecao}>[01] RESUMO PROFISSIONAL</h2>
            <p className={styles.textoSintese}>
              Desenvolvedor de Software em formação com experiência prática na construção de aplicações web modernas, manutenção de sistemas em produção e consumo de APIs. Atuação no desenvolvimento de soluções em React.js, JavaScript (ES6+), HTML5, CSS3 e Tailwind CSS, unindo lógica de programação a interfaces centradas na experiência do usuário (UX/UI). Vivência corporativa em suporte técnico (SESI, PGR/MPF, ETB), o que proporciona uma visão aprofundada das dores dos usuários e facilita a transformação de requisitos de negócio em software de alto impacto.
            </p>
          </section>

          <section className={styles.secaoDossie}>
            <h2 className={styles.tituloSecao}>[02] CONHECIMENTOS &amp; COMPETÊNCIAS TÉCNICAS</h2>
            <div className={styles.gradeStack}>
              <div className={styles.itemStackBloco}>
                <span className={styles.rotuloStackBloco}>LINGUAGENS &amp; FRONT-END</span>
                <span className={styles.textoStackBloco}>
                  JavaScript (ES6+), React.js, HTML5, CSS3, Tailwind CSS, Componentização, Responsive Design, UX/UI.
                </span>
              </div>
              <div className={styles.itemStackBloco}>
                <span className={styles.rotuloStackBloco}>BACK-END &amp; BANCO DE DADOS</span>
                <span className={styles.textoStackBloco}>
                  Node.js, C#, APIs REST, MySQL, PostgreSQL, Modelagem Relacional, JSON.
                </span>
              </div>
              <div className={styles.itemStackBloco}>
                <span className={styles.rotuloStackBloco}>INFRAESTRUTURA &amp; SUPORTE</span>
                <span className={styles.textoStackBloco}>
                  Active Directory (AD), Redes (TCP/IP, VPN, DNS, DHCP, Wi-Fi, LAN, Cabeamento), Service Desk N1, Windows 10/11, Microsoft 365.
                </span>
              </div>
              <div className={styles.itemStackBloco}>
                <span className={styles.rotuloStackBloco}>FERRAMENTAS &amp; METODOLOGIAS</span>
                <span className={styles.textoStackBloco}>
                  Git, GitHub, NPM, VS Code, Resolução de Problemas na Causa Raiz, Trabalho em Equipe.
                </span>
              </div>
            </div>
          </section>

          <section className={styles.secaoDossie}>
            <h2 className={styles.tituloSecao}>[03] EXPERIÊNCIA PROFISSIONAL</h2>
            <div className={styles.listaExperiencias}>
              <div className={styles.itemExperiencia}>
                <div className={styles.topoExp}>
                  <span className={styles.cargoExp}>
                    Serviço Social da Indústria (SESI Saúde) — Estagiário de TI
                  </span>
                  <span className={styles.periodoExp}>03/2026 — Atual | Brasília – DF</span>
                </div>
                <p className={styles.resumoExp}>
                  • <strong>Desenvolvimento Web</strong>: Idealização e criação de sistema web em React.js para otimização de rotinas internas, além da manutenção e melhoria de sistemas em produção (React.js e Node.js).<br />
                  • <strong>Suporte Técnico &amp; Infraestrutura</strong>: Resolução de chamados de hardware, software, redes e gestão de acessos via Active Directory (ingresso e remoção de estações no domínio corporativo) em estações Windows 10/11.
                </p>
              </div>

              <div className={styles.itemExperiencia}>
                <div className={styles.topoExp}>
                  <span className={styles.cargoExp}>
                    Procuradoria-Geral da República (PGR / MPF) — Estagiário de TI
                  </span>
                  <span className={styles.periodoExp}>05/2024 — 06/2025 | Brasília – DF</span>
                </div>
                <p className={styles.resumoExp}>
                  • Suporte técnico presencial e remoto a mais de 400 usuários corporativos em ambiente de alta demanda institucional.<br />
                  • Abertura, registro, classificação, priorização e resolução de chamados de hardware, software e redes via Service Desk.<br />
                  • Configuração de aplicativos corporativos, apoio a sistemas institucionais, VPN e conectividade de rede.
                </p>
              </div>

              <div className={styles.itemExperiencia}>
                <div className={styles.topoExp}>
                  <span className={styles.cargoExp}>
                    Fábrica de Software — UNIEURO — Desenvolvedor Front-end Voluntário
                  </span>
                  <span className={styles.periodoExp}>10/2024 — Presente | Brasília – DF</span>
                </div>
                <p className={styles.resumoExp}>
                  • Criação de sistemas web para uso interno da universidade, participando de todas as etapas do ciclo de desenvolvimento.<br />
                  • Construção de interfaces responsivas aplicando HTML5, CSS3, Tailwind CSS, JavaScript e React.js.<br />
                  • Versionamento de código em equipe utilizando Git e GitHub.
                </p>
              </div>

              <div className={styles.itemExperiencia}>
                <div className={styles.topoExp}>
                  <span className={styles.cargoExp}>
                    Escola Técnica de Brasília (CEP/ETB) — Estagiário de TI
                  </span>
                  <span className={styles.periodoExp}>05/2024 — 06/2025 | Brasília – DF</span>
                </div>
                <p className={styles.resumoExp}>
                  • Atendimento e suporte técnico aos usuários da instituição com diagnóstico e resolução de incidentes de hardware e software.<br />
                  • Instalação, configuração e atualização de softwares e sistemas operacionais Windows 10/11.<br />
                  • Manutenção preventiva e corretiva de computadores e equipamentos de informática dos laboratórios.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.secaoDossie}>
            <h2 className={styles.tituloSecao}>[04] FORMAÇÃO ACADÊMICA</h2>
            <div className={styles.listaExperiencias}>
              <div className={styles.itemExperiencia}>
                <div className={styles.topoExp}>
                  <span className={styles.cargoExp}>
                    Sistemas de Informação — Bacharelado (6º semestre)
                  </span>
                  <span className={styles.periodoExp}>Em andamento</span>
                </div>
                <p className={styles.resumoExp}>Centro Universitário Euro-Americano (UNIEURO)</p>
              </div>

              <div className={styles.itemExperiencia}>
                <div className={styles.topoExp}>
                  <span className={styles.cargoExp}>
                    Análise e Desenvolvimento de Sistemas — Tecnólogo
                  </span>
                  <span className={styles.periodoExp}>2022 — 2025 · Concluído</span>
                </div>
                <p className={styles.resumoExp}>Centro Universitário de Brasília (CEUB)</p>
              </div>

              <div className={styles.itemExperiencia}>
                <div className={styles.topoExp}>
                  <span className={styles.cargoExp}>
                    Técnico em Informática — Técnico
                  </span>
                  <span className={styles.periodoExp}>2021 — 2023 · Concluído</span>
                </div>
                <p className={styles.resumoExp}>Escola Técnica de Brasília (CEP/ETB)</p>
              </div>
            </div>
          </section>

          <section className={styles.secaoDossie}>
            <h2 className={styles.tituloSecao}>[05] CURSOS &amp; QUALIFICAÇÕES COMPLEMENTARES</h2>
            <div className={styles.gradeStack}>
              <div className={styles.itemStackBloco}>
                <span className={styles.rotuloStackBloco}>CISCO NETWORKING ACADEMY</span>
                <span className={styles.textoStackBloco}>Get Connected (Redes de Computadores)</span>
              </div>
              <div className={styles.itemStackBloco}>
                <span className={styles.rotuloStackBloco}>ESCOLA TÉCNICA DE BRASÍLIA</span>
                <span className={styles.textoStackBloco}>
                  • Programador de Sistemas<br />
                  • Montador e Reparador de Computadores<br />
                  • Operador de Computador
                </span>
              </div>
              <div className={styles.itemStackBloco}>
                <span className={styles.rotuloStackBloco}>ESCOLA NACIONAL DE ADMINISTRAÇÃO PÚBLICA (ENAP)</span>
                <span className={styles.textoStackBloco}>
                  • Introdução à Lei Brasileira de Proteção de Dados (LGPD)<br />
                  • Uso responsável das TICs<br />
                  • Internet das Coisas (IoT) aplicada para resolução de desafios
                </span>
              </div>
              <div className={styles.itemStackBloco}>
                <span className={styles.rotuloStackBloco}>HABILITAÇÃO &amp; DISPONIBILIDADE</span>
                <span className={styles.textoStackBloco}>
                  • CNH Categoria B<br />
                  • Residente em Brasília — DF
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.rodape}>
          <span className={styles.infoRodape}>
            DOCUMENTO TÉCNICO GERADO VIA SISTEMA // MATEUS COTRIM 2026
          </span>
          <button type="button" className={styles.botaoAcao} onClick={aoFechar}>
            CONCLUIR LEITURA
          </button>
        </div>
      </motion.div>
    </div>
  );
}
