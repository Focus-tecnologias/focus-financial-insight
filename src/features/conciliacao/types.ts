export type ContaBancaria = {
  id: string;
  banco: string; 
  agencia: string;
  conta: string;
  digito: string;
  tipoConta: 'Corrente' | 'Poupança' | 'Investimento';
  titular: string;
  cnpj: string;
  chavePix: string;
  saldoInicial: number;
  saldoAtual: number; // Calculado no mundo real
  status: 'Ativa' | 'Inativa';
};

export type StatusConciliacao = 'Conciliado' | 'Não Conciliado' | 'Divergente' | 'Ignorado' | 'Em Análise';

export type MovimentacaoBancaria = {
  id: string;
  contaBancariaId: string;
  data: string; // ISO
  historico: string; // Ex: PIX REC MARCOS SILVA
  documento: string; // ID transação do banco (NSU)
  valor: number;
  tipo: 'Crédito' | 'Débito';
  status: StatusConciliacao;
  lancamentoFinanceiroId?: string; // Link com o ERP se houve 'match'
};

// Um mini-espelho temporário do ERP financeiro (Contas a Pagar/Receber) 
// para simular a conciliação antes da criação do próprio módulo financeiro.
export type LancamentoSimulado = {
  id: string;
  tipo: 'Receita' | 'Despesa';
  dataVencimento: string;
  valor: number;
  historico: string;
  entidadeVinculo: string; // Nome do Cliente ou Fornecedor
  centroCustoId?: string;
  statusFinanceiro: 'Aberto' | 'Baixado' | 'Atrasado';
};
