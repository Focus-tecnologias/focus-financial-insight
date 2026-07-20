import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/permissoes")({
  component: () => (
    <PlaceholderPage
      title="Permissões"
      description="RBAC granular por módulo, ação e registro."
      features={["Administrador, Financeiro, Diretor", "Comercial, Tecnologia, RH, Consultor", "Visualizador", "Trilhas de auditoria"]}
    />
  ),
});
