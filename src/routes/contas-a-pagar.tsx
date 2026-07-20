import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/contas-a-pagar")({
  component: () => (
    <PlaceholderPage
      title="Contas a Pagar"
      description="Despesas fixas, variáveis, impostos, folha, fornecedores, softwares e investimentos."
      features={["Parcelamentos e recorrências", "Anexos de NF e comprovantes", "Aprovação multinível", "Agenda de pagamentos"]}
    />
  ),
});
