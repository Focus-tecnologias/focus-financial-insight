import { 
  ClickUpSyncConfig, LeadCrm, EmpresaCrm, ContatoCrm, OportunidadeCrm, 
  AtividadeCrm, LogSyncClickUp 
} from "../types";

export const INITIAL_CLICKUP_CONFIG: ClickUpSyncConfig = {
  id: "cfg-clickup",
  apiToken: "",
  workspaceId: "",
  spaceId: "",
  listId: "",
  autoSync: true,
  lastSyncTime: new Date().toISOString(),
  statusConexao: "Desconectado"
};

// ZERADO DE FABRICA — Sem dados mockados por padrão
export const INITIAL_OPORTUNIDADES: OportunidadeCrm[] = [];
export const INITIAL_LEADS: LeadCrm[] = [];
export const INITIAL_EMPRESAS: EmpresaCrm[] = [];
export const INITIAL_CONTATOS: ContatoCrm[] = [];
export const INITIAL_ATIVIDADES: AtividadeCrm[] = [];
export const INITIAL_SYNC_LOGS: LogSyncClickUp[] = [];

// Dados de demonstração opcionais caso o usuário clique em "Gerar Dados de Teste"
export const MOCK_DEMO_OPORTUNIDADES: OportunidadeCrm[] = [
  {
    id: "op-demo-101",
    clickUpTaskId: "CU-869201",
    titulo: "Implementação Focus ERP Enterprise — Grupo Logística Sul",
    empresaNome: "Grupo Logística Sul S.A.",
    contatoNome: "Roberto Fonseca (CFO)",
    valorR$: 185000,
    probabilidadePercent: 90,
    responsavel: "Mariana Oliveira",
    pipeline: "Pipeline Vendas Enterprise 2026",
    etapa: "Em Negociação",
    prioridade: "Urgente",
    tags: ["Enterprise", "ERP"],
    dataPrevistaFechamento: "2026-03-05",
    dataCriacao: "2026-01-15",
    proximaAcao: "Enviar minuta final de contrato aprovada",
    statusClickUp: "synced"
  },
  {
    id: "op-demo-102",
    clickUpTaskId: "CU-869202",
    titulo: "Licenciamento Focus BI Hub — Rede Varejo Mais",
    empresaNome: "Rede Varejo Mais Ltda",
    contatoNome: "Camila Guimarães (Gerente TI)",
    valorR$: 92000,
    probabilidadePercent: 70,
    responsavel: "Fernanda Lima",
    pipeline: "Pipeline Vendas Enterprise 2026",
    etapa: "Proposta Apresentada",
    prioridade: "Alta",
    tags: ["BI Analytics", "SaaS"],
    dataPrevistaFechamento: "2026-03-20",
    dataCriacao: "2026-02-01",
    proximaAcao: "Reunião de alinhamento técnico com equipe de dados",
    statusClickUp: "synced"
  }
];
