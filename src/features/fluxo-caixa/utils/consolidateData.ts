import { MovimentacaoFluxo, StatusMovimentacao } from "../types";
import { TituloReceber } from "../../contas-receber/types";
import { ContaPagar } from "../../contas-pagar/types";

export const consolidateFluxoFromStores = (
  titulos: TituloReceber[] = [],
  contas: ContaPagar[] = []
): MovimentacaoFluxo[] => {
  const fluxo: MovimentacaoFluxo[] = [];

  // Mapear Receitas (Contas a Receber)
  titulos.forEach((titulo) => {
    let statusFx: StatusMovimentacao = "Prevista";
    if (titulo.status === "Recebido") statusFx = "Confirmada";
    if (titulo.status === "Recebido Parcialmente") statusFx = "Parcial";
    if (titulo.status === "Cancelado") statusFx = "Cancelada";

    fluxo.push({
      id: `fluxo-rec-${titulo.id}`,
      idOrigem: titulo.id,
      moduloOrigem: "Contas a Receber",
      tipo: "Entrada",
      dataCompetencia: titulo.dataVencimento || new Date().toISOString().split("T")[0],
      dataPagamento: titulo.dataRecebimento,
      clienteFornecedor: titulo.cliente || "Cliente",
      descricao: titulo.descricao || "Recebimento",
      categoria: titulo.categoria || "Geral",
      valorOriginal: titulo.valorOriginal || 0,
      valorRealizado: titulo.valorRecebido || 0,
      status: statusFx,
      saldoAcumuladoDia: 0,
    });
  });

  // Mapear Despesas (Contas a Pagar)
  contas.forEach((conta) => {
    let statusFx: StatusMovimentacao = "Prevista";
    if (conta.status === "Pago") statusFx = "Confirmada";
    if (conta.status === "Pago Parcialmente") statusFx = "Parcial";
    if (conta.status === "Cancelado") statusFx = "Cancelada";

    fluxo.push({
      id: `fluxo-pag-${conta.id}`,
      idOrigem: conta.id,
      moduloOrigem: "Contas a Pagar",
      tipo: "Saída",
      dataCompetencia: conta.dataVencimento || new Date().toISOString().split("T")[0],
      dataPagamento: conta.dataPagamento,
      clienteFornecedor: conta.fornecedor || "Fornecedor",
      descricao: conta.descricao || "Despesa",
      categoria: conta.categoria || "Operacional",
      valorOriginal: conta.valorOriginal || 0,
      valorRealizado: conta.valorPago || 0,
      status: statusFx,
      saldoAcumuladoDia: 0,
    });
  });

  // Ordenar cronologicamente pela data de competência (vencimento)
  fluxo.sort((a, b) => new Date(a.dataCompetencia).getTime() - new Date(b.dataCompetencia).getTime());

  // Calcular Saldo Acumulado
  let saldoCorrente = 0;

  fluxo.forEach((mov) => {
    const valorImpacto =
      mov.status === "Confirmada" || mov.status === "Parcial"
        ? mov.valorRealizado
        : mov.valorOriginal;

    if (mov.tipo === "Entrada") {
      saldoCorrente += valorImpacto;
    } else {
      saldoCorrente -= valorImpacto;
    }
    mov.saldoAcumuladoDia = saldoCorrente;
  });

  return fluxo;
};

// Manter exportações retrocompatíveis para evitar quebra de contrato de componentes legados
export const generateFluxoData = (): MovimentacaoFluxo[] => [];
export const fluxoConsolidado: MovimentacaoFluxo[] = [];
export const currentBalance = 0;
