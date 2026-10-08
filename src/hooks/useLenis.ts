import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefereMovimentoReduzido } from '../lib/gsap';

/**
 * Smooth scroll com Lenis, sincronizado ao ticker do GSAP.
 *
 * - Um único loop de animação (gsap.ticker) dirige Lenis e ScrollTrigger,
 *   evitando dois requestAnimationFrame concorrendo pelo mesmo frame.
 * - `lagSmoothing(0)` impede que o GSAP "pule" tempo após travamentos,
 *   o que dessincronizaria a posição do scroll e dos triggers.
 * - Âncoras (#secao) são interceptadas pelo próprio Lenis.
 */
export function useLenis(): void {
  useEffect(() => {
    if (prefereMovimentoReduzido()) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { offset: -64 },
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (tempo: number): void => {
      lenis.raf(tempo * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
