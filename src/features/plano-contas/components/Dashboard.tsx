import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPlanoContas } from '../mockData';
import { Layers, ArrowUpCircle, ArrowDownCircle, Network } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export function Dashboard() {
  const totalCategorias = mockPlanoContas.length;
  
  const categoriasReceita = mockPlanoContas.filter(c => c.tipo === 'Receita');
  const categoriasDespesa = mockPlanoContas.filter(c => c.tipo === 'Despesa');
  
  // Apenas "Folhas" (Categorias que não tem filhos)
  const isLeaf = (id: string) => !mockPlanoContas.some(c => c.parentId === id);
  const folhas = mockPlanoContas.filter(c => isLeaf(c.id));

  const receitaTotal = folhas.filter(c => c.tipo === 'Receita').reduce((acc, c) => acc + c.saldoAcumuladoMensal, 0);
  const despesaTotal = folhas.filter(c => c.tipo === 'Despesa').reduce((acc, c) => acc + c.saldoAcumuladoMensal, 0);

  // Gráfico: Natureza
  const naturezaCount: Record<string, number> = {};
  folhas.forEach(c => {
    naturezaCount[c.natureza] = (naturezaCount[c.natureza] || 0) + c.saldoAcumuladoMensal;
  });

  const dataPizza = Object.entries(naturezaCount)
    .filter(([_, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#64748b'];

  // Gráfico: Setores
  const setorDataMap: Record<string, { name: string, Receita: number, Despesa: number }> = {};
  folhas.forEach(c => {
    const setor = c.setor || 'Geral';
    if (!setorDataMap[setor]) setorDataMap[setor] = { name: setor, Receita: 0, Despesa: 0 };
    if (c.tipo === 'Receita') setorDataMap[setor].Receita += c.saldoAcumuladoMensal;
    if (c.tipo === 'Despesa') setorDataMap[setor].Despesa += c.saldoAcumuladoMensal;
  });

  const dataSetor = Object.values(setorDataMap);

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      {/* Indicadores Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plano de Contas</CardTitle>
            <Layers className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalCategorias}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ramos e Folhas cadastradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas (Base Folha)</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(receitaTotal)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {categoriasReceita.length} grupos de entrada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas (Base Folha)</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              {formatCurrency(despesaTotal)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {categoriasDespesa.length} grupos de saída
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estrutura Ativa</CardTitle>
            <Network className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              100%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Categorias em operação
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Gráfico Natureza */}
        <Card>
          <CardHeader>
            <CardTitle>Volume Financeiro por Natureza</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={dataPizza}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={90}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {dataPizza.map((_, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip formatter={(value: number) => formatCurrency(value)} />
                 <Legend verticalAlign="bottom" height={36}/>
               </PieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico por Setor */}
        <Card>
          <CardHeader>
            <CardTitle>Comportamento por Setor (Receita vs Despesa)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataSetor} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$ ${val / 1000}k`} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} formatter={(val: number) => formatCurrency(val)} />
                <Legend />
                <Bar dataKey="Receita" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Despesa" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
