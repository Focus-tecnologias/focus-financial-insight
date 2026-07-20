import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Users,
  AlertTriangle,
  Repeat,
  Target,
  MoreHorizontal,
  Download,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const currency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const cashflow = [
  { m: "Jan", entradas: 182000, saidas: 118000 },
  { m: "Fev", entradas: 205000, saidas: 132000 },
  { m: "Mar", entradas: 221000, saidas: 141000 },
  { m: "Abr", entradas: 198000, saidas: 152000 },
  { m: "Mai", entradas: 244000, saidas: 149000 },
  { m: "Jun", entradas: 276000, saidas: 168000 },
  { m: "Jul", entradas: 289000, saidas: 172000 },
  { m: "Ago", entradas: 312000, saidas: 181000 },
  { m: "Set", entradas: 298000, saidas: 189000 },
  { m: "Out", entradas: 334000, saidas: 195000 },
  { m: "Nov", entradas: 356000, saidas: 203000 },
  { m: "Dez", entradas: 381000, saidas: 214000 },
];

const revenueByCategory = [
  { name: "Mensalidades", value: 184000 },
  { name: "Implantação", value: 62000 },
  { name: "Consultoria", value: 41000 },
  { name: "Suporte", value: 28000 },
  { name: "Licenças", value: 21000 },
];

const expensesByCenter = [
  { name: "Tecnologia", value: 68000 },
  { name: "Marketing", value: 42000 },
  { name: "Comercial", value: 34000 },
  { name: "Administrativo", value: 27000 },
  { name: "Cloud", value: 22000 },
  { name: "RH", value: 18000 },
];

const mrr = [
  { m: "Jan", v: 128000 },
  { m: "Fev", v: 136000 },
  { m: "Mar", v: 142000 },
  { m: "Abr", v: 149000 },
  { m: "Mai", v: 158000 },
  { m: "Jun", v: 167000 },
  { m: "Jul", v: 178000 },
  { m: "Ago", v: 189000 },
  { m: "Set", v: 194000 },
  { m: "Out", v: 208000 },
  { m: "Nov", v: 219000 },
  { m: "Dez", v: 231000 },
];

const upcoming = [
  { cliente: "Nexora Sistemas", valor: 14800, venc: "22/07", status: "Em dia" },
  { cliente: "Alvorada Log.", valor: 8900, venc: "23/07", status: "Em dia" },
  { cliente: "MedPlus Saúde", valor: 21200, venc: "24/07", status: "Atrasado" },
  { cliente: "Trilha Educação", valor: 5400, venc: "26/07", status: "Em dia" },
  { cliente: "Ponto Verde Coop.", valor: 12300, venc: "28/07", status: "Em dia" },
  { cliente: "Astra Indústria", valor: 33500, venc: "30/07", status: "Renegociado" },
];

const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

interface StatProps {
  label: string;
  value: string;
  delta: number;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "primary" | "success" | "destructive" | "muted";
}

