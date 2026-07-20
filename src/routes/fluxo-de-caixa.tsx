import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/fluxo-de-caixa")({
  component: () => (
    <PlaceholderPage
      title="Fluxo de Caixa"
      description="Entradas, saídas e projeções diárias, semanais, mensais e anuais com comparativo previsto x realizado."
      features={["Saldo diário e projetado", "Fluxo previsto x realizado", "Linha do tempo financeira", "Filtros avançados por conta e categoria"]}
    />
  ),
});
