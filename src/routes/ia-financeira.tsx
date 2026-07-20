import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/ia-financeira")({
  component: () => (
    <PlaceholderPage
      title="IA Financeira"
      description="Copiloto financeiro que responde perguntas, gera insights, alertas e projeções."
      features={["“Quanto vamos receber este mês?”", "“Quem está inadimplente?”", "Projeções de caixa em 60/90 dias", "Recomendações de redução de custos"]}
    />
  ),
});
