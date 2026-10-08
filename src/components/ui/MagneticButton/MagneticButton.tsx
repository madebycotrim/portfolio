import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '../../../hooks/useMagnetic';
import styles from './MagneticButton.module.css';

type Variante = 'solido' | 'contorno';

interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variante?: Variante;
}

/**
 * Botão-link magnético: a casca segue o cursor e o rótulo segue um pouco
 * mais (parallax interno). O preenchimento surge em círculo a partir da base.
 */
export function MagneticButton({
  children,
  variante = 'contorno',
  className,
  ...resto
}: MagneticButtonProps) {
  const { ref, refInterno } = useMagnetic<HTMLAnchorElement, HTMLSpanElement>({
    forca: 0.3,
    forcaInterna: 0.15,
  });

  const classes = [styles.botao, styles[variante], className].filter(Boolean).join(' ');

  return (
    <a ref={ref} className={classes} {...resto}>
      <span className={styles.preenchimento} aria-hidden="true" />
      <span ref={refInterno} className={styles.rotulo}>
        {children}
      </span>
    </a>
  );
}
