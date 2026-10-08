interface IconArrowProps {
  /** Direção da seta em graus (0 = nordeste ↗). */
  rotacao?: number;
  className?: string;
}

/** Seta diagonal de traço fino (1.25px), coerente com as bordas de 1px. */
export function IconArrow({ rotacao = 0, className }: IconArrowProps) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{ transform: rotacao ? `rotate(${rotacao}deg)` : undefined }}
    >
      <path d="M2 10 10 2M3.5 2H10v6.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
