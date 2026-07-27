import { Notificacao, UserNotificationPreferences } from '../types';

export const INITIAL_NOTIFICACOES: Notificacao[] = [];

export const DEFAULT_PREFERENCES: UserNotificationPreferences = {
  categorias: {
    projetos: true,
    financeiro: true,
    crm: true,
    comercial: true,
    contratos: true,
    estoque: true,
    rh: true,
    sistema: true,
    agenda: true,
    cobrancas: true,
    aprovacoes: true,
    mencoes: true,
    prazos: true,
    vencimentos: true,
    documentos: true
  },
  canais: {
    pushNavegador: true,
    notificacoesInternas: true,
    email: true,
    sms: false
  },
  somHabilitado: true
};
