import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/relatorios")({
  component: () => (
    <PlaceholderPage
      title="Relatórios"
      description="Relatórios gerenciais completos exportáveis em PDF, Excel e CSV."
      features={["Fluxo de Caixa, DRE, Balancete", "Inadimplência e Recorrência", "Projeções e comparativos", "Exportações agendadas"]}
    />
  ),
});
