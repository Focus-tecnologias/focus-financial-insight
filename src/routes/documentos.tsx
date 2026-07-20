import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/documentos")({
  component: () => (
    <PlaceholderPage
      title="Documentos"
      description="Armazenamento interno com versionamento e busca."
      features={["Contratos, NF, boletos, comprovantes", "Escopos e propostas", "Versionamento", "Pesquisa full-text"]}
    />
  ),
});
