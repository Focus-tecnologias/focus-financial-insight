import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/assinaturas")({
  component: () => (
    <PlaceholderPage
      title="Assinaturas"
      description="Assinatura eletrônica de contratos e documentos financeiros."
    />
  ),
});
