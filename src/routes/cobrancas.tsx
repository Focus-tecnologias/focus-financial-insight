import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/cobrancas")({
  component: () => (
    <PlaceholderPage
      title="Cobranças"
      description="Automação completa de régua de cobrança por WhatsApp, e-mail e SMS."
      features={["PIX copia e cola, QR Code e boleto", "Lembretes automáticos (7d antes → 30d depois)", "Histórico de entrega e leitura", "Registro de respostas e pagamentos"]}
    />
  ),
});
