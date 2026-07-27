import React, { useState } from 'react';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { TituloReceber } from '@/features/contas-receber/types';
import { ContaPagar } from '@/features/contas-pagar/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Scale,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  ShieldAlert,
} from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export function ComparativoSection() {
  const { data: titulos } = useLocalStorageState<TituloReceber>('focus_contas_receber');
  const { data: contas } = useLocalStorageState<ContaPagar>('focus_contas_pagar');

  const [tipoAnalise, setTipoAnalise] = useState<'categoria' | 'status'>('categoria');

  // Cálculos Consolidados Previsto x Realizado - RECEITAS
  const receitasPrevistas = titulos.reduce((acc, t) => acc + (t.valorOriginal || 0), 0);
  const receitasRealizadas = titulos.reduce((acc, t) => acc + (t.valorRecebido || (t.status === 'Recebido' ? t.valorOriginal : 0)), 0);
  const variacaoReceitas = receitasRealizadas - receitasPrevistas;
  const taxaRealizacaoReceitas = receitasPrevistas > 0 ? (receitasRealizadas / receitasPrevistas) * 100 : 0;

  // Inadimplência / Atrasos em Receitas
  const titulosAtrasados = titulos.filter((t) => t.status === 'Atrasado');
  const valorInadimplente = titulosAtrasados.reduce((acc, t) => acc + (t.valorOriginal - (t.valorRecebido || 0)), 0);
  const taxaInadimplencia = receitasPrevistas > 0 ? (valorInadimplente / receitasPrevistas) * 100 : 0;

  // Cálculos Consolidados Previsto x Realizado - DESPESAS
  const despesasPrevistas = contas.reduce((acc, c) => acc + (c.valorOriginal || 0), 0);
  const despesasRealizadas = contas.reduce((acc, c) => acc + (c.valorPago || (c.status === 'Pago' ? c.valorOriginal : 0)), 0);
  const variacaoDespesas = despesasRealizadas - despesasPrevistas;
  const taxaAderenciaDespesas = despesasPrevistas > 0 ? (despesasRealizadas / despesasPrevistas) * 100 : 0;

  // Saldo Líquido Previsto vs Realizado
  const saldoPrevisto = receitasPrevistas - despesasPrevistas;
  const saldoRealizado = receitasRealizadas - despesasRealizadas;
  const variacaoSaldoLiquido = saldoRealizado - saldoPrevisto;

  // Agrupamento por Categoria (Receitas + Despesas)
  const categoriasSet = new Set<string>();
  titulos.forEach((t) => t.categoria && categoriasSet.add(t.categoria));
  contas.forEach((c) => c.categoria && categoriasSet.add(c.categoria));

  const categoriasArray = Array.from(categoriasSet);

  const comparativoCategorias = categoriasArray.map((cat) => {
    const titulosCat = titulos.filter((t) => t.categoria === cat);
    const contasCat = contas.filter((c) => c.categoria === cat);

    const recPrev = titulosCat.reduce((acc, t) => acc + (t.valorOriginal || 0), 0);
    const recReal = titulosCat.reduce((acc, t) => acc + (t.valorRecebido || (t.status === 'Recebido' ? t.valorOriginal : 0)), 0);

    const despPrev = contasCat.reduce((acc, c) => acc + (c.valorOriginal || 0), 0);
    const despReal = contasCat.reduce((acc, c) => acc + (c.valorPago || (c.status === 'Pago' ? c.valorOriginal : 0)), 0);

    const prevTotal = recPrev - despPrev;
    const realTotal = recReal - despReal;
    const variacao = realTotal - prevTotal;

    return {
      categoria: cat,
      recPrev,
      recReal,
      despPrev,
      despReal,
      prevTotal,
      realTotal,
      variacao,
    };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER DE COMPARATIVO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" /> Análise Comparativa: Previsto vs. Realizado
          </h2>
          <p className="text-xs text-muted-foreground">
            Auditoria da aderência orçamentária, efetividade de recebimento e controle de inadimplência
          </p>
        </div>

        <div className="w-44">
          <Select value={tipoAnalise} onValueChange={(val: any) => setTipoAnalise(val)}>
            <SelectTrigger className="text-xs font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="categoria">Visão por Categoria</SelectItem>
              <SelectItem value="status">Visão por Liquidação</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CARDS DE PERFORMANCE PREVISTO X REALIZADO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Receitas (Entradas)
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">Realizado:</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {formatCurrency(receitasRealizadas)}
              </span>
            </div>
            <div className="flex items-baseline justify-between text-xs border-t pt-1">
              <span className="text-muted-foreground">Previsto:</span>
              <span className="font-semibold text-foreground">{formatCurrency(receitasPrevistas)}</span>
            </div>
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Arrecadação:</span>
                <span className="font-bold text-emerald-600">{taxaRealizacaoReceitas.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(100, taxaRealizacaoReceitas)} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Despesas (Saídas)
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">Realizado:</span>
              <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                {formatCurrency(despesasRealizadas)}
              </span>
            </div>
            <div className="flex items-baseline justify-between text-xs border-t pt-1">
              <span className="text-muted-foreground">Previsto:</span>
              <span className="font-semibold text-foreground">{formatCurrency(despesasPrevistas)}</span>
            </div>
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Execução Orçamentária:</span>
                <span className="font-bold text-rose-600">{taxaAderenciaDespesas.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(100, taxaAderenciaDespesas)} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Resultado Líquido (Real vs Prev)
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">Realizado:</span>
              <span
                className={`text-lg font-black ${
                  saldoRealizado >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {formatCurrency(saldoRealizado)}
              </span>
            </div>
            <div className="flex items-baseline justify-between text-xs border-t pt-1">
              <span className="text-muted-foreground">Previsto:</span>
              <span className="font-semibold text-foreground">{formatCurrency(saldoPrevisto)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] pt-1 border-t">
              <span className="text-muted-foreground">Variação Absoluta:</span>
              <span
                className={`font-bold ${
                  variacaoSaldoLiquido >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {variacaoSaldoLiquido >= 0 ? '+' : ''}
                {formatCurrency(variacaoSaldoLiquido)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={valorInadimplente > 0 ? 'border-amber-500/40 bg-amber-500/5' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Inadimplência em Aberto
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">Valor Atrasado:</span>
              <span className="text-lg font-black text-amber-600 dark:text-amber-400">
                {formatCurrency(valorInadimplente)}
              </span>
            </div>
            <div className="flex items-baseline justify-between text-xs border-t pt-1">
              <span className="text-muted-foreground">Qtd de Títulos Atrasados:</span>
              <span className="font-bold text-foreground">{titulosAtrasados.length}</span>
            </div>
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Taxa de Inadimplência:</span>
                <span className="font-bold text-amber-600">{taxaInadimplencia.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(100, taxaInadimplencia)} className="h-1.5 bg-amber-200 dark:bg-amber-950" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TABELA COMPARATIVA DETALHADA POR CATEGORIA */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-semibold">Detalhamento Comparativo por Categoria Financeira</CardTitle>
          <CardDescription className="text-xs">
            Comparativo de Previsto x Realizado segmentado por centro de custo e categoria
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs">Categoria</TableHead>
                <TableHead className="text-xs text-right">Entrada Prevista</TableHead>
                <TableHead className="text-xs text-right">Entrada Realizada</TableHead>
                <TableHead className="text-xs text-right">Despesa Prevista</TableHead>
                <TableHead className="text-xs text-right">Despesa Realizada</TableHead>
                <TableHead className="text-xs text-right bg-muted/20">Variação Líquida</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparativoCategorias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-xs text-muted-foreground">
                    Nenhum título ou conta cadastrada com categoria especificada.
                  </TableCell>
                </TableRow>
              ) : (
                comparativoCategorias.map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell className="text-xs font-bold text-foreground">
                      {item.categoria}
                    </TableCell>

                    <TableCell className="text-xs text-right font-medium">
                      {formatCurrency(item.recPrev)}
                    </TableCell>

                    <TableCell className="text-xs text-right font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(item.recReal)}
                    </TableCell>

                    <TableCell className="text-xs text-right font-medium">
                      {formatCurrency(item.despPrev)}
                    </TableCell>

                    <TableCell className="text-xs text-right font-semibold text-rose-600 dark:text-rose-400">
                      {formatCurrency(item.despReal)}
                    </TableCell>

                    <TableCell
                      className={`text-xs text-right font-extrabold bg-muted/10 ${
                        item.variacao >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {item.variacao >= 0 ? '+' : ''}
                      {formatCurrency(item.variacao)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
