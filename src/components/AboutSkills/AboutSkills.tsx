import { useLayoutEffect, useRef } from 'react';
import { gsap, prefereMovimentoReduzido } from '../../lib/gsap';
import { revelarCabecalho } from '../../lib/animacoes';
import { FAIXA_TECNOLOGIAS, GRUPOS_HABILIDADES, MANIFESTO, NUMEROS } from '../../data/sobre';
import { SectionHeader } from '../ui/SectionHeader/SectionHeader';
import styles from './AboutSkills.module.css';

const formatarNumero = (valor: number): string => String(Math.round(valor)).padStart(2, '0');

export function AboutSkills() {
  const raizRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz || prefereMovimentoReduzido()) return;

    const ctx = gsap.context(() => {
      revelarCabecalho(raiz);

      // 1. Manifesto: as palavras "acendem" acompanhando a rolagem (scrub).
      gsap.fromTo(
        '[data-palavra]',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '[data-manifesto]',
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 0.6,
          },
        },
      );

      // 2. Números: linha se desenha e o valor conta até o alvo.
      gsap.utils.toArray<HTMLElement>('[data-numero]').forEach((linha) => {
        const alvo = linha.querySelector<HTMLElement>('[data-valor]');
        const valorFinal = Number(alvo?.dataset.valor ?? 0);
        const contador = { v: 0 };
        const tl = gsap.timeline({
          scrollTrigger: { trigger: linha, start: 'top 88%', once: true },
        });

        tl.from(linha.querySelector('[data-linha]'), {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'expo.inOut',
        }).to(
          contador,
          {
            v: valorFinal,
            duration: 1.6,
            ease: 'expo.out',
            onUpdate: () => {
              if (alvo) alvo.textContent = formatarNumero(contador.v);
            },
          },
          0.2,
        );
      });

      // 3. Tags: entram desfocadas e ganham foco conforme o grupo sobe na viewport.
      gsap.utils.toArray<HTMLElement>('[data-grupo]').forEach((grupo) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: grupo, start: 'top 92%', end: 'top 55%', scrub: 0.8 },
        });

        tl.from(grupo.querySelector('[data-linha]'), {
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'none',
        }).from(
          grupo.querySelectorAll('[data-tag]'),
          {
            y: 36,
            opacity: 0.1,
            scale: 0.9,
            filter: 'blur(4px)',
            ease: 'power2.out',
            stagger: 0.06,
          },
          0,
        );
      });

      // 4. Faixas tipográficas: deslocamento horizontal oposto, atrelado ao scroll.
      const configFaixa = {
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-faixas]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      };
      gsap.fromTo('[data-faixa="esquerda"]', { xPercent: 0 }, { xPercent: -30, ...configFaixa });
      gsap.fromTo('[data-faixa="direita"]', { xPercent: -30 }, { xPercent: 0, ...configFaixa });
    }, raiz);

    return () => ctx.revert();
  }, []);

  const faixa = [...FAIXA_TECNOLOGIAS, ...FAIXA_TECNOLOGIAS];

  return (
    <section ref={raizRef} id="sobre" className={styles.secao} aria-labelledby="sobre-titulo">
      <div className={styles.interno}>
        <SectionHeader
          id="sobre-titulo"
          indice="03"
          rotulo="Visão &amp; Competências"
          titulo="Perfil Multidisciplinar"
          complemento={
            <>
              Suporte N1 · Infraestrutura &amp; Redes
              <br />
              Active Directory · Engenharia de Software
            </>
          }
        />

        <p className={styles.manifesto} data-manifesto>
          {MANIFESTO.split(' ').map((palavra, i) => (
            <span key={i} data-palavra>
              {palavra}{' '}
            </span>
          ))}
        </p>

        <div className={styles.corpo}>
          <dl className={styles.numeros}>
            {NUMEROS.map((item) => (
              <div key={item.rotulo} className={styles.numero} data-numero>
                <span className={styles.numeroLinha} data-linha aria-hidden="true" />
                <dt className={styles.numeroRotulo}>{item.rotulo}</dt>
                <dd className={styles.numeroValor} data-valor={item.valor}>
                  {item.valor}
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.grupos}>
            {GRUPOS_HABILIDADES.map((grupo, i) => (
              <div key={grupo.slug} className={styles.grupo} data-grupo>
                <span className={styles.grupoLinha} data-linha aria-hidden="true" />
                <h3 className={styles.grupoTitulo}>
                  <span className={styles.grupoIndice}>{String.fromCharCode(65 + i)}</span>
                  {grupo.titulo}
                  <span className={styles.grupoContagem}>
                    {String(grupo.itens.length).padStart(2, '0')}
                  </span>
                </h3>
                <ul className={styles.tags}>
                  {grupo.itens.map((item) => (
                    <li key={item} className={styles.tag} data-tag>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.faixas} data-faixas aria-hidden="true">
        {(['esquerda', 'direita'] as const).map((direcao) => (
          <div key={direcao} className={styles.faixa} data-faixa={direcao}>
            {faixa.map((termo, i) => (
              <span
                key={`${termo}-${i}`}
                className={`${styles.termo} ${(i + (direcao === 'direita' ? 1 : 0)) % 2 ? styles.termoVazado : ''}`}
              >
                {termo}
                <span className={styles.separador} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
