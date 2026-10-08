import fachada from '../assets/projetos/fachada.webp';
import escada from '../assets/projetos/escada.webp';
import lajes from '../assets/projetos/lajes.webp';

export type AreaBento = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

export type OrigemProjeto = 'SOFTWARE & FULL-STACK' | 'SUPORTE & SERVICE DESK' | 'INFRAESTRUTURA & TI';

export interface LogTecnico {
  timestamp: string;
  nivel: 'INFO' | 'SYS' | 'NET' | 'PERF' | 'SEC';
  mensagem: string;
}

export interface ProjetoBento {
  slug: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  categoria: string;
  origem: OrigemProjeto;
  ano: number;
  area: AreaBento;
  papel: string;
  stack: readonly string[];
  metrica: { valor: string; rotulo: string };
  imagem?: string;
  repositorioUrl?: string;
  deployUrl?: string;
  logs: readonly LogTecnico[];
  detalhesArquitetura: {
    problema: string;
    solucao: string;
    infraestrutura: string;
    impactoSuporte: string;
  };
}

export interface RepositorioGitHub {
  nome: string;
  conta: 'madebycotrim' | 'mateuscotrim';
  url: string;
  descricao: string;
  linguagem: string;
  corLinguagem: string;
  destaque?: boolean;
}

