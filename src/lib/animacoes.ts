import { gsap } from './gsap';

/**
 * Revelação padrão dos cabeçalhos de seção (usada pelas 3 seções).
 * Deve ser chamada dentro de um `gsap.context` escopado à seção.
 */
export function revelarCabecalho(escopo: Element): void {
  const cabecalho = escopo.querySelector('[data-reveal-cabecalho]');
  if (!cabecalho) return;

  gsap.from(cabecalho.children, {
    yPercent: 40,
    autoAlpha: 0,
    duration: 1.4,
    ease: 'expo.out',
    stagger: 0.08,
    scrollTrigger: { trigger: cabecalho, start: 'top 85%', once: true },
  });
}
