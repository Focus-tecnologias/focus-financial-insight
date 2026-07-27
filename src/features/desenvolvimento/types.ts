export type TipoItemBacklog =
  | 'Épico'
  | 'Funcionalidade'
  | 'História de Usuário'
  | 'Tarefa Técnica'
  | 'Melhoria'
  | 'Correção / Bug';

export type StatusKanban =
  | 'Backlog'
  | 'A Fazer'
  | 'Em Desenvolvimento'
  | 'Code Review'
  | 'QA'
  | 'Homologação'
  | 'Pronto para Deploy'
  | 'Concluído';

export type PrioridadeDev = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface ItemBacklog {
  id: string;
  projetoId: string;
  tipoItem: TipoItemBacklog;
  titulo: string;
  descricao: string;
  prioridade: PrioridadeDev;
  status: StatusKanban;
  responsavel?: string;
  storyPoints: number;
  sprintId?: string;
  estimativaHoras?: number;
  dataLimite?: string;
  tags?: string[];
  createdAt: string;
}

export interface SprintDelivery {
  id: string;
  projetoId: string;
  nome: string;
  objetivo: string;
  dataInicio: string;
  dataFim: string;
  responsavel: string;
  status: 'Planejada' | 'Em Andamento' | 'Encerrada';
  velocityEstimado: number;
  velocityRealizado: number;
}

export interface VersaoSemVer {
  id: string;
  projetoId: string;
  versao: string; // Ex: "v2.1.0"
  build: string; // Ex: "Build 2408"
  tipo: 'Major' | 'Minor' | 'Patch' | 'Hotfix';
  data: string;
  responsavel: string;
  descricao: string;
}

export interface RepositorioGitConfig {
  id: string;
  projetoId: string;
  provedor: 'GitHub' | 'GitLab' | 'Bitbucket' | 'Azure DevOps';
  nomeRepositorio: string;
  organizacao: string;
  urlRepositorio: string;
  branchPrincipal: string;
  statusConexao: 'Conectado' | 'Pendente' | 'Erro';
}

export interface GitBranchItem {
  id: string;
  projetoId: string;
  nomeBranch: string;
  tipoBranch: 'feature/' | 'develop' | 'release/' | 'hotfix/' | 'main' | 'master';
  desenvolvedor: string;
  status: 'Ativa' | 'Merged' | 'Stale';
  dataCriacao: string;
  pullRequestUrl?: string;
}

export interface ReleaseDelivery {
  id: string;
  projetoId: string;
  nome: string;
  versao: string;
  dataPublicacao: string;
  changelog: string;
  melhorias?: string[];
  correcoes?: string[];
  funcionalidades?: string[];
}

export interface DeployItem {
  id: string;
  projetoId: string;
  dataHora: string;
  responsavel: string;
  ambiente: 'Desenvolvimento' | 'Homologação' | 'Produção';
  versao: string;
  tipoDeploy: 'Automático (CI/CD)' | 'Manual';
  status: 'Sucesso' | 'Falha' | 'Em Andamento';
  logDeploy?: string;
}

export interface CasoTesteQA {
  id: string;
  projetoId: string;
  titulo: string;
  descricao: string;
  passosTeste: string;
  responsavel: string;
  resultado: 'Aprovado' | 'Reprovado' | 'Pendente';
  evidencias?: string;
  prioridade: PrioridadeDev;
}

export type SeveridadeBug = 'Crítico' | 'Alto' | 'Médio' | 'Baixo';

export interface BugItem {
  id: string;
  projetoId: string;
  titulo: string;
  descricao: string;
  severidade: SeveridadeBug;
  prioridade: PrioridadeDev;
  ambiente: 'Desenvolvimento' | 'Homologação' | 'Produção';
  responsavel: string;
  sprintId?: string;
  status: 'Aberto' | 'Em Análise' | 'Em Correção' | 'Em Teste (QA)' | 'Resolvido' | 'Fechado';
  evidencias?: string;
  createdAt: string;
}

export interface CorrecaoBugItem {
  id: string;
  projetoId: string;
  bugId: string;
  bugTitulo: string;
  solucao: string;
  responsavel: string;
  versao: string;
  data: string;
}

export interface AmbienteInfo {
  id: string;
  projetoId: string;
  tipo: 'Desenvolvimento' | 'Homologação' | 'Produção';
  url: string;
  status: 'Online' | 'Offline' | 'Manutenção';
  versaoAtual: string;
  ultimoDeploy: string;
}

export interface PublicacaoApp {
  id: string;
  projetoId: string;
  plataforma: 'Web' | 'Google Play Store' | 'Apple App Store';
  nomeApp: string;
  packageNameBundleId: string; // Ex: com.focustecnologia.app
  versao: string;
  codigoVersaoBuild: string;
  statusPublicacao: 'Em Revisão' | 'Publicado' | 'Rejeitado' | 'Rascunho';
  dataPublicacao: string;
}

export interface LogDelivery {
  id: string;
  projetoId: string;
  dataHora: string;
  tipoEvento: 'Deploy' | 'Build' | 'Erro' | 'Publicação' | 'Versão' | 'Ambiente' | 'Status';
  usuario: string;
  descricao: string;
}

export interface PipelineCICD {
  id: string;
  projetoId: string;
  nomePipeline: string;
  provedor: 'GitHub Actions' | 'GitLab CI/CD' | 'Azure Pipelines' | 'Bitbucket Pipelines';
  ambiente: string;
  status: 'Sucesso' | 'Falhou' | 'Em Execução' | 'Cancelado';
  tempoExecucaoSegundos: number;
  ultimaExecucao: string;
  buildNumber: string;
}
