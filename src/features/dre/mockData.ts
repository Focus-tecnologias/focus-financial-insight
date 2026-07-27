import { LinhaDRE, IndicadoresDRE } from './types';

export const mockDREBase: LinhaDRE[] = [
  { id: "1", codigo: "1.0", nome: "Receita Bruta", tipo: "Receita Bruta", valorAtual: 0, valorAnterior: 0, isCalculated: true },
  { id: "1.1", codigo: "1.1", nome: "Licenças de Software (SaaS)", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "1" },
  { id: "1.2", codigo: "1.2", nome: "Serviços de Implantação", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "1" },
  { id: "1.3", codigo: "1.3", nome: "Suporte e Manutenção", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "1" },

  { id: "2", codigo: "2.0", nome: "(-) Deduções da Receita Bruta", tipo: "Deduções", valorAtual: 0, valorAnterior: 0, isCalculated: true },
  { id: "2.1", codigo: "2.1", nome: "Impostos sobre Vendas (ISS, PIS, COFINS)", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "2" },
  { id: "2.2", codigo: "2.2", nome: "Devoluções e Cancelamentos", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "2" },

  { id: "3", codigo: "3.0", nome: "(=) Receita Líquida", tipo: "Receita Líquida", valorAtual: 0, valorAnterior: 0, isCalculated: true },

  { id: "4", codigo: "4.0", nome: "(-) Custos dos Serviços Prestados", tipo: "Custo", valorAtual: 0, valorAnterior: 0, isCalculated: true },
  { id: "4.1", codigo: "4.1", nome: "Infraestrutura Cloud (AWS, Azure)", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "4" },
  { id: "4.2", codigo: "4.2", nome: "Time de Suporte Técnico", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "4" },

  { id: "5", codigo: "5.0", nome: "(=) Lucro Bruto", tipo: "Lucro Bruto", valorAtual: 0, valorAnterior: 0, isCalculated: true },

  { id: "6", codigo: "6.0", nome: "(-) Despesas Administrativas", tipo: "Despesa Administrativa", valorAtual: 0, valorAnterior: 0, isCalculated: true },
  { id: "6.1", codigo: "6.1", nome: "Salários (Diretoria e Backoffice)", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "6" },
  { id: "6.2", codigo: "6.2", nome: "Aluguel e Condomínio", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "6" },
  { id: "6.3", codigo: "6.3", nome: "Material de Escritório e Software Interno", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "6" },

  { id: "7", codigo: "7.0", nome: "(-) Despesas Comerciais", tipo: "Despesa Comercial", valorAtual: 0, valorAnterior: 0, isCalculated: true },
  { id: "7.1", codigo: "7.1", nome: "Marketing (Google Ads, Eventos)", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "7" },
  { id: "7.2", codigo: "7.2", nome: "Comissões de Vendas (Closers)", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "7" },

  { id: "8", codigo: "8.0", nome: "(-) Despesas Financeiras", tipo: "Despesa Financeira", valorAtual: 0, valorAnterior: 0, isCalculated: true },
  { id: "8.1", codigo: "8.1", nome: "Tarifas Bancárias e IOF", tipo: "Subcategoria", valorAtual: 0, valorAnterior: 0, isCalculated: false, parentId: "8" },

  { id: "9", codigo: "9.0", nome: "(=) EBITDA", tipo: "EBITDA", valorAtual: 0, valorAnterior: 0, isCalculated: true },
  
  { id: "10", codigo: "10.0", nome: "(=) Resultado Operacional (EBIT)", tipo: "Resultado Operacional", valorAtual: 0, valorAnterior: 0, isCalculated: true },

  { id: "11", codigo: "11.0", nome: "(-) Tributos Sobre o Lucro (IRPJ / CSLL)", tipo: "Tributos Sobre Lucro", valorAtual: 0, valorAnterior: 0, isCalculated: true },
  
  { id: "12", codigo: "12.0", nome: "(=) Lucro Líquido", tipo: "Lucro Líquido", valorAtual: 0, valorAnterior: 0, isCalculated: true },
];

export const mockIndicadoresDRE: IndicadoresDRE = {
  receitaBruta: 0,
  deducoes: 0,
  receitaLiquida: 0,
  custos: 0,
  lucroBruto: 0,
  margemBruta: 0,
  despesasOperacionais: 0,
  ebitda: 0,
  margemEbitda: 0,
  resultadoOperacional: 0,
  lucroLiquido: 0,
  margemLiquida: 0,
};

export const mockEbitdaHistory = [];
