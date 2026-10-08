import { HoverLink } from '../ui/HoverLink/HoverLink';
import { MagneticButton } from '../ui/MagneticButton/MagneticButton';
import styles from './Header.module.css';

const NAVEGACAO = [
  { rotulo: 'Projetos & Infra', href: '#projetos' },
  { rotulo: 'Trajetória de Carreira', href: '#trajetoria' },
  { rotulo: 'Competências', href: '#sobre' },
  { rotulo: 'Contato', href: '#contato' },
] as const;

interface HeaderProps {
  aoAbrirDossie?: () => void;
}

export function Header({ aoAbrirDossie }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.interno}>
        <a href="#topo" className={styles.marca} aria-label="Mateus Cotrim — voltar ao topo">
          <span className={styles.monograma} aria-hidden="true">
            MC
          </span>
          <span className={styles.nome}>Mateus Cotrim</span>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.lista}>
            {NAVEGACAO.map((item, i) => (
              <li key={item.href} className={styles.item}>
                <span className={styles.indiceNav}>0{i + 1}</span>
                <HoverLink href={item.href} id={`nav-${item.href.slice(1)}`}>
                  {item.rotulo}
                </HoverLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.acoes}>
          <span className={styles.status}>
            <span className={styles.pulso} aria-hidden="true" />
            Brasília · DF · TI &amp; Software
          </span>
          {aoAbrirDossie && (
            <button
              type="button"
              className={styles.botaoDossie}
              onClick={aoAbrirDossie}
              aria-label="Visualizar dossiê técnico e currículo"
            >
              [CV / DOSSIÊ]
            </button>
          )}
          <MagneticButton href="#contato" id="header-cta" className={styles.cta}>
            Vamos conversar
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
