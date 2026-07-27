export type ModuloOrigemDMS = 
  | 'Clientes' 
  | 'Fornecedores' 
  | 'Contratos' 
  | 'Projetos' 
  | 'Financeiro' 
  | 'Fiscal' 
  | 'RH' 
  | 'Marketing' 
  | 'Comercial' 
  | 'CRM'
  | 'Geral';

export type FormatoArquivo = 
  | 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'csv' 
  | 'ppt' | 'pptx' | 'txt' | 'xml' | 'jpg' | 'png' 
  | 'svg' | 'zip' | 'rar' | 'mp4' | 'mov' | 'mp3' | 'outros';

export interface VersaoDocumento {
  numeroVersao: string; // Ex: '1.0', '1.1', '2.0'
  alteradoPor: string;
  dataAlteracao: string; // ISO String
  descricaoAlteracao: string;
  tamanhoArquivo: string;
  urlDownload?: string;
}

export interface PastaDMS {
  id: string;
  nome: string;
  parentId: string | null; // null se for raiz
  caminhoCompleto: string; // Ex: /Financeiro/Boletos
  moduloVinculado?: ModuloOrigemDMS;
  dataCriacao: string;
  criadoPor: string;
  corIcone?: string;
}

export interface DocumentoDMS {
  id: string;
  codigo: string; // Ex: DOC-90182
  nome: string;
  extensao: FormatoArquivo;
  tamanho: string;
  tamanhoBytes: number;
  pastaId: string;
  caminhoPasta: string;
  moduloOrigem: ModuloOrigemDMS;
  
  // Vinculações MDM
  clienteId?: string;
  clienteNome?: string;
  projetoId?: string;
  projetoNome?: string;
  contratoId?: string;
  contratoNumero?: string;
  
  tags: string[];
  categoria: string;
  responsavelUpload: string;
  dataUpload: string;
  dataUltimaAlteracao: string;
  versaoAtual: string;
  favorito: boolean;
  status: 'Ativo' | 'Arquivado' | 'Em Revisão';
  
  // Versionamento
  historicoVersoes: VersaoDocumento[];
  
  // URL de conteúdo ou simulado
  urlConteudo?: string;
}

export interface AuditLogDocumento {
  id: string;
  documentoId: string;
  nomeDocumento: string;
  usuario: string;
  acao: 'Upload' | 'Download' | 'Visualização' | 'Renomeação' | 'Exclusão' | 'Restauração' | 'Versão Criada' | 'Compartilhamento';
  dataHora: string;
  ip: string;
  detalhes?: string;
}
