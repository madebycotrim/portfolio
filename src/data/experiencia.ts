export interface CasoIncidenteReal {
  titulo: string;
  sintoma: string;
  causaRaiz: string;
  solucaoDefinitiva: string;
  slaResolucao: string;
}

export interface MarcoExperiencia {
  id: string;
  periodo: string;
  faseNumero: string;
  tituloCargo: string;
  empresa: string;
  subtituloContexto: string;
  tipo: string;
  status: 'CONCLUÍDO' | 'CONSOLIDADO' | 'EM EVOLUÇÃO ATIVA';
  descricao: string;
  principaisAtividades: readonly string[];
  competenciasChave: readonly string[];
  insightEvolucao: string;
  metricasOperacionais: readonly { rotulo: string; valor: string }[];
  casoIncidente: CasoIncidenteReal;
}

export const EXPERIENCIA_TIMELINE: readonly MarcoExperiencia[] = [
  {
    id: 'fase-01-etb',
    faseNumero: '01',
    periodo: '2021 — 2023 / 05/2024 — 06/2025',
    tituloCargo: 'Estagiário de TI — Suporte & Infraestrutura',
    empresa: 'Escola Técnica de Brasília (CEP/ETB)',
    subtituloContexto: 'A base em hardware e redes: manutenção preventiva, estações Windows e infraestrutura física',
    tipo: 'SUPORTE TÉCNICO & INFRAESTRUTURA',
    status: 'CONSOLIDADO',
    descricao:
      'Atendimento e suporte técnico aos usuários da instituição de ensino técnico, com atuação direta no diagnóstico e resolução de incidentes de hardware, software e conectividade. Instalação, configuração e atualização de softwares e sistemas operacionais Windows 10/11, manutenção de computadores, impressoras e periféricos, e apoio contínuo às rotinas de infraestrutura de TI.',
    principaisAtividades: [
      'Atendimento e suporte técnico com diagnóstico ágil e resolução de chamados de hardware e software.',
      'Instalação, formatação, configuração e atualização de estações com Windows 10 e Windows 11.',
      'Manutenção preventiva e corretiva de computadores, impressoras, periféricos e estações dos laboratórios.',
      'Apoio prático às rotinas de infraestrutura de redes locais (cabeamento estruturado, roteadores, Wi-Fi).',
    ],
    competenciasChave: ['Hardware & Periféricos', 'Windows 10/11', 'Redes TCP/IP & LAN', 'Manutenção Preventiva', 'Atendimento Técnico', 'Montagem de PCs'],
    insightEvolucao:
      'Aprender a abrir estações, testar periféricos e diagnosticar defeitos na raiz em laboratórios da ETB ensinou que o software mais avançado do mundo não tem valor se a infraestrutura física falhar.',
    metricasOperacionais: [
      { rotulo: 'Ambiente', valor: 'Educacional' },
      { rotulo: 'Hardware Revisado', valor: '+250 PCs' },
      { rotulo: 'Disponibilidade', valor: '99.5%' },
    ],
    casoIncidente: {
      titulo: 'Loop de Rede e Queda de Conectividade em Laboratório',
      sintoma: 'Todas as estações de um laboratório perderam acesso simultâneo à internet com alta taxa de broadcast no switch.',
      causaRaiz: 'Cabo de rede conectado acidentalmente entre duas tomadas de parede no mesmo segmento de switch sem isolamento de porta.',
      solucaoDefinitiva: 'Identificação rápida do cabo em loop, desconexão imediata, remapeamento lógico das tomadas e organização de patch cords.',
      slaResolucao: '15 min (resolvido antes do início da aula)',
    },
  },
  {
    id: 'fase-02-pgr',
    faseNumero: '02',
    periodo: '05/2024 — 06/2025',
    tituloCargo: 'Estagiário de TI — Suporte N1 & Redes',
    empresa: 'Procuradoria-Geral da República (PGR / MPF)',
    subtituloContexto: 'Atendimento corporativo de grande porte: mais de 400 usuários sob SLAs rigorosos e redes corporativas',
    tipo: 'SUPORTE CORPORATIVO & SERVICE DESK',
    status: 'CONSOLIDADO',
    descricao:
      'Atuação de alta responsabilidade prestando suporte técnico presencial e remoto a mais de 400 usuários em ambiente corporativo federal. Abertura, registro, classificação, priorização e acompanhamento de chamados técnicos até a resolução definitiva via Service Desk, garantindo a estabilidade de sistemas institucionais, estações de trabalho e conectividade de rede.',
    principaisAtividades: [
      'Atendimento e suporte técnico presencial e remoto a mais de 400 usuários corporativos em ambiente de missão crítica.',
      'Registro, classificação, priorização e resolução de chamados técnicos de hardware, software e conectividade.',
      'Suporte a usuários quanto ao acesso e utilização fluida de sistemas institucionais e VPN corporativa.',
      'Diagnóstico de conectividade em redes (TCP/IP, VPN, DNS, DHCP) e manutenção preventiva de equipamentos.',
    ],
    competenciasChave: ['Service Desk N1', '+400 Usuários', 'Suporte Remoto & Presencial', 'Redes TCP/IP & VPN', 'Sistemas Institucionais', 'Gestão de SLA'],
    insightEvolucao:
      'Atender procuradores e servidores sob prazos processuais críticos lapidou a escuta ativa, o foco extremo sob pressão e a certeza de que interfaces precisam ser claras para evitar erros humanos.',
    metricasOperacionais: [
      { rotulo: 'Usuários Atendidos', valor: '+400' },
      { rotulo: 'SLA de Atendimento', valor: '98.8%' },
      { rotulo: 'Resolução N1', valor: '82%' },
    ],
    casoIncidente: {
      titulo: 'Falha de Handshake SSL e Bloqueio de Acesso a Sistema Institucional',
      sintoma: 'Estações corporativas remotas apresentando erro de certificado digital e timeout ao acessar sistema de processos.',
      causaRaiz: 'Cadeia de certificados intermediários da AC raiz desatualizada no repositório de certificados locais após update de SO.',
      solucaoDefinitiva: 'Reimportação automatizada da cadeia de certificados, limpeza de cache DNS/SSL e documentação do passo a passo para o Service Desk.',
      slaResolucao: '12 min por chamado / Roteiro distribuído em 1h',
    },
  },
  {
    id: 'fase-03-fabrica',
    faseNumero: '03',
    periodo: '10/2024 — Presente',
    tituloCargo: 'Desenvolvedor Front-end Voluntário',
    empresa: 'Fábrica de Software — UNIEURO',
    subtituloContexto: 'Engenharia de software na prática: desenvolvimento de sistemas web com React.js, Tailwind CSS e versionamento Git',
    tipo: 'DESENVOLVIMENTO WEB & FRONT-END',
    status: 'CONSOLIDADO',
    descricao:
      'Atuação como Desenvolvedor Front-end Voluntário na Fábrica de Software acadêmica (SoftHub UNIEURO), idealizando e construindo sistemas web para uso interno do Centro Universitário Euro-Americano — com destaque para o sistema da clínica-escola de Psicologia (softhub-psicologia) e calculadoras de parâmetros acadêmicos. Participação ativa em todas as etapas do ciclo de desenvolvimento de software, aplicando componentização em React, consumo de APIs REST, interfaces responsivas com Tailwind CSS e versionamento via Git/GitHub.',
    principaisAtividades: [
      'Desenvolvimento de aplicações web modernas utilizando React.js, JavaScript (ES6+), HTML5 e CSS3.',
      'Construção do sistema de prontuários eletrônicos da clínica-escola de Psicologia (softhub-psicologia).',
      'Estilização modular e responsiva com Tailwind CSS, focando em usabilidade centrada no usuário (UX/UI).',
      'Consumo e integração de APIs REST com tratamento defensivo de estados de carregamento e erro.',
      'Versionamento colaborativo em equipe com Git e GitHub, abertura de Pull Requests e revisões de código.',
    ],
    competenciasChave: ['React.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'Git & GitHub', 'Consumo de APIs REST', 'Componentização & UX'],
    insightEvolucao:
      'A transição para o código front-end foi impulsionada pela vivência de suporte: quem já atendeu usuários frustrados com sistemas ruins projeta telas intuitivas que não deixam dúvidas.',
    metricasOperacionais: [
      { rotulo: 'Ambiente', valor: 'SoftHub UNIEURO' },
      { rotulo: 'Módulos Criados', valor: '8+ telas' },
      { rotulo: 'Versionamento', valor: '100% Git' },
    ],
    casoIncidente: {
      titulo: 'Lentidão e Re-renderizações Múltiplas em Filtragem de Dados',
      sintoma: 'Queda de fluidez ao filtrar listas acadêmicas com múltiplos critérios simultâneos no front-end.',
      causaRaiz: 'Cálculo de filtros repetido desnecessariamente a cada digitação sem memoização de estado derivado.',
      solucaoDefinitiva: 'Refatoração com useMemo e separação de componentes de input dos componentes de listagem, normalizando a resposta.',
      slaResolucao: 'Tempo de renderização reduzido de 320ms para 16ms (60 FPS)',
    },
  },
  {
    id: 'fase-04-sesi',
    faseNumero: '04',
    periodo: '03/2026 — Presente',
    tituloCargo: 'Estagiário de TI — Desenvolvimento Web & Infraestrutura',
    empresa: 'Serviço Social da Indústria (SESI / SESI Saúde)',
    subtituloContexto: 'O ápice da convergência: criando sistemas web em React.js enquanto gerencia Active Directory, redes e suporte corporativo',
    tipo: 'DEV WEB · SUPORTE & INFRAESTRUTURA',
    status: 'EM EVOLUÇÃO ATIVA',
    descricao:
      'Atuação de duplo impacto no SESI Saúde: no desenvolvimento de software, responsável pela idealização e criação de sistema web em React.js para otimização de rotinas internas e da solução Catraki SESI para controle e telemetria de catracas físicas (TypeScript/Node.js). Na infraestrutura, responsável pelo suporte presencial corporativo, Active Directory (ingresso e remoção de estações no domínio), redes (TCP/IP, DNS, DHCP, Wi-Fi) e manutenção preventiva do parque computacional.',
    principaisAtividades: [
      'Idealização e desenvolvimento de sistema web em React.js voltado à otimização e automação de fluxos operacionais internos.',
      'Desenvolvimento do Catraki SESI para integração, telemetria e controle de acesso de catracas corporativas.',
      'Apoio no desenvolvimento, refatoração e manutenção contínua de sistemas web em produção (React.js e Node.js).',
      'Gerenciamento de acessos e estações no domínio corporativo via Active Directory (AD).',
      'Suporte técnico presencial corporativo em estações Windows 10/11, impressoras, periféricos e infraestrutura de redes.',
    ],
    competenciasChave: ['React.js & Node.js', 'Active Directory (AD)', 'Redes TCP/IP & Wi-Fi', 'Microsoft 365', 'Otimização de Rotinas', 'Windows 10/11'],
    insightEvolucao:
      'O desenvolvedor mais eficiente é aquele que conhece a infraestrutura por onde seu código trafega e a rotina do usuário que vai utilizá-lo. O suporte e a programação se retroalimentam.',
    metricasOperacionais: [
      { rotulo: 'Sistema Criado', valor: '100% React.js' },
      { rotulo: 'Rotinas Otimizadas', valor: '-60% tempo' },
      { rotulo: 'Active Directory', valor: 'Domínio 100%' },
    ],
    casoIncidente: {
      titulo: 'Centralização e Otimização de Rotinas Operacionais Manuais',
      sintoma: 'Demora e risco de retrabalho na consolidação de dados operacionais registrados de forma manual e fragmentada.',
      causaRaiz: 'Falta de uma aplicação web unificada desenhada sob medida para as necessidades específicas do setor.',
      solucaoDefinitiva: 'Construção de interface web em React.js com formulários reativos, validações e visão consolidada de status em tempo real.',
      slaResolucao: 'Aplicação implementada e em uso produtivo no setor',
    },
  },
];
