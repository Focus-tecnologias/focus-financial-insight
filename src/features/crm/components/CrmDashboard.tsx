import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, DollarSign, TrendingUp, Award, Users, Building2, CheckCircle2, RefreshCw, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';
import { useCrmStore } from '../hooks/useCrmStore';

export function CrmDashboard() {
  const { oportunidades, leads, empresas, contatos, config } = useCrmStore();

  const totalLeads = leads.length;
  const totalEmpresas = empresas.length;
  const totalContatos = contatos.length;
  const totalOportunidades = oportunidades.length;

  const receitaPrevista = oportunidades.filter(o => o.etapa !== 'Perdido').reduce((acc, o) => acc + o.valorR$, 0);
  const receitaConfirmada = oportunidades.filter(o => o.etapa === 'Fechado Ganho').reduce((acc, o) => acc + o.valorR$, 0);
  const negociosGanhos = oportunidades.filter(o => o.etapa === 'Fechado Ganho').length;
  const negociosPerdidos = oportunidades.filter(o => o.etapa === 'Perdido').length;

  const winRate = totalOportunidades > 0 ? ((negociosGanhos / totalOportunidades) * 100).toFixed(1) : '0.0';
  const ticketMedio = negociosGanhos > 0 ? (receitaConfirmada / negociosGanhos) : (receitaPrevista / (totalOportunidades || 1));

  // Dados para Gráfico de Funil de Vendas
  const funilData = [
    { etapa: 'Qualificação', quantidade: oportunidades.filter(o => o.etapa === 'Qualificação').length, valor: oportunidades.filter(o => o.etapa === 'Qualificação').reduce((acc, o) => acc + o.valorR$, 0) },
    { etapa: 'Diagnóstico', quantidade: oportunidades.filter(o => o.etapa === 'Diagnóstico & Reunião').length, valor: oportunidades.filter(o => o.etapa === 'Diagnóstico & Reunião').reduce((acc, o) => acc + o.valorR$, 0) },
    { etapa: 'Proposta', quantidade: oportunidades.filter(o => o.etapa === 'Proposta Apresentada').length, valor: oportunidades.filter(o => o.etapa === 'Proposta Apresentada').reduce((acc, o) => acc + o.valorR$, 0) },
    { etapa: 'Negociação', quantidade: oportunidades.filter(o => o.etapa === 'Em Negociação').length, valor: oportunidades.filter(o => o.etapa === 'Em Negociação').reduce((acc, o) => acc + o.valorR$, 0) },
    { etapa: 'Fechado Ganho', quantidade: negociosGanhos, valor: receitaConfirmada },
  ];

  // Dados para Origem dos Leads
  const origemLeadsData = [
    { name: 'Inbound Website', value: 45, color: '#3b82f6' },
    { name: 'Outbound BDR', value: 30, color: '#10b981' },
    { name: 'Indicação', value: 15, color: '#f59e0b' },
    { name: 'Campanhas', value: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner de Sincronização ClickUp */}
      <div className="p-3 border rounded-lg bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900 flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500 text-white gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" /> {config.statusConexao}
          </Badge>
          <span className="font-semibold">ClickUp Workspace: <code className="bg-muted px-1 rounded">{config.workspaceId}</code></span>
        </div>
        <span className="text-muted-foreground text-[11px]">Último sync bidirecional: {new Date(config.lastSyncTime).toLocaleTimeString('pt-BR')}</span>
      </div>

      {/* Grid de 12 KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Receita Prevista no Funil</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ {receitaPrevista.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">{totalOportunidades} oportunidades ativas no ClickUp</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Receita Confirmada (Ganhos)</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">R$ {receitaConfirmada.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">{negociosGanhos} negócios fechados com sucesso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Win Rate (Taxa de Conversão)</CardTitle>
            <Award className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{winRate}%</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Ganhos vs Total de Oportunidades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Ticket Médio das Oportunidades</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Média por oportunidade negociada</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Recharts do CRM */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Volume e Faturamento por Etapa do Funil (ClickUp API)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funilData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="etapa" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip />
                  <Bar dataKey="valor" name="Valor no Pipeline (R$)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-500" />
              Origem de Captação dos Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={origemLeadsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {origemLeadsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
