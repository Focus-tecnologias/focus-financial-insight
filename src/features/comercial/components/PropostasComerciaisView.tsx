import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { FileText, Plus, Download, CheckCircle2, Eye, ShieldCheck, User } from 'lucide-react';
import { useComercialStore } from '../hooks/useComercialStore';
import { PropostaComercial, StatusProposta } from '../types';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { Cliente } from '@/features/clientes/types';
import { toast } from 'sonner';

export function PropostasComerciaisView() {
  const { propostas, produtos, servicos, addProposta, updatePropostaStatus } = useComercialStore();
  const { data: clientes } = useLocalStorageState<Cliente>('focus_clientes');

  const [openModal, setOpenModal] = useState(false);
  const [selectedProposta, setSelectedProposta] = useState<PropostaComercial | null>(null);

  // Form State
  const [clienteId, setClienteId] = useState(clientes[0]?.id || '');
  const [responsavelNome, setResponsavelNome] = useState('Mariana Oliveira');
  const [produtoId, setProdutoId] = useState(produtos[0]?.id || '');
  const [qtd, setQtd] = useState('1');
  const [condicoes, setCondicoes] = useState('30% de entrada + 12x no boleto');

  const handleCreateProposta = () => {
    const selectedCliente = clientes.find(c => c.id === clienteId) || clientes[0];
    const selectedProd = produtos.find(p => p.id === produtoId) || produtos[0];

    if (!selectedCliente || !selectedProd) {
      toast.error('Selecione um cliente e produto válido.');
      return;
    }

    const quantidade = parseInt(qtd) || 1;
    const valorTotal = selectedProd.precoBaseR$ * quantidade;

    addProposta({
      clienteId: selectedCliente.id,
      clienteNome: selectedCliente.razaoSocial || selectedCliente.nomeFantasia,
      responsavelNome,
      valorTotalR$: valorTotal,
      validadeData: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
      versao: '1.0',
      status: 'Em elaboração',
      condicoesPagamento: condicoes,
      itens: [
        {
          id: `it-${Date.now()}`,
          nomeItem: selectedProd.nome,
          tipo: 'Produto',
          quantidade,
          valorUnitarioR$: selectedProd.precoBaseR$,
          valorTotalR$: valorTotal
        }
      ]
    });

    toast.success(`Proposta comercial criada para ${selectedCliente.razaoSocial}!`);
    setOpenModal(false);
  };

  const handleStatusChange = (id: string, newStatus: StatusProposta) => {
    updatePropostaStatus(id, newStatus);
    toast.success(`Status da proposta alterado para "${newStatus}"!`);
  };

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Propostas Comerciais
          </h3>
          <p className="text-xs text-muted-foreground">Elabore, versione e gerencie propostas vinculadas aos clientes do Focus Finance.</p>
        </div>
        <Button onClick={() => setOpenModal(true)} className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
          <Plus className="w-4 h-4" /> Nova Proposta
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="border rounded-lg overflow-hidden bg-card text-xs">
            <table className="w-full">
              <thead className="bg-muted/50 border-b text-left">
                <tr>
                  <th className="p-3">Número Proposta</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Responsável</th>
                  <th className="p-3">Valor Total</th>
                  <th className="p-3">Validade</th>
                  <th className="p-3">Versão</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {propostas.map(p => (
                  <tr key={p.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-semibold text-primary">{p.numero}</td>
                    <td className="p-3 font-medium">{p.clienteNome}</td>
                    <td className="p-3 text-muted-foreground">{p.responsavelNome}</td>
                    <td className="p-3 font-bold text-emerald-600">R$ {p.valorTotalR$.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 text-muted-foreground">{new Date(p.validadeData).toLocaleDateString('pt-BR')}</td>
                    <td className="p-3 font-mono">v{p.versao}</td>
                    <td className="p-3">
                      <Select value={p.status} onValueChange={(v: any) => handleStatusChange(p.id, v)}>
                        <SelectTrigger className="h-7 text-[11px] w-36"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Em elaboração">Em elaboração</SelectItem>
                          <SelectItem value="Em revisão">Em revisão</SelectItem>
                          <SelectItem value="Aguardando aprovação">Aguardando aprovação</SelectItem>
                          <SelectItem value="Enviada">Enviada</SelectItem>
                          <SelectItem value="Aceita">Aceita</SelectItem>
                          <SelectItem value="Recusada">Recusada</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3 text-right">
                      <Button size="icon" variant="ghost" onClick={() => setSelectedProposta(p)} className="h-7 w-7">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Nova Proposta */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Gerar Nova Proposta Comercial
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-2">
              <Label>Cliente (Consultado no Módulo Clientes)</Label>
              <Select value={clienteId} onValueChange={setClienteId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {clientes.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.razaoSocial || c.nomeFantasia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Produto Principais</Label>
                <Select value={produtoId} onValueChange={setProdutoId}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {produtos.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.nome} (R$ {p.precoBaseR$})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantidade</Label>
                <Input type="number" value={qtd} onChange={e => setQtd(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Condições de Pagamento</Label>
              <Input value={condicoes} onChange={e => setCondicoes(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button onClick={handleCreateProposta} className="bg-orange-600 hover:bg-orange-700 text-white">Criar Proposta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
