import { useLocalStorageState } from "@/hooks/useDataStore";
import { ConectorDMS, WebhookConfig, ApiKeyConfig, IntegrationLog } from "../types";
import { INITIAL_CONNECTORS } from "../data/catalog";

const INITIAL_WEBHOOKS: WebhookConfig[] = [
  {
    id: "wh-01",
    nome: "Notificação de Pagamento Asaas",
    url: "https://api.focusfinance.com.br/v1/webhooks/asaas-payment",
    metodo: "POST",
    token: "whsec_asaas_849201948",
    eventos: ["PAYMENT_RECEIVED", "PAYMENT_OVERDUE", "PAYMENT_REFUNDED"],
    status: "Ativo",
    criadoEm: "2026-01-10",
    ultimoDisparo: "2026-02-05T14:45:00Z",
    statusUltimoDisparo: 200
  },
  {
    id: "wh-02",
    nome: "Sincronização de Tarefas ClickUp",
    url: "https://api.focusfinance.com.br/v1/webhooks/clickup-tasks",
    metodo: "POST",
    token: "whsec_clickup_391029",
    eventos: ["taskCreated", "taskStatusUpdated"],
    status: "Ativo",
    criadoEm: "2026-01-15",
    ultimoDisparo: "2026-02-05T14:20:00Z",
    statusUltimoDisparo: 200
  }
];

const INITIAL_KEYS: ApiKeyConfig[] = [
  {
    id: "key-01",
    nome: "Chave Produção Asaas API",
    conectorId: "asaas-gateway",
    chaveMascarada: "$asaas_live_token_••••••••9401",
    dataCriacao: "2026-01-10",
    ultimoUso: "2026-02-05T14:45:00Z",
    status: "Ativa",
    escopos: ["cobracas.read", "cobracas.write", "pix.create"]
  },
  {
    id: "key-02",
    nome: "OAuth Token Google Workspace",
    conectorId: "google-calendar",
    chaveMascarada: "ya29.a0ARW5m7••••••••8492",
    dataCriacao: "2026-01-12",
    ultimoUso: "2026-02-05T14:50:00Z",
    status: "Ativa",
    escopos: ["calendar.events", "drive.file", "gmail.send"]
  }
];

const INITIAL_LOGS: IntegrationLog[] = [
  {
    id: "log-101",
    conectorId: "asaas-gateway",
    nomeConector: "Asaas Financial Hub",
    moduloOrigem: "Contas a Receber",
    endpoint: "/v3/payments/pay_940182",
    metodo: "POST",
    statusHttp: 200,
    tempoRespostaMs: 35,
    timestamp: "2026-02-05T14:45:10Z",
    usuario: "Sistema Automático",
    status: "Sucesso"
  },
  {
    id: "log-102",
    conectorId: "google-calendar",
    nomeConector: "Google Calendar Sync",
    moduloOrigem: "Agenda Financeira",
    endpoint: "/calendar/v3/calendars/primary/events",
    metodo: "POST",
    statusHttp: 200,
    tempoRespostaMs: 28,
    timestamp: "2026-02-05T14:50:00Z",
    usuario: "Ana Costa",
    status: "Sucesso"
  },
  {
    id: "log-103",
    conectorId: "microsoft-365",
    nomeConector: "Microsoft 365 & Outlook",
    moduloOrigem: "Central de Documentos",
    endpoint: "/v1.0/me/drive/root/children",
    metodo: "GET",
    statusHttp: 401,
    tempoRespostaMs: 120,
    timestamp: "2026-02-04T18:00:00Z",
    usuario: "Sistema Automático",
    status: "Erro",
    mensagemErro: "OAuth Token expirado. Necessário reautenticar."
  }
];

