import React, { useState } from 'react';
import { Headphones, Plus, User, Boxes, Briefcase } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChamadoSuporte, TipoChamado, PrioridadeChamado } from '../types';
import { Cliente } from '../../clientes/types';
import { ProdutoFocus } from '../../produtos/types';
import { Projeto } from '../../projetos/types';

interface NovoChamadoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientes: Cliente[];
  produtos: ProdutoFocus[];
  projetos: Projeto[];
  onAbrirChamado: (c: Omit<ChamadoSuporte, 'id' | 'numero' | 'dataAbertura' | 'slaStatus' | 'updatedAt'>) => void;
}

export function NovoChamadoModal({
  open,
  onOpenChange,
  clientes,
  produtos,
  projetos,
  onAbrirChamado,
}: NovoChamadoModalProps) {
  const [form, setForm] = useState({
    clienteId: '',
    produtoId: '',
    projetoId: '',
    tipo: 'Suporte' as TipoChamado,
    prioridade: 'Média' as PrioridadeChamado,
    categoria: 'Geral',
    contatoNome: '',
    contatoEmail: '',
    responsavelNome: 'Ana Clara (Nível 2)',
    titulo: '',
    descricao: '',
    slaHorasResolucao: 24,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titulo || !form.clienteId || !form.produtoId) return;

    const clienteSel = clientes.find((c) => c.id === form.clienteId);
    const produtoSel = produtos.find((p) => p.id === form.produtoId);
    const projetoSel = projetos.find((pj) => pj.id === form.projetoId);

    onAbrirChamado({
      clienteId: form.clienteId,
      clienteNome: clienteSel ? clienteSel.razaoSocial || clienteSel.nomeFantasia : 'Cliente',
      contatoNome: form.contatoNome || (clienteSel?.contatos?.[0]?.nome || 'Contato Principal'),
      contatoEmail: form.contatoEmail || (clienteSel?.contatos?.[0]?.email || 'contato@cliente.com.br'),
      produtoId: form.produtoId,
      produtoNome: produtoSel ? produtoSel.nome : 'Focus ERP',
      projetoId: form.projetoId || undefined,
      projetoNome: projetoSel ? projetoSel.nome : undefined,
      categoria: form.categoria,
      tipo: form.tipo,
      prioridade: form.prioridade,
      responsavelNome: form.responsavelNome || 'Equipe Suporte',
      status: 'Aberto',
      slaHorasPrimeiraResposta: 4,
      slaHorasResolucao: form.prioridade === 'Crítica' ? 4 : form.prioridade === 'Alta' ? 8 : 24,
      dataLimiteResolucao: new Date(Date.now() + 24 * 3600000).toISOString(),
      titulo: form.titulo,
      descricao: form.descricao,
    });

    onOpenChange(false);
    setForm({
      clienteId: '',
      produtoId: '',
      projetoId: '',
      tipo: 'Suporte',
      prioridade: 'Média',
      categoria: 'Geral',
      contatoNome: '',
      contatoEmail: '',
      responsavelNome: 'Ana Clara (Nível 2)',
      titulo: '',
      descricao: '',
      slaHorasResolucao: 24,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <Headphones className="h-5 w-5 text-primary" /> Abrir Novo Chamado no Service Desk
          </DialogTitle>
          <DialogDescription className="text-xs">
            Registre solicitações técnicas, dúvidas, incidentes ou solicitações de melhorias vinculadas ao cliente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 text-xs">
          {/* CLIENTE & PRODUTO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Cliente * (Proveniente de Clientes)</Label>
              <Select value={form.clienteId} onValueChange={(val) => setForm({ ...form, clienteId: val })}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Selecione o Cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.razaoSocial || c.nomeFantasia} ({c.codigo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Produto Focus *</Label>
              <Select value={form.produtoId} onValueChange={(val) => setForm({ ...form, produtoId: val })}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Selecione o Software" />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nome} ({p.categoria})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold">Projeto Vinculado (Opcional)</Label>
            <Select value={form.projetoId} onValueChange={(val) => setForm({ ...form, projetoId: val })}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Selecione um Projeto do PMO (Opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhum Projeto</SelectItem>
                {projetos.map((pj) => (
                  <SelectItem key={pj.id} value={pj.id}>
                    {pj.nome} ({pj.codigo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TIPO & PRIORIDADE */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Tipo do Chamado *</Label>
              <Select value={form.tipo} onValueChange={(val: TipoChamado) => setForm({ ...form, tipo: val })}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dúvida">Dúvida</SelectItem>
                  <SelectItem value="Suporte">Suporte Técnico</SelectItem>
                  <SelectItem value="Incidente">Incidente</SelectItem>
                  <SelectItem value="Bug">Bug / Erro</SelectItem>
                  <SelectItem value="Correção">Correção</SelectItem>
                  <SelectItem value="Evolução">Evolução</SelectItem>
                  <SelectItem value="Nova Funcionalidade">Nova Funcionalidade</SelectItem>
                  <SelectItem value="Implantação">Implantação</SelectItem>
                  <SelectItem value="Treinamento">Treinamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Prioridade *</Label>
              <Select value={form.prioridade} onValueChange={(val: PrioridadeChamado) => setForm({ ...form, prioridade: val })}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Crítica">Crítica (Impeditivo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Categoria</Label>
              <Input
                placeholder="Ex: Financeiro, Fiscal, CRM"
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Nome do Solicitante</Label>
              <Input
                placeholder="Ex: Carlos Andrade (CTO)"
                value={form.contatoNome}
                onChange={(e) => setForm({ ...form, contatoNome: e.target.value })}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">E-mail do Solicitante</Label>
              <Input
                type="email"
                placeholder="carlos@cliente.com.br"
                value={form.contatoEmail}
                onChange={(e) => setForm({ ...form, contatoEmail: e.target.value })}
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold">Assunto / Título do Chamado *</Label>
            <Input
              required
              placeholder="Ex: Erro no cálculo de alíquota ao gerar NFS-e"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold">Descrição do Atendimento *</Label>
            <Textarea
              rows={4}
              required
              placeholder="Descreva o problema observado, passos para reproduzir ou a solicitação..."
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="text-xs"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" size="sm" className="gap-1.5 font-semibold">
              <Plus className="h-4 w-4" /> Abrir Chamado
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