export const PROJETOS_BENTO: readonly ProjetoBento[] = [
  {
    slug: 'printlog',
    titulo: 'PrintLog OS',
    subtitulo: 'Plataforma SaaS para Gestão de Fazendas 3D e Custos de Manufatura',
    descricao:
      'SaaS em produção desenvolvido em TypeScript e React para makers e indústrias de impressão 3D calcularem custos de filamento, energia, depreciação mecânica e gerenciarem filas de produção.',
    categoria: 'SaaS · Manufatura Aditiva',
    origem: 'SOFTWARE & FULL-STACK',
    ano: 2026,
    area: 'a',
    papel: 'Criador & Desenvolvedor Full-Stack',
    stack: ['TypeScript', 'React.js', 'Node.js', 'Tailwind CSS', 'FDM/SLA Cost Engine', 'Vite'],
    metrica: { valor: 'printlog.com.br', rotulo: 'produção ativa' },
    repositorioUrl: 'https://github.com/madebycotrim/printlog',
    deployUrl: 'https://printlog.com.br',
    imagem: fachada,
    logs: [
      { timestamp: '08:42:11.102', nivel: 'NET', mensagem: 'PrintLog Cloud Gateway: https://printlog.com.br [200 OK]' },
      { timestamp: '08:42:11.118', nivel: 'PERF', mensagem: 'Slicer parsing engine: 0.12s per G-code layer compute' },
      { timestamp: '08:42:11.135', nivel: 'SYS', mensagem: 'Maker farm scheduler: Multi-printer queue ready' },
    ],
    detalhesArquitetura: {
      problema: 'Produtores de impressão 3D sofrem prejuízos com cálculos manuais imprecisos de filamento, desgaste de bicos, consumo elétrico (kWh) e taxa de falhas.',
      solucao: 'Criação de uma plataforma SaaS intuitiva que automatiza o cálculo exato do custo por grama, tempo de máquina, margem de lucro comercial e precificação instantânea.',
      infraestrutura: 'Front-end em TypeScript e React de alta responsividade, arquitetura modular, persistência em nuvem e exportação de orçamentos.',
      impactoSuporte: 'Solução validada e ativa na comunidade maker nacional com redução de 90% no tempo de orçamentação e controle total de insumos.',
    },
  },
  {
    slug: 'catraki-sesi',
    titulo: 'Catraki SESI',
    subtitulo: 'Sistema Integrado de Controle de Acesso e Telemetria de Catracas',
    descricao:
      'Solução desenvolvida no SESI Saúde / FIEDF para controle de acesso físico e monitoramento de catracas corporativas, unindo hardware I/O, credenciais de colaboradores e auditoria de fluxo.',
    categoria: 'Controle de Acesso · TI Corporativa',
    origem: 'INFRAESTRUTURA & TI',
    ano: 2026,
    area: 'b',
    papel: 'Desenvolvedor & Analista de TI (SESI)',
    stack: ['TypeScript', 'Node.js', 'Hardware I/O', 'Active Directory', 'Express', 'Tailwind CSS'],
    metrica: { valor: '100%', rotulo: 'catracas e catracários integrados' },
    repositorioUrl: 'https://github.com/madebycotrim/Catraki---SESI',
    imagem: escada,
    logs: [
      { timestamp: '08:42:11.310', nivel: 'NET', mensagem: 'Catraki SESI Daemon: TCP socket on port 5000 linked' },
      { timestamp: '08:42:11.328', nivel: 'SEC', mensagem: 'Access badge auth: SHA-256 badge validation 4ms' },
      { timestamp: '08:42:11.345', nivel: 'SYS', mensagem: 'Gate relay solenoid: pulse triggered OK' },
    ],
    detalhesArquitetura: {
      problema: 'Necessidade de monitorar entradas corporativas e auditar fluxo de colaboradores e usuários com alta disponibilidade no SESI Saúde.',
      solucao: 'Construção de interface web e serviço em TypeScript para registrar eventos de entrada/saída, sincronizar autorizações e emitir alertas operacionais.',
      infraestrutura: 'Microserviço em Node.js/TypeScript conectado a controladoras de acesso via TCP/IP e banco de dados local com replicação.',
      impactoSuporte: 'Rastreabilidade instantânea de acessos, zero perda de logs em incidentes físicos e integração suave com a rotina de TI da unidade.',
    },
  },
  {
    slug: 'pgr-servicedesk-ops',
    titulo: 'PGR Service Desk Ops',
    subtitulo: 'Triagem e Suporte N1 para +400 Usuários Corporativos Federais',
    descricao:
      'Operação de suporte técnico presencial e remoto na Procuradoria-Geral da República (PGR/MPF), atendendo a mais de 400 usuários corporativos sob SLAs rigorosos de processos federais.',
    categoria: 'Service Desk N1 · Missão Crítica',
    origem: 'SUPORTE & SERVICE DESK',
    ano: 2025,
    area: 'c',
    papel: 'Estagiário de TI & Suporte N1 (PGR/MPF)',
    stack: ['Service Desk N1', 'Windows 10/11', 'Redes TCP/IP', 'VPN MPF', 'Gestão de SLA'],
    metrica: { valor: '98.8%', rotulo: 'SLA mantido na PGR (+400 usuários)' },
    logs: [
      { timestamp: '08:42:11.512', nivel: 'SYS', mensagem: 'PGR Queue Monitor: 42 tickets in progress' },
      { timestamp: '08:42:11.530', nivel: 'PERF', mensagem: 'Average first response time: 6.2 minutes' },
    ],
    detalhesArquitetura: {
      problema: 'Ambiente institucional federal com alta demanda de mais de 400 usuários sob exigência estrita de cumprimento de prazos processuais e estabilidade de sistemas.',
      solucao: 'Processo rigoroso de triagem, categorização e resolução no primeiro contato, com mapeamento preventivo de falhas de VPN, certificados digitais e conectividade.',
      infraestrutura: 'Infraestrutura corporativa do Ministério Público Federal com estações Windows e servidores em rede segura.',
      impactoSuporte: 'Mais de 400 usuários atendidos com elevado índice de satisfação e 98.8% de SLA cumprido sem acúmulo de filas.',
    },
  },
  {
    slug: 'active-directory-gate',
    titulo: 'AD Station Gate & Domínio',
    subtitulo: 'Administração de Estações, Políticas GPO e Domínio Corporativo',
    descricao:
      'Gestão de estações de trabalho e conformidade no domínio Microsoft Active Directory no SESI Saúde, abrangendo ingresso e remoção de máquinas, aplicação de GPOs e suporte aos colaboradores.',
    categoria: 'Active Directory · Governança',
    origem: 'INFRAESTRUTURA & TI',
    ano: 2026,
    area: 'd',
    papel: 'Suporte e Infraestrutura de TI (SESI)',
    stack: ['Active Directory', 'PowerShell', 'Windows Domain', 'Políticas GPO', 'Microsoft 365'],
    metrica: { valor: '100%', rotulo: 'estações padronizadas no domínio' },
    logs: [
      { timestamp: '08:42:11.680', nivel: 'SEC', mensagem: 'LDAP Query: DC=corporativo,DC=local bound' },
      { timestamp: '08:42:11.698', nivel: 'SYS', mensagem: 'Computer Object created: OU=Workstations,CN=WS-SESI' },
    ],
    detalhesArquitetura: {
      problema: 'Remanejamento de computadores entre setores corporativos gerava estações despadronizadas ou fora das diretivas de segurança do domínio.',
      solucao: 'Padronização de procedimentos para ingresso, remoção e aplicação imediata de GPOs de rede, impressoras e perfis no Active Directory.',
      infraestrutura: 'Windows Server Active Directory integrado ao Microsoft 365 e Azure AD.',
      impactoSuporte: 'Zero estações vulneráveis ou fora de conformidade corporativa e permissões aplicadas instantaneamente aos usuários.',
    },
  },
  {
    slug: 'log-analyzer-paralelo',
    titulo: 'Log Analyzer Concorrente',
    subtitulo: 'Análise de Logs de Alta Performance com Processamento Paralelo',
    descricao:
      'Pesquisa e implementação em Python de algoritmos concorrentes para processar milhões de linhas de log de servidores corporativos com speedup acelerado.',
    categoria: 'Sistemas & Concorrência',
    origem: 'INFRAESTRUTURA & TI',
    ano: 2026,
    area: 'e',
    papel: 'Pesquisa em Computação Paralela (UNIEURO)',
    stack: ['Python', 'Multiprocessing', 'Log Parsing', 'Speedup Benchmarking', 'Linux / Windows'],
    metrica: { valor: '4.2x', rotulo: 'aceleração multi-core' },
    repositorioUrl: 'https://github.com/mateuscotrim/Atividade-3-Paralelizar-e-avaliar-o-desempenho-de-um-analisador-de-log',
    imagem: lajes,
    logs: [
      { timestamp: '08:42:11.820', nivel: 'PERF', mensagem: 'Log analyzer pool: 8 worker processes spawned' },
      { timestamp: '08:42:11.838', nivel: 'SYS', mensagem: '1.2GB Apache/Nginx access log parsed in 1.42s (vs 5.96s single-core)' },
    ],
    detalhesArquitetura: {
      problema: 'Ferramentas legadas de leitura sequencial de logs engasgavam ou demoravam minutos ao auditar picos de tráfego e incidentes de rede.',
      solucao: 'Divisão de chunks de arquivos com ponteiros de byte e distribuição paralela em workers via IPC no Python.',
      infraestrutura: 'Ambiente de testes com medição rigorosa de métricas (tempo de CPU, uso de RAM, speedup de Amdahl e eficiência paralela).',
      impactoSuporte: 'Capacidade de triagem e extração de códigos de erro HTTP 5xx e incidentes de segurança em fração do tempo tradicional.',
    },
  },
  {
    slug: 'softhub-psicologia',
    titulo: 'SoftHub Psicologia',
    subtitulo: 'Gestão de Clínica-Escola — Fábrica de Software UNIEURO',
    descricao:
      'Sistema desenvolvido na Fábrica de Software do UNIEURO para digitalização de prontuários eletrônicos, agendamento de sessões e triagem de pacientes na clínica de Psicologia.',
    categoria: 'Saúde & Gestão · Fábrica de Software',
    origem: 'SOFTWARE & FULL-STACK',
    ano: 2025,
    area: 'f',
    papel: 'Desenvolvedor de Software (SoftHub UNIEURO)',
    stack: ['JavaScript (ES6+)', 'HTML5 / CSS3', 'Fábrica de Software', 'UI/UX', 'REST API'],
    metrica: { valor: '100%', rotulo: 'prontuários digitalizados' },
    repositorioUrl: 'https://github.com/madebycotrim/softhub-psicologia',
    logs: [
      { timestamp: '08:42:11.950', nivel: 'SEC', mensagem: 'SoftHub Clinic: LGPD compliant encrypted record access' },
      { timestamp: '08:42:11.970', nivel: 'SYS', mensagem: 'Session triage module: student-supervisor approval flow active' },
    ],
    detalhesArquitetura: {
      problema: 'A clínica-escola operava com fichas físicas em papel, gerando riscos de confidencialidade (LGPD), lentidão na triagem e perda de históricos.',
      solucao: 'Criação de um sistema web modular para cadastro de pacientes, anamnese, marcação de sessões e supervisão de docentes de Psicologia.',
      infraestrutura: 'Arquitetura cliente-servidor construída no SoftHub com controle de sessão e perfis diferenciados para estagiários e professores.',
      impactoSuporte: 'Eliminação completa do papel físico, agilização do tempo de atendimento de triagem e conformidade de privacidade.',
    },
  },
];

