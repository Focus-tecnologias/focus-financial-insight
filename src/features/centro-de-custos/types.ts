export type TipoCentroCusto = 'Receita' | 'Despesa';
export type StatusCentroCusto = 'Ativo' | 'Inativo';

export type CategoriaReceita = 'Desenvolvimento' | 'Implantação' | 'Consultoria' | 'Licenciamento' | 'Suporte' | 'Mensalidade' | 'Treinamento' | 'Outros';
export type CategoriaDespesa = 'Administrativo' | 'Comercial' | 'Marketing' | 'Financeiro' | 'Recursos Humanos' | 'Jurídico' | 'Contabilidade' | 'Infraestrutura' | 'Tecnologia' | 'Cloud' | 'Hospedagem' | 'Licenças' | 'Equipamentos' | 'Viagens' | 'Escritório' | 'Impostos' | 'Bancário' | 'Outros';

export interface Rateio {
  id: string;
  tipo: 'Percentual' | 'Valor Fixo' | 'Manual';
  percentual?: number;
  valor?: number;
  centroDestinoId: string;
  observacoes: string;
}

export interface HistoricoCentro {
  id: string;
  acao: string;
  usuario: string;
  data: string; // ISO Date
}

export interface CentroCusto {
  id: string;
  codigo: string;
  nome: string;
  tipo: TipoCentroCusto;
  categoria: CategoriaReceita | CategoriaDespesa | string;
  departamento: string;
  responsavel: string;
  status: StatusCentroCusto;
  descricao: string;
  
  // Hierarquia MDM
  centroPaiId?: string; // Se não possuir, é um centro-raiz
  
  // Regras
  rateios: Rateio[];
  
  // Indicadores (Visão Read-only baseada no Financeiro e Projetos)
  projetosVinculados: string[]; // IDs de projetos simulados
  contratosVinculados: string[]; // IDs de contratos simulados
  
  totalReceitaClassificada: number;
  totalDespesaClassificada: number;
  quantidadeLancamentos: number;

  dataCadastro: string; // ISO Date
  ultimaAtualizacao: string; // ISO Date
  historico: HistoricoCentro[];
}
