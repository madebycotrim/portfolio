import { useRef, useState, type PointerEvent } from 'react';
import { motion } from 'motion/react';
import type { ProjetoBento } from '../../data/projetos';
import { IconArrow } from '../ui/IconArrow';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  projeto: ProjetoBento;
  indice: number;
  aoInspecionar: (projeto: ProjetoBento) => void;
}

export function ProjectCard({ projeto, indice, aoInspecionar }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [estaComHover, setEstaComHover] = useState(false);
  const medida = useRef<{ rect: DOMRect | null; scrollY: number }>({ rect: null, scrollY: 0 });

  const medir = (): void => {
    if (!ref.current) return;
    medida.current = { rect: ref.current.getBoundingClientRect(), scrollY: window.scrollY };
    setEstaComHover(true);
  };

  const aoMover = (e: PointerEvent<HTMLElement>): void => {
    const el = ref.current;
    if (!medida.current.rect || medida.current.scrollY !== window.scrollY) {
      if (el) medida.current = { rect: el.getBoundingClientRect(), scrollY: window.scrollY };
    }
    const rect = medida.current.rect;
    if (!el || !rect) return;
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const aoSair = (): void => {
    setEstaComHover(false);
    medida.current.rect = null;
  };

  const { slug, titulo, subtitulo, categoria, origem, ano, metrica, imagem, logs } = projeto;
  const idTitulo = `projeto-${slug}`;

  return (
    <article
      ref={ref}
      id={`card-${slug}`}
      className={`${styles.card} ${imagem ? styles.comImagem : ''}`}
      aria-labelledby={idTitulo}
      tabIndex={0}
      onPointerEnter={medir}
      onPointerMove={aoMover}
      onPointerLeave={aoSair}
      onClick={() => aoInspecionar(projeto)}
    >
      {imagem && (
        <div className={styles.midia} data-midia>
          <img className={styles.imagem} src={imagem} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      <div className={styles.holofote} aria-hidden="true" />

      <div className={styles.topo}>
        <div className={styles.topoEsq}>
          <span className={styles.indice}>{String(indice + 1).padStart(2, '0')}</span>
          <span className={styles.categoria}>{categoria}</span>
          <span className={styles.tagOrigem}>{origem}</span>
        </div>
        <span className={styles.ano}>{ano}</span>
      </div>

      {!imagem && (
        <div className={styles.metrica} aria-hidden="true">
          <span className={styles.metricaValor}>{metrica.valor}</span>
          <span className={styles.metricaRotulo}>{metrica.rotulo}</span>
        </div>
      )}

      <div className={styles.corpo}>
        <div className={styles.cabecalhoTitulo}>
          <div className={styles.titulos}>
            <h3 id={idTitulo} className={styles.titulo}>
              {titulo}
            </h3>
            <p className={styles.subtitulo}>{subtitulo}</p>
          </div>
          <div className={styles.grupoAcoesCard}>
            {projeto.deployUrl && (
              <a
                href={projeto.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkAcaoCard}
                aria-label={`Acessar sistema online de ${titulo}`}
                onClick={(e) => e.stopPropagation()}
                title="Acessar sistema online"
              >
                LIVE ↗
              </a>
            )}
            {projeto.repositorioUrl && (
              <a
                href={projeto.repositorioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkAcaoCard}
                aria-label={`Ver código no GitHub de ${titulo}`}
                onClick={(e) => e.stopPropagation()}
                title="Ver repositório no GitHub"
              >
                GH ↗
              </a>
            )}
            <button
              type="button"
              className={styles.botaoInspecionar}
              aria-label={`Inspecionar detalhes de ${titulo}`}
              onClick={(e) => {
                e.stopPropagation();
                aoInspecionar(projeto);
              }}
            >
              <span className={styles.rotuloBotao}>INSPECT</span>
              <IconArrow />
            </button>
          </div>
        </div>

        {/* Linhas de logs técnicos em monoespaçado nas bordas inferiores (Details Vault / Microkit) */}
        <div className={styles.painelLogs} aria-hidden="true">
          <div className={styles.barraStatusLogs}>
            <span className={styles.pontoPulso} />
            <span className={styles.rotuloLogsHeader}>LIVE TELEMETRY LOGS</span>
            <span className={styles.tagLogsEstado}>
              {estaComHover ? 'STREAM ACTIVE' : 'STANDBY'}
            </span>
          </div>

          <motion.div
            className={styles.listaLogs}
            animate={{
              opacity: estaComHover ? 1 : 0.45,
              y: estaComHover ? 0 : 3,
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {logs.slice(0, 2).map((log, i) => (
              <div key={i} className={styles.linhaLogCard}>
                <span className={styles.tempoLog}>{log.timestamp.slice(3)}</span>
                <span className={`${styles.tagNivel} ${styles[`tagNivel_${log.nivel}`]}`}>
                  [{log.nivel}]
                </span>
                <span className={styles.msgLogCard}>{log.mensagem}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </article>
  );
}
