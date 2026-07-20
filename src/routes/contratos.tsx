import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/contratos")({
  component: () => (
    <PlaceholderPage
      title="Contratos"
      description="Gestão de contratos com valor, mensalidade, prazo, renovação e reajuste."
      features={["Prazos de 12/24/36 meses", "Renovação automática", "Reajuste anual", "Histórico e assinaturas"]}
    />
  ),
});
