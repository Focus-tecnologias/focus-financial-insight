export type CategoriaConector = 
  | 'Bancos' 
  | 'Gateways' 
  | 'Google' 
  | 'Microsoft' 
  | 'Projetos' 
  | 'WhatsApp' 
  | 'Email' 
  | 'Assinaturas' 
  | 'Gov' 
  | 'Ecossistema Focus';

export type StatusConector = 'Conectado' | 'Atencao' | 'Desconectado';

export interface ConectorDMS {
  id: string;
  nome: string;
  provedor: string;
  categoria: CategoriaConector;
  descricao: string;
  icone: string; // nome do ícone lucide
  status: StatusConector;
  tipoAutenticacao: 'OAuth2' | 'APIKey' | 'TokenSecret' | 'MTLS' | 'SMTP';
  pingMs?: number;
  ultimaSincronizacao?: string;
  frequenciaSync: 'Manual' | '5min' | '15min' | '30min' | '1h' | '6h' | 'Diario';
  recursos: string[];
  modulosVinculados: string[]; // Ex: ['Contas a Receber', 'Contas a Pagar', 'Financeiro']
  
  // Credenciais (Armazenadas de forma centralizada e segura)
  configuracao?: {
    clientId?: string;
    clientSecret?: string;
    apiKey?: string;
    baseUrl?: string;
    webhookUrl?: string;
    ambiente: 'Produção' | 'Sandbox / Testes';
    tokensAtivos?: number;
  };
}

export interface WebhookConfig {
  id: string;
  nome: string;
  url: string;
  metodo: 'POST' | 'PUT' | 'GET';
  token: string;
  eventos: string[];
  status: 'Ativo' | 'Pausado';
  criadoEm: string;
  ultimoDisparo?: string;
  statusUltimoDisparo?: number;
}

export interface ApiKeyConfig {
  id: string;
  nome: string;
  conectorId: string;
  chaveMascarada: string;
  dataCriacao: string;
  dataExpiracao?: string;
  ultimoUso?: string;
  status: 'Ativa' | 'Revogada';
  escopos: string[];
}

export interface IntegrationLog {
  id: string;
  conectorId: string;
  nomeConector: string;
  moduloOrigem: string;
  endpoint: string;
  metodo: 'GET' | 'POST' | 'PUT' | 'DELETE';
  statusHttp: number;
  tempoRespostaMs: number;
  timestamp: string;
  usuario: string;
  status: 'Sucesso' | 'Erro' | 'Timeout';
  mensagemErro?: string;
}
