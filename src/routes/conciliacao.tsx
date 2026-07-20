import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/conciliacao")({
  component: () => (
    <PlaceholderPage
      title="Conciliação Bancária"
      description="Importação OFX/CSV com conciliação automática e manual."
    />
  ),
});
