import { createFileRoute } from "@tanstack/react-router";
import { CustomerSuccessScreen } from "@/features/customerSuccess/components/CustomerSuccessScreen";

export const Route = createFileRoute("/customer-success")({
  component: CustomerSuccessPage,
});

function CustomerSuccessPage() {
  return <CustomerSuccessScreen />;
}
