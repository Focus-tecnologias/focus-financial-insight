import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Users, Percent, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { Cliente } from '@/features/clientes/types';

export function ComercialTab() {
  const { data: clientes } = useLocalStorageState<Cliente>('focus_clientes', []);

  const metricas = useMemo(() => {
    const ativos = clientes.filter(c => c.status === 'Ativo').length;
    const novosMes = clientes.filter(c => {
      // Simplificando: clientes com cadastro recente
      return true; // no app real filtrariamos por data
    }).length;

    return {
      novosClientes: novosMes,
      clientesAtivos: ativos,
      taxaConversao: 15.2, // Mock pra conversão pois não temos CRM
      inadimplencia: 2.1
    }
  }, [clientes]);

  const conversaoData = [
    { mes: 'Jan', conversao: 12.5 },
    { mes: 'Fev', conversao: 13.0 },
    { mes: 'Mar', conversao: 11.5 },
    { mes: 'Abr', conversao: 14.2 },
    { mes: 'Mai', conversao: 14.8 },
    { mes: 'Jun', conversao: 15.2 },
  ];

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes (Total)</CardTitle>
            <UserPlus className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {metricas.novosClientes}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Clientes totais na base
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Base de Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {metricas.clientesAtivos}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Clientes que estão ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão (Vendas)</CardTitle>
            <Percent className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {metricas.taxaConversao}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Dos Leads Qualificados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Índice de Inadimplência</CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              {metricas.inadimplencia}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Controlado (Abaixo de 3%)
            </p>
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Histórico da Taxa de Conversão de Vendas (%)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversaoData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                   <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="mes" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 20]} />
                <Tooltip cursor={{ stroke: 'var(--muted)', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px' }} formatter={(val: number) => `${val}%`} />
                <Area type="monotone" name="Conversão" dataKey="conversao" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorConv)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
