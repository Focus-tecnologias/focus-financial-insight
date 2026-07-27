import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Target, Megaphone, Plus, Search, Filter, LayoutGrid, List, Trash2 } from 'lucide-react';
import { useLocalStorageState } from "@/hooks/useDataStore";
import { toast } from "sonner";

export interface CampanhaMarketing {
  id: string;
  nome: string;
  objetivo: string;
  status: string;
  progresso: number;
  orcamentoTotal: string;
  gasto: string;
  dataInicio: string;
  dataFim: string;
  canais: string[];
  responsavel: string;
}

const defaultCampanhas: CampanhaMarketing[] = [];
  {
    id: 'camp-1',
    nome: 'Black Friday 2026',
    objetivo: 'Aquisição de novos clientes via promoção de fim de ano',
    status: 'Em Andamento',
    progresso: 65,
    orcamentoTotal: 'R$ 12.000',
    gasto: 'R$ 7.800',
    dataInicio: '2026-11-01',
    dataFim: '2026-11-30',
    canais: ['Meta Ads', 'Google Ads', 'E-mail'],
    responsavel: 'Ana Lima',
  },
  {
    id: 'camp-2',
    nome: 'Captação de Leads ERP Q3',
    objetivo: 'Geração de leads qualificados para o produto ERP',
    status: 'Em Andamento',
    progresso: 40,
    orcamentoTotal: 'R$ 8.500',
    gasto: 'R$ 3.400',
    dataInicio: '2026-07-01',
    dataFim: '2026-09-30',
    canais: ['Google Ads', 'LinkedIn Ads'],
    responsavel: 'Carlos Oliveira',
  },
  {
    id: 'camp-3',
    nome: 'Webinar: Gestão Financeira 2027',
    objetivo: 'Posicionamento de marca e captação de leads via evento online',
    status: 'Planejamento',
    progresso: 15,
    orcamentoTotal: 'R$ 3.200',
    gasto: 'R$ 480',
    dataInicio: '2026-09-10',
    dataFim: '2026-09-10',
    canais: ['LinkedIn Ads', 'E-mail'],
    responsavel: 'Beatriz Santos',
  },
];