function StatCard({ label, value, delta, hint, icon: Icon, accent = "primary" }: StatProps) {
  const up = delta >= 0;
  const accentClass =
    accent === "success"
      ? "bg-success/10 text-success"
      : accent === "destructive"
      ? "bg-destructive/10 text-destructive"
      : accent === "muted"
      ? "bg-muted text-muted-foreground"
      : "bg-accent text-primary";

  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium ${
              up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
          {hint && <span className="text-muted-foreground">{hint}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Focus Finance · Executivo
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Visão consolidada do desempenho financeiro da Focus Tecnologia — julho/2026.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button size="sm">Novo lançamento</Button>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Saldo em caixa" value={currency(1284530)} delta={8.4} hint="vs. mês anterior" icon={Wallet} />
        <StatCard label="Receitas do mês" value={currency(381200)} delta={12.6} hint="MRR + serviços" icon={TrendingUp} accent="success" />
        <StatCard label="Despesas do mês" value={currency(214800)} delta={4.1} hint="acima do orçado" icon={TrendingDown} accent="destructive" />
        <StatCard label="Lucro líquido" value={currency(166400)} delta={18.2} hint="margem 43,6%" icon={PiggyBank} accent="success" />
        <StatCard label="MRR" value={currency(231000)} delta={5.9} hint="ARR: R$ 2,77M" icon={Repeat} />
        <StatCard label="Clientes ativos" value="182" delta={3.4} hint="8 novos no mês" icon={Users} />
        <StatCard label="Inadimplência" value="4,2%" delta={-1.1} hint="R$ 48,3k em aberto" icon={AlertTriangle} accent="destructive" />
        <StatCard label="Meta de faturamento" value="78%" delta={6.0} hint="R$ 4,2M / R$ 5,4M" icon={Target} accent="muted" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Fluxo de caixa</CardTitle>
              <CardDescription>Entradas vs saídas nos últimos 12 meses</CardDescription>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" /> Entradas
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-foreground/70" /> Saídas
              </span>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pl-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashflow} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gEnt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gSai" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-foreground)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="var(--color-foreground)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  cursor={{ stroke: "var(--color-border)" }}
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }}
                  formatter={(v: number) => currency(v)}
                />
                <Area type="monotone" dataKey="entradas" stroke="var(--color-primary)" strokeWidth={2} fill="url(#gEnt)" />
                <Area type="monotone" dataKey="saidas" stroke="var(--color-foreground)" strokeOpacity={0.7} strokeWidth={2} fill="url(#gSai)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Receita por categoria</CardTitle>
              <CardDescription>Composição do faturamento</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueByCategory}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={2}
                  stroke="var(--color-background)"
                  strokeWidth={2}
                >
                  {revenueByCategory.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }}
                  formatter={(v: number) => currency(v)}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 11, color: "var(--color-muted-foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">MRR — Receita recorrente</CardTitle>
            <CardDescription>Evolução mensal</CardDescription>
          </CardHeader>
          <CardContent className="h-[240px] pl-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrr} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }}
                  formatter={(v: number) => currency(v)}
                />
                <Line type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--color-primary)" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Despesas por centro de custo</CardTitle>
              <CardDescription>Distribuição no mês corrente</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[240px] pl-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expensesByCenter} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }}
                  formatter={(v: number) => currency(v)}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Próximos recebimentos</CardTitle>
              <CardDescription>Contas a receber nos próximos 15 dias</CardDescription>
            </div>
            <Button size="sm" variant="outline">Ver todos</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {upcoming.map((r) => {
                const variant =
                  r.status === "Atrasado"
                    ? "bg-destructive/10 text-destructive"
                    : r.status === "Renegociado"
                    ? "bg-warning/20 text-warning-foreground"
                    : "bg-success/10 text-success";
                return (
                  <div key={r.cliente} className="flex items-center justify-between gap-3 px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                        {r.cliente
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{r.cliente}</p>
                        <p className="text-xs text-muted-foreground">Vence em {r.venc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className={`${variant} border-0 text-[10px] font-medium`}>
                        {r.status}
                      </Badge>
                      <span className="w-24 text-right text-sm font-semibold tabular-nums">
                        {currency(r.valor)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Metas do trimestre</CardTitle>
            <CardDescription>Q3 · Focus Tecnologia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Faturamento", pct: 78, cur: "R$ 4,2M", tot: "R$ 5,4M" },
              { label: "Novos contratos", pct: 62, cur: "31", tot: "50" },
              { label: "Margem operacional", pct: 91, cur: "41%", tot: "45%" },
              { label: "Redução de custos", pct: 44, cur: "R$ 88k", tot: "R$ 200k" },
            ].map((g) => (
              <div key={g.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{g.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {g.cur} <span className="text-muted-foreground/60">/ {g.tot}</span>
                  </span>
                </div>
                <Progress value={g.pct} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