export function useIntegracoesStore() {
  const { data: conectores, updateItem: updateConector } = useLocalStorageState<ConectorDMS>('focus_integracoes_conectores', INITIAL_CONNECTORS);
  const { data: webhooks, addItem: addWebhookItem, removeItem: removeWebhookItem, updateItem: updateWebhookItem } = useLocalStorageState<WebhookConfig>('focus_integracoes_webhooks', INITIAL_WEBHOOKS);
  const { data: apiKeys, addItem: addKeyItem, updateItem: updateKeyItem } = useLocalStorageState<ApiKeyConfig>('focus_integracoes_keys', INITIAL_KEYS);
  const { data: logs, addItem: addLogItem } = useLocalStorageState<IntegrationLog>('focus_integracoes_logs', INITIAL_LOGS);

  const addLog = (
    conectorId: string, 
    nomeConector: string, 
    moduloOrigem: string, 
    endpoint: string, 
    metodo: IntegrationLog['metodo'], 
    statusHttp: number, 
    tempoMs: number, 
    status: IntegrationLog['status'], 
    mensagemErro?: string
  ) => {
    const newLog: IntegrationLog = {
      id: `log-${Date.now()}`,
      conectorId,
      nomeConector,
      moduloOrigem,
      endpoint,
      metodo,
      statusHttp,
      tempoRespostaMs: tempoMs,
      timestamp: new Date().toISOString(),
      usuario: 'Usuário Administrador',
      status,
      mensagemErro
    };
    addLogItem(newLog);
  };

  const toggleConnectorStatus = (id: string) => {
    const conn = conectores.find(c => c.id === id);
    if (!conn) return;

    const newStatus = conn.status === 'Conectado' ? 'Desconectado' : 'Conectado';
    updateConector(id, { status: newStatus });
    addLog(id, conn.nome, 'Hub de Integrações', '/status/toggle', 'PUT', 200, 15, 'Sucesso');
  };

  const testConnection = (id: string) => {
    const conn = conectores.find(c => c.id === id);
    if (!conn) return;

    const simulatedPing = Math.floor(20 + Math.random() * 40);
    const nowIso = new Date().toISOString();

    updateConector(id, {
      status: 'Conectado',
      pingMs: simulatedPing,
      ultimaSincronizacao: nowIso
    });

    addLog(id, conn.nome, 'Hub de Integrações', '/healthcheck', 'GET', 200, simulatedPing, 'Sucesso');
  };

  const syncNow = (id: string) => {
    const conn = conectores.find(c => c.id === id);
    if (!conn) return;

    const nowIso = new Date().toISOString();
    updateConector(id, { ultimaSincronizacao: nowIso });

    addLog(id, conn.nome, 'Hub de Integrações', '/sync/trigger', 'POST', 200, conn.pingMs || 30, 'Sucesso');
  };

  const saveConnectorConfig = (id: string, config: ConectorDMS['configuracao']) => {
    updateConector(id, {
      configuracao: config,
      status: 'Conectado',
      ultimaSincronizacao: new Date().toISOString()
    });
  };

  const addWebhook = (w: Omit<WebhookConfig, 'id' | 'criadoEm'>) => {
    const newW: WebhookConfig = {
      ...w,
      id: `wh-${Date.now()}`,
      criadoEm: new Date().toISOString().split('T')[0]
    };
    addWebhookItem(newW);
  };

  const removeWebhook = (id: string) => {
    removeWebhookItem(id);
  };

  const testWebhook = (id: string) => {
    const wh = webhooks.find(w => w.id === id);
    if (!wh) return;

    const nowIso = new Date().toISOString();
    updateWebhookItem(id, {
      ultimoDisparo: nowIso,
      statusUltimoDisparo: 200
    });

    addLog('webhook', wh.nome, 'Webhooks Engine', wh.url, 'POST', 200, 25, 'Sucesso');
  };

  const addApiKey = (k: Omit<ApiKeyConfig, 'id' | 'dataCriacao' | 'chaveMascarada'>, rawKey: string) => {
    const masked = rawKey.length > 8 ? `${rawKey.substring(0, 4)}••••••••${rawKey.substring(rawKey.length - 4)}` : '••••••••';
    const newK: ApiKeyConfig = {
      ...k,
      id: `key-${Date.now()}`,
      chaveMascarada: masked,
      dataCriacao: new Date().toISOString().split('T')[0]
    };
    addKeyItem(newK);
  };

  const revokeApiKey = (id: string) => {
    updateKeyItem(id, { status: 'Revogada' });
  };

  return {
    conectores,
    webhooks,
    apiKeys,
    logs,
    toggleConnectorStatus,
    testConnection,
    syncNow,
    saveConnectorConfig,
    addWebhook,
    removeWebhook,
    testWebhook,
    addApiKey,
    revokeApiKey
  };
}
