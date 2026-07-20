import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Focus Finance" },
      {
        name: "description",
        content:
          "Visão executiva do desempenho financeiro da Focus Tecnologia: caixa, receitas, despesas, MRR, inadimplência e metas.",
      },
    ],
  }),
  component: Dashboard,
});