const CANAIS_OPCOES = ['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'TikTok Ads', 'E-mail Marketing', 'SEO / Orgânico', 'YouTube', 'WhatsApp'];

const statusColor: Record<string, string> = {
  'Em Andamento': 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/30',
  'Concluída': 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30',
  'Planejamento': 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/30',
  'Pausada': 'text-slate-500 border-slate-200 bg-slate-50 dark:bg-slate-950/30',
};

// ─── Modal Nova Campanha ───────────────────────────────────────────────────────
function NovaCampanhaModal({ open, onClose, onSave }: {
  open: boolean; onClose: () => void; onSave: (c: CampanhaMarketing) => void;
}) {
  const [form, setForm] = useState({
    nome: '', objetivo: '', status: 'Planejamento', orcamentoTotal: '',
    dataInicio: '', dataFim: '', responsavel: '', canais: [] as string[],
  });

  const toggleCanal = (canal: string) => {
    setForm(f => ({
      ...f,
      canais: f.canais.includes(canal) ? f.canais.filter(c => c !== canal) : [...f.canais, canal],
    }));
  };

  const handleSave = () => {
    if (!form.nome.trim()) { toast.error('Informe o nome da campanha'); return; }
    if (!form.objetivo.trim()) { toast.error('Informe o objetivo'); return; }
    if (form.canais.length === 0) { toast.error('Selecione ao menos um canal'); return; }
    const nova: CampanhaMarketing = {
      id: `camp-${Date.now()}`,
      nome: form.nome,
      objetivo: form.objetivo,
      status: form.status,
      progresso: 0,
      orcamentoTotal: form.orcamentoTotal || 'R$ 0',
      gasto: 'R$ 0',
      dataInicio: form.dataInicio,
      dataFim: form.dataFim,
      canais: form.canais,
      responsavel: form.responsavel,
    };
    onSave(nova);
    toast.success(`Campanha "${nova.nome}" criada!`);
    onClose();
    setForm({ nome: '', objetivo: '', status: 'Planejamento', orcamentoTotal: '', dataInicio: '', dataFim: '', responsavel: '', canais: [] });
  };

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" /> Nova Campanha de Marketing
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label>Nome da Campanha *</Label>
              <Input placeholder="Ex: Black Friday 2026" value={form.nome} onChange={e => set('nome', e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Objetivo *</Label>
              <Textarea placeholder="Descreva o objetivo principal da campanha..." value={form.objetivo} onChange={e => set('objetivo', e.target.value)} rows={2} />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => set('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planejamento">Planejamento</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Pausada">Pausada</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Orçamento Total</Label>
              <Input placeholder="Ex: R$ 5.000" value={form.orcamentoTotal} onChange={e => set('orcamentoTotal', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Data de Início</Label>
              <Input type="date" value={form.dataInicio} onChange={e => set('dataInicio', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Data de Fim</Label>
              <Input type="date" value={form.dataFim} onChange={e => set('dataFim', e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Responsável</Label>
              <Input placeholder="Nome do responsável" value={form.responsavel} onChange={e => set('responsavel', e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Canais *</Label>
            <div className="flex flex-wrap gap-2">
              {CANAIS_OPCOES.map(canal => (
                <button
                  key={canal}
                  type="button"
                  onClick={() => toggleCanal(canal)}
                  className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${
                    form.canais.includes(canal)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted/30 text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                  {canal}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} className="gap-2"><Plus className="w-4 h-4"/> Criar Campanha</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Componente Principal ──────────────────────────────────────────────────────
export function CampanhasMarketingView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [modalOpen, setModalOpen] = useState(false);

  const { data: campanhas, addItem, removeItem } = useLocalStorageState<CampanhaMarketing>('focus_marketing_campanhas', defaultCampanhas);

  const filteredCampanhas = campanhas.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.objetivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-2 border-b">
        <div>
          <h3 className="font-medium text-lg">Campanhas de Marketing</h3>
          <p className="text-sm text-muted-foreground">Gestão e acompanhamento de campanhas multiplataforma.</p>
        </div>
        <Button className="gap-2 shrink-0" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4"/> Nova Campanha
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar campanha..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Button variant="outline" className="gap-2 shrink-0"><Filter className="w-4 h-4"/> Filtros</Button>
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-md">
          <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" className="h-8 px-2" onClick={() => setViewMode('grid')}><LayoutGrid className="w-4 h-4"/></Button>
          <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="h-8 px-2" onClick={() => setViewMode('list')}><List className="w-4 h-4"/></Button>
        </div>
      </div>

      {filteredCampanhas.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center text-muted-foreground">
          <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="font-medium">Nenhuma campanha encontrada.</p>
          <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={() => setModalOpen(true)}>
            <Plus className="w-4 h-4"/> Criar primeira campanha
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampanhas.map((campanha) => (
            <Card key={campanha.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className={`text-xs ${statusColor[campanha.status] || ''}`}>{campanha.status}</Badge>
                  <div className="flex items-center gap-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">{campanha.responsavel?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => { removeItem(campanha.id); toast.success('Campanha removida'); }}>
                      <Trash2 className="w-3 h-3 text-muted-foreground hover:text-rose-500" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-base group-hover:text-primary transition-colors">{campanha.nome}</CardTitle>
                <p className="text-xs text-muted-foreground">{campanha.objetivo}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Progresso</span>
                      <span className="text-muted-foreground">{campanha.progresso}%</span>
                    </div>
                    <Progress value={campanha.progresso} className="h-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm border-t pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Orçamento</p>
                      <p className="font-semibold">{campanha.orcamentoTotal}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Consumido</p>
                      <p className="font-semibold text-rose-600">{campanha.gasto}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 border-t pt-3">
                    {campanha.canais.map(canal => (
                      <Badge key={canal} variant="secondary" className="text-[10px] font-normal">{canal}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg bg-card overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="p-3 text-left font-medium">Campanha</th>
                <th className="p-3 text-left font-medium">Canais</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Progresso</th>
                <th className="p-3 text-left font-medium">Orçamento</th>
                <th className="p-3 text-left font-medium">Responsável</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCampanhas.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 cursor-pointer group">
                  <td className="p-3">
                    <p className="font-semibold">{c.nome}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">{c.objetivo}</p>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {c.canais.slice(0, 2).map(canal => (<Badge key={canal} variant="secondary" className="text-[10px]">{canal}</Badge>))}
                      {c.canais.length > 2 && <Badge variant="outline" className="text-[10px]">+{c.canais.length - 2}</Badge>}
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className={`text-xs ${statusColor[c.status] || ''}`}>{c.status}</Badge>
                  </td>
                  <td className="p-3 w-32">
                    <div className="flex items-center gap-2">
                      <Progress value={c.progresso} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{c.progresso}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-medium">{c.orcamentoTotal}</td>
                  <td className="p-3 text-sm">{c.responsavel}</td>
                  <td className="p-3">
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => { removeItem(c.id); toast.success('Removida'); }}>
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-rose-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NovaCampanhaModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addItem} />
    </div>
  );
}
