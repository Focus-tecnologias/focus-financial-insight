import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Lightbulb, PenTool, Library, Search, Filter, Folder, Image as ImageIcon, FileText, Video, Download, UploadCloud, Copy, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLocalStorageState } from "@/hooks/useDataStore";
import { toast } from "sonner";

export interface PostEditorial {
  id: string;
  titulo: string;
  rede: string;
  formato: string;
  data: string;
  hora: string;
  responsavel: string;
  status: string;
  aprovar?: boolean;
}

export interface IdeiaMarketing {
  id: string;
  titulo: string;
  categoria: string;
  prioridade: string;
}

export interface AtivoMidia {
  id: string;
  nome: string;
  tipo: string;
  tamanho: string;
  data: string;
  cor?: string;
}

const defaultConteudos: PostEditorial[] = [
  { id: 'ed-1', titulo: 'Como o ERP pode reduzir custos operacionais em 30%', rede: 'LinkedIn', formato: 'Artigo', data: '2026-07-28', hora: '09:00', responsavel: 'Ana Lima', status: 'Em Produção', aprovar: true },
  { id: 'ed-2', titulo: '5 sinais que sua empresa precisa de um sistema de RH', rede: 'Instagram', formato: 'Carrossel', data: '2026-07-30', hora: '18:00', responsavel: 'Carlos Oliveira', status: 'Agendado' },
  { id: 'ed-3', titulo: 'Webinar: Gestão Financeira Inteligente para 2027', rede: 'YouTube', formato: 'Vídeo Live', data: '2026-08-05', hora: '19:00', responsavel: 'Beatriz Santos', status: 'Em Produção', aprovar: true },
  { id: 'ed-4', titulo: 'Case de Sucesso: Cliente X economizou R$200k com nosso ERP', rede: 'LinkedIn', formato: 'Post', data: '2026-08-10', hora: '10:00', responsavel: 'Ana Lima', status: 'Rascunho' },
];

const defaultIdeias: IdeiaMarketing[] = [
  { id: 'id-1', titulo: 'Série de vídeos curtos "Erro Clássico do Financeiro"', categoria: 'Video/Reel', prioridade: 'Alta' },
  { id: 'id-2', titulo: 'Comparativo: ERP próprio vs. Planilha Excel', categoria: 'Infográfico', prioridade: 'Alta' },
  { id: 'id-3', titulo: 'Podcast mensal com CFOs de médias empresas', categoria: 'Áudio', prioridade: 'Média' },
  { id: 'id-4', titulo: 'Calculadora interativa de ROI de ERP no site', categoria: 'Ferramenta/Site', prioridade: 'Alta' },
  { id: 'id-5', titulo: 'Newsletter semanal com dicas de gestão fiscal', categoria: 'E-mail', prioridade: 'Média' },
  { id: 'id-6', titulo: 'Stories temáticos: "Um dia na vida do controller"', categoria: 'Stories', prioridade: 'Baixa' },
];

const defaultMidias: AtivoMidia[] = [
  { id: 'mid-1', nome: 'Logo Focus ERP Horizontal', tipo: 'image', tamanho: '245 KB', data: '2026-05-10', cor: 'bg-blue-100' },
  { id: 'mid-2', nome: 'Apresentação Comercial Q3', tipo: 'document', tamanho: '3.2 MB', data: '2026-07-01', cor: 'bg-orange-100' },
  { id: 'mid-3', nome: 'Vídeo Institucional 2026', tipo: 'video', tamanho: '82 MB', data: '2026-06-15', cor: 'bg-purple-100' },
  { id: 'mid-4', nome: 'Banners Black Friday Pack', tipo: 'image', tamanho: '1.8 MB', data: '2026-07-20', cor: 'bg-pink-100' },
];

const brandColors = [
  { name: "Primary Dark", hex: "#0f172a" },
  { name: "Secondary", hex: "#334155" },
  { name: "Accent Blue", hex: "#3b82f6" },
  { name: "Success", hex: "#10b981" },
  { name: "Warning", hex: "#f59e0b" },
  { name: "Danger", hex: "#ef4444" },
];

const statusColor: Record<string, string> = {
  'Agendado': 'text-emerald-600 border-emerald-200 bg-emerald-50',
  'Em Produção': 'text-blue-600 border-blue-200 bg-blue-50',
  'Rascunho': 'text-slate-500 border-slate-200 bg-slate-50',
  'Publicado': 'text-purple-600 border-purple-200 bg-purple-50',
};

