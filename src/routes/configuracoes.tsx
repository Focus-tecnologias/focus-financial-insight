import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/configuracoes")({
  component: () => (
    <PlaceholderPage
      title="Configurações"
      description="Preferências da empresa, plano de contas, aparência e políticas do sistema."
    />
  ),
});
