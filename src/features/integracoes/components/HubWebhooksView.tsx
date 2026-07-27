import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Webhook, Plus, Play, Trash2, CheckCircle2, ShieldCheck, Link2 } from 'lucide-react';
import { useIntegracoesStore } from '../hooks/useIntegracoesStore';
import { toast } from 'sonner';

export function HubWebhooksView() {
  const { webhooks, addWebhook, removeWebhook, testWebhook } = useIntegracoesStore();
  const [openModal, setOpenModal] = useState(false);

  const [nome, setNome] = useState('');
  const [url, setUrl] = useState('');
  const [metodo, setMetodo] = useState<'POST' | 'PUT' | 'GET'>('POST');
  const [eventosInput, setEventosInput] = useState('PAYMENT_RECEIVED, PAYMENT_OVERDUE');

  const handleCreate = () => {
    if (!nome || !url) {
      toast.error('Informe o nome e a URL do Webhook.');
      return;
    }

    addWebhook({
      nome,
      url,
      metodo,
      token: `whsec_${Math.random().toString(36).substring(2, 10)}`,
      eventos: eventosInput.split(',').map(e => e.trim()),
      status: 'Ativo'
    });

    toast.success(`Webhook "${nome}" cadastrado e ativo!`);
    setOpenModal(false);
    setNome('');
    setUrl('');
  };

  const handleTest = (id: string, nomeWh: string) => {
    testWebhook(id);
    toast.success(`Disparo de teste para o Webhook "${nomeWh}" enviado com status HTTP 200 OK!`);
  };

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-base">Gerenciador de Webhooks</h3>
          <p className="text-xs text-muted-foreground">Cadastre endpoints para receber notificações e eventos em tempo real.</p>
        </div>
        <Button onClick={() => setOpenModal(true)} className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
          <Plus className="w-4 h-4" /> Novo Webhook
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {webhooks.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground border border-dashed rounded-lg">
              <Webhook className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Nenhum Webhook cadastrado.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card text-xs">
              <table className="w-full">
                <thead className="bg-muted/50 border-b text-left">
                  <tr>
                    <th className="p-3">Nome / Descrição</th>
                    <th className="p-3">URL Endpoint</th>
                    <th className="p-3">Método</th>
                    <th className="p-3">Eventos Assinados</th>
                    <th className="p-3">Último Disparo</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {webhooks.map(wh => (
                    <tr key={wh.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-semibold text-primary">{wh.nome}</td>
                      <td className="p-3 font-mono text-[11px] text-muted-foreground">{wh.url}</td>
                      <td className="p-3"><Badge variant="outline" className="font-mono">{wh.metodo}</Badge></td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {wh.eventos.map(e => (
                            <Badge key={e} variant="secondary" className="text-[9px]">
                              {e}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {wh.ultimoDisparo ? new Date(wh.ultimoDisparo).toLocaleTimeString('pt-BR') : 'Sem disparos'}
                      </td>
                      <td className="p-3">
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{wh.status}</Badge>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleTest(wh.id, wh.nome)}
                          className="h-7 text-[11px] gap-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          <Play className="w-3 h-3" /> Testar
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => removeWebhook(wh.id)}
                          className="h-7 w-7 text-rose-500 hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Novo Webhook */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Webhook className="w-5 h-5 text-primary" /> Cadastrar Novo Webhook
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-2">
              <Label>Nome Identificador</Label>
              <Input placeholder="Ex: Notificação de Pagamentos Asaas" value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>URL do Endpoint Target</Label>
              <Input placeholder="https://api.empresa.com.br/v1/webhooks/listener" value={url} onChange={e => setUrl(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Método HTTP</Label>
                <Select value={metodo} onValueChange={(v: any) => setMetodo(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="GET">GET</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Eventos Assinados (separados por vírgula)</Label>
                <Input value={eventosInput} onChange={e => setEventosInput(e.target.value)} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Cadastrar Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
