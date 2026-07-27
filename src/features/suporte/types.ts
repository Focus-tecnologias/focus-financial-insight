export type TipoChamado =
  | 'Dúvida'
  | 'Suporte'
  | 'Incidente'
  | 'Bug'
  | 'Correção'
  | 'Evolução'
  | 'Nova Funcionalidade'
  | 'Implantação'
  | 'Treinamento';

export type StatusChamado =
  | 'Aberto'
  | 'Em Atendimento'
  | 'Aguardando Cliente'
  | 'Em Desenvolvimento'
  | 'Em Homologação'
  | 'Resolvido'
  | 'Fechado'
  | 'Cancelado';

export type PrioridadeChamado = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface MensagemChamado {
  id: string;
  chamadoId: string;
  autorNome: string;
  autorPapel: 'Suporte' | 'Cliente' | 'Dev' | 'CSM' | 'Sistema';
  autorAvatar?: string;
  conteudo: string;
  tipoMensagem: 'Publico' | 'Nota Interna' | 'Registro de Ligação' | 'Reunião';
  dataHora: string;
}

export interface AnexoSuporte {
  id: string;
  chamadoId: string;
  nomeArquivo: string;
  tamanhoKb: number;
  urlArquivo: string;
  dataUpload: string;
  autorNome: string;
}

export interface TimelineSuporte {
  id: string;
  chamadoId: string;
  dataHora: string;
  tipoEvento: 'Abertura' | 'Status' | 'Atribuição' | 'DevSync' | 'SLA' | 'Comentário' | 'Resolvido';
  usuario: string;
  descricao: string;
}

export interface ArtigoConhecimento {
  id: string;
  titulo: string;
  categoria: 'ERP' | 'CRM' | 'BI' | 'Pay' | 'Log' | 'EAD' | 'IA & Lab' | 'Integrações' | 'FAQ';
  conteudo: string;
  resumo: string;
  autor: string;
  visualizacoes: number;
  utilidadeVotos: number;
  tags: string[];
  updatedAt: string;
}

export interface ChamadoSuporte {
  id: string;
  numero: string; // Ex: "TK-1042"
  clienteId: string;
  clienteNome: string;
  contatoNome?: string;
  contatoEmail?: string;
  produtoId: string;
  produtoNome: string;
  projetoId?: string;
  projetoNome?: string;
  contratoId?: string;
  categoria: string;
  tipo: TipoChamado;
  prioridade: PrioridadeChamado;
  responsavelNome: string;
  status: StatusChamado;

  // SLA
  slaHorasPrimeiraResposta: number;
  slaHorasResolucao: number;
  dataAbertura: string; // ISO Date
  dataPrimeiraResposta?: string;
  dataLimiteResolucao: string; // ISO Date
  dataResolucao?: string;
  slaStatus: 'Em Dia' | 'Em Risco' | 'Violado' | 'Cumprido';

  titulo: string;
  descricao: string;

  // Vínculo com Módulo Desenvolvimento
  devTaskId?: string;
  devTaskStatus?: string;
  devTaskTitulo?: string;
  githubRepoUrl?: string;

  updatedAt: string;
}
