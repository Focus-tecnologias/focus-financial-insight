import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/usuarios")({
  component: () => (
    <PlaceholderPage
      title="Usuários"
      description="Gestão da equipe com perfis, sessões e status."
    />
  ),
});
