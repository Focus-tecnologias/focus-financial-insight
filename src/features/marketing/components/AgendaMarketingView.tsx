import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, Filter, Calendar as CalendarIcon, Clock, CheckSquare, MessageSquare, Paperclip, AlertCircle, LayoutList, Columns, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLocalStorageState } from "@/hooks/useDataStore";
import { toast } from "sonner";

export interface EventoMarketing {
  id: string;
  nome: string;
  tipo: string;
  status: string;
  data: string;
  hora: string;
  responsavel: string;
  descricao?: string;
  checklists: { total: number; concluidos: number };
  anexos: number;
  comentarios: number;
  cor: string;
}

const COR_POR_TIPO: Record<string, string> = {
  'Webinar': 'bg-blue-500',
  'Lançamento': 'bg-purple-500',
  'Reunião Interna': 'bg-slate-400',
  'Evento Externo': 'bg-emerald-500',
  'Live': 'bg-rose-500',
  'Campanha': 'bg-amber-500',
  'Publicação': 'bg-sky-500',
};

const defaultEventos: EventoMarketing[] = [
  {
    id: 'evt-1', nome: 'Webinar: Gestão Financeira 2027', tipo: 'Webinar', status: 'Em Produção',
    data: '2026-08-05', hora: '19:00', responsavel: 'Beatriz Santos', descricao: 'Webinar mensal para leads e clientes',
    checklists: { total: 8, concluidos: 5 }, anexos: 3, comentarios: 12, cor: 'bg-blue-500',
  },
  {
    id: 'evt-2', nome: 'Lançamento Feature: Dashboard BI', tipo: 'Lançamento', status: 'Planejado',
    data: '2026-08-20', hora: '10:00', responsavel: 'Carlos Oliveira', descricao: 'Lançamento do novo módulo de BI para clientes ativos',
    checklists: { total: 12, concluidos: 2 }, anexos: 1, comentarios: 4, cor: 'bg-purple-500',
  },
  {
    id: 'evt-3', nome: 'Revisão de Métricas Q3', tipo: 'Reunião Interna', status: 'Atrasado',
    data: '2026-07-15', hora: '14:00', responsavel: 'Ana Lima', descricao: 'Alinhamento de resultados e ajuste de campanhas',
    checklists: { total: 4, concluidos: 4 }, anexos: 0, comentarios: 2, cor: 'bg-slate-400',
  },
];

const TIPOS_EVENTO = ['Webinar', 'Lançamento', 'Reunião Interna', 'Evento Externo', 'Live', 'Campanha', 'Publicação'];

const statusColor: Record<string, string> = {
  'Planejado': 'text-amber-600 border-amber-200 bg-amber-50',
  'Em Produção': 'text-blue-600 border-blue-200 bg-blue-50',
  'Concluído': 'text-emerald-600 border-emerald-200 bg-emerald-50',
  'Atrasado': 'text-rose-600 border-rose-200 bg-rose-50',
  'Revisão': 'text-purple-600 border-purple-200 bg-purple-50',
};

