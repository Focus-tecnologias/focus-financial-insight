import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Star, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export function AbaAvaliacoes() {
  const avaliacoes = [
    { id: 1, ciclo: "Q4 2024", data: "2024-12-10", nota: 4.5, metas: 95, tecnico: 4.8, comp: 4.2 },
    { id: 2, ciclo: "Q2 2024", data: "2024-06-15", nota: 4.1, metas: 85, tecnico: 4.3, comp: 3.9 },
  ];

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="font-medium">Avaliações de Desempenho e PDI</h3>
          <p className="text-sm text-muted-foreground">Histórico de ciclos de avaliação e evolução do colaborador.</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2"><Plus className="w-4 h-4"/> Nova Avaliação</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nota Atual (Q4)</p>
              <h3 className="text-3xl font-bold text-primary flex items-center gap-2">
                4.5 <Star className="w-6 h-6 fill-primary text-primary" />
              </h3>
            </div>
            <div className="text-right">
              <Badge className="bg-emerald-100 text-emerald-800 border-none gap-1">
                <TrendingUp className="w-3 h-3"/> +0.4 pts
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Acima da média do time</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Plano de Desenvolvimento (PDI) Atual</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Comunicação Assertiva</span>
                <span className="font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-sm">Histórico de Ciclos</h4>
        <div className="space-y-4">
          {avaliacoes.map(av => (
            <Card key={av.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h5 className="font-semibold">{av.ciclo}</h5>
                  </div>
                  <span className="text-xs text-muted-foreground">Aplicada em {new Date(av.data).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Média Final</p>
                    <p className="text-lg font-bold">{av.nota}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Atingimento Metas</p>
                    <p className="text-lg font-bold text-emerald-600">{av.metas}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Técnico</p>
                    <p className="text-lg font-bold">{av.tecnico}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Comportamental</p>
                    <p className="text-lg font-bold">{av.comp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
