import { useLocalStorageState } from "@/hooks/useDataStore";
import { EventoFinanceiro, StatusAgenda } from "./types";
import { TituloReceber } from "../contas-receber/types";
import { ContaPagar } from "../contas-pagar/types";

export interface ContratoItem {
  id: string;
  numeroContrato?: string;
  clienteNome?: string;
  valorTotal?: number;
  dataInicio?: string;
  dataVencimento?: string;
  status?: string;
}

export interface ProjetoItem {
  id: string;
  nome: string;
  valorContratado?: number;
  dataFinal?: string;
  status?: string;
}

export function useAgendaEvents() {
  const { data: contasReceber } = useLocalStorageState<TituloReceber>('focus_contas_receber');
  const { data: contasPagar } = useLocalStorageState<ContaPagar>('focus_contas_pagar');
  const { data: contratos } = useLocalStorageState<ContratoItem>('focus_contratos');
  const { data: projetos } = useLocalStorageState<ProjetoItem>('focus_projetos');
  const { data: customEvents, addItem: addCustomItem } = useLocalStorageState<EventoFinanceiro>('focus_agenda_custom');

  const mappedReceber: EventoFinanceiro[] = contasReceber.map(c => {
    let statusMapped: StatusAgenda = 'Em Aberto';
    if (c.status === 'Recebido') statusMapped = 'Recebido';
    else if (c.status === 'Atrasado') statusMapped = 'Vencido';
    else if (c.status === 'Cancelado') statusMapped = 'Cancelado';

    return {
      id: `rec-${c.id}`,
      titulo: c.descricao ? `${c.cliente} - ${c.descricao}` : `Recebimento de ${c.cliente}`,
      categoria: 'Recebimento',
      data: c.dataVencimento || new Date().toISOString(),
      valor: c.valorOriginal || 0,
      entidadeVinculo: c.cliente,
      status: statusMapped,
      prioridade: c.status === 'Atrasado' ? 'Alta' : 'Média',
      moduloOrigem: 'Contas a Receber',
      linkOrigem: '/contas-a-receber',
      observacoes: c.observacoes || `Forma de Pagamento: ${c.formaPagamento || 'N/A'}`
    };
  });

  const mappedPagar: EventoFinanceiro[] = contasPagar.map(c => {
    let statusMapped: StatusAgenda = 'Em Aberto';
    if (c.status === 'Pago') statusMapped = 'Pago';
    else if (c.status === 'Vencido') statusMapped = 'Vencido';
    else if (c.status === 'Cancelado') statusMapped = 'Cancelado';

    return {
      id: `pag-${c.id}`,
      titulo: c.descricao ? `${c.fornecedor} - ${c.descricao}` : `Pagamento a ${c.fornecedor}`,
      categoria: 'Pagamento',
      data: c.dataVencimento || new Date().toISOString(),
      valor: c.valorOriginal || 0,
      entidadeVinculo: c.fornecedor,
      status: statusMapped,
      prioridade: c.status === 'Vencido' ? 'Alta' : 'Média',
      moduloOrigem: 'Contas a Pagar',
      linkOrigem: '/contas-a-pagar',
      observacoes: c.observacoes || `Forma de Pagamento: ${c.formaPagamento || 'N/A'}`
    };
  });

  const mappedContratos: EventoFinanceiro[] = contratos.map(ct => ({
    id: `ct-${ct.id}`,
    titulo: ct.numeroContrato ? `Vencimento do Contrato ${ct.numeroContrato}` : `Contrato ${ct.clienteNome || ''}`,
    categoria: 'Contrato',
    data: ct.dataVencimento || ct.dataInicio || new Date().toISOString(),
    valor: ct.valorTotal || 0,
    entidadeVinculo: ct.clienteNome || 'Cliente',
    status: (ct.status === 'Ativo' ? 'Em Aberto' : 'Concluído') as StatusAgenda,
    prioridade: 'Média',
    moduloOrigem: 'Contratos',
    linkOrigem: '/contratos'
  }));

  const mappedProjetos: EventoFinanceiro[] = projetos.map(p => ({
    id: `prj-${p.id}`,
    titulo: `Entrega do Projeto: ${p.nome}`,
    categoria: 'Projeto',
    data: p.dataFinal || new Date().toISOString(),
    valor: p.valorContratado || 0,
    entidadeVinculo: p.nome,
    status: (p.status === 'Concluído' ? 'Concluído' : 'Em Aberto') as StatusAgenda,
    prioridade: 'Média',
    moduloOrigem: 'Projetos',
    linkOrigem: '/projetos'
  }));

  const allEvents: EventoFinanceiro[] = [
    ...mappedReceber,
    ...mappedPagar,
    ...mappedContratos,
    ...mappedProjetos,
    ...customEvents
  ].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  const addEvent = (evento: Omit<EventoFinanceiro, 'id'>) => {
    const newEvt: EventoFinanceiro = {
      ...evento,
      id: `evt-custom-${Date.now()}`
    };
    addCustomItem(newEvt);
  };

  return {
    eventos: allEvents,
    addEvent
  };
}
