import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, CheckCircle2 } from 'lucide-react';

interface DreFiltrosSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DreFiltrosSheet({ isOpen, onClose }: DreFiltrosSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[450px] flex flex-col p-0 h-full overflow-hidden">
        
        <div className="p-6 pb-4 border-b bg-muted/20">
          <SheetHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border shadow-sm">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl">Filtros Dimensionais</SheetTitle>
                <SheetDescription>
                  Gere a DRE focada em segmentos específicos da empresa.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <Label>Período Base</Label>
            <Select defaultValue="mes">
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes">Mês Atual</SelectItem>
                <SelectItem value="trimestre">Trimestre Atual</SelectItem>
                <SelectItem value="semestre">Semestre Atual</SelectItem>
                <SelectItem value="ano">Ano Atual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>DRE por Centro de Custo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos os Centros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Centros</SelectItem>
                <SelectItem value="cc-01">Marketing (CC-001)</SelectItem>
                <SelectItem value="cc-02">Tecnologia (CC-002)</SelectItem>
                <SelectItem value="cc-03">Administrativo (CC-003)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>DRE por Projeto</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos os Projetos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Projetos</SelectItem>
                <SelectItem value="p1">Implantação ERP Alpha</SelectItem>
                <SelectItem value="p2">Migração Cloud Beta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>DRE por Cliente</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos os Clientes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Clientes</SelectItem>
                <SelectItem value="c1">TechCorp S.A.</SelectItem>
                <SelectItem value="c2">Indústria XPTO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Regime Contábil</Label>
            <Select defaultValue="competencia">
              <SelectTrigger>
                <SelectValue placeholder="Regime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="competencia">Competência (Padrão DRE)</SelectItem>
                <SelectItem value="caixa">Caixa (Realizado Banco)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-6 border-t bg-background flex items-center justify-between">
          <Button variant="outline" onClick={onClose}>Limpar Filtros</Button>
          <Button className="gap-2" onClick={onClose}>
            <CheckCircle2 className="w-4 h-4" /> Aplicar na DRE
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
