import { useEffect } from 'react';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { Cliente } from '../clientes/types';
import {
  CsCustomer,
  CsOnboardingStep,
  CsHealthScoreFactor,
  CsNpsSurvey,
  CsRenewalOpportunity,
  CsExpansionOpportunity,
  CsChurnRecord,
  CsActionPlanItem,
  CsTimelineEvent,
  CsTaskMeeting,
  CsDocument,
} from './types';

// Initial clients list is empty (no mock data)
const INITIAL_CLIENTS: Cliente[] = [];

export function useCustomerSuccess() {
  // Sync with Clientes from Focus Finance
  const { data: clients, save: saveClients } = useLocalStorageState<Cliente>('focus_clientes', INITIAL_CLIENTS);

  // CS Collections
  const { data: csCustomers, save: saveCsCustomers } = useLocalStorageState<CsCustomer>('focus_cs_customers', []);
  const { data: onboardingSteps, save: saveOnboardingSteps } = useLocalStorageState<CsOnboardingStep>('focus_cs_onboardings', []);
  const { data: healthFactors, save: saveHealthFactors } = useLocalStorageState<CsHealthScoreFactor>('focus_cs_health_factors', []);
  const { data: npsSurveys, save: saveNpsSurveys } = useLocalStorageState<CsNpsSurvey>('focus_cs_nps_surveys', []);
  const { data: renewals, save: saveRenewals } = useLocalStorageState<CsRenewalOpportunity>('focus_cs_renewals', []);
  const { data: expansions, save: saveExpansions } = useLocalStorageState<CsExpansionOpportunity>('focus_cs_expansions', []);
  const { data: churnRecords, save: saveChurnRecords } = useLocalStorageState<CsChurnRecord>('focus_cs_churn_records', []);
  const { data: actionPlans, save: saveActionPlans } = useLocalStorageState<CsActionPlanItem>('focus_cs_action_plans', []);
  const { data: timelines, save: saveTimelines } = useLocalStorageState<CsTimelineEvent>('focus_cs_timelines', []);
  const { data: tasksMeetings, save: saveTasksMeetings } = useLocalStorageState<CsTaskMeeting>('focus_cs_tasks_meetings', []);
  const { data: documents, save: saveDocuments } = useLocalStorageState<CsDocument>('focus_cs_documents', []);

  // Ensure every Cliente has a corresponding CS Customer workspace
  useEffect(() => {
    if (!clients || clients.length === 0) return;

    const existingClientIds = new Set(csCustomers.map((c) => c.client_id));
    const newCsRecords: CsCustomer[] = [];
    let updatedOnboarding = [...onboardingSteps];
    let updatedHealth = [...healthFactors];

    clients.forEach((client, idx) => {
      if (!existingClientIds.has(client.id)) {
        const csId = `cs-${client.id}`;
        const newCs: CsCustomer = {
          id: csId,
          client_id: client.id,
          healthScore: 100,
          healthStatus: 'excelente',
          npsLatestScore: 10,
          npsCategory: 'promotor',
          onboardingProgress: 0,
          onboardingStatus: 'em_andamento',
          renewalDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
          renewalStatus: 'em_dia',
          mrr: 0,
          arr: 0,
          churnRisk: 'baixo',
          csmResponsibleName: 'CSM Responsável',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        newCsRecords.push(newCs);
      }
    });

    if (newCsRecords.length > 0) {
      saveCsCustomers([...csCustomers, ...newCsRecords]);
    }
  }, [clients, csCustomers]);

  // Actions
  const toggleOnboardingStep = (stepId: string) => {
    saveOnboardingSteps(
      onboardingSteps.map((step) => {
        if (step.id === stepId) {
          const isCompleted = !step.isCompleted;
          return {
            ...step,
            isCompleted,
            completedAt: isCompleted ? new Date().toISOString() : undefined,
          };
        }
        return step;
      })
    );
  };

  const addNpsSurvey = (csCustomerId: string, survey: Omit<CsNpsSurvey, 'id' | 'cs_customer_id' | 'feedbackClosed'>) => {
    const category = survey.rating >= 9 ? 'promotor' : survey.rating >= 7 ? 'neutro' : 'detrator';
    const newSurvey: CsNpsSurvey = {
      id: `nps-${Date.now()}`,
      cs_customer_id: csCustomerId,
      ...survey,
      feedbackClosed: category === 'promotor',
    };
    saveNpsSurveys([newSurvey, ...npsSurveys]);

    saveCsCustomers(
      csCustomers.map((cs) => {
        if (cs.id === csCustomerId) {
          return { ...cs, npsLatestScore: survey.rating, npsCategory: category as any };
        }
        return cs;
      })
    );
  };

  const addActionPlanItem = (item: Omit<CsActionPlanItem, 'id' | 'createdAt'>) => {
    saveActionPlans([
      {
        id: `ap-${Date.now()}`,
        ...item,
        createdAt: new Date().toISOString(),
      },
      ...actionPlans,
    ]);
  };

  const addExpansionOpportunity = (opp: Omit<CsExpansionOpportunity, 'id' | 'createdAt'>) => {
    saveExpansions([
      {
        id: `exp-${Date.now()}`,
        ...opp,
        createdAt: new Date().toISOString(),
      },
      ...expansions,
    ]);
  };

  return {
    clients,
    csCustomers,
    onboardingSteps,
    healthFactors,
    npsSurveys,
    renewals,
    expansions,
    churnRecords,
    actionPlans,
    timelines,
    tasksMeetings,
    documents,
    toggleOnboardingStep,
    addNpsSurvey,
    addActionPlanItem,
    addExpansionOpportunity,
  };
}
