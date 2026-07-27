export type TipoEventoProjeto =
  | 'Entrega de Projeto'
  | 'Kickoff'
  | 'Homologação'
  | 'Implantação'
  | 'Marco / Milestone'
  | 'Reunião de Alinhamento'
  | 'Outro';

export type StatusEventoProjeto =
  | 'Previsto'
  | 'Em Andamento'
  | 'Concluído'
  | 'Atrasado'
  | 'Cancelado';

export type PrioridadeEventoProjeto = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface EventoProjeto {
  id: string;
  titulo: string;
  tipo: TipoEventoProjeto;
  data: string; // ISO Date YYYY-MM-DD
  hora?: string; // HH:mm
  projetoId?: string;
  projetoNome?: string;
  clienteNome?: string;
  responsavel?: string;
  status: StatusEventoProjeto;
  prioridade: PrioridadeEventoProjeto;
  observacoes?: string;
  isAutomatico?: boolean; // Se foi gerado a partir das datas do Projeto em focus_projetos
}
