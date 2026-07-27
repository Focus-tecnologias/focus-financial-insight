import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Zap, CheckCircle2, AlertTriangle, Power, RefreshCw, Settings, ShieldCheck, Activity } from 'lucide-react';
import { useIntegracoesStore } from '../hooks/useIntegracoesStore';
import { CategoriaConector, ConectorDMS } from '../types';
import { HubConfigModal } from './HubConfigModal';
import { toast } from 'sonner';

export function HubMarketplaceView() {
  const { conectores, toggleConnectorStatus, testConnection, syncNow } = useIntegracoesStore();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedConector, setSelectedConector] = useState<ConectorDMS | null>(null);

  const categories: Array<{ id: string; label: string }> = [
    { id: 'todos', label: 'Todos' },
    { id: 'Bancos', label: 'Bancos / Open Finance' },
    { id: 'Gateways', label: 'Gateways' },
    { id: 'Google', label: 'Google Workspace' },
    { id: 'Microsoft', label: 'Microsoft 365' },
    { id: 'Projetos', label: 'Projetos' },
    { id: 'WhatsApp', label: 'WhatsApp' },
    { id: 'Assinaturas', label: 'Assinaturas & Gov' },
    { id: 'Ecossistema Focus', label: 'Ecossistema Focus' },
  ];

  const filteredConnectors = conectores.filter(c => {
    const matchesSearch = c.nome.toLowerCase().includes(search.toLowerCase()) || 
      c.provedor.toLowerCase().includes(search.toLowerCase()) ||
      c.descricao.toLowerCase().includes(search.toLowerCase()) ||
      c.recursos.some(r => r.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = activeCategory === 'todos' || c.categoria === activeCategory || (activeCategory === 'Assinaturas & Gov' && (c.categoria === 'Assinaturas' || c.categoria === 'Gov'));

    return matchesSearch && matchesCategory;
  });

  const handleTest = (c: ConectorDMS) => {
    testConnection(c.id);
    toast.success(`Teste de conexão com ${c.nome} concluído! Ping: ${c.pingMs || 35}ms.`);
  };

  const handleSync = (c: ConectorDMS) => {
    syncNow(c.id);
    toast.success(`Sincronização imediata com ${c.nome} executada com sucesso!`);
  };

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      {/* Busca & Filtros por Categoria */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Pesquisar conector, banco, gateway, recurso ou API..." 
            className="pl-8 text-xs"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-1.5 bg-muted p-1 rounded-md overflow-x-auto">
          {categories.map(c => (
            <Button
              key={c.id}
              variant={activeCategory === c.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory(c.id)}
              className="text-xs h-8 whitespace-nowrap"
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid do Marketplace de Conectores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConnectors.map(c => {
          return (
            <Card key={c.id} className="hover:border-primary/50 transition-all flex flex-col justify-between group">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-[10px] font-semibold">
                    {c.categoria}
                  </Badge>
                  <Badge 
                    className={
                      c.status === 'Conectado' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px]' :
                      c.status === 'Atencao' ? 'bg-amber-100 text-amber-800 border-amber-200 text-[10px]' : 'bg-slate-100 text-slate-600 border-slate-200 text-[10px]'
                    }
                  >
                    {c.status}
                  </Badge>
                </div>
                <CardTitle className="text-base group-hover:text-primary transition-colors leading-tight flex items-center gap-2">
                  {c.nome}
                </CardTitle>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {c.descricao}
                </p>
              </CardHeader>

              <CardContent className="pb-3 text-xs space-y-3">
                <div className="flex justify-between items-center bg-muted/40 p-2 rounded text-[11px]">
                  <span className="text-muted-foreground">Última Sync:</span>
                  <span className="font-semibold">
                    {c.ultimaSincronizacao ? new Date(c.ultimaSincronizacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Pendente'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {c.recursos.map(r => (
                    <Badge key={r} variant="secondary" className="text-[9px] font-normal">
                      ✓ {r}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="border-t pt-3 flex justify-between items-center bg-muted/10">
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleTest(c)} 
                    className="h-8 text-[11px] gap-1"
                    title="Testar Conexão e Latência"
                  >
                    <Activity className="w-3.5 h-3.5 text-blue-500" /> Testar
                  </Button>
                  {c.status === 'Conectado' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleSync(c)} 
                      className="h-8 text-[11px] gap-1"
                      title="Forçar Sincronização Imediata"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-500" /> Sync
                    </Button>
                  )}
                </div>

                <Button 
                  size="sm" 
                  onClick={() => setSelectedConector(c)} 
                  className="h-8 text-xs gap-1.5 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Settings className="w-3.5 h-3.5" /> Configurar
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Modal Assistente de Configuração */}
      <HubConfigModal 
        conector={selectedConector} 
        isOpen={!!selectedConector} 
        onClose={() => setSelectedConector(null)} 
      />
    </div>
  );
}
