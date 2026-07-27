import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorageState } from "@/hooks/useDataStore";
import { Usuario } from "@/features/usuarios/types";
import { INITIAL_USUARIOS } from "@/features/usuarios/data/initialData";

interface AbaProfissionaisProps {
  dataAdmissao: string;
  setDataAdmissao: (val: string) => void;
  tipoContrato: string;
  setTipoContrato: (val: string) => void;
  cargo: string;
  setCargo: (val: string) => void;
  departamento: string;
  setDepartamento: (val: string) => void;
  centroCusto: string;
  setCentroCusto: (val: string) => void;
  gestorImediatoNome: string;
  setGestorImediatoNome: (val: string) => void;
  regime: string;
  setRegime: (val: string) => void;
  salarioBase: string;
  setSalarioBase: (val: string) => void;
  jornadaTrabalho: string;
  setJornadaTrabalho: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
}

export function AbaProfissionais({
  dataAdmissao, setDataAdmissao,
  tipoContrato, setTipoContrato,
  cargo, setCargo,
  departamento, setDepartamento,
  centroCusto, setCentroCusto,
  gestorImediatoNome, setGestorImediatoNome,
  regime, setRegime,
  salarioBase, setSalarioBase,
  jornadaTrabalho, setJornadaTrabalho,
  status, setStatus
}: AbaProfissionaisProps) {
  const { data: usuarios } = useLocalStorageState<Usuario>('focus_usuarios', INITIAL_USUARIOS);

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Matrícula</Label>
          <Input placeholder="Gerado automaticamente (COL-XXX)" disabled />
        </div>
        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Status *</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Em Experiência">Em Experiência</SelectItem>
              <SelectItem value="Férias">Férias</SelectItem>
              <SelectItem value="Afastado">Afastado</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Data de Admissão *</Label>
          <Input 
            type="date" 
            value={dataAdmissao} 
            onChange={e => setDataAdmissao(e.target.value)} 
          />
        </div>
        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Tipo de Contrato *</Label>
          <Select value={tipoContrato} onValueChange={setTipoContrato}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="CLT">CLT (Consolidação das Leis do Trabalho)</SelectItem>
              <SelectItem value="PJ">PJ (Pessoa Jurídica)</SelectItem>
              <SelectItem value="Estágio">Estágio</SelectItem>
              <SelectItem value="Jovem Aprendiz">Jovem Aprendiz</SelectItem>
              <SelectItem value="Freelancer">Freelancer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Cargo / Posição *</Label>
          <Input 
            placeholder="Ex: Engenheiro de Software Pleno" 
            value={cargo} 
            onChange={e => setCargo(e.target.value)} 
          />
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Departamento *</Label>
          <Select value={departamento} onValueChange={setDepartamento}>
            <SelectTrigger><SelectValue placeholder="Selecione o departamento" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Tecnologia">Tecnologia & Sistemas</SelectItem>
              <SelectItem value="Recursos Humanos">Recursos Humanos (RH)</SelectItem>
              <SelectItem value="Financeiro">Financeiro & Controladoria</SelectItem>
              <SelectItem value="Comercial">Comercial & Vendas</SelectItem>
              <SelectItem value="Marketing">Marketing & Growth</SelectItem>
              <SelectItem value="Projetos">Engenharia & Projetos</SelectItem>
              <SelectItem value="Diretoria">Diretoria Executiva</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Salário Base (R$) *</Label>
          <Input 
            type="number" 
            placeholder="Ex: 8500" 
            value={salarioBase} 
            onChange={e => setSalarioBase(e.target.value)} 
          />
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Gestor Imediato *</Label>
          <Select value={gestorImediatoNome} onValueChange={setGestorImediatoNome}>
            <SelectTrigger><SelectValue placeholder="Selecione o gestor" /></SelectTrigger>
            <SelectContent>
              {usuarios.filter(u => u.status === 'Ativo').map(u => (
                <SelectItem key={u.id} value={u.nome}>{u.nome} ({u.cargo || u.departamento})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Regime de Trabalho</Label>
          <Select value={regime} onValueChange={setRegime}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Presencial">Presencial</SelectItem>
              <SelectItem value="Híbrido">Híbrido</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label>Jornada de Trabalho</Label>
          <Input 
            placeholder="Ex: Seg a Sex 09h às 18h" 
            value={jornadaTrabalho} 
            onChange={e => setJornadaTrabalho(e.target.value)} 
          />
        </div>
      </div>
    </div>
  );
}
