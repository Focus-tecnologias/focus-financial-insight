import { createFileRoute } from "@tanstack/react-router";
<<<<<<< HEAD

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos Focus — Focus Finance" },
      {
        name: "description",
        content:
          "Central de gestão do ecossistema de softwares da Focus Tecnologia: ciclo de vida, roadmap, releases, clientes e métricas",
      },
    ],
  }),
=======
import { ProdutosScreen } from "@/features/produtos/components/ProdutosScreen";

export const Route = createFileRoute("/produtos")({
>>>>>>> 8db603b (Integrate Supabase backend for full app persistence and replace local storage hook)
  component: ProdutosPage,
});

function ProdutosPage() {
<<<<<<< HEAD
  const products = [
    {
      id: 1,
      name: "Focus ERP",
      category: "ERP & Gestão",
      version: "v3.2.0",
      status: "Ativo",
      description: "Sistema de gestão empresarial integrado para controle financeiro, faturamento, RH e estoque.",
      clients: 3,
      modules: 5,
      responsible: "Carlos Andrade (Head of Product)",
    },
    {
      id: 2,
      name: "Focus CRM",
      category: "CRM & Vendas",
      version: "v2.1.0",
      status: "Ativo",
      description: "Plataforma de gestão comercial, pipeline de vendas, automação de cadência e propostas.",
      clients: 3,
      modules: 2,
      responsible: "Fernanda Lima (Product Manager)",
    },
    {
      id: 3,
      name: "Focus BI",
      category: "Business Intelligence",
      version: "v1.8.4",
      status: "Ativo",
      description: "Central de dashboards analíticos, indicadores executivos e inteligência de dados.",
      clients: 3,
      modules: 1,
      responsible: "Roberto Mansur (Data Lead)",
    },
    {
      id: 4,
      name: "Focus Pay",
      category: "Fintech & Pay",
      version: "v1.5.0",
      status: "Ativo",
      description: "Gateway de pagamentos corporativo com checkout transparente, PIX dinâmico e split.",
      clients: 3,
      modules: 0,
      responsible: "Bruno Souza (Fintech Lead)",
    },
    {
      id: 5,
      name: "Focus Log",
      category: "Logística",
      version: "v1.2.0",
      status: "Em Implantação",
      description: "Módulo de gestão de frotas, cotação de fretes e rastreamento de entregas.",
      clients: 3,
      modules: 0,
      responsible: "Lucas Mendes (Logistics Lead)",
    },
    {
      id: 6,
      name: "Focus EAD",
      category: "Educação / EAD",
      version: "v1.0.5",
      status: "Em Desenvolvimento",
      description: "Plataforma LMS para treinamento interno de colaboradores e acervo de cursos para clientes.",
      clients: 3,
      modules: 0,
      responsible: "Juliana Costa (EdTech Lead)",
    },
    {
      id: 7,
      name: "Focus Lab",
      category: "Inovação & IA",
      version: "v0.9.0-beta",
      status: "Em Desenvolvimento",
      description: "Laboratório de Inteligência Artificial para OCR de Notas Fiscais e assistentes preditivos.",
      clients: 3,
      modules: 0,
      responsible: "Dr. Paulo Nogueira (AI Researcher)",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800";
      case "Em Implantação":
        return "bg-blue-100 text-blue-800";
      case "Em Desenvolvimento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Focus Finance · Produtos
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Produtos Focus</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Central de gestão do ecossistema de softwares da Focus Tecnologia: ciclo de vida, roadmap, releases, clientes e métricas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm font-medium rounded-md border border-input hover:bg-accent">
            Dashboard Executivo
          </button>
          <button className="px-3 py-2 text-sm font-medium rounded-md border border-input hover:bg-accent">
            Workspace
          </button>
          <button className="px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            Novo Produto
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <select className="px-3 py-2 text-sm rounded-md border border-input bg-background">
          <option>Todas Categorias</option>
          <option>ERP & Gestão</option>
          <option>CRM & Vendas</option>
          <option>Business Intelligence</option>
          <option>Fintech & Pay</option>
          <option>Logística</option>
          <option>Educação / EAD</option>
          <option>Inovação & IA</option>
        </select>
        <select className="px-3 py-2 text-sm rounded-md border border-input bg-background">
          <option>Todos os Status</option>
          <option>Ativo</option>
          <option>Em Implantação</option>
          <option>Em Desenvolvimento</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Versão</p>
                <p className="text-sm font-semibold">{product.version}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Clientes</p>
                <p className="text-sm font-semibold">{product.clients}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Módulos</p>
                <p className="text-sm font-semibold">{product.modules}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Responsável</p>
                <p className="text-sm font-semibold">{product.responsible}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm font-medium rounded-md border border-input hover:bg-accent">
                Workspace
              </button>
              <button className="flex-1 px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
=======
  return <ProdutosScreen />;
>>>>>>> 8db603b (Integrate Supabase backend for full app persistence and replace local storage hook)
}
