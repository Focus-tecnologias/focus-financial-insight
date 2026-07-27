import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from 'lucide-react';

export function AbaOnboarding() {
  const steps = [
    { id: "s1", label: "Contrato Assinado", checked: true },
    { id: "s2", label: "Documentação Entregue", checked: true },
    { id: "s3", label: "Usuário Criado", checked: true },
    { id: "s4", label: "E-mail Corporativo Criado", checked: true },
    { id: "s5", label: "Equipamentos Entregues", checked: false },
    { id: "s6", label: "Acesso aos Sistemas Liberado", checked: false },
    { id: "s7", label: "Treinamento Inicial (Integração) Realizado", checked: false },
  ];

  const concluido = steps.filter(s => s.checked).length;
  const porcentagem = Math.round((concluido / steps.length) * 100);

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="font-medium">Onboarding (Jornada de Entrada)</h3>
          <p className="text-sm text-muted-foreground">Checklist de acompanhamento da entrada do colaborador.</p>
        </div>
      </div>

      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progresso do Onboarding</span>
          <span className="text-sm font-bold text-primary">{porcentagem}%</span>
        </div>
        <Progress value={porcentagem} className="h-2" />
        {porcentagem === 100 && (
          <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4"/> Onboarding 100% concluído!
          </p>
        )}
      </div>

      <div className="space-y-4 pt-2">
        {steps.map(step => (
          <div key={step.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/30 transition-colors">
            <Checkbox id={step.id} checked={step.checked} />
            <Label htmlFor={step.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">
              {step.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
