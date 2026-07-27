import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { Cobranca } from '../types';
import { Send, CheckCircle2, MessageCircle, DollarSign } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const formatPercent = (value: number) => `${value}%`;

export function Dashboard() {
  const { data: cobrancas } = useLocalStorageState<Cobranca>('focus_cobrancas');

  const todayStr = new Date().toISOString().split('T')[0];
  const enviadasHoje = cobrancas.filter(c => (c.dataHoraEnvio || '').startsWith(todayStr)).length;
  const lidas = cobrancas.filter(c => c.statusLeitura === "Lida").length;
  const respondidas = cobrancas.filter(c => Boolean(c.respostaCliente)).length;
  const pagas = cobrancas.filter(c => c.statusCobranca === "Paga").length;

  const total = cobrancas.length;
  const taxaLeitura = total > 0 ? Math.round((lidas / total) * 100) : 0;
  const taxaResposta = total > 0 ? Math.round((respondidas / total) * 100) : 0;
  const taxaConversao = total > 0 ? Math.round((pagas / total) * 100) : 0;

  const whatsAppCount = cobrancas.filter(c => c.canal === 'WhatsApp').length;
  const emailCount = cobrancas.filter(c => c.canal === 'Email').length;
  const smsCount = cobrancas.filter(c => c.canal === 'SMS').length;

  const canaisData = [
    { name: 'WhatsApp', value: whatsAppCount, color: '#25D366' },
    { name: 'E-mail', value: emailCount, color: '#3b82f6' },
    { name: 'SMS', value: smsCount, color: '#f59e0b' },
  ];

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const enviosData = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map(day => ({
    name: day,
    Envios: 0,
    Lidas: 0,
    Pagas: 0,
  }));

  cobrancas.forEach(c => {
    if (c.dataHoraEnvio) {
      const dayName = diasSemana[new Date(c.dataHoraEnvio).getDay()];
      const item = enviosData.find(e => e.name === dayName);
      if (item) {
        item.Envios += 1;
        if (c.statusLeitura === 'Lida') item.Lidas += 1;
        if (c.statusCobranca === 'Paga') item.Pagas += 1;
      }
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Cobranças Enviadas (Hoje)</CardTitle>
            <Send className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enviadasHoje}</div>
            <p className="text-xs text-muted-foreground">
              Total de notificações disparadas hoje
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Taxa de Leitura</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaLeitura}%</div>
            <p className="text-xs text-muted-foreground">
              {lidas} de {total} cobranças lidas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <MessageCircle className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaResposta}%</div>
            <p className="text-xs text-muted-foreground">
              {respondidas} de {total} clientes responderam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Conversão (Pagamentos)</CardTitle>
            <DollarSign className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaConversao}%</div>
            <p className="text-xs text-muted-foreground">
              {pagas} de {total} cobranças pagas após envio
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Funil de Cobrança por Dia (Envio vs Leitura vs Pagamento)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enviosData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="Envios" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Lidas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Pagas" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Entregas por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={canaisData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {canaisData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => formatPercent(value as number)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
