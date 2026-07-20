import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/agenda")({
  component: () => (
    <PlaceholderPage
      title="Agenda Financeira"
      description="Calendário mensal com vencimentos, recebimentos, impostos e contratos."
    />
  ),
});
