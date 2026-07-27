import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Clock, CheckCircle2, PlayCircle, Plus } from 'lucide-react';

export function AbaTreinamentos() {
  const treinamentos = [
    { id: 1, nome: "Integração Institucional", categoria: "Onboarding", carga: "4h", status: "Concluído", data: "2022-01-15" },
    { id: 2, nome: "Segurança da Informação e LGPD", categoria: "Compliance", carga: "2h", status: "Concluído", data: "2023-06-20" },
    { id: 3, nome: "Liderança Ágil para Engenharia", categoria: "Desenvolvimento", carga: "16h", status: "Em Andamento", data: "-" },
    { id: 4, nome: "Prevenção a Fraudes", categoria: "Compliance", carga: "2h", status: "Pendente", data: "-" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluído': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Em Andamento': return <PlayCircle className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="font-medium">Trilha de Capacitação</h3>
          <p className="text-sm text-muted-foreground">Acompanhe os treinamentos obrigatórios e opcionais.</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2"><Plus className="w-4 h-4"/> Atribuir Treinamento</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {treinamentos.map(t => (
          <div key={t.id} className="border rounded-lg p-4 flex flex-col justify-between hover:border-primary/50 transition-colors bg-card">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary" className="text-[10px] uppercase font-semibold tracking-wider px-2">
                {t.categoria}
              </Badge>
              {getStatusIcon(t.status)}
            </div>
            <div>
              <h4 className="font-semibold leading-tight">{t.nome}</h4>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Carga Horária: {t.carga}
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">
                {t.status === "Concluído" ? `Concluído em ${new Date(t.data).toLocaleDateString('pt-BR')}` : t.status}
              </span>
              {t.status === "Concluído" && (
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <GraduationCap className="w-3 h-3" /> Certificado
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
