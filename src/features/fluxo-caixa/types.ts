export type TipoMovimentacao = "Entrada" | "Saída";
export type StatusMovimentacao = "Prevista" | "Confirmada" | "Parcial" | "Cancelada";

export interface MovimentacaoFluxo {
  id: string;
  idOrigem: string;
  moduloOrigem: "Contas a Receber" | "Contas a Pagar";
  tipo: TipoMovimentacao;
  dataCompetencia: string; // ISO Date
  dataPagamento?: string; // ISO Date
  clienteFornecedor: string;
  descricao: string;
  categoria: string;
  valorOriginal: number;
  valorRealizado: number;
  status: StatusMovimentacao;
  saldoAcumuladoDia: number; // Calculado em runtime
}
