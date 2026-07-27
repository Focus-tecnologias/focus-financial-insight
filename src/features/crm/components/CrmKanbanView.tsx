import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Plus, RefreshCw, CheckCircle2, ArrowRight, Building2, User, Key, Layers } from 'lucide-react';
import { useCrmStore } from '../hooks/useCrmStore';
import { EtapaPipeline, OportunidadeCrm } from '../types';
import { toast } from 'sonner';

const ETAPAS: EtapaPipeline[] = [
  'Qualificação',
  'Diagnóstico & Reunião',
  'Proposta Apresentada',
  'Em Negociação',
  'Fechado Ganho',
  'Perdido'
];

export function CrmKanbanView() {
  const { oportunidades, config, moverOportunidadeEtapa, addOportunidade, carregarDadosDemo } = useCrmStore();
  const [selectedOp, setSelectedOp] = useState<OportunidadeCrm | null>(null);
  const [openNewModal, setOpenNewModal] = useState(false);

  // Form State Nova Oportunidade
  const [titulo, setTitulo] = useState('');
  const [empresaNome, setEmpresaNome] = useState('');
  const [contatoNome, setContatoNome] = useState('');
  const [valorR$, setValorR$] = useState('100000');
  const [responsavel, setResponsavel] = useState('Mariana Oliveira');
  const [etapa, setEtapa] = useState<EtapaPipeline>('Qualificação');

  const handleCreateNew = () => {
    if (!titulo || !empresaNome) {
      toast.error('Preencha o título e a empresa da oportunidade.');
      return;
    }

    addOportunidade({
      titulo,
      empresaNome,
      contatoNome: contatoNome || 'Contato Principal',
      valorR$: parseFloat(valorR$) || 50000,
      probabilidadePercent: 50,
      responsavel,
      pipeline: 'Pipeline Vendas Enterprise 2026',
      etapa,
      prioridade: 'Alta',
      tags: ['ClickUp Synced', 'Novo Lead'],
      dataPrevistaFechamento: new Date(Date.now() + 86400000 * 45).toISOString().split('T')[0],
      proximaAcao: 'Agendar primeira reunião de diagnóstico'
    });

    setOpenNewModal(false);
    setTitulo('');
    setEmpresaNome('');
  };

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      {/* Cabeçalho do Kanban */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-base flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" /> Kanban Pipeline de Oportunidades (ClickUp Engine)
          </h3>
          <p className="text-xs text-muted-foreground">Arraste ou mova os cartões de etapas para sincronizar em tempo real com as tarefas no ClickUp.</p>
        </div>

        <div className="flex items-center gap-2">
          {oportunidades.length === 0 && (
            <Button variant="outline" onClick={carregarDadosDemo} className="text-xs gap-1.5 border-blue-400 text-blue-600">
              <Layers className="w-3.5 h-3.5" /> Exemplo Demo
            </Button>
          )}

          <Button onClick={() => setOpenNewModal(true)} className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="w-4 h-4" /> Nova Oportunidade (ClickUp Sync)
          </Button>
        </div>
      </div>

      {/* Banner de Estado Limpo se não houver oportunidades */}
      {oportunidades.length === 0 && (
        <div className="p-4 border border-dashed rounded-lg bg-orange-50/40 dark:bg-orange-950/20 text-xs flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <Key className="w-6 h-6 text-orange-500 flex-shrink-0" />
            <div>
              <p className="font-bold text-foreground">Nenhuma oportunidade cadastrada no CRM.</p>
              <p className="text-muted-foreground">
                Conecte seu **ClickUp Personal API Token** na aba <span className="font-semibold text-orange-600">ClickUp Engine & Logs</span> para importar suas tarefas reais em tempo real ou crie uma oportunidade manualmente acima.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Colunas do Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {ETAPAS.map(e => {
          const opsNaEtapa = oportunidades.filter(o => o.etapa === e);
          const totalValorEtapa = opsNaEtapa.reduce((acc, o) => acc + o.valorR$, 0);

          return (
            <div key={e} className="bg-muted/40 p-3 rounded-lg border min-w-[220px] space-y-3">
              {/* Header da Coluna */}
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <div>
                  <h4 className="font-bold text-xs text-foreground flex items-center gap-1.5">
                    {e}
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{opsNaEtapa.length}</Badge>
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-medium">R$ {totalValorEtapa.toLocaleString('pt-BR')}</p>
                </div>
              </div>

              {/* Lista de Cards */}
              <div className="space-y-3 min-h-[250px]">
                {opsNaEtapa.length === 0 ? (
                  <div className="h-full flex items-center justify-center p-4 border border-dashed rounded text-[11px] text-muted-foreground text-center">
                    Nenhum item nesta etapa
                  </div>
                ) : (
                  opsNaEtapa.map(op => (
                    <Card key={op.id} className="hover:border-primary/50 transition-all shadow-sm bg-card cursor-pointer group">
                      <CardContent className="p-3 space-y-2.5 text-xs">
                        {/* Badge ClickUp & Prioridade */}
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-[9px] font-mono border-orange-500/40 text-orange-600 bg-orange-50 dark:bg-orange-950/40 gap-1">
                            <RefreshCw className="w-2.5 h-2.5" /> {op.clickUpTaskId}
                          </Badge>
                          <Badge className={
                            op.prioridade === 'Urgente' ? 'bg-rose-100 text-rose-800 border-rose-200 text-[9px]' :
                            op.prioridade === 'Alta' ? 'bg-amber-100 text-amber-800 border-amber-200 text-[9px]' : 'bg-slate-100 text-slate-700 text-[9px]'
                          }>
                            {op.prioridade}
                          </Badge>
                        </div>

                        {/* Título & Empresa */}
                        <div>
                          <h5 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors leading-snug">
                            {op.titulo}
                          </h5>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-muted-foreground" /> {op.empresaNome}
                          </p>
                        </div>

                        {/* Valor R$ e Probabilidade */}
                        <div className="flex justify-between items-center pt-1 border-t border-border/50">
                          <span className="font-bold text-sm text-emerald-600">R$ {op.valorR$.toLocaleString('pt-BR')}</span>
                          <span className="text-[10px] font-semibold text-muted-foreground">{op.probabilidadePercent}% prob.</span>
                        </div>

                        {/* Responsável e Ação de Mover */}
                        <div className="flex justify-between items-center pt-1 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {op.responsavel.split(' ')[0]}</span>
                          
                          {e !== 'Fechado Ganho' ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={(ev) => {
                                ev.stopPropagation();
                                const nextIdx = ETAPAS.indexOf(e) + 1;
                                if (nextIdx < ETAPAS.length) {
                                  moverOportunidadeEtapa(op.id, ETAPAS[nextIdx]);
                                }
                              }}
                              className="h-6 text-[10px] px-2 gap-1 border-orange-500 text-orange-600 hover:bg-orange-50"
                            >
                              Avançar <ArrowRight className="w-2.5 h-2.5" />
                            </Button>
                          ) : (
                            <Badge className="bg-emerald-100 text-emerald-800 text-[9px]">✓ Ganho</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Nova Oportunidade */}
      <Dialog open={openNewModal} onOpenChange={setOpenNewModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Target className="w-5 h-5 text-primary" /> Criar Oportunidade no ClickUp & Focus
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-2">
              <Label>Título da Oportunidade *</Label>
              <Input placeholder="Ex: Contrato Focus ERP — Grupo Logística" value={titulo} onChange={e => setTitulo(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Empresa *</Label>
                <Input placeholder="Nome da empresa" value={empresaNome} onChange={e => setEmpresaNome(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Contato Decisor</Label>
                <Input placeholder="Nome do contato" value={contatoNome} onChange={e => setContatoNome(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Valor Estimado R$</Label>
                <Input type="number" value={valorR$} onChange={e => setValorR$(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Etapa Inicial</Label>
                <Select value={etapa} onValueChange={(v: any) => setEtapa(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ETAPAS.map(et => (
                      <SelectItem key={et} value={et}>{et}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNewModal(false)}>Cancelar</Button>
            <Button onClick={handleCreateNew} className="bg-orange-600 hover:bg-orange-700 text-white gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Salvar & Sincronizar com ClickUp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
