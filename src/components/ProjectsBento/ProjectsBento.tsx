import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { gsap, ScrollTrigger, prefereMovimentoReduzido } from '../../lib/gsap';
import { revelarCabecalho } from '../../lib/animacoes';
import { PROJETOS_BENTO, type ProjetoBento } from '../../data/projetos';
import { SectionHeader } from '../ui/SectionHeader/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { GitHubVault } from './GitHubVault';
import type { OrigemProjeto } from '../../data/projetos';
import styles from './ProjectsBento.module.css';

type FiltroOrigem = 'TODOS' | OrigemProjeto;

export function ProjectsBento() {
  const raizRef = useRef<HTMLElement>(null);
  const [projetoInspecionado, setProjetoInspecionado] = useState<ProjetoBento | null>(null);
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroOrigem>('TODOS');

  // Cálculos de navegação contínua no modal
  const indiceInspecionado = projetoInspecionado
    ? PROJETOS_BENTO.findIndex((p) => p.slug === projetoInspecionado.slug)
    : -1;
  const temAnterior = indiceInspecionado > 0;
  const temProximo = indiceInspecionado >= 0 && indiceInspecionado < PROJETOS_BENTO.length - 1;

  const navegarProjeto = (direcao: 'anterior' | 'proximo') => {
    if (direcao === 'anterior' && temAnterior) {
      setProjetoInspecionado(PROJETOS_BENTO[indiceInspecionado - 1]);
    } else if (direcao === 'proximo' && temProximo) {
      setProjetoInspecionado(PROJETOS_BENTO[indiceInspecionado + 1]);
    }
  };

  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz || prefereMovimentoReduzido()) return;

    const ctx = gsap.context(() => {
      revelarCabecalho(raiz);

      // As células recebem o transform do GSAP isolado do hover dos cards
      gsap.set('[data-celula]', { autoAlpha: 0, y: 70 });
      gsap.set('[data-midia]', { clipPath: 'inset(100% 0% 0% 0%)' });

      ScrollTrigger.batch('[data-celula]', {
        start: 'top 88%',
        once: true,
        onEnter: (lote) => {
          gsap.to(lote, {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            ease: 'expo.out',
            stagger: 0.12,
            overwrite: true,
          });

          const midias = lote
            .map((celula) => celula.querySelector('[data-midia]'))
            .filter((el): el is Element => el !== null);

          gsap.to(midias, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: 'expo.inOut',
            stagger: 0.12,
            delay: 0.1,
          });
        },
      });
    }, raiz);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={raizRef} id="projetos" className={styles.secao} aria-labelledby="projetos-titulo">
      <div className={styles.interno}>
        <SectionHeader
          id="projetos-titulo"
          indice="01"
          rotulo="Realizações de Carreira"
          titulo="Projetos & Infraestrutura"
          complemento={
            <>
              {String(PROJETOS_BENTO.length).padStart(2, '0')} realizações técnicas
              <br />
              Suporte · Infra · Software
            </>
          }
        />

        <div className={styles.gradeFiltro}>
          <div className={styles.resumoOrigens} role="toolbar" aria-label="Filtrar realizações por disciplina">
            <button
              type="button"
              className={`${styles.botaoFiltro} ${filtroAtivo === 'TODOS' ? styles.botaoFiltroAtivo : ''}`}
              onClick={() => setFiltroAtivo('TODOS')}
            >
              TODOS ({PROJETOS_BENTO.length})
            </button>
            <button
              type="button"
              className={`${styles.botaoFiltro} ${filtroAtivo === 'SUPORTE & SERVICE DESK' ? styles.botaoFiltroAtivo : ''}`}
              onClick={() => setFiltroAtivo('SUPORTE & SERVICE DESK')}
            >
              <span className={styles.dotOrigem} style={{ background: 'var(--status-alerta)' }} aria-hidden="true" />
              SUPORTE CORPORATIVO N1
            </button>
            <button
              type="button"
              className={`${styles.botaoFiltro} ${filtroAtivo === 'INFRAESTRUTURA & TI' ? styles.botaoFiltroAtivo : ''}`}
              onClick={() => setFiltroAtivo('INFRAESTRUTURA & TI')}
            >
              <span className={styles.dotOrigem} style={{ background: 'var(--status-info)' }} aria-hidden="true" />
              INFRAESTRUTURA &amp; TI
            </button>
            <button
              type="button"
              className={`${styles.botaoFiltro} ${filtroAtivo === 'SOFTWARE & FULL-STACK' ? styles.botaoFiltroAtivo : ''}`}
              onClick={() => setFiltroAtivo('SOFTWARE & FULL-STACK')}
            >
              <span className={styles.dotOrigem} style={{ background: 'var(--status-online)' }} aria-hidden="true" />
              SOFTWARE &amp; WEB DEV
            </button>
          </div>
          <span className={styles.dicaInteracao}>
            [CLIQUE NO CARD PARA INSPECIONAR ARQUITETURA]
          </span>
        </div>

        <div className={styles.grid}>
          {PROJETOS_BENTO.map((projeto, i) => {
            const correspondeFiltro = filtroAtivo === 'TODOS' || projeto.origem === filtroAtivo;
            return (
              <div
                key={projeto.slug}
                className={`${styles.celula} ${!correspondeFiltro ? styles.celulaDiminuta : ''}`}
                data-area={projeto.area}
                data-celula
              >
                <ProjectCard
                  projeto={projeto}
                  indice={i}
                  aoInspecionar={(proj) => setProjetoInspecionado(proj)}
                />
              </div>
            );
          })}
        </div>

        <GitHubVault />
      </div>

      <AnimatePresence>
        {projetoInspecionado && (
          <ProjectModal
            projeto={projetoInspecionado}
            aoFechar={() => setProjetoInspecionado(null)}
            aoNavegar={navegarProjeto}
            temAnterior={temAnterior}
            temProximo={temProximo}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
