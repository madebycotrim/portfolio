import type { AnchorHTMLAttributes, CSSProperties } from 'react';
import styles from './HoverLink.module.css';

interface HoverLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
}

/**
 * Link com "roll" de letras: cada caractere sobe revelando sua cópia
 * (via text-shadow — um único nó por letra) com atraso escalonado,
 * criando uma onda. A sublinha cresce da esquerda e recolhe pela direita.
 */
export function HoverLink({ children, className, ...resto }: HoverLinkProps) {
  const letras = Array.from(children);
  const classes = [styles.link, className].filter(Boolean).join(' ');

  return (
    <a className={classes} {...resto}>
      <span className="sr-only">{children}</span>
      <span className={styles.rolo} aria-hidden="true">
        {letras.map((letra, i) => (
          <span key={i} className={styles.letra} style={{ '--i': i } as CSSProperties}>
            {letra === ' ' ? '\u00A0' : letra}
          </span>
        ))}
      </span>
    </a>
  );
}
