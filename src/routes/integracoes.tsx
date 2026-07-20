import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/integracoes")({
  component: () => (
    <PlaceholderPage
      title="Integrações"
      description="Bancos, gateways de pagamento, Open Finance, WhatsApp, Google/Microsoft e ecossistema Focus."
      features={["BB, Bradesco, Santander, Itaú, Inter, Sicredi", "Asaas, Mercado Pago, Stripe, PIX", "Google Workspace, Microsoft 365, ClickUp", "Focus ERP, CRM, Log, EAD, BI + API/Webhooks"]}
    />
  ),
});
