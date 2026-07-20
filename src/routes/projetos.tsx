import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/projetos")({
  component: () => (
    <PlaceholderPage
      title="Projetos"
      description="Projetos por cliente com equipe, escopo, cronograma, horas e financeiro."
    />
  ),
});
