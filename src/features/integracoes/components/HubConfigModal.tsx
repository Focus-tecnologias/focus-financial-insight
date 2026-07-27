import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Key, Zap, CheckCircle2, Lock, ExternalLink } from 'lucide-react';
import { ConectorDMS } from '../types';
import { useIntegracoesStore } from '../hooks/useIntegracoesStore';
import { toast } from 'sonner';

interface ModalProps {
  conector: ConectorDMS | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HubConfigModal({ conector, isOpen, onClose }: ModalProps) {
  const { saveConnectorConfig, testConnection } = useIntegracoesStore();

  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [ambiente, setAmbiente] = useState<'Produção' | 'Sandbox / Testes'>('Produção');

  useEffect(() => {
    if (conector?.configuracao) {
      setClientId(conector.configuracao.clientId || '');
      setClientSecret(conector.configuracao.clientSecret || '');
      setApiKey(conector.configuracao.apiKey || '');
      setAmbiente(conector.configuracao.ambiente || 'Produção');
    } else {
      setClientId('');
      setClientSecret('');
      setApiKey('');
      setAmbiente('Produção');
    }
  }, [conector]);

  if (!conector) return null;

  const handleSave = () => {
    saveConnectorConfig(conector.id, {
      clientId,
      clientSecret,
      apiKey,
      ambiente,
      tokensAtivos: 1
    });

    testConnection(conector.id);
    toast.success(`Conector "${conector.nome}" configurado e autenticado com sucesso!`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Configurador de Conector ({conector.nome})
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          <div className="p-3 border rounded-lg bg-muted/20 flex justify-between items-center">
            <div>
              <p className="font-bold text-foreground">{conector.provedor}</p>
              <p className="text-muted-foreground">{conector.categoria} • {conector.tipoAutenticacao}</p>
            </div>
            <Badge variant={conector.status === 'Conectado' ? 'default' : 'outline'} className={conector.status === 'Conectado' ? 'bg-emerald-600' : ''}>
              {conector.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label>Ambiente de Execução</Label>
            <Select value={ambiente} onValueChange={(v: any) => setAmbiente(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Produção">Produção (Live API)</SelectItem>
                <SelectItem value="Sandbox / Testes">Sandbox / Testes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {conector.tipoAutenticacao === 'OAuth2' ? (
            <>
              <div className="space-y-2">
                <Label>Client ID / App Key</Label>
                <Input placeholder="Ex: 940182940182-apps.googleusercontent.com" value={clientId} onChange={e => setClientId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Client Secret / Private Token</Label>
                <Input type="password" placeholder="••••••••••••••••" value={clientSecret} onChange={e => setClientSecret(e.target.value)} />
              </div>
              <div className="p-3 border rounded bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200 flex items-center justify-between">
                <span>URL de Callback OAuth: <code className="font-mono">https://api.focusfinance.com.br/oauth/callback</code></span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label>Chave de API (API Key / Bearer Token)</Label>
              <Input type="password" placeholder="Ex: $asaas_live_token_..." value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>
          )}

          <div className="space-y-1">
            <Label className="text-[11px] font-bold">Módulos do Focus Finance que Utilizarão esta Conexão:</Label>
            <div className="flex flex-wrap gap-1 pt-1">
              {conector.modulosVinculados.map(m => (
                <Badge key={m} variant="secondary" className="text-[10px]">
                  {m}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} className="gap-1.5 bg-orange-600 hover:bg-orange-700 text-white">
            <Lock className="w-3.5 h-3.5" /> Salvar & Autenticar Conector
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
