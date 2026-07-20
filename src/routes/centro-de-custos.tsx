import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/centro-de-custos")({
  component: () => (
    <PlaceholderPage
      title="Centro de Custos"
      description="Administrativo, Marketing, Comercial, Tecnologia, Financeiro, RH, Operacional, Cloud e mais."
    />
  ),
});
