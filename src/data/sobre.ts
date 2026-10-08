export interface GrupoHabilidades {
  slug: string;
  titulo: string;
  itens: readonly string[];
}

export const GRUPOS_HABILIDADES: readonly GrupoHabilidades[] = [
  {
    slug: 'infra',
    titulo: 'Infraestrutura de TI & Redes',
    itens: [
      'Active Directory (AD)',
      'Redes TCP/IP & LAN',
      'DNS & DHCP',
      'VPN Institucional MPF',
      'Cabeamento Estruturado',
      'Wi-Fi Corporativo',
      'Diagnóstico de Hardware',
      'Auditoria de Estações',
    ],
  },
  {
    slug: 'suporte',
    titulo: 'Suporte Técnico & Service Desk N1',
    itens: [
      'Service Desk N1',
      '+400 Usuários Atendidos',
      'Windows 10 & 11 Pro',
      'Microsoft 365',
      'Atendimento Remoto & Presencial',
      'Gestão Rigorosa de SLA',
      'Resolução na Causa Raiz (RCA)',
      'Padronização de Imagens SO',
    ],
  },
  {
    slug: 'frontend',
    titulo: 'Desenvolvimento Front-end & UI/UX',
    itens: [
      'React.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML5 & CSS3 Semântico',
      'Componentização Modular',
      'Mobile-First & Responsividade',
      'Acessibilidade (WCAG)',
    ],
  },
  {
    slug: 'backend',
    titulo: 'Back-end, Dados & Concorrência',
    itens: [
      'Node.js & Express',
      'C# (.NET Core)',
      'Python (Multiprocessing & Speedup)',
      'APIs RESTful',
      'PostgreSQL & MySQL',
      'Docker Containers',
      'Git & GitHub Colaborativo',
      'Automação de Scripts',
    ],
  },
];

export const NUMEROS = [
  { valor: '400', rotulo: '+400 Usuários atendidos na PGR' },
  { valor: '03', rotulo: 'Formações acadêmicas em TI' },
  { valor: '99', rotulo: '99% Cumprimento de SLA institucional' },
  { valor: '00', rotulo: 'Zero incidentes sem causa raiz' },
] as const;

export const MANIFESTO =
  'Atuação multidisciplinar forjada no ciclo completo da tecnologia: da manutenção de hardware e redes locais ao suporte corporativo em missão crítica para mais de 400 usuários na Procuradoria-Geral da República, até a administração de Active Directory e desenvolvimento de software no SESI Saúde e UNIEURO. Uma carreira construída na prática para garantir que cada solução técnica seja tão resiliente na infraestrutura quanto ágil nas mãos do usuário.';

export const FAIXA_TECNOLOGIAS = [
  'Active Directory',
  'Suporte N1 & Service Desk',
  'Redes TCP/IP',
  'React.js',
  'TypeScript',
  'Windows 10/11',
  'Tailwind CSS',
  'Node.js',
  'Hardware & Redes',
  'Python Concorrente',
  'APIs REST',
] as const;
