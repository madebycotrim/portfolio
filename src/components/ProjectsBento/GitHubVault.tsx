import { useState, useId } from 'react';
import { REPOSITORIOS_GITHUB, type RepositorioGitHub } from '../../data/projetos';
import styles from './GitHubVault.module.css';

type FiltroConta = 'TODOS' | 'madebycotrim' | 'mateuscotrim';

export function GitHubVault() {
  const [filtroConta, setFiltroConta] = useState<FiltroConta>('TODOS');
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState(false);
  const searchInputId = useId();

  const totalMadeBy = REPOSITORIOS_GITHUB.filter((r) => r.conta === 'madebycotrim').length;
  const totalMateus = REPOSITORIOS_GITHUB.filter((r) => r.conta === 'mateuscotrim').length;

  const reposFiltrados = REPOSITORIOS_GITHUB.filter((repo) => {
    const atendeConta = filtroConta === 'TODOS' || repo.conta === filtroConta;
    const termo = busca.trim().toLowerCase();
    const atendeBusca =
      !termo ||
      repo.nome.toLowerCase().includes(termo) ||
      repo.descricao.toLowerCase().includes(termo) ||
      repo.linguagem.toLowerCase().includes(termo);
    return atendeConta && atendeBusca;
  });

  const reposVisiveis = expandido ? reposFiltrados : reposFiltrados.slice(0, 6);

  return (
    <div className={styles.vaultContainer} id="repositorios-github">
      <div className={styles.vaultHeader}>
        <div className={styles.vaultMeta}>
          <span className={styles.vaultTag}>// OPEN SOURCE &amp; REPOSITÓRIOS GITHUB</span>
          <h3 className={styles.vaultTitulo}>Índice de Repositórios Públicos</h3>
          <p className={styles.vaultDescricao}>
            Projetos de engenharia, SaaS em produção e pesquisas acadêmicas distribuídos nas duas
            contas públicas do desenvolvedor.
          </p>
        </div>

        <div className={styles.vaultProfiles}>
          <a
            href="https://github.com/madebycotrim?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileBadge}
            id="gh-profile-madebycotrim"
          >
            <span className={styles.profileUser}>@madebycotrim</span>
            <span className={styles.profileRole}>SaaS &amp; Produtos ↗</span>
          </a>
          <a
            href="https://github.com/mateuscotrim?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileBadge}
            id="gh-profile-mateuscotrim"
          >
            <span className={styles.profileUser}>@mateuscotrim</span>
            <span className={styles.profileRole}>Código &amp; Acadêmico ↗</span>
          </a>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.botoesFiltro} role="tablist" aria-label="Filtrar por conta GitHub">
          <button
            type="button"
            className={`${styles.botaoFiltro} ${filtroConta === 'TODOS' ? styles.filtroAtivo : ''}`}
            onClick={() => setFiltroConta('TODOS')}
            id="filtro-todos-repos"
          >
            TODOS ({REPOSITORIOS_GITHUB.length})
          </button>
          <button
            type="button"
            className={`${styles.botaoFiltro} ${filtroConta === 'madebycotrim' ? styles.filtroAtivo : ''}`}
            onClick={() => setFiltroConta('madebycotrim')}
            id="filtro-madebycotrim-repos"
          >
            @madebycotrim ({totalMadeBy})
          </button>
          <button
            type="button"
            className={`${styles.botaoFiltro} ${filtroConta === 'mateuscotrim' ? styles.filtroAtivo : ''}`}
            onClick={() => setFiltroConta('mateuscotrim')}
            id="filtro-mateuscotrim-repos"
          >
            @mateuscotrim ({totalMateus})
          </button>
        </div>

        <div className={styles.caixaBusca}>
          <label htmlFor={searchInputId} className="sr-only">
            Buscar repositório por nome ou tecnologia
          </label>
          <input
            id={searchInputId}
            type="text"
            className={styles.inputBusca}
            placeholder="Filtrar repositório (ex: 3D, Python, SESI, TS)..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          {busca && (
            <button
              type="button"
              className={styles.botaoLimparBusca}
              onClick={() => setBusca('')}
              aria-label="Limpar filtro de busca"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className={styles.gridRepos}>
        {reposVisiveis.map((repo: RepositorioGitHub) => (
          <article key={`${repo.conta}-${repo.nome}`} className={styles.cardRepo}>
            <div className={styles.cardRepoTopo}>
              <span className={styles.contaBadge}>@{repo.conta}</span>
              <span className={styles.langBadge}>
                <span
                  className={styles.langDot}
                  style={{ backgroundColor: repo.corLinguagem }}
                  aria-hidden="true"
                />
                {repo.linguagem}
              </span>
            </div>

            <h4 className={styles.nomeRepo}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkRepo}
                id={`repo-link-${repo.nome.toLowerCase()}`}
              >
                {repo.nome} ↗
              </a>
            </h4>

            <p className={styles.descRepo}>{repo.descricao}</p>

            <div className={styles.cardRepoRodape}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.botaoAcessarRepo}
              >
                VER CÓDIGO [GITHUB] ↗
              </a>
            </div>
          </article>
        ))}
      </div>

      {reposFiltrados.length > 6 && !busca && (
        <div className={styles.areaExpansao}>
          <button
            type="button"
            className={styles.botaoExpandir}
            onClick={() => setExpandido(!expandido)}
            id="btn-expandir-repos"
          >
            {expandido
              ? `[RECOLHER REPOSITÓRIOS GITHUB ↑]`
              : `[EXPLORAR TODOS OS ${reposFiltrados.length} REPOSITÓRIOS GITHUB ↓]`}
          </button>
        </div>
      )}

      {reposFiltrados.length === 0 && (
        <div className={styles.vazio}>
          <p>Nenhum repositório encontrado para o termo &quot;{busca}&quot;.</p>
          <button
            type="button"
            className={styles.botaoLimparFiltros}
            onClick={() => {
              setBusca('');
              setFiltroConta('TODOS');
            }}
          >
            REDEFINIR FILTROS
          </button>
        </div>
      )}
    </div>
  );
}
