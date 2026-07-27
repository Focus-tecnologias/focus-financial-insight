import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function AbaOffboarding() {
  const steps = [
    { id: "o1", label: "Entrevista de Desligamento", checked: false },
    { id: "o2", label: "Devolução de Equipamentos", checked: false },
    { id: "o3", label: "Revogação de Acessos", checked: false },
    { id: "o4", label: "Encerramento de Usuário no Sistema", checked: false },
    { id: "o5", label: "Baixa Documental", checked: false },
  ];

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="font-medium text-rose-600">Offboarding (Jornada de Saída)</h3>
          <p className="text-sm text-muted-foreground">Checklist de obrigações ao desligar o colaborador.</p>
        </div>
        <Button size="sm" variant="destructive" className="gap-2">
          <LogOut className="w-4 h-4"/> Iniciar Desligamento
        </Button>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-lg border border-rose-200 dark:border-rose-900">
        <p className="text-sm text-rose-800 dark:text-rose-300 font-medium text-center">O colaborador encontra-se ATIVO. Este checklist só deve ser iniciado após a comunicação oficial de desligamento.</p>
      </div>

      <div className="space-y-4 pt-2 opacity-60 pointer-events-none">
        {steps.map(step => (
          <div key={step.id} className="flex items-center space-x-3 p-3 border rounded-md transition-colors">
            <Checkbox id={step.id} checked={step.checked} />
            <Label htmlFor={step.id} className="text-sm font-medium leading-none">
              {step.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
