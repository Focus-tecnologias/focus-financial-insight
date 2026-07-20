import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/indicadores")({
  component: () => (
    <PlaceholderPage
      title="Indicadores"
      description="KPIs em tempo real: CAC, LTV, MRR, ARR, churn, margem por projeto, ROI."
    />
  ),
});
