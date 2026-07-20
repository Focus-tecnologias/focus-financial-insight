import focusLogo from "@/assets/focus-logo.png";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  TrendingDown,
  Bell,
  Users,
  Truck,
  FileText,
  Briefcase,
  Building2,
  Tags,
  BarChart3,
  PieChart,
  LineChart,
  Landmark,
  CalendarDays,
  FolderOpen,
  PenLine,
  UserCog,
  Shield,
  Settings,
  ScrollText,
  Plug,
  Sparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Visão Geral",
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "Financeiro",
    items: [
      { title: "Fluxo de Caixa", url: "/fluxo-de-caixa", icon: Wallet },
      { title: "Contas a Receber", url: "/contas-a-receber", icon: TrendingUp },
      { title: "Contas a Pagar", url: "/contas-a-pagar", icon: TrendingDown },
      { title: "Cobranças", url: "/cobrancas", icon: Bell },
      { title: "Conciliação", url: "/conciliacao", icon: Landmark },
      { title: "Agenda Financeira", url: "/agenda", icon: CalendarDays },
    ],
  },
  {
    label: "Cadastros",
    items: [
      { title: "Clientes", url: "/clientes", icon: Users },
      { title: "Fornecedores", url: "/fornecedores", icon: Truck },
      { title: "Contratos", url: "/contratos", icon: FileText },
      { title: "Projetos", url: "/projetos", icon: Briefcase },
      { title: "Centro de Custos", url: "/centro-de-custos", icon: Building2 },
      { title: "Categorias", url: "/categorias", icon: Tags },
    ],
  },
  {
    label: "Análises",
    items: [
      { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
      { title: "DRE", url: "/dre", icon: PieChart },
      { title: "Indicadores", url: "/indicadores", icon: LineChart },
      { title: "IA Financeira", url: "/ia-financeira", icon: Sparkles },
    ],
  },
  {
    label: "Documentação",
    items: [
      { title: "Documentos", url: "/documentos", icon: FolderOpen },
      { title: "Assinaturas", url: "/assinaturas", icon: PenLine },
    ],
  },
  {
    label: "Administração",
    items: [
      { title: "Usuários", url: "/usuarios", icon: UserCog },
      { title: "Permissões", url: "/permissoes", icon: Shield },
      { title: "Integrações", url: "/integracoes", icon: Plug },
      { title: "Configurações", url: "/configuracoes", icon: Settings },
      { title: "Logs", url: "/logs", icon: ScrollText },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-2.5">
          <img
            src={focusLogo}
            alt="Focus ERP — powered by focus tech"
            className="h-9 w-auto object-contain group-data-[collapsible=icon]:h-8"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:font-medium"
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            FT
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-xs font-medium">Focus Tecnologia</span>
            <span className="truncate text-[10px] text-muted-foreground">admin@focus.tec</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
