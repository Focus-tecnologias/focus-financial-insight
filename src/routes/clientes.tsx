import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/clientes")({
  component: () => (
    <PlaceholderPage
      title="Clientes"
      description="Cadastro completo com abas Financeira, Documentos e Timeline por cliente."
      features={["Dados cadastrais e contatos", "Mensalidade, implantação e contratos", "Boletos, PIX, faturas e inadimplência", "Documentos e histórico consolidado"]}
    />
  ),
});
