export type StatusColaborador = 'Ativo' | 'Inativo' | 'Férias' | 'Afastado' | 'Em Experiência';

export type FormaPagamentoRH = 'PIX' | 'Transferência Bancária (TED/DOC)' | 'Depósito em Conta' | 'Boleto';

export interface MetodoPagamentoColaborador {
  formaPagamento: FormaPagamentoRH;
  tipoChavePix?: 'CPF' | 'CNPJ' | 'E-mail' | 'Telefone' | 'Chave Aleatória';
  chavePix?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
  tipoConta?: 'Conta Corrente' | 'Conta Poupança' | 'Conta Pagamento';
  titularConta?: string;
}

export interface DocumentoAnexoRh {
  id: string;
  nome: string;
  categoria: string;
  tamanho: string;
  dataUpload: string;
  urlConteudo?: string;
  dmsDocumentoId?: string;
}

export interface Colaborador {
  id: string;
  matricula: string;
  foto?: string;
  nomeCompleto: string;
  nomeSocial?: string;
  cpf: string;
  rg?: string;
  dataNascimento: string;
  emailCorporativo: string;
  emailPessoal?: string;
  telefone: string;
  
  cargo: string;
  departamento: string;
  setor?: string;
  centroCusto?: string;
  gestorImediatoId?: string;
  gestorImediatoNome?: string;
  
  dataAdmissao: string;
  tipoContrato: 'CLT' | 'PJ' | 'Estágio' | 'Jovem Aprendiz' | 'Freelancer';
  regime: 'Presencial' | 'Híbrido' | 'Remoto';
  salarioBase: number;
  jornadaTrabalho?: string;
  
  status: StatusColaborador;
  metodoPagamento: MetodoPagamentoColaborador;
  documentos: DocumentoAnexoRh[];
}

export interface IndicadoresRH {
  totalColaboradores: number;
  ativos: number;
  emExperiencia: number;
  feriasProgramadas: number;
  feriasAndamento: number;
  treinamentosPendentes: number;
  avaliacoesPendentes: number;
  admissoesAno: number;
  desligamentosAno: number;
  turnover: number;
  tempoMedioEmpresaAnos: number;
  folhaSalarialTotal: number;
}
