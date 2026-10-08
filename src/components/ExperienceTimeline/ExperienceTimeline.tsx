import { useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap, prefereMovimentoReduzido } from '../../lib/gsap';
import { revelarCabecalho } from '../../lib/animacoes';
import { EXPERIENCIA_TIMELINE } from '../../data/experiencia';
import { SectionHeader } from '../ui/SectionHeader/SectionHeader';
import styles from './ExperienceTimeline.module.css';

export function ExperienceTimeline() {
  const raizRef = useRef<HTMLElement>(null);
  const [incidentesAbertos, setIncidentesAbertos] = useState<Record<string, boolean>>({});

  const alternarIncidente = (id: string) => {
    setIncidentesAbertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz || prefereMovimentoReduzido()) return;

    const ctx = gsap.context(() => {
      revelarCabecalho(raiz);

      // Linha mestra vertical que acompanha a rolagem com scrub
      gsap.fromTo(
        '[data-linha-mestra]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-trilho-timeline]',
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        },
      );

      // Cada nó da timeline ganha foco e sobe com ScrollTrigger individual
      gsap.utils.toArray<HTMLElement>('[data-no-timeline]').forEach((bloco) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bloco,
            start: 'top 85%',
            once: true,
          },
        });

        tl.from(bloco.querySelector('[data-marcador-no]'), {
          scale: 0,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'back.out(2)',
        })
          .from(
            bloco.querySelector('[data-card-timeline]'),
            {
              y: 45,
              autoAlpha: 0,
              duration: 1.2,
              ease: 'expo.out',
            },
            '-=0.5',
          )
          .from(
            bloco.querySelectorAll('[data-item-atividade]'),
            {
              x: -16,
              autoAlpha: 0,
              duration: 0.8,
              ease: 'expo.out',
              stagger: 0.06,
            },
            '-=0.8',
          );
      });
    }, raiz);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={raizRef}
      id="trajetoria"
      className={styles.secao}
      aria-labelledby="trajetoria-titulo"
    >
      <div className={styles.interno}>
        <SectionHeader
          id="trajetoria-titulo"
          indice="02"
          rotulo="Trajetória Profissional"
          titulo="Marcos de Carreira"
          complemento={
            <>
              Hardware &amp; Redes → Suporte N1 (PGR)
              <br />
              TI Corporativa (SESI) → Software (UNIEURO)
            </>
          }
        />

        <div className={styles.manifestoTrajetoria}>
          <p className={styles.textoManifesto}>
            Uma carreira construída desde os fundamentos físicos: dominando manutenção de hardware e redes locais na ETB,
            o atendimento sob pressão crítica a mais de 400 usuários na Procuradoria-Geral da República, e a administração
            de Active Directory e infraestrutura no SESI Saúde. Cada marco prático forja um profissional de tecnologia
            completo, capaz de transitar com autoridade da infraestrutura física e suporte corporativo à engenharia de software moderna.
          </p>
        </div>

        <nav className={styles.seletorFases} aria-label="Navegação rápida por fases da carreira">
          <span className={styles.rotuloSeletor}>FASES DA CARREIRA:</span>
          {EXPERIENCIA_TIMELINE.map((m) => (
            <a key={m.id} href={`#${m.id}`} className={styles.itemFaseLink}>
              [{m.faseNumero}] {m.empresa.split('(')[0].trim()}
            </a>
          ))}
        </nav>

        <div className={styles.trilho} data-trilho-timeline>
          <div className={styles.linhaMestra} data-linha-mestra aria-hidden="true" />

          <div className={styles.listaMarcos}>
            {EXPERIENCIA_TIMELINE.map((marco) => {
              const incidenteVisivel = !!incidentesAbertos[marco.id];
              return (
                <div
                  key={marco.id}
                  id={marco.id}
                  className={styles.noTimeline}
                  data-no-timeline
                >
                  <div className={styles.colunaMarcador}>
                    <div className={styles.marcador} data-marcador-no>
                      <span className={styles.numeroFase}>{marco.faseNumero}</span>
                    </div>
                  </div>

                  <div className={styles.cardConteudo} data-card-timeline>
                    <div className={styles.topoCard}>
                      <div className={styles.metaLinha}>
                        <span className={styles.periodo}>{marco.periodo}</span>
                        <span className={styles.tipoBadge}>{marco.tipo}</span>
                        <span
                          className={`${styles.statusBadge} ${
                            marco.status === 'EM EVOLUÇÃO ATIVA' ? styles.statusAtivo : ''
                          }`}
                        >
                          {marco.status === 'EM EVOLUÇÃO ATIVA' && (
                            <span className={styles.pulsoAtivo} aria-hidden="true" />
                          )}
                          {marco.status}
                        </span>
                      </div>
                      <span className={styles.empresaNome}>// {marco.empresa}</span>
                      <h3 className={styles.tituloCargo}>{marco.tituloCargo}</h3>
                      <p className={styles.subtituloContexto}>{marco.subtituloContexto}</p>
                    </div>

                    <p className={styles.descricao}>{marco.descricao}</p>

                    <div className={styles.blocoAtividades}>
                      <span className={styles.rotuloAtividades}>[AÇÕES &amp; TROUBLESHOOTING]:</span>
                      <ul className={styles.listaAtividades}>
                        {marco.principaisAtividades.map((atv, i) => (
                          <li key={i} className={styles.itemAtividade} data-item-atividade>
                            <span className={styles.setaItem} aria-hidden="true">→</span>
                            <span>{atv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Estudo de caso de Troubleshooting / Root Cause Analysis */}
                    <button
                      type="button"
                      className={styles.botaoIncidenteToggle}
                      onClick={() => alternarIncidente(marco.id)}
                      aria-expanded={incidenteVisivel}
                      aria-controls={`incidente-${marco.id}`}
                    >
                      <span>
                        [INCIDENTE REAL &amp; RCA]: {marco.casoIncidente.titulo}
                      </span>
                      <span
                        className={`${styles.iconeChevron} ${
                          incidenteVisivel ? styles.iconeChevronAberto : ''
                        }`}
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                    </button>

                    <AnimatePresence>
                      {incidenteVisivel && (
                        <motion.div
                          id={`incidente-${marco.id}`}
                          className={styles.painelIncidente}
                          initial={{ opacity: 0, height: 0, y: -6 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className={styles.topoIncidente}>
                            <span className={styles.tituloIncidente}>
                              POST-MORTEM &amp; CAUSA RAIZ // #{marco.id.toUpperCase()}
                            </span>
                            <span className={styles.slaBadge}>
                              {marco.casoIncidente.slaResolucao}
                            </span>
                          </div>

                          <div className={styles.gradeIncidente}>
                            <div className={styles.itemIncidente}>
                              <span className={styles.rotuloIncidente}>
                                [SINTOMA REPORTADO]
                              </span>
                              <p className={styles.textoIncidente}>
                                {marco.casoIncidente.sintoma}
                              </p>
                            </div>

                            <div className={styles.itemIncidente}>
                              <span className={styles.rotuloIncidente}>
                                [ANÁLISE DE CAUSA RAIZ (RCA)]
                              </span>
                              <p className={styles.textoIncidente}>
                                {marco.casoIncidente.causaRaiz}
                              </p>
                            </div>

                            <div className={styles.itemIncidente} style={{ gridColumn: '1 / -1' }}>
                              <span className={styles.rotuloIncidente}>
                                [SOLUÇÃO DEFINITIVA DE ENGENHARIA]
                              </span>
                              <p className={styles.textoIncidente}>
                                {marco.casoIncidente.solucaoDefinitiva}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className={styles.blocoInsight}>
                      <span className={styles.rotuloInsight}>[INSIGHT DE ENGENHARIA]:</span>
                      <blockquote className={styles.citacaoInsight}>
                        "{marco.insightEvolucao}"
                      </blockquote>
                    </div>

                    <div className={styles.rodapeCard}>
                      <div className={styles.metricas}>
                        {marco.metricasOperacionais.map((m) => (
                          <div key={m.rotulo} className={styles.itemMetrica}>
                            <span className={styles.valorMetrica}>{m.valor}</span>
                            <span className={styles.rotuloMetrica}>{m.rotulo}</span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.competencias}>
                        {marco.competenciasChave.map((comp) => (
                          <span key={comp} className={styles.tagComp}>
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
