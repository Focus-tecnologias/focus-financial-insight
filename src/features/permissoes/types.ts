import { UserProfile, MatrizPermissoes } from "@/features/usuarios/types";

export interface PerfilAcesso {
  id: string;
  nome: UserProfile;
  descricao: string;
  departamentoPadrao: string;
  totalUsuariosAssociados: number;
  corBadge: string;
  permissoes: MatrizPermissoes;
}

export interface ColaboradorPermissao {
  id: string; // id do usuario/colaborador
  email: string;
  nomeCompleto: string;
  setorDepartamento: string;
  cargo: string;
  perfilAcesso: UserProfile;
  status: 'Ativo' | 'Inativo' | 'Bloqueado';
  ultimaSincronizacao: string;
}
