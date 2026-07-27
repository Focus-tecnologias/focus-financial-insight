export type NotificationPriority = 'Baixa' | 'Normal' | 'Alta' | 'Urgente';

export type NotificationType = 'Informação' | 'Sucesso' | 'Aviso' | 'Erro' | 'Crítico';

export type NotificationCategory = 
  | 'Projetos' 
  | 'Financeiro' 
  | 'CRM' 
  | 'Comercial' 
  | 'Contratos' 
  | 'Estoque' 
  | 'RH' 
  | 'Sistema' 
  | 'Agenda' 
  | 'Cobranças';

export interface NotificationAction {
  id: string;
  label: string;
  actionType: 'navigate' | 'markRead' | 'archive';
  targetUrl?: string;
}

export interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  origem: NotificationCategory;
  tipo: NotificationType;
  prioridade: NotificationPriority;
  lida: boolean;
  arquivada: boolean;
  dataCriacao: string; // ISO Datetime
  responsavel?: string; // Usuário que gerou o evento (ex: "Carlos Silva" ou "Sistema")
  usuarioDestino?: string; // Usuário destinatário (ex: "Você")
  targetUrl?: string; // Deep Link para a tela/item no ERP
  entidadeId?: string;
  acoesRapidas?: NotificationAction[];
  empresaId?: string;
  filialId?: string;
}

export interface UserNotificationPreferences {
  // Categorias ativas
  categorias: {
    projetos: boolean;
    financeiro: boolean;
    crm: boolean;
    comercial: boolean;
    contratos: boolean;
    estoque: boolean;
    rh: boolean;
    sistema: boolean;
    agenda: boolean;
    cobrancas: boolean;
    aprovacoes: boolean;
    mencoes: boolean;
    prazos: boolean;
    vencimentos: boolean;
    documentos: boolean;
  };
  // Canais
  canais: {
    pushNavegador: boolean;
    notificacoesInternas: boolean;
    email: boolean;
    sms: boolean;
  };
  somHabilitado: boolean;
}
