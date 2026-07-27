import { Cliente } from '../clientes/types';

export interface CsCustomer {
  id: string;
  client_id: string; // References Cliente.id
  healthScore: number; // 0 - 100
  healthStatus: 'excelente' | 'bom' | 'atencao' | 'critico';
  npsLatestScore?: number; // 0 - 10
  npsCategory?: 'promotor' | 'neutro' | 'detrator';
  onboardingProgress: number; // 0 - 100%
  onboardingStatus: 'nao_iniciado' | 'em_andamento' | 'concluido' | 'atrasado';
  renewalDate: string;
  renewalStatus: 'em_dia' | 'proxima' | 'em_risco' | 'renovado' | 'cancelado';
  arr: number; // Annual Recurring Revenue
  mrr: number; // Monthly Recurring Revenue
  churnRisk: 'baixo' | 'medio' | 'alto' | 'critico';
  csmResponsibleName?: string;
  created_at: string;
  updated_at: string;
}

export interface CsOnboardingStep {
  id: string;
  cs_customer_id: string;
  title: string;
  description: string;
  order: number;
  isCompleted: boolean;
  completedAt?: string;
  dueDate?: string;
  responsibleName?: string;
}

export interface CsHealthScoreFactor {
  id: string;
  cs_customer_id: string;
  metricName: string;
  weight: number; // percentage weight e.g. 25
  score: number; // 0-100
  status: 'bom' | 'alerta' | 'ruim';
  notes?: string;
}

export interface CsNpsSurvey {
  id: string;
  cs_customer_id: string;
  rating: number; // 0 to 10
  comment: string;
  respondentName: string;
  respondentRole: string;
  date: string;
  feedbackClosed: boolean;
  actionTaken?: string;
}

export interface CsRenewalOpportunity {
  id: string;
  cs_customer_id: string;
  contractTitle: string;
  currentValue: number;
  targetValue: number;
  renewalDate: string;
  status: 'em_negociacao' | 'ganha' | 'perdida' | 'pendente';
  notes?: string;
}

export interface CsExpansionOpportunity {
  id: string;
  cs_customer_id: string;
  type: 'upsell' | 'cross_sell';
  title: string;
  description: string;
  productOffered: string;
  potentialValue: number; // MRR addition
  probability: number; // 0 - 100%
  stage: 'identificada' | 'contato' | 'proposta' | 'fechada_ganha' | 'fechada_perdida';
  createdAt: string;
}

export interface CsChurnRecord {
  id: string;
  cs_customer_id: string;
  churnDate: string;
  reason: 'preco' | 'falta_uso' | 'produto_nao_atende' | 'atendimento' | 'concorrente' | 'outro';
  category: 'voluntario' | 'involuntario';
  mrrLost: number;
  detailedAnalysis: string;
  actionTakenToPrevent?: string;
}

export interface CsActionPlanItem {
  id: string;
  cs_customer_id: string;
  title: string;
  description: string;
  priority: 'alta' | 'media' | 'baixa';
  status: 'a_fazer' | 'em_progresso' | 'revisao' | 'concluido';
  dueDate: string;
  responsibleName: string;
  createdAt: string;
}

export interface CsTimelineEvent {
  id: string;
  cs_customer_id: string;
  title: string;
  description: string;
  type: 'reuniao' | 'e_mail' | 'nps' | 'health_change' | 'onboarding' | 'churn_alert' | 'contrato';
  date: string;
  authorName: string;
}

export interface CsTaskMeeting {
  id: string;
  cs_customer_id: string;
  title: string;
  type: 'tarefa' | 'reuniao';
  date: string;
  time?: string;
  durationMinutes?: number;
  attendees?: string[];
  status: 'pendente' | 'realizada' | 'cancelada';
  notes?: string;
}

export interface CsDocument {
  id: string;
  cs_customer_id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
  url?: string;
}
