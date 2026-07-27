import { createFileRoute } from "@tanstack/react-router";
<<<<<<< HEAD
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/clientes")({
  component: () => (
    <PlaceholderPage
      title="Clientes"
      description="Cadastro completo com abas Financeira, Documentos e Timeline por cliente."
      features={["Dados cadastrais e contatos", "Mensalidade, implantação e contratos", "Boletos, PIX, faturas e inadimplência", "Documentos e histórico consolidado"]}
    />
  ),
});
=======
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/features/clientes/components/Dashboard";
import { ClientesList } from "@/features/clientes/components/ClientesList";

export const Route = createFileRoute("/clientes")({
  component: ClientesPage,
});

function ClientesPage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes (Master Data)</h1>
        <p className="text-muted-foreground mt-2">
          Cadastro oficial de clientes integrado com toda a plataforma.
        </p>
      </div>

      <Tabs defaultValue="clientes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          
          <TabsTrigger value="clientes">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clientes" className="space-y-4 outline-none">
          <ClientesList />
        </TabsContent>
      <TabsContent value="dashboard" className="space-y-4 outline-none">
          <Dashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
>>>>>>> 8db603b (Integrate Supabase backend for full app persistence and replace local storage hook)
