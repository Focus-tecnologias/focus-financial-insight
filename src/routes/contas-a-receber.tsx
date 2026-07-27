import { createFileRoute } from "@tanstack/react-router";
<<<<<<< HEAD
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/contas-a-receber")({
  component: () => (
    <PlaceholderPage
      title="Contas a Receber"
      description="Parcelas, recorrências, mensalidades e implantações com múltiplas formas de pagamento."
      features={["PIX, TED, DOC, cartão, boleto", "Status: recebido, pendente, atrasado, renegociado", "Filtros e exportações", "Baixas automáticas"]}
    />
  ),
});
=======
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/features/contas-receber/components/Dashboard";
import { RecebimentosList } from "@/features/contas-receber/components/RecebimentosList";

export const Route = createFileRoute("/contas-a-receber")({
  component: ContasReceberPage,
});

function ContasReceberPage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contas a Receber</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie todos os títulos, recebimentos, parcelamentos e recorrências.
        </p>
      </div>

      <Tabs defaultValue="titulos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          
          <TabsTrigger value="titulos">Títulos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="titulos" className="space-y-4 outline-none">
          <RecebimentosList />
        </TabsContent>
        <TabsContent value="relatorios" className="space-y-4 outline-none">
          <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <h3 className="mt-4 text-lg font-semibold">Relatórios de Receitas</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Em breve você poderá exportar PDF e Excel detalhados dos seus recebimentos.
              </p>
            </div>
          </div>
        </TabsContent>
      <TabsContent value="dashboard" className="space-y-4 outline-none">
          <Dashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
>>>>>>> 8db603b (Integrate Supabase backend for full app persistence and replace local storage hook)