// ─── Modal Novo Evento ─────────────────────────────────────────────────────────
function NovoEventoModal({ open, onClose, onSave }: {
  open: boolean; onClose: () => void; onSave: (e: EventoMarketing) => void;
}) {
  const [form, setForm] = useState({
    nome: '', tipo: '', status: 'Planejado', data: '', hora: '09:00',
    responsavel: '', descricao: '',
  });

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSave = () => {
    if (!form.nome.trim()) { toast.error('Informe o nome do evento'); return; }
    if (!form.tipo) { toast.error('Selecione o tipo do evento'); return; }
    if (!form.data) { toast.error('Selecione a data'); return; }
    const novo: EventoMarketing = {
      id: `evt-${Date.now()}`,
      nome: form.nome,
      tipo: form.tipo,
      status: form.status,
      data: form.data,
      hora: form.hora,
      responsavel: form.responsavel,
      descricao: form.descricao,
      checklists: { total: 0, concluidos: 0 },
      anexos: 0,
      comentarios: 0,
      cor: COR_POR_TIPO[form.tipo] || 'bg-primary',
    };
    onSave(novo);
    toast.success(`Evento "${novo.nome}" criado!`);
    onClose();
    setForm({ nome: '', tipo: '', status: 'Planejado', data: '', hora: '09:00', responsavel: '', descricao: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" /> Novo Evento de Marketing
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Nome do Evento *</Label>
            <Input placeholder="Ex: Webinar: Gestão Financeira 2027" value={form.nome} onChange={e => set('nome', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Tipo *</Label>
              <Select value={form.tipo} onValueChange={v => set('tipo', v)}>
                <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                <SelectContent>
                  {TIPOS_EVENTO.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => set('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planejado">Planejado</SelectItem>
                  <SelectItem value="Em Produção">Em Produção</SelectItem>
                  <SelectItem value="Revisão">Revisão</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Data *</Label>
              <Input type="date" value={form.data} onChange={e => set('data', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Horário</Label>
              <Input type="time" value={form.hora} onChange={e => set('hora', e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Responsável</Label>
              <Input placeholder="Nome do responsável" value={form.responsavel} onChange={e => set('responsavel', e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Descrição</Label>
            <Textarea placeholder="Descreva o objetivo e detalhes do evento..." value={form.descricao} onChange={e => set('descricao', e.target.value)} rows={3} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} className="gap-2"><Plus className="w-4 h-4"/> Criar Evento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Componente Principal ──────────────────────────────────────────────────────
export function AgendaMarketingView() {
  const [view, setView] = useState<'lista' | 'kanban'>('lista');
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { data: eventos, addItem, removeItem } = useLocalStorageState<EventoMarketing>('focus_marketing_eventos', defaultEventos);

  const filteredEventos = eventos.filter(e =>
    e.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hojeStr = new Date().toISOString().split('T')[0];
  const eventosHoje = eventos.filter(e => e.data === hojeStr).length;
  const emProducao = eventos.filter(e => e.status === 'Em Produção').length;
  const pendentes = eventos.filter(e => e.status === 'Atrasado' || e.status === 'Revisão').length;

  const kanbanColunas = [
    { label: 'Planejado', key: 'Planejado', cor: 'border-amber-400' },
    { label: 'Em Produção', key: 'Em Produção', cor: 'border-blue-400' },
    { label: 'Revisão', key: 'Revisão', cor: 'border-purple-400' },
    { label: 'Concluído', key: 'Concluído', cor: 'border-emerald-400' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 w-full sm:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar evento, campanha ou responsável..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Button variant="outline" className="gap-2 shrink-0"><Filter className="w-4 h-4"/> Filtros</Button>
        </div>
        <div className="flex gap-2">
          <div className="bg-muted p-1 rounded-md flex">
            <Button variant={view === 'lista' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('lista')} className="h-8 px-2">
              <LayoutList className="w-4 h-4" />
            </Button>
            <Button variant={view === 'kanban' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('kanban')} className="h-8 px-2">
              <Columns className="w-4 h-4" />
            </Button>
          </div>
          <Button className="gap-2" onClick={() => setModalOpen(true)}>
            <Plus className="w-4 h-4" /> Novo Evento
          </Button>
        </div>
      </div>

      {/* KPIs sumário */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Eventos Hoje</p>
              <h3 className="text-3xl font-bold text-primary">{eventosHoje}</h3>
            </div>
            <CalendarIcon className="w-8 h-8 text-primary/40" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Em Produção</p>
              <h3 className="text-3xl font-bold">{emProducao}</h3>
            </div>
            <Clock className="w-8 h-8 text-muted-foreground/30" />
          </CardContent>
        </Card>
        <Card className="border-rose-200 dark:border-rose-900/50">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-rose-600">Aprovações Pendentes</p>
              <h3 className="text-3xl font-bold text-rose-600">{pendentes}</h3>
            </div>
            <AlertCircle className="w-8 h-8 text-rose-600/30" />
          </CardContent>
        </Card>
      </div>

      {/* Vista Lista */}
      {view === 'lista' && (
        filteredEventos.length === 0 ? (
          <div className="border border-dashed rounded-lg p-12 text-center text-muted-foreground">
            <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="font-medium">Nenhum evento registrado.</p>
            <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={() => setModalOpen(true)}>
              <Plus className="w-4 h-4"/> Criar primeiro evento
            </Button>
          </div>
        ) : (
          <div className="border rounded-lg bg-card overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="p-3 text-left font-medium">Evento</th>
                  <th className="p-3 text-left font-medium">Responsável</th>
                  <th className="p-3 text-left font-medium">Data / Hora</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Progresso</th>
                  <th className="p-3 text-left font-medium">Ativos</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEventos.map((evento) => (
                  <tr key={evento.id} className="hover:bg-muted/30 cursor-pointer group">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${evento.cor || 'bg-blue-500'}`}></div>
                        <div>
                          <p className="font-semibold leading-none mb-1">{evento.nome}</p>
                          <p className="text-xs text-muted-foreground uppercase">{evento.tipo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">{evento.responsavel ? evento.responsavel.charAt(0) : 'U'}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{evento.responsavel}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                        <span className="text-xs text-muted-foreground">{evento.hora}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className={`text-xs ${statusColor[evento.status] || ''}`}>{evento.status}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckSquare className="w-3.5 h-3.5" />
                        {evento.checklists?.concluidos || 0}/{evento.checklists?.total || 0}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {(evento.anexos || 0) > 0 && (
                          <span className="flex items-center gap-1"><Paperclip className="w-3.5 h-3.5" /> {evento.anexos}</span>
                        )}
                        {(evento.comentarios || 0) > 0 && (
                          <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {evento.comentarios}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => { removeItem(evento.id); toast.success('Evento removido'); }}>
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-rose-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Vista Kanban */}
      {view === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColunas.map((col) => {
            const colEventos = eventos.filter(e => e.status === col.key);
            return (
              <div key={col.key} className={`border-t-2 ${col.cor} rounded-lg bg-muted/20 p-3 space-y-3`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{col.label}</h4>
                  <Badge variant="secondary" className="text-xs">{colEventos.length}</Badge>
                </div>
                {colEventos.length === 0 ? (
                  <div className="border border-dashed rounded-md p-4 text-center text-xs text-muted-foreground">
                    Sem eventos
                  </div>
                ) : colEventos.map(evento => (
                  <div key={evento.id} className="bg-card border rounded-lg p-3 hover:border-primary/50 transition-colors group cursor-pointer">
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <p className="font-semibold text-xs leading-snug">{evento.nome}</p>
                      <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100" onClick={() => { removeItem(evento.id); toast.success('Removido'); }}>
                        <Trash2 className="w-3 h-3 text-muted-foreground hover:text-rose-500" />
                      </Button>
                    </div>
                    <Badge variant="secondary" className="text-[10px] mb-2">{evento.tipo}</Badge>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[9px]">{evento.responsavel?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      <NovoEventoModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addItem} />
    </div>
  );
}
