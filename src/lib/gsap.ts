import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Ponto único de registro dos plugins GSAP.
 * Importe `gsap` e `ScrollTrigger` sempre daqui para garantir o registro.
 */
gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'expo.out', duration: 1 });

export const prefereMovimentoReduzido = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const temPonteiroFino = (): boolean => window.matchMedia('(pointer: fine)').matches;

export { gsap, ScrollTrigger };
