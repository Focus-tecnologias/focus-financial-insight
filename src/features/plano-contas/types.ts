export type CategoriaTipo = 'Receita' | 'Despesa' | 'Transferência' | 'Ajuste Financeiro';

export type CategoriaNatureza = 
  | 'Operacional' 
  | 'Administrativa' 
  | 'Comercial' 
  | 'Financeira' 
  | 'Tributária' 
  | 'Investimento' 
  | 'Patrimônio' 
  | 'Extraordinária';

export type CategoriaStatus = 'Ativa' | 'Inativa';

export interface CategoriaFinanceira {
  id: string;
  codigo: string; // Ex: 1.0, 1.1, 1.1.1 (Código Contábil/Gerencial)
  nome: string;
  parentId?: string; // Oculto se for "raiz" (1.0). Preenchido se for subcategoria (1.1).
  tipo: CategoriaTipo;
  natureza: CategoriaNatureza;
  setor?: string;
  departamento?: string;
  centroCustoPadraoId?: string;
  status: CategoriaStatus;
  descricao?: string;
  dataAtualizacao: string;
  
  // Dados de Agregação (Simulação de relacionamento Read-Only)
  qtdLancamentos: number;
  saldoAcumuladoMensal: number; // Positivo para receitas, positivo para despesas (a nível de custo)
}
