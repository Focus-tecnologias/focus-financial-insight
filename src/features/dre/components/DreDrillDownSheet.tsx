import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink } from 'lucide-react';
import { LinhaDRE } from '../types';

interface DreDrillDownSheetProps {
  isOpen: boolean;
  onClose: () => void;
  linhaDRE: LinhaDRE | null;
}

export function DreDrillDownSheet({ isOpen, onClose, linhaDRE }: DreDrillDownSheetProps) {
  
  // Mock data for drill down transactions - In a real app this would be fetched based on linhaDRE.id
  const mockTransactions = [
    { id: '1', data: '15/06/2026', descricao: 'Fatura AWS Mensal', clienteFornecedor: 'Amazon Web Services', valor: -25000, status: 'Liquidado' },
    { id: '2', data: '18/06/2026', descricao: 'Fatura Microsoft Azure', clienteFornecedor: 'Microsoft', valor: -20000, status: 'Liquidado' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[700px] flex flex-col p-0 h-full overflow-hidden">
        
        <div className="p-6 pb-4 border-b bg-muted/20">
          <SheetHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border shadow-sm">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl">
                  Detalhamento Contábil (Drill-Down)
                </SheetTitle>
                <SheetDescription>
                  Auditando transações originais da linha: <strong className="text-foreground font-mono">{linhaDRE?.codigo} - {linhaDRE?.nome}</strong>
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-background border rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">Valor Acumulado no Período</p>
              <p className={`text-2xl font-bold mt-1 ${(linhaDRE?.valorAtual || 0) < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {(linhaDRE?.valorAtual || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <div className="p-4 bg-background border rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">Volume de Transações</p>
              <p className="text-2xl font-bold mt-1">2 <span className="text-sm font-normal text-muted-foreground">títulos</span></p>
            </div>
          </div>

          <h3 className="text-sm font-semibold mb-4">Lançamentos Financeiros de Origem</h3>
          <div className="space-y-3">
            {mockTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-background border rounded-lg hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">{tx.data}</span>
                    <Badge variant="outline" className="text-[10px] font-normal">{tx.status}</Badge>
                  </div>
                  <p className="text-sm font-medium">{tx.descricao}</p>
                  <p className="text-xs text-muted-foreground">{tx.clienteFornecedor}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`text-sm font-semibold text-right ${tx.valor < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {tx.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" title="Ir para Contas a Pagar">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-900 text-sm">
            <strong className="block mb-1">Nota de Auditoria:</strong>
            Estes valores são importados automaticamente dos módulos de Contas a Pagar e Receber e não podem ser editados manualmente na DRE.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
