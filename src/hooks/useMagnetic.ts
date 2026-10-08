import { useEffect, useRef } from 'react';
import { gsap, prefereMovimentoReduzido, temPonteiroFino } from '../lib/gsap';

interface OpcoesMagnetico {
  /** Fração do deslocamento do cursor aplicada ao elemento (0–1). */
  forca?: number;
  /** Fração extra aplicada ao conteúdo interno (efeito de parallax). */
  forcaInterna?: number;
}

/**
 * "Design Spell" magnético: o elemento segue sutilmente o cursor
 * e retorna com uma mola elástica ao sair.
 *
 * Usa `gsap.quickTo` (setter reaproveitado, sem criar tweens por evento)
 * e apenas `transform` — nenhuma propriedade que cause layout.
 */
export function useMagnetic<T extends HTMLElement, I extends HTMLElement = HTMLElement>({
  forca = 0.35,
  forcaInterna = 0.2,
}: OpcoesMagnetico = {}) {
  const ref = useRef<T>(null);
  const refInterno = useRef<I>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !temPonteiroFino() || prefereMovimentoReduzido()) return;

    const interno = refInterno.current;
    const config = { duration: 0.6, ease: 'power3.out' };
    const xTo = gsap.quickTo(el, 'x', config);
    const yTo = gsap.quickTo(el, 'y', config);
    const xInternoTo = interno ? gsap.quickTo(interno, 'x', config) : null;
    const yInternoTo = interno ? gsap.quickTo(interno, 'y', config) : null;

    let rect: DOMRect | null = null;

    const aoEntrar = (): void => {
      // Lê a geometria uma única vez por hover — evita layout thrashing no move.
      rect = el.getBoundingClientRect();
    };

    const aoMover = (e: PointerEvent): void => {
      if (!rect) rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * forca);
      yTo(dy * forca);
      xInternoTo?.(dx * forcaInterna);
      yInternoTo?.(dy * forcaInterna);
    };

    const aoSair = (): void => {
      rect = null;
      const alvos = interno ? [el, interno] : [el];
      gsap.to(alvos, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.35)' });
    };

    el.addEventListener('pointerenter', aoEntrar);
    el.addEventListener('pointermove', aoMover);
    el.addEventListener('pointerleave', aoSair);

    return () => {
      el.removeEventListener('pointerenter', aoEntrar);
      el.removeEventListener('pointermove', aoMover);
      el.removeEventListener('pointerleave', aoSair);
      gsap.killTweensOf(interno ? [el, interno] : el);
    };
  }, [forca, forcaInterna]);

  return { ref, refInterno };
}
