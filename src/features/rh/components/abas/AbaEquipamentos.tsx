import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone, Monitor, Keyboard, Plus, RefreshCcw } from 'lucide-react';

export function AbaEquipamentos() {
  const equipamentos = [
    { id: "EQP-001", tipo: "Notebook", modelo: "MacBook Pro M2 14'", patrimonio: "FCT-0042", dataEntrega: "2024-01-10", icone: <Laptop className="w-5 h-5 text-blue-500" /> },
    { id: "EQP-002", tipo: "Monitor", modelo: "Dell UltraSharp 27'", patrimonio: "FCT-0105", dataEntrega: "2024-01-15", icone: <Monitor className="w-5 h-5 text-slate-500" /> },
    { id: "EQP-003", tipo: "Periférico", modelo: "Teclado Logitech MX Keys", patrimonio: "FCT-0211", dataEntrega: "2024-01-15", icone: <Keyboard className="w-5 h-5 text-slate-500" /> },
    { id: "EQP-004", tipo: "Celular", modelo: "iPhone 13 Corporativo", patrimonio: "FCT-0089", dataEntrega: "2024-03-01", icone: <Smartphone className="w-5 h-5 text-purple-500" /> },
  ];

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="font-medium">Gestão de Ativos</h3>
          <p className="text-sm text-muted-foreground">Equipamentos em comodato sob responsabilidade do colaborador.</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2"><Plus className="w-4 h-4"/> Atribuir Equipamento</Button>
      </div>

      <div className="space-y-3">
        {equipamentos.map(eq => (
          <div key={eq.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-4">
              <div className="bg-muted p-3 rounded-md">
                {eq.icone}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium leading-none">{eq.modelo}</p>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{eq.tipo}</Badge>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Patrimônio: <strong className="text-foreground">{eq.patrimonio}</strong></span>
                  <span>Entregue em: {new Date(eq.dataEntrega).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs text-amber-600 hover:text-amber-700">
                <RefreshCcw className="w-3 h-3" /> Solicitar Troca
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs text-rose-600 hover:text-rose-700">
                Devolver
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
