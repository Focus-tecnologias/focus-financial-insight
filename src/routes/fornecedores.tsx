import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/fornecedores")({
  component: () => (
    <PlaceholderPage
      title="Fornecedores"
      description="Cadastro, financeiro, contratos, anexos e histórico de pagamentos por fornecedor."
    />
  ),
});
