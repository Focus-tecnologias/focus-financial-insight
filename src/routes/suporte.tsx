import { createFileRoute } from "@tanstack/react-router";
import { SuporteScreen } from "@/features/suporte/components/SuporteScreen";

export const Route = createFileRoute("/suporte")({
  component: SuportePage,
});

function SuportePage() {
  return <SuporteScreen />;
}
