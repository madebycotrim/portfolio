import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import type { ProjetoBento } from '../../data/projetos';
import styles from './ProjectModal.module.css';

interface ProjectModalProps {
  projeto: ProjetoBento | null;
  aoFechar: () => void;
  aoNavegar?: (direcao: 'anterior' | 'proximo') => void;
  temAnterior?: boolean;
  temProximo?: boolean;
}

export function ProjectModal({
  projeto,
  aoFechar,
  aoNavegar,
  temAnterior = false,
  temProximo = false,
}: ProjectModalProps) {
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const aoPressionarTecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        aoFechar();
      } else if (e.key === 'ArrowLeft' && temAnterior && aoNavegar) {
        aoNavegar('anterior');
      } else if (e.key === 'ArrowRight' && temProximo && aoNavegar) {
        aoNavegar('proximo');
      }
    };
    window.addEventListener('keydown', aoPressionarTecla);
    return () => window.removeEventListener('keydown', aoPressionarTecla);
  }, [aoFechar, aoNavegar, temAnterior, temProximo]);

  if (!projeto) return null;

  const copiarEspecificacao = async () => {
    const texto = `[PROJETO]: ${projeto.titulo} (${projeto.ano})
[ORIGEM]: ${projeto.origem} | [CATEGORIA]: ${projeto.categoria}
[SUBTÍTULO]: ${projeto.subtitulo}
[STACK]: ${projeto.stack.join(', ')}
[PROBLEMA]: ${projeto.detalhesArquitetura.problema}
[SOLUÇÃO]: ${projeto.detalhesArquitetura.solucao}
[INFRAESTRUTURA]: ${projeto.detalhesArquitetura.infraestrutura}
[IMPACTO SLA]: ${projeto.detalhesArquitetura.impactoSuporte}
[MÉTRICA]: ${projeto.metrica.valor} — ${projeto.metrica.rotulo}`;

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      // Fallback gracioso caso clipboard API esteja indisponível
    }
  };

  return (
    <div className={styles.overlay} onClick={aoFechar} role="dialog" aria-modal="true">
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.barraTopo}>
          <div className={styles.metaJanela}>
            <span className={styles.pontoVerde} aria-hidden="true" />
            <span className={styles.idProjeto}>INSPECT://{projeto.slug.toUpperCase()}</span>
            <span className={styles.tagOrigem}>{projeto.origem}</span>
          </div>

          <div className={styles.grupoAcoesTopo}>
            {aoNavegar && (
              <>
                <button
                  type="button"
                  className={styles.botaoNav}
                  onClick={() => aoNavegar('anterior')}
                  disabled={!temAnterior}
                  aria-label="Projeto anterior (tecla seta esquerda)"
                  title="Projeto anterior [←]"
                >
                  ← ANT
                </button>
                <button
                  type="button"
                  className={styles.botaoNav}
                  onClick={() => aoNavegar('proximo')}
                  disabled={!temProximo}
                  aria-label="Próximo projeto (tecla seta direita)"
                  title="Próximo projeto [→]"
                >
                  PRÓX →
                </button>
              </>
            )}
            <button
              type="button"
              className={styles.botaoFechar}
              onClick={aoFechar}
              aria-label="Fechar modal de detalhes do projeto"
            >
              ESC [×]
            </button>
          </div>
        </div>

        <div className={styles.conteudo}>
          <div className={styles.cabecalhoProjeto}>
            <span className={styles.categoria}>{projeto.categoria} · {projeto.ano}</span>
            <h2 className={styles.titulo}>{projeto.titulo}</h2>
            <p className={styles.subtitulo}>{projeto.subtitulo}</p>
          </div>

          <div className={styles.gradeArquitetura}>
            <div className={styles.blocoArquit}>
              <span className={styles.rotuloArquit}>[01] O PROBLEMA OPERACIONAL</span>
              <p className={styles.textoArquit}>{projeto.detalhesArquitetura.problema}</p>
            </div>

            <div className={styles.blocoArquit}>
              <span className={styles.rotuloArquit}>[02] A SOLUÇÃO DE ENGENHARIA</span>
              <p className={styles.textoArquit}>{projeto.detalhesArquitetura.solucao}</p>
            </div>

            <div className={styles.blocoArquit}>
              <span className={styles.rotuloArquit}>[03] INFRAESTRUTURA &amp; AMBIENTE</span>
              <p className={styles.textoArquit}>{projeto.detalhesArquitetura.infraestrutura}</p>
            </div>

            <div className={styles.blocoArquit}>
              <span className={styles.rotuloArquit}>[04] IMPACTO NO SUPORTE / SLA</span>
              <p className={styles.textoArquit}>{projeto.detalhesArquitetura.impactoSuporte}</p>
            </div>
          </div>

          <div className={styles.secaoStack}>
            <span className={styles.rotuloStack}>TECNOLOGIAS &amp; PROTOCOLOS:</span>
            <div className={styles.listaStack}>
              {projeto.stack.map((item) => (
                <span key={item} className={styles.itemStack}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.secaoLogs}>
            <div className={styles.topoLogs}>
              <span className={styles.rotuloLogs}>LOG AUDIT TRAIL [EM TEMPO REAL]:</span>
              <span className={styles.statusLogs}>BUFFER ACTIVE</span>
            </div>
            <div className={styles.caixaLogs}>
              {projeto.logs.map((log, i) => (
                <div key={i} className={styles.linhaLogModal}>
                  <span className={styles.timestampLog}>{log.timestamp}</span>
                  <span className={`${styles.nivelLog} ${styles[`nivel_${log.nivel}`]}`}>
                    [{log.nivel}]
                  </span>
                  <span className={styles.msgLog}>{log.mensagem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rodape}>
          <span className={styles.dadoMetrica}>
            MÉTRICA CHAVE: <strong>{projeto.metrica.valor}</strong> — {projeto.metrica.rotulo}
          </span>

          <div className={styles.acoesRodape}>
            {projeto.deployUrl && (
              <a
                href={projeto.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.botaoProducao}
                id={`modal-deploy-${projeto.slug}`}
              >
                ACESSAR EM PRODUÇÃO ↗
              </a>
            )}
            {projeto.repositorioUrl && (
              <a
                href={projeto.repositorioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.botaoGithub}
                id={`modal-github-${projeto.slug}`}
              >
                VER NO GITHUB ↗
              </a>
            )}
            <button
              type="button"
              className={`${styles.botaoCopiar} ${copiado ? styles.botaoCopiadoSucesso : ''}`}
              onClick={copiarEspecificacao}
            >
              {copiado ? '✓ COPIADO PARA O CLIPBOARD' : 'COPIAR ESPECIFICAÇÃO'}
            </button>
            <button type="button" className={styles.botaoConcluido} onClick={aoFechar}>
              CONCLUIR INSPEÇÃO
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
