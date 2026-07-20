import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/logs")({
  component: () => (
    <PlaceholderPage
      title="Logs & Auditoria"
      description="Registro completo de logins, alterações, exclusões e transações — com IP, usuário, data e hora."
    />
  ),
});
