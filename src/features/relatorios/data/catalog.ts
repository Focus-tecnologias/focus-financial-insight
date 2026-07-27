import { ReportDefinition } from "../types";

export const REPORT_CATALOG: ReportDefinition[] = [
  // FINANCEIRO
  {
    id: "rep-fin-001",
    title: "Relatório Consolidado de Fluxo de Caixa",
    category: "Financeiro",
    description: "Visão consolidada de entradas, saídas, saldos previstos e realizados com conciliação bancária.",
    iconName: "TrendingUp",
    tags: ["Fluxo de Caixa", "Tesouraria", "DRE", "Executivo"],
    recommendedFor: "Diretoria Financeira, CFO e Controladoria",
    availableFilters: ["periodo", "status", "centroCusto"],
    columns: [
      { key: "data", label: "Data Vencimento", type: "date", defaultVisible: true },
      { key: "descricao", label: "Descrição / Entidade", type: "text", defaultVisible: true },
      { key: "categoria", label: "Categoria", type: "badge", defaultVisible: true },
      { key: "entradas", label: "Entradas (R$)", type: "currency", defaultVisible: true },
      { key: "saidas", label: "Saídas (R$)", type: "currency", defaultVisible: true },
      { key: "saldoAcumulado", label: "Saldo Acumulado", type: "currency", defaultVisible: true },
      { key: "status", label: "Status", type: "badge", defaultVisible: true }
    ]
  },
  {
    id: "rep-fin-002",
    title: "Demonstrativo do Resultado do Exercício (DRE)",
    category: "Financeiro",
    description: "Estrutura vertical do DRE com Receita Bruta, Deduções, Margem de Contribuição, EBITDA e Lucro Líquido.",
    iconName: "FileSpreadsheet",
    tags: ["DRE", "Lucratividade", "EBITDA", "Contábil"],
    recommendedFor: "Conselho Executivo e Contabilidade",
    availableFilters: ["periodo", "centroCusto"],
    columns: [
      { key: "conta", label: "Conta / Grupo DRE", type: "text", defaultVisible: true },
      { key: "realizado", label: "Valor Realizado (R$)", type: "currency", defaultVisible: true },
      { key: "av", label: "Análise Vertical (AV %)", type: "text", defaultVisible: true }
    ]
  },
  {
    id: "rep-fin-003",
    title: "Relatório Geral de Contas a Receber",
    category: "Financeiro",
    description: "Listagem detalhada de títulos emitidos, vencidos, recebidos e previsão de recebimento de clientes.",
    iconName: "ArrowUpRight",
    tags: ["Contas a Receber", "Receita", "Inadimplência"],
    recommendedFor: "Gestor Financeiro e Cobrança",
    availableFilters: ["periodo", "cliente", "status"],
    columns: [
      { key: "numero", label: "Nº Título", type: "text", defaultVisible: true },
      { key: "cliente", label: "Cliente", type: "text", defaultVisible: true },
      { key: "descricao", label: "Descrição", type: "text", defaultVisible: true },
      { key: "dataVencimento", label: "Vencimento", type: "date", defaultVisible: true },
      { key: "valorOriginal", label: "Valor Original", type: "currency", defaultVisible: true },
      { key: "valorRecebido", label: "Valor Recebido", type: "currency", defaultVisible: true },
      { key: "saldo", label: "Saldo Aberto", type: "currency", defaultVisible: true },
      { key: "status", label: "Status", type: "badge", defaultVisible: true }
    ]
  },
  {
    id: "rep-fin-004",
    title: "Relatório Geral de Contas a Pagar",
    category: "Financeiro",
    description: "Mapeamento completo das obrigações com fornecedores, contas recorrentes e compromissos operacionais.",
    iconName: "ArrowDownRight",
    tags: ["Contas a Pagar", "Fornecedores", "Despesas"],
    recommendedFor: "Contas a Pagar e Tesouraria",
    availableFilters: ["periodo", "status", "centroCusto"],
    columns: [
      { key: "numero", label: "Nº Documento", type: "text", defaultVisible: true },
      { key: "fornecedor", label: "Fornecedor", type: "text", defaultVisible: true },
      { key: "descricao", label: "Descrição", type: "text", defaultVisible: true },
      { key: "dataVencimento", label: "Vencimento", type: "date", defaultVisible: true },
      { key: "valorOriginal", label: "Valor", type: "currency", defaultVisible: true },
      { key: "valorPago", label: "Valor Pago", type: "currency", defaultVisible: true },
      { key: "status", label: "Status", type: "badge", defaultVisible: true }
    ]
  },
  {
    id: "rep-fin-005",
    title: "Análise de Inadimplência e Régua de Cobrança",
    category: "Financeiro",
    description: "Métricas de Aging List (vencidos a 30, 60, 90+ dias) e taxa de recuperação de dívidas.",
    iconName: "AlertTriangle",
    tags: ["Aging List", "Cobrança", "Inadimplência"],
    recommendedFor: "Credit & Collection Manager",
    availableFilters: ["periodo", "cliente"],
    columns: [
      { key: "cliente", label: "Cliente", type: "text", defaultVisible: true },
      { key: "titulosVencidos", label: "Qtd. Vencidos", type: "number", defaultVisible: true },
      { key: "totalVencido", label: "Total Vencido", type: "currency", defaultVisible: true },
      { key: "diasAtraso", label: "Dias em Atraso Média", type: "number", defaultVisible: true },
      { key: "statusCobranca", label: "Etapa da Régua", type: "badge", defaultVisible: true }
    ]
  },

  // CLIENTES
  {
    id: "rep-cli-001",
    title: "Relatório Mestre de Cadastro de Clientes",
    category: "Clientes",
    description: "Base consolidada de clientes cadastrados, segmento, contatos principais, documento e status.",
    iconName: "Users",
    tags: ["Clientes", "CRM", "Cadastro Mestre"],
    recommendedFor: "Equipe Comercial e Atendimento",
    availableFilters: ["status", "responsavel"],
    columns: [
      { key: "codigo", label: "Código", type: "text", defaultVisible: true },
      { key: "nomeFantasia", label: "Razão Social / Nome", type: "text", defaultVisible: true },
      { key: "documento", label: "CNPJ / CPF", type: "text", defaultVisible: true },
      { key: "segmento", label: "Segmento", type: "text", defaultVisible: true },
      { key: "status", label: "Status", type: "badge", defaultVisible: true },
      { key: "dataCadastro", label: "Data Cadastro", type: "date", defaultVisible: true }
    ]
  },
  {
    id: "rep-cli-002",
    title: "Relatório de Saúde Financeira de Clientes (LTV)",
    category: "Clientes",
    description: "Métricas de faturamento por cliente, histórico de compras, saldo em aberto e LTV acumulado.",
    iconName: "HeartPulse",
    tags: ["LTV", "Retenção", "Customer Success"],
    recommendedFor: "Customer Success e Gestão Comercial",
    availableFilters: ["periodo", "cliente"],
    columns: [
      { key: "nomeFantasia", label: "Cliente", type: "text", defaultVisible: true },
      { key: "ltvTotal", label: "LTV Total (R$)", type: "currency", defaultVisible: true },
      { key: "recebidoNoPeriodo", label: "Recebido (R$)", type: "currency", defaultVisible: true },
      { key: "saldoAberto", label: "Aberto (R$)", type: "currency", defaultVisible: true },
      { key: "scoreSaude", label: "Score Saúde", type: "badge", defaultVisible: true }
    ]
  },

  // PROJETOS
  {
    id: "rep-prj-001",
    title: "Relatório Executivo de Projetos e Rentabilidade",
    category: "Projetos",
    description: "Desempenho financeiro e operacional de projetos, horas consumidas, valor contratado e margem.",
    iconName: "Briefcase",
    tags: ["Projetos", "Horas", "Rentabilidade", "Margem"],
    recommendedFor: "PMO, Gerentes de Projetos e Diretoria",
    availableFilters: ["periodo", "projeto", "status"],
    columns: [
      { key: "codigo", label: "Código", type: "text", defaultVisible: true },
      { key: "nome", label: "Nome do Projeto", type: "text", defaultVisible: true },
      { key: "responsavelPrincipal", label: "Gerente", type: "text", defaultVisible: true },
      { key: "valorContratado", label: "Contratado", type: "currency", defaultVisible: true },
      { key: "progressoGlobal", label: "Progresso (%)", type: "text", defaultVisible: true },
      { key: "horasRealizadas", label: "Horas Usadas", type: "number", defaultVisible: true },
      { key: "status", label: "Status", type: "badge", defaultVisible: true }
    ]
  },

  // RH
  {
    id: "rep-rh-001",
    title: "Relatório Consolidado de Gestão de Pessoas (RH)",
    category: "RH",
    description: "Quadro de colaboradores, cargo, departamento, data de admissão, custo de folha e equipamentos.",
    iconName: "UserCheck",
    tags: ["RH", "Colaboradores", "Folha", "Equipe"],
    recommendedFor: "Head de RH e Gestão de Pessoas",
    availableFilters: ["status"],
    columns: [
      { key: "nome", label: "Colaborador", type: "text", defaultVisible: true },
      { key: "cargo", label: "Cargo", type: "text", defaultVisible: true },
      { key: "departamento", label: "Departamento", type: "text", defaultVisible: true },
      { key: "salarioBase", label: "Salário Base", type: "currency", defaultVisible: true },
      { key: "status", label: "Status", type: "badge", defaultVisible: true },
      { key: "dataAdmissao", label: "Admissão", type: "date", defaultVisible: true }
    ]
  },

  // MARKETING
  {
    id: "rep-mkt-001",
    title: "Relatório de Performance de Marketing & Mídia",
    category: "Marketing",
    description: "Relatório de campanhas ativas, investimento em tráfego pago, ROAS, MQLs e custo por lead.",
    iconName: "Megaphone",
    tags: ["Marketing", "ROAS", "Tráfego Pago", "ROI"],
    recommendedFor: "Head de Marketing e CMO",
    availableFilters: ["periodo", "status"],
    columns: [
      { key: "nome", label: "Campanha", type: "text", defaultVisible: true },
      { key: "objetivo", label: "Objetivo", type: "text", defaultVisible: true },
      { key: "orcamentoTotal", label: "Orçamento Total", type: "text", defaultVisible: true },
      { key: "gasto", label: "Consumido", type: "text", defaultVisible: true },
      { key: "progresso", label: "Progresso (%)", type: "text", defaultVisible: true },
      { key: "status", label: "Status", type: "badge", defaultVisible: true }
    ]
  },

  // FISCAL
  {
    id: "rep-fisc-001",
    title: "Relatório de Livro Fiscal e Obrigações",
    category: "Fiscal",
    description: "Resumo de notas fiscais emitidas, retenções na fonte, apuração de impostos (DAS, ISS, PIS/COFINS).",
    iconName: "Receipt",
    tags: ["Fiscal", "Impostos", "NFe", "Contabilidade"],
    recommendedFor: "Departamento Fiscal e Contabilidade",
    availableFilters: ["periodo", "status"],
    columns: [
      { key: "numeroNota", label: "Nº NF-e", type: "text", defaultVisible: true },
      { key: "entidade", label: "Destinatário / Emitente", type: "text", defaultVisible: true },
      { key: "valorBruto", label: "Valor Bruto", type: "currency", defaultVisible: true },
      { key: "impostosRetidos", label: "Impostos Retidos", type: "currency", defaultVisible: true },
      { key: "valorLiquido", label: "Valor Líquido", type: "currency", defaultVisible: true },
      { key: "status", label: "Status Fiscal", type: "badge", defaultVisible: true }
    ]
  }
];
