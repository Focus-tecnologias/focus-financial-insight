import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockConfigDashboard } from '../mockData';
import { Settings, Server, AlertTriangle, HardDrive } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ConfigDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Status do Sistema</h2>
        <p className="text-muted-foreground mt-1">Visão geral administrativa e saúde da plataforma.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Versão Instalada</CardTitle>
            <Settings className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {mockConfigDashboard.versao}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Atualizado em {new Date(mockConfigDashboard.ultimaAtualizacao).toLocaleDateString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backups Gerados</CardTitle>
            <HardDrive className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {mockConfigDashboard.backupsRetidos}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Último: {new Date(mockConfigDashboard.ultimoBackup).toLocaleDateString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">APIs e Webhooks</CardTitle>
            <Server className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {mockConfigDashboard.apisAtivas + mockConfigDashboard.webhooksAtivos} Ativos
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockConfigDashboard.apisAtivas} APIs e {mockConfigDashboard.webhooksAtivos} Webhooks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {mockConfigDashboard.alertas.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Requer atenção administrativa
            </p>
          </CardContent>
        </Card>

      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Alertas do Sistema</h3>
        {mockConfigDashboard.alertas.map((alerta, idx) => (
          <Alert variant="default" key={idx} className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>{alerta}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}
