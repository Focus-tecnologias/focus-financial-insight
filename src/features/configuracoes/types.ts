export interface ConfigEmpresa {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  ie: string;
  im: string;
  cnae: string;
  regime: string;
  telefone: string;
  whatsapp: string;
  email: string;
  website: string;
  endereco: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
}

export interface ConfigDashboard {
  versao: string;
  empresa: string;
  backupsRetidos: number;
  apisAtivas: number;
  webhooksAtivos: number;
  ultimaAtualizacao: string;
  ultimoBackup: string;
  alertas: string[];
}
