import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, Utensils, TrainFront, Shield, Laptop, Plus } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

export function AbaBeneficios() {
  const beneficiosAtuais = [
    { id: 1, nome: "Plano de Saúde (Bradesco Top)", icone: <HeartPulse className="w-5 h-5 text-rose-500" />, ativo: true, valor: "R$ 450,00", inicio: "2024-05-01" },
    { id: 2, nome: "Vale Refeição (Caju)", icone: <Utensils className="w-5 h-5 text-orange-500" />, ativo: true, valor: "R$ 800,00", inicio: "2024-05-01" },
    { id: 3, nome: "Vale Transporte", icone: <TrainFront className="w-5 h-5 text-blue-500" />, ativo: false, valor: "R$ 0,00", inicio: "-" },
    { id: 4, nome: "Seguro de Vida", icone: <Shield className="w-5 h-5 text-indigo-500" />, ativo: true, valor: "R$ 25,00", inicio: "2024-05-01" },
    { id: 5, nome: "Auxílio Home Office", icone: <Laptop className="w-5 h-5 text-emerald-500" />, ativo: true, valor: "R$ 150,00", inicio: "2024-05-01" },
  ];

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="font-medium">Gestão de Benefícios</h3>
          <p className="text-sm text-muted-foreground">Controle os benefícios ativos para este colaborador.</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2"><Plus className="w-4 h-4"/> Novo Benefício</Button>
      </div>

      <div className="space-y-4">
        {beneficiosAtuais.map(b => (
          <div key={b.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-4">
              <div className="bg-muted p-2.5 rounded-full">
                {b.icone}
              </div>
              <div>
                <p className="font-medium flex items-center gap-2">
                  {b.nome}
                  {b.ativo ? (
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none px-1.5 py-0 h-5">Ativo</Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground px-1.5 py-0 h-5">Inativo</Badge>
                  )}
                </p>
                <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                  <span>Custo empresa: <strong className="text-foreground">{b.valor}</strong></span>
                  <span>Início: {b.inicio !== "-" ? new Date(b.inicio).toLocaleDateString('pt-BR') : '-'}</span>
                </div>
              </div>
            </div>
            <div>
              <Switch checked={b.ativo} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
