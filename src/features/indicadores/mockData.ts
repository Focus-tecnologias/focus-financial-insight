import { KpiGlobal, KpiSaaS, EvolucaoSaaS, KpiProjetos, KpiComercial } from './types';

export const mockKpiGlobal: KpiGlobal = {
  receitaBruta: 0,
  crescimentoReceita: 0,
  lucroLiquido: 0,
  crescimentoLucro: 0,
  ebitda: 0,
  margemEbitda: 0,
  caixaAtual: 0,
  ticketMedioGlobal: 0
};

export const mockKpiSaaS: KpiSaaS = {
  mrr: 0,
  crescimentoMrr: 0,
  arr: 0,
  ltv: 0,
  cac: 0,
  ltvCacRatio: 0,
  churnRate: 0,
  churnReceita: 0,
  arpa: 0
};

export const mockEvolucaoSaaS: EvolucaoSaaS[] = [];

export const mockKpiProjetos: KpiProjetos = {
  ativos: 0,
  margemMedia: 0,
  roiMedio: 0,
  atrasados: 0,
  receitaProjetos: 0
};

export const mockKpiComercial: KpiComercial = {
  novosClientes: 0,
  clientesAtivos: 0,
  taxaConversao: 0,
  inadimplencia: 0
};
