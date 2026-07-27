export type TipoDocumentoFiscal = 'NFS-e' | 'NF-e' | 'NFC-e' | 'CT-e' | 'MDF-e' | 'Fatura' | 'Recibo' | 'Comprovante' | 'DARF' | 'DAS' | 'GPS' | 'Guia de Recolhimento' | 'XML' | 'PDF' | 'Outro';
export type StatusDocumentoFiscal = 'Recebido' | 'Emitido' | 'Conferido' | 'Vinculado' | 'Cancelado' | 'Arquivado';

export interface ImpostoDocumento {
  id: string;
  tipo: string;
  baseCalculo: number;
  aliquota: number;
  valor: number;
}

export interface RetencaoDocumento {
  id: string;
  tipo: string;
  percentual: number;
  valor: number;
  responsavel: 'Tomador' | 'Prestador';
}

export interface AnexoDocumento {
  id: string;
  nome: string;
  extensao: string;
  tamanho: string;
  dataUpload: string;
  usuario: string;
  url: string;
}

export interface EventoHistoricoFiscal {
  id: string;
  dataHora: string;
  usuario: string;
  acao: string;
  detalhes?: string;
}

export interface DocumentoFiscal {
  id: string;
  tipo: TipoDocumentoFiscal;
  numero: string;
  serie?: string;
  chaveAcesso?: string;
  
  dataEmissao: string;
  dataEntrada?: string;
  
  entidade: {
    tipo: 'Cliente' | 'Fornecedor' | 'Interno';
    id: string;
    nome: string;
    cnpjCpf: string;
  };
  
  vinculos: {
    projetoId?: string;
    projetoNome?: string;
    contratoId?: string;
    contratoNome?: string;
    financeiroId?: string;
    centroCusto?: string;
  };

  valorTotal: number;
  observacoes?: string;
  
  impostos: ImpostoDocumento[];
  retencoes: RetencaoDocumento[];
  anexos: AnexoDocumento[];
  historico: EventoHistoricoFiscal[];
  
  status: StatusDocumentoFiscal;
  dataAtualizacao: string;
}
