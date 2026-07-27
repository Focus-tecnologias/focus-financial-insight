import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Key, Plus, ShieldCheck, Lock, Trash2 } from 'lucide-react';
import { useIntegracoesStore } from '../hooks/useIntegracoesStore';
import { toast } from 'sonner';

export function HubApiKeysView() {
  const { apiKeys, conectores, addApiKey, revokeApiKey } = useIntegracoesStore();
  const [openModal, setOpenModal] = useState(false);

  const [nome, setNome] = useState('');
  const [rawKey, setRawKey] = useState('');
  const [conectorId, setConectorId] = useState(conectores[0]?.id || 'asaas-gateway');

  const handleCreate = () => {
    if (!nome || !rawKey) {
      toast.error('Informe o nome e a chave de API.');
      return;
    }

    addApiKey({
      nome,
      conectorId,
      status: 'Ativa',
      escopos: ['read', 'write'],
      ultimoUso: new Date().toISOString()
    }, rawKey);

    toast.success(`Chave de API "${nome}" registrada no cofre seguro!`);
    setOpenModal(false);
    setNome('');
    setRawKey('');
  };

  const handleRevoke = (id: string, nomeKey: string) => {
    revokeApiKey(id);
    toast.success(`Chave de API "${nomeKey}" revogada.`);
  };

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-base">Cofre de API Keys & Tokens OAuth2</h3>
          <p className="text-xs text-muted-foreground">Gerenciamento seguro e criptografado de credenciais corporativas.</p>
        </div>
        <Button onClick={() => setOpenModal(true)} className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
          <Plus className="w-4 h-4" /> Nova Chave de API
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="border rounded-lg overflow-hidden bg-card text-xs">
            <table className="w-full">
              <thead className="bg-muted/50 border-b text-left">
                <tr>
                  <th className="p-3">Nome da Chave</th>
                  <th className="p-3">Chave Mascarada</th>
                  <th className="p-3">Data Criação</th>
                  <th className="p-3">Último Uso</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map(k => (
                  <tr key={k.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-semibold text-primary">{k.nome}</td>
                    <td className="p-3 font-mono text-[11px] text-muted-foreground">{k.chaveMascarada}</td>
                    <td className="p-3 text-muted-foreground">{k.dataCriacao}</td>
                    <td className="p-3 text-muted-foreground">
                      {k.ultimoUso ? new Date(k.ultimoUso).toLocaleString('pt-BR') : 'Nunca usada'}
                    </td>
                    <td className="p-3">
                      <Badge className={k.status === 'Ativa' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'}>
                        {k.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      {k.status === 'Ativa' && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleRevoke(k.id, k.nome)}
                          className="h-7 text-xs text-rose-500 hover:bg-rose-50"
                        >
                          Revogar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Nova API Key */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" /> Registrar Chave no Cofre Seguro
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-2">
              <Label>Nome Identificador</Label>
              <Input placeholder="Ex: Chave Produção Asaas API" value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Chave de API / Secret Token *</Label>
              <Input type="password" placeholder="Cole a API key completa aqui..." value={rawKey} onChange={e => setRawKey(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Armazenar Chave Criptografada</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
