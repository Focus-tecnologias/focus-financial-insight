export type DreGroupType = 
  | 'Receita Bruta' 
  | 'Deduções' 
  | 'Receita Líquida' 
  | 'Custo' 
  | 'Lucro Bruto' 
  | 'Despesa Administrativa'
  | 'Despesa Comercial'
  | 'Despesa Financeira'
  | 'Despesa Tributária'
  | 'EBITDA'
  | 'Resultado Operacional' 
  | 'Outras Receitas/Despesas' 
  | 'Lucro Antes do IR'
  | 'Tributos Sobre Lucro' 
  | 'Lucro Líquido'
  | 'Subcategoria';

export interface LinhaDRE {
  id: string;
  codigo: string;
  nome: string;
  tipo: DreGroupType;
  valorAtual: number;
  valorAnterior: number; 
  isCalculated: boolean; // Ex: "Lucro Bruto" é calculado via Receita Líquida - Custos
  parentId?: string; // Para drill-down (Expansão de linhas)
  percentualVertical?: number; // Calculado em runtime (Valor / Receita Bruta * 100)
  crescimento?: number; // Calculado em runtime
}

export interface IndicadoresDRE {
  receitaBruta: number;
  deducoes: number;
  receitaLiquida: number;
  custos: number;
  lucroBruto: number;
  margemBruta: number;
  despesasOperacionais: number;
  ebitda: number;
  margemEbitda: number;
  resultadoOperacional: number;
  lucroLiquido: number;
  margemLiquida: number;
}
