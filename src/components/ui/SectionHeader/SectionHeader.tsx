import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  indice: string;
  rotulo: string;
  titulo: string;
  id: string;
  complemento?: ReactNode;
}

/** Cabeçalho padrão de seção: índice técnico, rótulo mono, título e nota lateral. */
export function SectionHeader({ indice, rotulo, titulo, id, complemento }: SectionHeaderProps) {
  return (
    <header className={styles.cabecalho} data-reveal-cabecalho>
      <div className={styles.meta}>
        <span className={styles.indice}>({indice})</span>
        <span className={styles.rotulo}>{rotulo}</span>
      </div>
      <h2 id={id} className={styles.titulo}>
        {titulo}
      </h2>
      {complemento && <div className={styles.complemento}>{complemento}</div>}
    </header>
  );
}
