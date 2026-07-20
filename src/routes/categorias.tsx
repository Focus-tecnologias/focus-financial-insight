import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/categorias")({
  component: () => (
    <PlaceholderPage
      title="Categorias Financeiras"
      description="Estrutura de receitas e despesas por categoria, com hierarquia e classificações contábeis."
    />
  ),
});
