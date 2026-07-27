import { IAMDashboard, Usuario, MatrizPermissoes } from './types';

export const mockIAMDashboard: IAMDashboard = {
  totalUsuarios: 1,
  ativos: 1,
  inativos: 0,
  bloqueados: 0,
  administradores: 1,
  onlineAgora: 1,
  tentativasFalhas24h: 0,
  perfisCriados: 1
};

const fullAccess = {
  visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, importar: true, imprimir: true
};

const superAdminPermissoes: MatrizPermissoes = {
  dashboard: fullAccess,
  contasReceber: fullAccess,
  contasPagar: fullAccess,
  cobrancas: fullAccess,
  fluxoCaixa: fullAccess,
  clientes: fullAccess,
  fornecedores: fullAccess,
  projetos: fullAccess,
  contratos: fullAccess,
  centroCustos: fullAccess,
  planoContas: fullAccess,
  fiscal: fullAccess,
  agenda: fullAccess,
  conciliacao: fullAccess,
  dre: fullAccess,
  kpis: fullAccess,
  administracao: fullAccess
};

export const mockUsuarios: Usuario[] = [
  {
    id: 'USR-001',
    nome: 'Administrador Focus',
    nomeExibicao: 'Admin Focus',
    email: 'admin@focustecnologia.com.br',
    cargo: 'Administrador do Sistema',
    departamento: 'TI / Operações',
    status: 'Ativo',
    perfil: 'Super Administrador',
    rolesComplementares: ['Aprovador Master'],
    mfaHabilitado: true,
    ultimoLogin: new Date().toISOString(),
    tentativasFalhas: 0,
    permissoes: superAdminPermissoes,
    sessoes: [],
    auditoria: []
  }
];