export const REPOSITORIOS_GITHUB: readonly RepositorioGitHub[] = [
  {
    nome: 'printlog',
    conta: 'madebycotrim',
    url: 'https://github.com/madebycotrim/printlog',
    descricao: 'Plataforma SaaS para gestão de fazendas 3D, fatiamento e orçamentação precisa de manufatura aditiva (printlog.com.br).',
    linguagem: 'TypeScript',
    corLinguagem: '#3178c6',
    destaque: true,
  },
  {
    nome: 'Catraki---SESI',
    conta: 'madebycotrim',
    url: 'https://github.com/madebycotrim/Catraki---SESI',
    descricao: 'Sistema de controle de acesso e telemetria de catracas corporativas no SESI Saúde / FIEDF.',
    linguagem: 'TypeScript',
    corLinguagem: '#3178c6',
    destaque: true,
  },
  {
    nome: 'nave-pas',
    conta: 'madebycotrim',
    url: 'https://github.com/madebycotrim/nave-pas',
    descricao: 'NAVE — Jornada Rumo ao PAS! App educacional gamificado para vestibulandos do PAS UnB.',
    linguagem: 'TypeScript',
    corLinguagem: '#3178c6',
    destaque: true,
  },
  {
    nome: 'scae',
    conta: 'madebycotrim',
    url: 'https://github.com/madebycotrim/scae',
    descricao: 'SCAE — Sistema de Controle, Atendimento e Registro Operacional com API modular em TypeScript.',
    linguagem: 'TypeScript',
    corLinguagem: '#3178c6',
    destaque: true,
  },
  {
    nome: 'softhub-psicologia',
    conta: 'madebycotrim',
    url: 'https://github.com/madebycotrim/softhub-psicologia',
    descricao: 'Gestão de prontuários eletrônicos e triagem para clínica-escola (Fábrica de Software UNIEURO).',
    linguagem: 'HTML / JS',
    corLinguagem: '#e34c26',
    destaque: true,
  },
  {
    nome: 'softhub-calculadora',
    conta: 'madebycotrim',
    url: 'https://github.com/madebycotrim/softhub-calculadora',
    descricao: 'Calculadora de honorários e parâmetros desenvolvida na Fábrica de Software SoftHub.',
    linguagem: 'HTML / JS',
    corLinguagem: '#e34c26',
  },
  {
    nome: 'sem',
    conta: 'madebycotrim',
    url: 'https://github.com/madebycotrim/sem',
    descricao: 'Módulo core utilitário e tipagens estritas em TypeScript.',
    linguagem: 'TypeScript',
    corLinguagem: '#3178c6',
  },
  {
    nome: 'Precificador-3D',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/Precificador-3D',
    descricao: 'Calculadora e orçamentador maker de filamento, horas de máquina e margem para impressão 3D.',
    linguagem: 'HTML / JS',
    corLinguagem: '#e34c26',
    destaque: true,
  },
  {
    nome: 'Atividade-3-Paralelizar-e-avaliar-o-desempenho-de-um-analisador-de-log',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/Atividade-3-Paralelizar-e-avaliar-o-desempenho-de-um-analisador-de-log',
    descricao: 'Analisador de log concorrente com medição de speedup e eficiência paralela em Python.',
    linguagem: 'Python',
    corLinguagem: '#3572A5',
    destaque: true,
  },
  {
    nome: 'Atividade-2-Avaliar-o-desempenho-da-soma-de-valores-em-paralelo',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/Atividade-2-Avaliar-o-desempenho-da-soma-de-valores-em-paralelo',
    descricao: 'Avaliação de concorrência e algoritmos paralelos (Sistemas de Informação - UNIEURO).',
    linguagem: 'Python',
    corLinguagem: '#3572A5',
  },
  {
    nome: 'Fabrica-de-Software',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/Fabrica-de-Software',
    descricao: 'Projetos e componentes web desenvolvidos na Fábrica de Software UNIEURO.',
    linguagem: 'HTML / JS',
    corLinguagem: '#e34c26',
  },
  {
    nome: 'UNIEURO',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/UNIEURO',
    descricao: 'Repositório de atividades e projetos da graduação em Sistemas de Informação no UNIEURO.',
    linguagem: 'Python',
    corLinguagem: '#3572A5',
  },
  {
    nome: 'BRASIL.IA',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/BRASIL.IA',
    descricao: 'Estudos e algoritmos do curso C# para Iniciantes no ecossistema BRASIL.IA.',
    linguagem: 'C#',
    corLinguagem: '#178600',
  },
  {
    nome: 'eletConnect',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/eletConnect',
    descricao: 'Plataforma web para conectar clientes a serviços e técnicos de infraestrutura elétrica.',
    linguagem: 'JavaScript',
    corLinguagem: '#f1e05a',
  },
  {
    nome: 'auto-mecanica-tavares',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/auto-mecanica-tavares',
    descricao: 'Website institucional e catálogo para oficina mecânica automotiva.',
    linguagem: 'HTML / JS',
    corLinguagem: '#e34c26',
  },
  {
    nome: 'villager',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/villager',
    descricao: 'Desenvolvimento e lógica em JavaScript.',
    linguagem: 'JavaScript',
    corLinguagem: '#f1e05a',
  },
  {
    nome: 'desafio-mateuscotrim-2025',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/desafio-mateuscotrim-2025',
    descricao: 'Resoluções de desafios de programação e desenvolvimento front-end.',
    linguagem: 'JavaScript',
    corLinguagem: '#f1e05a',
  },
  {
    nome: 'mateuscotrim.github.io',
    conta: 'mateuscotrim',
    url: 'https://github.com/mateuscotrim/mateuscotrim.github.io',
    descricao: 'Repositório e páginas estáticas via GitHub Pages.',
    linguagem: 'HTML / CSS',
    corLinguagem: '#e34c26',
  },
];
