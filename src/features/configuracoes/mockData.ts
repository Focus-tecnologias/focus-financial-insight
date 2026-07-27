import { ConfigEmpresa, ConfigDashboard } from './types';

export const mockConfigEmpresa: ConfigEmpresa = {
  razaoSocial: 'Sua Empresa Ltda',
  nomeFantasia: 'Sua Empresa',
  cnpj: '',
  ie: '',
  im: '',
  cnae: '',
  regime: 'Simples Nacional',
  telefone: '',
  whatsapp: '',
  email: '',
  website: '',
  endereco: '',
  cep: '',
  cidade: '',
  estado: '',
  pais: 'Brasil'
};

export const mockConfigDashboard: ConfigDashboard = {
  versao: 'v1.0.0',
  empresa: 'Focus Finance',
  backupsRetidos: 0,
  apisAtivas: 0,
  webhooksAtivos: 0,
  ultimaAtualizacao: new Date().toISOString(),
  ultimoBackup: '-',
  alertas: []
};
