import { DocumentoFiscal } from './types';

export const mockDashboardFiscal = {
  indicadores: {
    totalDocumentos: 0,
    notasEmitidas: 0,
    notasRecebidas: 0,
    valorTotalFaturado: 0.00,
    valorTotalComprado: 0.00,
    impostosInformados: 0.00,
    retencoesRegistradas: 0.00,
    documentosPendentes: 0,
  },
  graficos: {
    faturamentoMensal: [],
    impostosPorPeriodo: []
  }
};

export const mockDocumentosFiscais: DocumentoFiscal[] = [];
