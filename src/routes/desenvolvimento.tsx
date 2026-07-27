import { createFileRoute } from "@tanstack/react-router";
import { DesenvolvimentoScreen } from "@/features/desenvolvimento/components/DesenvolvimentoScreen";

export const Route = createFileRoute("/desenvolvimento")({
  component: DesenvolvimentoPage,
});

function DesenvolvimentoPage() {
  return <DesenvolvimentoScreen />;
}
