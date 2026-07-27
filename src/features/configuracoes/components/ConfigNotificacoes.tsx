import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, BellRing, Mail, Smartphone, Volume2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNotificacoesStore } from '@/features/notificacoes/useNotificacoesStore';
import { toast } from 'sonner';

export function ConfigNotificacoes() {
  const { preferences, savePreferences, solicitarPermissaoPush } = useNotificacoesStore();

  const handleToggleCategory = (catKey: keyof typeof preferences.categorias) => {
    savePreferences({
      ...preferences,
      categorias: {
        ...preferences.categorias,
        [catKey]: !preferences.categorias[catKey]
      }
    });
    toast.success('Preferências atualizadas.');
  };

  const handleToggleCanal = (canalKey: keyof typeof preferences.canais) => {
    savePreferences({
      ...preferences,
      canais: {
        ...preferences.canais,
        [canalKey]: !preferences.canais[canalKey]
      }
    });
    toast.success('Preferências de canais atualizadas.');
  };

  const handleToggleSom = () => {
    savePreferences({
      ...preferences,
      somHabilitado: !preferences.somHabilitado
    });
    toast.success(preferences.somHabilitado ? 'Efeito sonoro desativado.' : 'Efeito sonoro ativado.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Preferências de Notificações</h2>
          <p className="text-muted-foreground mt-1">Personalize os alertas, permissões de push e preferências por módulo.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* PUSH & PERMISSÕES */}
        <Card className="md:col-span-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Smartphone className="w-5 h-5 text-primary" /> Permissões de Push Notifications (Navegador & Mobile)
            </CardTitle>
            <CardDescription>
              Receba notificações nativas do sistema operacional mesmo quando a guia estiver em segundo plano.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-semibold">Notificações Push da Web</Label>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
                  {typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted' ? 'Ativo & Permitido' : 'Pendente de Permissão'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Clique no botão ao lado para solicitar a autorização nativa do seu navegador.
              </p>
            </div>
            <Button onClick={solicitarPermissaoPush} className="shrink-0 gap-2">
              <ShieldCheck className="w-4 h-4" /> Autorizar Notificações Push
            </Button>
          </CardContent>
        </Card>

        {/* CANAIS DE ENVIO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <BellRing className="w-5 h-5 text-blue-500" /> Canais de Notificação
            </CardTitle>
            <CardDescription>Onde você deseja ser notificado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Notificações Internas na Plataforma</Label>
                <p className="text-xs text-muted-foreground">Sino interativo e badge vermelho no topo.</p>
              </div>
              <Switch 
                checked={preferences.canais.notificacoesInternas} 
                onCheckedChange={() => handleToggleCanal('notificacoesInternas')} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Efeito Sonoro (Ping/Chime)</Label>
                <p className="text-xs text-muted-foreground">Tocar sinal áudio suave ao chegar notificação.</p>
              </div>
              <Switch 
                checked={preferences.somHabilitado} 
                onCheckedChange={handleToggleSom} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Push no Navegador (Web Push)</Label>
                <p className="text-xs text-muted-foreground">Pop-ups nativos da área de trabalho.</p>
              </div>
              <Switch 
                checked={preferences.canais.pushNavegador} 
                onCheckedChange={() => handleToggleCanal('pushNavegador')} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">E-mails Transacionais</Label>
                <p className="text-xs text-muted-foreground">Resumo diário e alertas críticos por e-mail.</p>
              </div>
              <Switch 
                checked={preferences.canais.email} 
                onCheckedChange={() => handleToggleCanal('email')} 
              />
            </div>
          </CardContent>
        </Card>

        {/* NOTIFICAÇÕES POR MÓDULO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Preferências por Módulo (Alertas)
            </CardTitle>
            <CardDescription>Selecione quais áreas do ERP enviarão notificações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'projetos', label: 'Projetos e Atribuição de Tarefas' },
              { key: 'financeiro', label: 'Financeiro (Contas a Pagar & Receber)' },
              { key: 'crm', label: 'CRM & Pipeline de Vendas' },
              { key: 'comercial', label: 'Comercial & Propostas' },
              { key: 'contratos', label: 'Contratos & Renovações' },
              { key: 'vencimentos', label: 'Alertas de Vencimentos Próximos' },
              { key: 'mencoes', label: 'Menções (@SeuNome) em Comentários' },
              { key: 'rh', label: 'RH & Aprovações de Colaboradores' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <Label className="text-xs font-medium cursor-pointer" onClick={() => handleToggleCategory(item.key as any)}>
                  {item.label}
                </Label>
                <Switch 
                  checked={!!preferences.categorias[item.key as keyof typeof preferences.categorias]} 
                  onCheckedChange={() => handleToggleCategory(item.key as any)} 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
