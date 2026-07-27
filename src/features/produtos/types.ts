export type StatusProduto = 'Ativo' | 'Em Desenvolvimento' | 'Em Implantação' | 'Manutenção' | 'Descontinuado';

export type CategoriaProduto =
  | 'ERP & Gestão'
  | 'CRM & Vendas'
  | 'Business Intelligence'
  | 'Fintech & Pay'
  | 'Logística'
  | 'Educação / EAD'
  | 'Inovação & IA'
  | 'Outros';

export type TipoLinkUtil =
  | 'Produção'
  | 'Homologação'
  | 'Desenvolvimento'
  | 'Site'
  | 'Landing Page'
  | 'Documentação'
  | 'API'
  | 'Git'
  | 'Figma'
  | 'Painel Admin'
  | 'Monitoramento'
  | 'Outro';

export interface LinkUtil {
  id: string;
  titulo: string;
  url: string;
  tipo: TipoLinkUtil;
}

export type StatusRoadmap = 'Backlog' | 'Planejado' | 'Em Desenvolvimento' | 'Em Testes' | 'Publicado' | 'Concluído';
export type PrioridadeRoadmap = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface RoadmapItem {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: PrioridadeRoadmap;
  status: StatusRoadmap;
  responsavel?: string;
  sprint?: string;
  dataPrevista?: string;
}

export interface FuncionalidadeModulo {
  id: string;
  nome: string;
  descricao: string;
  status: 'Ativo' | 'Em Desenvolvimento' | 'Planejado' | 'Descontinuado';
  versao?: string;
  responsavel?: string;
  prioridade?: PrioridadeRoadmap;
  dataEntrega?: string;
}

export type TipoRelease = 'Major' | 'Minor' | 'Patch';

export interface ReleaseVersao {
  id: string;
  versao: string; // Ex: "v3.2.0"
  tipo: TipoRelease;
  dataPublicacao: string; // ISO YYYY-MM-DD
  changelog: string;
  correcoes?: string[];
  melhorias?: string[];
  novasFuncionalidades?: string[];
  responsavel: string;
}

export interface ImplementacaoProduto {
  id: string;
  clienteId: string;
  clienteNome: string;
  dataInicio: string;
  dataPrevista: string;
  dataConclusao?: string;
  consultorResponsavel: string;
  status: 'Planejamento' | 'Em Andamento' | 'Concluído' | 'Pausado';
  progresso: number; // 0-100
  projetoIdVinculado?: string;
}

export interface IntegracaoEcosistema {
  id: string;
  produtoDestinoId: string;
  produtoDestinoNome: string;
  tipoComunicacao: 'API REST' | 'Webhooks' | 'Fila / Message Broker' | 'Banco Compartilhado' | 'SSO / OAuth2';
  status: 'Ativa' | 'Em Configuração' | 'Pendente' | 'Inativa';
  apiUtilizada?: string;
  observacoes?: string;
}

export interface MembroEquipeProduto {
  id: string;
  rhColaboradorId?: string;
  nome: string;
  cargo: string;
  papelNoProduto: 'Product Owner' | 'Tech Lead' | 'Desenvolvedor' | 'UX/UI Designer' | 'QA Tester' | 'Comercial' | 'CSM' | 'Marketing';
  avatarUrl?: string;
}

export interface ProdutoFocus {
  id: string;
  codigo: string;
  nome: string;
  categoria: CategoriaProduto;
  descricaoBreve: string;
  descricaoCompleta: string;
  status: StatusProduto;
  versaoAtual: string;
  capaUrl?: string; // Data URL Base64 ou URL de Imagem
  logoUrl?: string; // Data URL Base64 ou URL de Logo
  responsavelPrincipal: string;
  dataLancamento: string;
  siteOficial?: string;
  repositorioGit?: string;
  documentacaoUrl?: string;

  // Sub-coleções
  linksUteis: LinkUtil[];
  roadmap: RoadmapItem[];
  funcionalidades: FuncionalidadeModulo[];
  releases: ReleaseVersao[];
  implementacoes: ImplementacaoProduto[];
  integracoes: IntegracaoEcosistema[];
  equipe: MembroEquipeProduto[];

  createdAt: string;
  updatedAt: string;
}
