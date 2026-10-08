import { useLayoutEffect, useRef } from 'react';
import { gsap, prefereMovimentoReduzido } from '../../lib/gsap';
import { MaskedText } from '../ui/MaskedText/MaskedText';
import { MagneticButton } from '../ui/MagneticButton/MagneticButton';
import { HoverLink } from '../ui/HoverLink/HoverLink';
import { IconArrow } from '../ui/IconArrow';
import styles from './Contact.module.css';

const EMAIL = 'mateusrfcotrim@gmail.com';
const TELEFONE = '(61) 99907-6252';
const TITULO = ['Vamos construir', 'algo sólido.'] as const;

const REDES = [
  { rotulo: 'GitHub (@madebycotrim)', href: 'https://github.com/madebycotrim?tab=repositories' },
  { rotulo: 'GitHub (@mateuscotrim)', href: 'https://github.com/mateuscotrim?tab=repositories' },
  { rotulo: 'LinkedIn', href: 'https://www.linkedin.com/in/mateus-cotrim' },
] as const;

interface ContactProps {
  aoAbrirDossie?: () => void;
}

export function Contact({ aoAbrirDossie }: ContactProps) {
  const raizRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz || prefereMovimentoReduzido()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: raiz, start: 'top 70%', once: true },
      });

      tl.from('[data-letra]', {
        yPercent: 118,
        rotate: 6,
        transformOrigin: '0% 100%',
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.022,
      }).from(
        '[data-contato-fade]',
        { y: 24, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08 },
        '-=0.9',
      );
    }, raiz);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={raizRef} id="contato" className={styles.contato} aria-labelledby="contato-titulo">
      <div className={styles.interno}>
        <span className={styles.rotulo} data-contato-fade>
          (04) Contato
        </span>

        <h2 id="contato-titulo" className={styles.titulo}>
          <span className="sr-only">{TITULO.join(' ')}</span>
          {TITULO.map((linha) => (
            <span key={linha} className={styles.linha} aria-hidden="true">
              <MaskedText texto={linha} />
            </span>
          ))}
        </h2>

        <div className={styles.acoes} data-contato-fade>
          <MagneticButton href={`mailto:${EMAIL}`} variante="solido" id="contato-email">
            {EMAIL} <IconArrow />
          </MagneticButton>
          <MagneticButton href="https://wa.me/5561999076252" variante="contorno" id="contato-whatsapp">
            {TELEFONE}
          </MagneticButton>
          {aoAbrirDossie && (
            <button
              type="button"
              onClick={aoAbrirDossie}
              className={styles.botaoDossieContato}
              id="contato-dossie"
            >
              Visualizar Dossiê Técnico [CV]
            </button>
          )}
          <p className={styles.nota}>
            Brasília — DF. Aberto a oportunidades em Tecnologia da Informação: Suporte Técnico N1/N2, Infraestrutura de Redes, Administração de Sistemas (Active Directory) e Engenharia de Software.
          </p>
        </div>

        <div className={styles.rodape} data-contato-fade>
          <span>© {new Date().getFullYear()} Mateus Recalde da Fonseca Cotrim</span>
          <ul className={styles.redes}>
            {REDES.map((rede) => (
              <li key={rede.rotulo}>
                <HoverLink
                  href={rede.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`rede-${rede.rotulo.toLowerCase().replace(/\W/g, '')}`}
                >
                  {rede.rotulo}
                </HoverLink>
              </li>
            ))}
          </ul>
          <HoverLink href="#topo" id="voltar-topo">
            Voltar ao topo ↑
          </HoverLink>
        </div>
      </div>
    </footer>
  );
}
