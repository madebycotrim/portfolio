import styles from './MaskedText.module.css';

interface MaskedTextProps {
  texto: string;
}

/**
 * Fatia o texto em palavras (máscaras com overflow oculto) e letras
 * (alvos de animação marcados com `data-letra`).
 * Renderiza como decorativo: o texto acessível deve vir do elemento pai
 * (ex.: `aria-label` no heading).
 */
export function MaskedText({ texto }: MaskedTextProps) {
  const palavras = texto.split(' ');

  return (
    <>
      {palavras.map((palavra, iPalavra) => (
        <span key={iPalavra} className={styles.palavraWrap}>
          <span className={styles.mascara}>
            {Array.from(palavra).map((letra, iLetra) => (
              <span key={iLetra} className={styles.letra} data-letra>
                {letra}
              </span>
            ))}
          </span>
          {iPalavra < palavras.length - 1 && ' '}
        </span>
      ))}
    </>
  );
}