const REDES = ['Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'Facebook', 'Twitter/X', 'WhatsApp', 'Blog'];
const FORMATOS = ['Post', 'Carrossel', 'Reels/Short', 'Story', 'Artigo', 'Vídeo Live', 'Newsletter', 'Infográfico', 'Podcast'];

// ─── Modal Novo Conteúdo ───────────────────────────────────────────────────────
function NovoConteudoModal({ open, onClose, onSave }: {
  open: boolean; onClose: () => void; onSave: (c: PostEditorial) => void;
}) {
  const [form, setForm] = useState({
    titulo: '', rede: '', formato: '', data: '', hora: '12:00',
    responsavel: '', status: 'Rascunho', aprovar: false,
  });

  const set = (field: string, value: string | boolean) => setForm(f => ({ ...f, [field]: value }));

  const handleSave = () => {
    if (!form.titulo.trim()) { toast.error('Informe o título do conteúdo'); return; }
    if (!form.rede) { toast.error('Selecione a rede social'); return; }
    if (!form.formato) { toast.error('Selecione o formato'); return; }
    if (!form.data) { toast.error('Selecione a data de publicação'); return; }
    const novo: PostEditorial = {
      id: `ed-${Date.now()}`,
      titulo: form.titulo,
      rede: form.rede,
      formato: form.formato,
      data: form.data,
      hora: form.hora,
      responsavel: form.responsavel,
      status: form.status,
      aprovar: form.aprovar,
    };
    onSave(novo);
    toast.success(`Conteúdo "${novo.titulo}" criado!`);
    onClose();
    setForm({ titulo: '', rede: '', formato: '', data: '', hora: '12:00', responsavel: '', status: 'Rascunho', aprovar: false });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-primary" /> Novo Conteúdo Editorial
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Título / Tema *</Label>
            <Textarea placeholder="Ex: 5 razões para adotar um ERP em 2026" value={form.titulo} onChange={e => set('titulo', e.target.value)} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Rede Social *</Label>
              <Select value={form.rede} onValueChange={v => set('rede', v)}>
                <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                <SelectContent>
                  {REDES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Formato *</Label>
              <Select value={form.formato} onValueChange={v => set('formato', v)}>
                <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                <SelectContent>
                  {FORMATOS.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Data de Publicação *</Label>
              <Input type="date" value={form.data} onChange={e => set('data', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Horário</Label>
              <Input type="time" value={form.hora} onChange={e => set('hora', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => set('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rascunho">Rascunho</SelectItem>
                  <SelectItem value="Em Produção">Em Produção</SelectItem>
                  <SelectItem value="Agendado">Agendado</SelectItem>
                  <SelectItem value="Publicado">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Responsável</Label>
              <Input placeholder="Nome" value={form.responsavel} onChange={e => set('responsavel', e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="aprovar"
              checked={form.aprovar}
              onChange={e => set('aprovar', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="aprovar" className="cursor-pointer text-sm font-normal">Exige aprovação antes de publicar</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} className="gap-2"><Plus className="w-4 h-4"/> Criar Conteúdo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Modal Nova Ideia ──────────────────────────────────────────────────────────
function NovaIdeiaModal({ open, onClose, onSave }: {
  open: boolean; onClose: () => void; onSave: (i: IdeiaMarketing) => void;
}) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridade, setPrioridade] = useState('Média');

  const handleSave = () => {
    if (!titulo.trim()) { toast.error('Informe o título'); return; }
    onSave({ id: `id-${Date.now()}`, titulo, categoria: categoria || 'Geral', prioridade });
    toast.success('Ideia adicionada ao banco!');
    onClose();
    setTitulo(''); setCategoria(''); setPrioridade('Média');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" /> Sugerir Nova Ideia
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Título da Ideia *</Label>
            <Textarea placeholder="Ex: Série de vídeos curtos sobre gestão financeira..." value={titulo} onChange={e => setTitulo(e.target.value)} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Video/Reel">Video/Reel</SelectItem>
                  <SelectItem value="Infográfico">Infográfico</SelectItem>
                  <SelectItem value="Áudio">Áudio</SelectItem>
                  <SelectItem value="Ferramenta/Site">Ferramenta/Site</SelectItem>
                  <SelectItem value="E-mail">E-mail</SelectItem>
                  <SelectItem value="Stories">Stories</SelectItem>
                  <SelectItem value="Artigo">Artigo</SelectItem>
                  <SelectItem value="Geral">Geral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Prioridade</Label>
              <Select value={prioridade} onValueChange={setPrioridade}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
            <Lightbulb className="w-4 h-4"/> Salvar Ideia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Ícone por tipo ────────────────────────────────────────────────────────────
function renderIcon(tipo: string) {
  switch (tipo) {
    case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
    case 'video': return <Video className="w-8 h-8 text-purple-500" />;
    case 'document': return <FileText className="w-8 h-8 text-orange-500" />;
    default: return <Folder className="w-8 h-8 text-muted-foreground" />;
  }
}

// ─── Componente Principal ──────────────────────────────────────────────────────
export function CalendarioEditorialView() {
  const [activeTab, setActiveTab] = useState<'producao' | 'ideias' | 'midia'>('producao');
  const [conteudoModal, setConteudoModal] = useState(false);
  const [ideiaModal, setIdeiaModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMidia, setSearchMidia] = useState("");

  const { data: conteudos, addItem: addConteudo, removeItem: removeConteudo } = useLocalStorageState<PostEditorial>('focus_marketing_editorial', defaultConteudos);
  const { data: ideias, addItem: addIdeia, removeItem: removeIdeia } = useLocalStorageState<IdeiaMarketing>('focus_marketing_ideias', defaultIdeias);
  const { data: midias } = useLocalStorageState<AtivoMidia>('focus_marketing_midias', defaultMidias);

  const filteredConteudos = conteudos.filter(c => c.titulo.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredMidias = midias.filter(a => a.nome.toLowerCase().includes(searchMidia.toLowerCase()));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copiado: ${text}`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-2 border-b">
        <div>
          <h3 className="font-medium text-lg">Conteúdo & Mídia</h3>
          <p className="text-sm text-muted-foreground">Calendário editorial, banco de ideias e biblioteca de ativos de mídia.</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'producao' && (
            <Button size="sm" className="gap-2 shrink-0" onClick={() => setConteudoModal(true)}>
              <Plus className="w-4 h-4"/> Novo Conteúdo
            </Button>
          )}
          {activeTab === 'midia' && (
            <Button size="sm" className="gap-2 shrink-0"><UploadCloud className="w-4 h-4"/> Fazer Upload</Button>
          )}
          {activeTab === 'ideias' && (
            <Button size="sm" variant="outline" className="gap-2 shrink-0" onClick={() => setIdeiaModal(true)}>
              <Plus className="w-4 h-4"/> Sugerir Ideia
            </Button>
          )}
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
        <Button variant={activeTab === 'producao' ? 'secondary' : 'ghost'} size="sm" className="gap-2" onClick={() => setActiveTab('producao')}>
          <PenTool className="w-4 h-4"/> Produção
        </Button>
        <Button variant={activeTab === 'ideias' ? 'secondary' : 'ghost'} size="sm" className="gap-2" onClick={() => setActiveTab('ideias')}>
          <Lightbulb className="w-4 h-4"/> Banco de Ideias
        </Button>
        <Button variant={activeTab === 'midia' ? 'secondary' : 'ghost'} size="sm" className="gap-2" onClick={() => setActiveTab('midia')}>
          <Library className="w-4 h-4"/> Biblioteca de Mídia
        </Button>
      </div>

      {/* Produção */}
      {activeTab === 'producao' && (
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar conteúdo..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          {filteredConteudos.length === 0 ? (
            <div className="border border-dashed rounded-lg p-12 text-center text-muted-foreground">
              <PenTool className="w-10 h-10 mx-auto mb-2 opacity-20" />
              <p className="font-medium">Nenhum conteúdo encontrado.</p>
              <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={() => setConteudoModal(true)}>
                <Plus className="w-4 h-4"/> Criar conteúdo
              </Button>
            </div>
          ) : (
            <div className="border rounded-lg bg-card overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="p-3 text-left font-medium">Conteúdo</th>
                    <th className="p-3 text-left font-medium">Data</th>
                    <th className="p-3 text-left font-medium">Rede / Formato</th>
                    <th className="p-3 text-left font-medium">Responsável</th>
                    <th className="p-3 text-left font-medium">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredConteudos.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30 cursor-pointer group">
                      <td className="p-3 font-semibold max-w-[240px]">
                        <p className="truncate" title={item.titulo}>{item.titulo}</p>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{new Date(item.data + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                          <span className="text-xs text-muted-foreground">{item.hora}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-primary">{item.rede}</span>
                          <span className="text-xs text-muted-foreground">{item.formato}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">{item.responsavel?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{item.responsavel}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1.5 items-start">
                          <Badge variant="outline" className={`text-xs ${statusColor[item.status] || ''}`}>{item.status}</Badge>
                          {item.aprovar && (
                            <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-semibold">Exige Aprovação</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => { removeConteudo(item.id); toast.success('Removido'); }}>
                          <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-rose-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Banco de Ideias */}
      {activeTab === 'ideias' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> {ideias.length} idea{ideias.length !== 1 ? 's' : ''} no banco
            </h4>
          </div>
          {ideias.length === 0 ? (
            <div className="border border-dashed rounded-lg p-12 text-center text-muted-foreground">
              <Lightbulb className="w-10 h-10 mx-auto mb-2 text-amber-400/40" />
              <p className="font-medium">Nenhuma ideia cadastrada.</p>
              <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={() => setIdeiaModal(true)}>
                <Plus className="w-4 h-4"/> Sugerir ideia
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ideias.map((ideia) => (
                <div key={ideia.id} className="border rounded-lg p-4 bg-card flex flex-col justify-between group hover:border-amber-400 transition-colors cursor-pointer">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary" className="text-[10px]">{ideia.categoria}</Badge>
                      <div className="flex items-center gap-1">
                        <Badge variant={ideia.prioridade === 'Alta' ? 'default' : 'outline'} className={`text-[10px] ${ideia.prioridade === 'Alta' ? 'bg-amber-500 hover:bg-amber-600 border-0' : ''}`}>
                          {ideia.prioridade}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 group-hover:opacity-100" onClick={() => { removeIdeia(ideia.id); toast.success('Ideia removida'); }}>
                          <Trash2 className="w-3 h-3 text-muted-foreground hover:text-rose-500" />
                        </Button>
                      </div>
                    </div>
                    <h5 className="font-semibold text-sm leading-tight">{ideia.titulo}</h5>
                  </div>
                  <div className="mt-4 pt-3 border-t flex justify-end">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => { addConteudo({ id: `ed-${Date.now()}`, titulo: ideia.titulo, rede: '', formato: '', data: '', hora: '', responsavel: '', status: 'Rascunho' }); removeIdeia(ideia.id); setActiveTab('producao'); toast.success('Ideia convertida em conteúdo!'); }}>
                      Transformar em Conteúdo →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Biblioteca de Mídia */}
      {activeTab === 'midia' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar arquivos..." className="pl-8" value={searchMidia} onChange={(e) => setSearchMidia(e.target.value)} />
            </div>
            <Button variant="outline" className="gap-2"><Filter className="w-4 h-4"/> Filtros</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMidias.map((arquivo) => (
              <Card key={arquivo.id} className="hover:border-primary/50 transition-colors group cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className={`p-4 rounded-full mb-3 ${arquivo.cor || 'bg-muted'}`}>
                    {renderIcon(arquivo.tipo)}
                  </div>
                  <h4 className="text-sm font-medium truncate w-full" title={arquivo.nome}>{arquivo.nome}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{arquivo.tamanho}</p>
                  <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-7 w-7"><Download className="w-3 h-3"/></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredMidias.length === 0 && (
              <div className="col-span-full border border-dashed rounded-lg p-12 text-center text-muted-foreground">
                <Folder className="w-10 h-10 mx-auto mb-2 opacity-20" />
                <p className="font-medium">Nenhum arquivo encontrado.</p>
              </div>
            )}
          </div>
          <div className="border-t pt-6">
            <h4 className="font-medium text-base mb-4">Paleta de Cores da Marca</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {brandColors.map((color) => (
                <div key={color.hex} className="border rounded-lg overflow-hidden group">
                  <div className="h-20 w-full relative" style={{ backgroundColor: color.hex }}>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" variant="secondary" onClick={() => copyToClipboard(color.hex)} className="h-8 w-8">
                        <Copy className="w-3.5 h-3.5"/>
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 bg-card">
                    <p className="font-medium text-xs">{color.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <NovoConteudoModal open={conteudoModal} onClose={() => setConteudoModal(false)} onSave={addConteudo} />
      <NovaIdeiaModal open={ideiaModal} onClose={() => setIdeiaModal(false)} onSave={addIdeia} />
    </div>
  );
}
