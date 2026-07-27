import { useLocalStorageState } from "@/hooks/useDataStore";
import { 
  MembroEquipeComercial, MetaComercial, OkrComercial, RegraComissao, 
  ProdutoComercial, ServicoComercial, TabelaPreco, PropostaComercial, 
  PlanejamentoComercialItem, EventoAgendaComercial, StatusProposta 
} from "../types";
import { 
  INITIAL_EQUIPE, INITIAL_METAS, INITIAL_OKRS, INITIAL_COMISSOES, 
  INITIAL_PRODUTOS, INITIAL_SERVICOS, INITIAL_TABELAS, INITIAL_PROPOSTAS, 
  INITIAL_PLANEJAMENTO, INITIAL_AGENDA_COMER 
} from "../data/initialData";

export interface MetricasComercialUsuario {
  id: string; // equals usuarioId
  usuarioId: string;
  oportunidades: number;
  diagnosticos: number;
  propostas: number;
  fechamentos: number;
  receitaFechadaR$: number;
  taxaConversaoPercentual: number;
  funcaoComercial: string;
  metaMensalR$: number;
  comissaoPercentual: number;
}

export function useComercialStore() {
  const { data: equipe, addItem: addEquipeItem } = useLocalStorageState<MembroEquipeComercial>('focus_comercial_equipe', INITIAL_EQUIPE);
  const { data: metas, addItem: addMetaItem } = useLocalStorageState<MetaComercial>('focus_comercial_metas', INITIAL_METAS);
  const { data: okrs, addItem: addOkrItem } = useLocalStorageState<OkrComercial>('focus_comercial_okrs', INITIAL_OKRS);
  const { data: comissoes, addItem: addComissaoItem, updateItem: updateComissaoItem } = useLocalStorageState<RegraComissao>('focus_comercial_comissoes', INITIAL_COMISSOES);
  const { data: produtos, addItem: addProdutoItem } = useLocalStorageState<ProdutoComercial>('focus_comercial_produtos', INITIAL_PRODUTOS);
  const { data: servicos, addItem: addServicoItem } = useLocalStorageState<ServicoComercial>('focus_comercial_servicos', INITIAL_SERVICOS);
  const { data: tabelas, addItem: addTabelaItem } = useLocalStorageState<TabelaPreco>('focus_comercial_tabelas', INITIAL_TABELAS);
  const { data: propostas, addItem: addPropostaItem, updateItem: updatePropostaItem } = useLocalStorageState<PropostaComercial>('focus_comercial_propostas', INITIAL_PROPOSTAS);
  const { data: planejamentos, addItem: addPlanItem } = useLocalStorageState<PlanejamentoComercialItem>('focus_comercial_planejamento', INITIAL_PLANEJAMENTO);
  const { data: agenda, addItem: addAgendaItem } = useLocalStorageState<EventoAgendaComercial>('focus_comercial_agenda', INITIAL_AGENDA_COMER);
  const { data: metricasUsuarios, addItem: addMetricaItem, updateItem: updateMetricaItem } = useLocalStorageState<MetricasComercialUsuario>('focus_comercial_metricas_usuarios', []);

  const addProposta = (p: Omit<PropostaComercial, 'id' | 'numero' | 'dataCriacao'>) => {
    const newP: PropostaComercial = {
      ...p,
      id: `prop-${Date.now()}`,
      numero: `PROP-2026-${Math.floor(100 + Math.random() * 900)}`,
      dataCriacao: new Date().toISOString().split('T')[0]
    };
    addPropostaItem(newP);
  };

  const updatePropostaStatus = (id: string, status: StatusProposta) => {
    updatePropostaItem(id, { status });
  };

  const getMetricasUsuario = (usuarioId: string): MetricasComercialUsuario | undefined => {
    return metricasUsuarios.find(m => m.usuarioId === usuarioId);
  };

  const upsertMetricasUsuario = (usuarioId: string, dados: Partial<MetricasComercialUsuario>) => {
    const existente = metricasUsuarios.find(m => m.usuarioId === usuarioId);
    if (existente) {
      updateMetricaItem(usuarioId, dados);
    } else {
      addMetricaItem({
        id: usuarioId,
        usuarioId,
        oportunidades: 0,
        diagnosticos: 0,
        propostas: 0,
        fechamentos: 0,
        receitaFechadaR$: 0,
        taxaConversaoPercentual: 0,
        funcaoComercial: 'Consultor Comercial',
        metaMensalR$: 0,
        comissaoPercentual: 0,
        ...dados
      });
    }
  };

  return {
    equipe,
    metas,
    okrs,
    comissoes,
    produtos,
    servicos,
    tabelas,
    propostas,
    planejamentos,
    agenda,
    metricasUsuarios,
    addProposta,
    updatePropostaStatus,
    getMetricasUsuario,
    upsertMetricasUsuario,
    addEquipeItem,
    addMetaItem,
    addOkrItem,
    addProdutoItem,
    addServicoItem
  };
}
