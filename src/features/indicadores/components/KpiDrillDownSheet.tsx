import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KpiDrillDownSheetProps {
  isOpen: boolean;
  onClose: () => void;
  kpiTitle: string;
  kpiValue: string;
  formula: {
    nome: string;
    valor: string;
  }[];
  resultadoFinal: string;
  descricao: string;
}

export function KpiDrillDownSheet({ isOpen, onClose, kpiTitle, kpiValue, formula, resultadoFinal, descricao }: KpiDrillDownSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[500px] flex flex-col p-0 h-full overflow-hidden">
        
        <div className="p-6 pb-4 border-b bg-muted/20">
          <SheetHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border shadow-sm">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl">
                  {kpiTitle}
                </SheetTitle>
                <SheetDescription>
                  {descricao}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/10">
          
          <div className="p-6 bg-background border rounded-lg shadow-sm text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Valor Atual</p>
            <h2 className="text-4xl font-bold text-primary">{kpiValue}</h2>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Desmembramento do Cálculo</h3>
            
            <div className="space-y-2">
              {formula.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background border rounded-md">
                  <span className="text-sm font-medium">{item.nome}</span>
                  <span className="text-sm font-mono font-bold">{item.valor}</span>
                </div>
              ))}
              
              <div className="flex justify-center py-2 text-muted-foreground">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>

              <div className="flex items-center justify-between p-4 bg-primary/10 border-primary/20 border rounded-md">
                <span className="text-sm font-bold text-primary">Resultado</span>
                <span className="text-base font-mono font-bold text-primary">{resultadoFinal}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-900 text-sm">
            <strong className="block mb-1">Cálculo Automático:</strong>
            Este KPI não pode ser alterado manualmente. Ele é recalculado em tempo real usando dados dos módulos de Vendas e Financeiro.
          </div>

        </div>
        
        <div className="p-6 border-t bg-background flex items-center justify-end">
          <Button onClick={onClose}>Entendido</Button>
        </div>

      </SheetContent>
    </Sheet>
  );
}
