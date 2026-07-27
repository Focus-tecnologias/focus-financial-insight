export type TipoAssinatura = 'Eletrônica Simples' | 'Gov.br (Avançada)' | 'ICP-Brasil (Qualificada A1/A3)';
export type StatusDocumentoAssinatura = 'Pendente' | 'Aguardando Assinatura' | 'Assinado' | 'Cancelado' | 'Recusado';
export type PapelAssinante = 'Assinante' | 'Testemunha' | 'Aprovador' | 'Observador';
export type StatusAssinante = 'Pendente' | 'Assinado' | 'Recusado';

export interface TrilhaAuditoria {
  id: string;
  dataHora: string;
  evento: string;
  ator: string;
  emailAtor: string;
  ip: string;
  dispositivo: string;
  localizacao?: string;
  metodoAutenticacao: string;
  hashSHA256: string;
  detalhes: string;
}

export interface Assinante {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  papel: PapelAssinante;
  status: StatusAssinante;
  ordem: number;
  dataAssinatura?: string;
  metodoUtilizado?: TipoAssinatura;
  ip?: string;
  dispositivo?: string;
  rubricaOuDesenhoUrl?: string;
  nivelGovBr?: 'Bronze' | 'Prata' | 'Ouro';
  certificadoEmissor?: string;
}

export interface DocumentoAssinatura {
  id: string;
  codigoValidacao: string; // Ex: FS-2026-8894
  titulo: string;
  descricao: string;
  categoria: 'Contrato Comercial' | 'Admissão RH' | 'Proposta CRM' | 'Distrato' | 'Jurídico' | 'Outros';
  tamanhoKb: number;
  dataCriacao: string;
  dataValidade?: string;
  status: StatusDocumentoAssinatura;
  tipoAssinaturaExigida: TipoAssinatura;
  hashSHA256Original: string;
  hashSHA256Assinado?: string;
  carimboTempo?: string;
  moduloOrigem?: string; // Ex: 'RH', 'CRM', 'Contratos'
  referenciaOrigemId?: string;
  assinantes: Assinante[];
  auditoria: TrilhaAuditoria[];
  pdfUrl?: string;
}

export interface ModeloDocumento {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  camposVariaveis: string[];
  criadoEm: string;
  usadoVezes: number;
}

export interface CertificadoDigital {
  id: string;
  titular: string;
  cpfCnpj: string;
  emissor: string;
  tipo: 'A1 (Arquivo)' | 'A3 (Token/Cartão)' | 'Gov.br Cloud';
  validade: string;
  status: 'Ativo' | 'Expirado' | 'Revogado';
  serialNumber: string;
}
