export type TipoProjeto = 'Software Sob Medida' | 'Sistema Web' | 'Sistema Integrado' | 'Aplicativo Mobile' | 'Automação' | 'Business Intelligence' | 'Dashboard' | 'Inteligência Artificial' | 'Consultoria' | 'API' | 'Integração' | 'Landing Page' | 'Website' | 'E-commerce' | 'Outro';

export type StatusProjeto = 'Planejamento' | 'Kickoff' | 'Em Desenvolvimento' | 'Em Homologação' | 'Aguardando Cliente' | 'Em Revisão' | 'Implantação' | 'Concluído' | 'Cancelado' | 'Suspenso';

export type PrioridadeProjeto = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface Projeto {
  id: string;
  codigo: string;
  nome: string;
  idCliente: string; // Relacionamento com Clientes
  idContrato?: string; 
  tipo: TipoProjeto;
  categoria: string;
  responsavelPrincipal: string;
  prioridade: PrioridadeProjeto;
  status: StatusProjeto;
  dataInicio: string; // ISO Date
  dataFinal: string; // ISO Date
  descricaoGeral: string;
  
  // Dados Consolidados (Cálculos e Módulos Financeiros)
  valorContratado: number;
  valorRecebido: number;
  saldoRestante: number;
  
  progressoGlobal: number; // 0-100
  
  horasPlanejadas: number;
  horasRealizadas: number;

  ultimaAtualizacao: string; // ISO Date
}
