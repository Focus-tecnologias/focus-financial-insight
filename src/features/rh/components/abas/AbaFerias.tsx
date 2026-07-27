import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Palmtree, AlertCircle, Clock } from 'lucide-react';

export function AbaFerias() {
  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Saldo de Férias
              <Palmtree className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">15 <span className="text-base font-normal">dias</span></div>
            <p className="text-xs text-muted-foreground mt-1">Disponíveis para gozo imediato</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Período Aquisitivo Atual
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base font-bold">2024 / 2025</div>
            <p className="text-xs text-muted-foreground mt-1 text-emerald-600">Vence em: 10/01/2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between text-rose-600">
              Atenção
              <AlertCircle className="w-4 h-4 text-rose-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-rose-600">Férias Próximas ao Dobro</div>
            <p className="text-xs text-muted-foreground mt-1">É necessário programar as férias antes de 10/12/2025.</p>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 border-t space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Histórico e Programações</h4>
          <Button variant="outline" size="sm" className="gap-2"><Calendar className="w-4 h-4" /> Programar Férias</Button>
        </div>

        <div className="border rounded-lg overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="p-3 text-left font-medium">Período Aquisitivo</th>
                <th className="p-3 text-left font-medium">Dias</th>
                <th className="p-3 text-left font-medium">Data de Início</th>
                <th className="p-3 text-left font-medium">Data de Retorno</th>
                <th className="p-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">2023 / 2024</td>
                <td className="p-3">15 dias</td>
                <td className="p-3">15/08/2024</td>
                <td className="p-3">30/08/2024</td>
                <td className="p-3">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none gap-1">
                    <Clock className="w-3 h-3"/> Programado
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="p-3">2022 / 2023</td>
                <td className="p-3">30 dias</td>
                <td className="p-3">01/02/2023</td>
                <td className="p-3">02/03/2023</td>
                <td className="p-3">
                  <Badge variant="outline" className="text-muted-foreground bg-muted/50 border-none">
                    Gozado
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
