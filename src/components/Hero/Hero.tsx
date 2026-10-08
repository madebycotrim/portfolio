import { useLayoutEffect, useRef } from 'react';
import { gsap, prefereMovimentoReduzido } from '../../lib/gsap';
import { MaskedText } from '../ui/MaskedText/MaskedText';
import { MagneticButton } from '../ui/MagneticButton/MagneticButton';
import { IconArrow } from '../ui/IconArrow';
import { TerminalStatus } from './TerminalStatus';
import styles from './Hero.module.css';

const LINHAS_TITULO = ['Tecnologia,', 'infraestrutura &', 'software.'] as const;

const META = [
  { rotulo: 'Índice', valor: '001 / Carreira em TI' },
  { rotulo: 'Perfil', valor: 'Infraestrutura · Suporte N1 · Dev Software' },
  { rotulo: 'Base', valor: 'Brasília — 15°47′S' },
  { rotulo: 'Trajetória', valor: 'SESI · PGR · UNIEURO · ETB' },
] as const;

export function Hero() {
  const raizRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz || prefereMovimentoReduzido()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.from('[data-linha-meta]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'expo.inOut',
        stagger: 0.08,
      })
        .from(
          '[data-meta-item]',
          { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.05 },
          0.45,
        )
        // Revelação por máscara: cada letra emerge da base com leve rotação
        .from(
          '[data-letra]',
          {
            yPercent: 118,
            rotate: 6,
            transformOrigin: '0% 100%',
            duration: 1.4,
            ease: 'expo.out',
            stagger: 0.026,
          },
          0.3,
        )
        .from(
          '[data-hero-fade]',
          { y: 24, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1 },
          '-=0.9',
        );

      // Parallax sutil ao rolar a página
      gsap.to('[data-titulo]', {
        yPercent: -12,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: raiz, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, raiz);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={raizRef} id="topo" className={styles.hero} aria-labelledby="hero-titulo">
      <div className={styles.interno}>
        <dl className={styles.meta}>
          {META.map((item) => (
            <div key={item.rotulo} className={styles.metaCelula}>
              <span className={styles.metaLinha} data-linha-meta aria-hidden="true" />
              <div className={styles.metaMascara}>
                <div data-meta-item>
                  <dt className={styles.metaRotulo}>{item.rotulo}</dt>
                  <dd className={styles.metaValor}>{item.valor}</dd>
                </div>
              </div>
            </div>
          ))}
        </dl>

        <h1 id="hero-titulo" className={styles.titulo} data-titulo>
          <span className="sr-only">{LINHAS_TITULO.join(' ')}</span>
          {LINHAS_TITULO.map((linha, i) => (
            <span
              key={linha}
              className={`${styles.linha} ${i === 1 ? styles.linhaRecuada : ''}`}
              aria-hidden="true"
            >
              <MaskedText texto={linha} />
              {i === 2 && (
                <span className={styles.anotacao} data-hero-fade>
                  [Fig. 01]
                  <br />
                  Portfólio de Carreira
                  <br />
                  TI · Infra · Software
                </span>
              )}
            </span>
          ))}
        </h1>

        <div className={styles.secaoTerminal} data-hero-fade>
          <TerminalStatus />
        </div>

        <div className={styles.rodape}>
          <div className={styles.introBloco} data-hero-fade>
            <p className={styles.intro}>
              Mateus Cotrim — trajetória profissional abrangente em Tecnologia da Informação: da infraestrutura
              física e redes ao suporte corporativo de missão crítica (PGR/MPF, +400 usuários) e à engenharia
              de software web (SESI Saúde, UNIEURO). Especialista em unir estabilidade operacional,
              administração de sistemas (Active Directory) e desenvolvimento de soluções em React.js, TypeScript e Node.js.
            </p>
            <div className={styles.tagsOrigem}>
              <span className={styles.tagOrigem}>HARDWARE &amp; REDES (ETB)</span>
              <span className={styles.tagDivisor}>→</span>
              <span className={styles.tagOrigem}>SUPORTE N1 &amp; SERVICE DESK (PGR)</span>
              <span className={styles.tagDivisor}>→</span>
              <span className={styles.tagOrigem}>ACTIVE DIRECTORY &amp; TI (SESI)</span>
              <span className={styles.tagDivisor}>→</span>
              <span className={styles.tagOrigem}>SOFTWARE &amp; REACT.JS</span>
            </div>
          </div>

          <div className={styles.acoes} data-hero-fade>
            <MagneticButton href="#projetos" variante="solido" id="hero-cta-projetos">
              Projetos &amp; Infraestrutura <IconArrow rotacao={90} />
            </MagneticButton>
            <MagneticButton href="#trajetoria" variante="contorno" id="hero-cta-trajetoria">
              Trajetória de Carreira
            </MagneticButton>
          </div>

          <div className={styles.rolar} data-hero-fade aria-hidden="true">
            <span>Role</span>
            <span className={styles.rolarTrilho}>
              <span className={styles.rolarIndicador} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
