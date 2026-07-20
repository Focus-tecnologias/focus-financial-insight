import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/contas-a-receber")({
  component: () => (
    <PlaceholderPage
      title="Contas a Receber"
      description="Parcelas, recorrências, mensalidades e implantações com múltiplas formas de pagamento."
      features={["PIX, TED, DOC, cartão, boleto", "Status: recebido, pendente, atrasado, renegociado", "Filtros e exportações", "Baixas automáticas"]}
    />
  ),
});
