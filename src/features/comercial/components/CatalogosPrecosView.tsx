import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Wrench, Layers, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useComercialStore } from '../hooks/useComercialStore';
import { ProdutoComercial, ServicoComercial } from '../types';

export function CatalogosPrecosView() {
  const { produtos, servicos, tabelas, addProdutoItem, addServicoItem } = useComercialStore();

  const [openProduto, setOpenProduto] = useState(false);
  const [novoProduto, setNovoProduto] = useState<Partial<ProdutoComercial>>({
    categoria: 'ERP',
    status: 'Ativo',
    tagPreco: 'Exato'
  });

  const [openServico, setOpenServico] = useState(false);
  const [novoServico, setNovoServico] = useState<Partial<ServicoComercial>>({
    categoria: 'Implantação',
    status: 'Ativo',
    tagPreco: 'Exato'
  });

  const handleAddProduto = (e: React.FormEvent) => {
    e.preventDefault();
    addProdutoItem({
      ...novoProduto,
      id: `prd-${Date.now()}`,
      codigo: novoProduto.codigo || `PRD-${Date.now().toString().slice(-4)}`,
      nome: novoProduto.nome || 'Novo Produto',
      descricao: novoProduto.descricao || '',
      precoBaseR$: Number(novoProduto.precoBaseR$) || 0,
      precoMinimoR$: Number(novoProduto.precoMinimoR$) || 0,
      precoSugeridoR$: Number(novoProduto.precoSugeridoR$) || 0,
    } as ProdutoComercial);
    setOpenProduto(false);
  };

  const handleAddServico = (e: React.FormEvent) => {
    e.preventDefault();
    addServicoItem({
      ...novoServico,
      id: `srv-${Date.now()}`,
      codigo: novoServico.codigo || `SRV-${Date.now().toString().slice(-4)}`,
      nome: novoServico.nome || 'Novo Serviço',
      descricao: novoServico.descricao || '',
      precoR$: Number(novoServico.precoR$) || 0,
      tempoMedio: novoServico.tempoMedio || '0 horas',
    } as ServicoComercial);
    setOpenServico(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      {/* CATÁLOGO DE PRODUTOS */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" /> Catálogo de Produtos Comerciais
          </CardTitle>
          <Dialog open={openProduto} onOpenChange={setOpenProduto}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1"><Plus className="w-4 h-4" /> Novo Produto</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Adicionar Novo Produto</DialogTitle></DialogHeader>
              <form onSubmit={handleAddProduto} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Produto</Label>
                    <Input required value={novoProduto.nome || ''} onChange={e => setNovoProduto({...novoProduto, nome: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Código</Label>
                    <Input placeholder="Ex: PRD-001" value={novoProduto.codigo || ''} onChange={e => setNovoProduto({...novoProduto, codigo: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select value={novoProduto.categoria} onValueChange={(val: any) => setNovoProduto({...novoProduto, categoria: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ERP">ERP</SelectItem>
                        <SelectItem value="CRM">CRM</SelectItem>
                        <SelectItem value="BI">BI</SelectItem>
                        <SelectItem value="Automação">Automação</SelectItem>
                        <SelectItem value="Consultoria">Consultoria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tag de Preço</Label>
                    <Select value={novoProduto.tagPreco} onValueChange={(val: any) => setNovoProduto({...novoProduto, tagPreco: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Exato">Exato</SelectItem>
                        <SelectItem value="Estimativa">Estimativa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Preço Base (R$)</Label>
                    <Input type="number" required min="0" step="0.01" value={novoProduto.precoBaseR$ || ''} onChange={e => setNovoProduto({...novoProduto, precoBaseR$: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço Mínimo (R$)</Label>
                    <Input type="number" required min="0" step="0.01" value={novoProduto.precoMinimoR$ || ''} onChange={e => setNovoProduto({...novoProduto, precoMinimoR$: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit">Salvar Produto</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {produtos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/20">Nenhum produto cadastrado.</div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card text-xs">
              <table className="w-full">
                <thead className="bg-muted/50 border-b text-left">
                  <tr>
                    <th className="p-3">Código</th>
                    <th className="p-3">Nome do Produto</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Preço Base</th>
                    <th className="p-3">Preço Mínimo</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map(p => (
                    <tr key={p.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-mono font-bold text-muted-foreground">{p.codigo}</td>
                      <td className="p-3 font-semibold text-primary">{p.nome}</td>
                      <td className="p-3"><Badge variant="outline">{p.categoria}</Badge></td>
                      <td className="p-3 font-bold text-emerald-600">
                        <div className="flex items-center gap-2">
                          R$ {p.precoBaseR$.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          {p.tagPreco === 'Estimativa' && <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[9px] py-0 px-1">Estimativa</Badge>}
                          {p.tagPreco === 'Exato' && <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[9px] py-0 px-1">Exato</Badge>}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">R$ {p.precoMinimoR$.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-right">
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px]">{p.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CATÁLOGO DE SERVIÇOS */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-500" /> Catálogo de Serviços Comerciais
          </CardTitle>
          <Dialog open={openServico} onOpenChange={setOpenServico}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1"><Plus className="w-4 h-4" /> Novo Serviço</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Adicionar Novo Serviço</DialogTitle></DialogHeader>
              <form onSubmit={handleAddServico} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Serviço</Label>
                    <Input required value={novoServico.nome || ''} onChange={e => setNovoServico({...novoServico, nome: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Código</Label>
                    <Input placeholder="Ex: SRV-001" value={novoServico.codigo || ''} onChange={e => setNovoServico({...novoServico, codigo: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select value={novoServico.categoria} onValueChange={(val: any) => setNovoServico({...novoServico, categoria: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Implantação">Implantação</SelectItem>
                        <SelectItem value="Treinamento">Treinamento</SelectItem>
                        <SelectItem value="Consultoria">Consultoria</SelectItem>
                        <SelectItem value="Discovery">Discovery</SelectItem>
                        <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tag de Preço</Label>
                    <Select value={novoServico.tagPreco} onValueChange={(val: any) => setNovoServico({...novoServico, tagPreco: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Exato">Exato</SelectItem>
                        <SelectItem value="Estimativa">Estimativa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Preço Base (R$)</Label>
                    <Input type="number" required min="0" step="0.01" value={novoServico.precoR$ || ''} onChange={e => setNovoServico({...novoServico, precoR$: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tempo Médio</Label>
                    <Input placeholder="Ex: 40 horas" required value={novoServico.tempoMedio || ''} onChange={e => setNovoServico({...novoServico, tempoMedio: e.target.value})} />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit">Salvar Serviço</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {servicos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/20">Nenhum serviço cadastrado.</div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card text-xs">
              <table className="w-full">
                <thead className="bg-muted/50 border-b text-left">
                  <tr>
                    <th className="p-3">Código</th>
                    <th className="p-3">Serviço</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Tempo Médio</th>
                    <th className="p-3">Preço R$</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {servicos.map(s => (
                    <tr key={s.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-mono font-bold text-muted-foreground">{s.codigo}</td>
                      <td className="p-3 font-semibold text-primary">{s.nome}</td>
                      <td className="p-3"><Badge variant="outline">{s.categoria}</Badge></td>
                      <td className="p-3 text-muted-foreground">{s.tempoMedio}</td>
                      <td className="p-3 font-bold text-emerald-600">
                        <div className="flex items-center gap-2">
                          R$ {s.precoR$.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          {s.tagPreco === 'Estimativa' && <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[9px] py-0 px-1">Estimativa</Badge>}
                          {s.tagPreco === 'Exato' && <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[9px] py-0 px-1">Exato</Badge>}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px]">{s.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* TABELAS DE PREÇOS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" /> Tabelas de Preços Corporativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tabelas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/20">Nenhuma tabela cadastrada.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {tabelas.map(t => (
                <div key={t.id} className="p-4 border rounded-lg bg-card space-y-2">
                  <div className="flex justify-between items-center font-bold text-sm">
                    <span className="text-primary">{t.nome}</span>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px]">{t.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">Desconto Padrão: <span className="font-bold text-foreground">{t.descontoPadraoPercentual}%</span></p>
                  <p className="text-muted-foreground">Validade: <span className="font-bold text-foreground">{new Date(t.validade).toLocaleDateString('pt-BR')}</span></p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
