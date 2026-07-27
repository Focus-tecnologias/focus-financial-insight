export type FuncaoComercial = 'SDR' | 'BDR' | 'Consultor Comercial' | 'Closer' | 'Executivo de Contas' | 'Gerente Comercial' | 'Diretor Comercial';
export type TipoMeta = 'Mensal' | 'Trimestral' | 'Semestral' | 'Anual';
export type StatusProposta = 'Em elaboração' | 'Em revisão' | 'Aguardando aprovação' | 'Enviada' | 'Aceita' | 'Recusada' | 'Cancelada';

export interface MembroEquipeComercial {
  id: string;
  colaboradorRhId?: string;
  nome: string;
  email: string;
  funcao: FuncaoComercial;
  supervisor?: string;
  metaMensalR$: number;
  comissaoPercentual: number;
  resultadoRealizadoR$: number;
  status: 'Ativo' | 'Inativo';
}

export interface MetaComercial {
  id: string;
  titulo: string;
  tipo: TipoMeta;
  aplicadaA: string; // Nome do colaborador ou equipe
  categoriaTarget: 'Meta Financeira' | 'Meta de Contratos' | 'Meta de Projetos' | 'Meta de Receita Recorrente';
  valorMetaR$: number;
  valorRealizadoR$: number;
  periodo: string; // Ex: "Q1 2026"
  status: 'Em Andamento' | 'Atingida' | 'Em Risco';
}

export interface OkrComercial {
  id: string;
  objetivo: string;
  keyResult: string;
  responsavel: string;
  periodo: string;
  percentualConclusao: number; // 0-100
  status: 'No Prazo' | 'Atenção' | 'Atrasado' | 'Concluído';
}

export interface RegraComissao {
  id: string;
  titulo: string;
  tipo: 'Percentual' | 'Valor Fixo' | 'Escalonado';
  aliquotaPercentual: number;
  valorFixoR$?: number;
  consultorNome: string;
  comissaoPrevistaR$: number;
  comissaoAprovadaR$: number;
  comissaoPagaR$: number;
  status: 'Pendente' | 'Aprovada' | 'Paga';
}

export interface ProdutoComercial {
  id: string;
  codigo: string; // Ex: PRD-001
  nome: string;
  categoria: 'ERP' | 'CRM' | 'BI' | 'Automação' | 'Aplicativo' | 'Portal' | 'Consultoria';
  descricao: string;
  precoBaseR$: number;
  precoMinimoR$: number;
  precoSugeridoR$: number;
  status: 'Ativo' | 'Descontinuado';
  tagPreco?: 'Estimativa' | 'Exato';
}

export interface ServicoComercial {
  id: string;
  codigo: string; // Ex: SRV-001
  nome: string;
  categoria: 'Desenvolvimento' | 'Implantação' | 'Treinamento' | 'Consultoria' | 'Suporte' | 'Discovery';
  descricao: string;
  precoR$: number;
  tempoMedio: string; // Ex: "40 horas"
  status: 'Ativo' | 'Inativo';
  tagPreco?: 'Estimativa' | 'Exato';
}

export interface TabelaPreco {
  id: string;
  nome: string; // Ex: Tabela Corporativa, Tabela Parceiros, Tabela Governo
  descontoPadraoPercentual: number;
  acrescimoPadraoPercentual: number;
  validade: string;
  status: 'Ativa' | 'Expirada';
}

export interface ItemProposta {
  id: string;
  nomeItem: string;
  tipo: 'Produto' | 'Serviço';
  quantidade: number;
  valorUnitarioR$: number;
  valorTotalR$: number;
}

export interface PropostaComercial {
  id: string;
  numero: string; // Ex: PROP-2026-001
  clienteId: string;
  clienteNome: string;
  projetoId?: string;
  projetoNome?: string;
  responsavelNome: string;
  itens: ItemProposta[];
  valorTotalR$: number;
  validadeData: string;
  versao: string; // Ex: "1.0", "1.1"
  status: StatusProposta;
  condicoesPagamento: string;
  dataCriacao: string;
  observacoes?: string;
}

export interface PlanejamentoComercialItem {
  id: string;
  campanha: string;
  objetivo: string;
  metaReceitaR$: number;
  produtosFoco: string[];
  responsavel: string;
  cronograma: string;
  status: 'Planejado' | 'Em Execução' | 'Concluído';
}

export interface EventoAgendaComercial {
  id: string;
  titulo: string;
  tipo: 'Reunião' | 'Treinamento' | 'Convenção' | 'Apresentação' | 'Kickoff Comercial';
  dataHora: string;
  responsavel: string;
  localOuLink: string;
}
