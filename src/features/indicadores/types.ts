export interface KpiGlobal {
  receitaBruta: number;
  lucroLiquido: number;
  ebitda: number;
  margemEbitda: number;
  caixaAtual: number;
  ticketMedioGlobal: number;
  crescimentoReceita: number; // %
  crescimentoLucro: number; // %
}

export interface KpiSaaS {
  mrr: number;
  arr: number;
  ltv: number;
  cac: number;
  ltvCacRatio: number; // LTV dividido pelo CAC
  churnRate: number; // Percentual
  churnReceita: number; // Valor absoluto (R$) de MRR perdido no mês
  arpa: number; // Average Revenue Per Account (Ticket Médio SaaS)
  crescimentoMrr: number; // %
}

export interface EvolucaoSaaS {
  mes: string;
  mrr: number;
  novosMrr: number;
  churnMrr: number;
}

export interface KpiProjetos {
  ativos: number;
  margemMedia: number;
  roiMedio: number;
  atrasados: number;
  receitaProjetos: number;
}

export interface KpiComercial {
  novosClientes: number;
  clientesAtivos: number;
  taxaConversao: number;
  inadimplencia: number;
}
