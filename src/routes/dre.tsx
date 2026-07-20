import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/dre")({
  component: () => (
    <PlaceholderPage
      title="DRE"
      description="Demonstração do Resultado do Exercício com EBITDA, margem e comparativos."
      features={["Receita bruta e líquida", "Custos, despesas e impostos", "EBITDA e Lucro Líquido", "Comparativos período a período"]}
    />
  ),
});
