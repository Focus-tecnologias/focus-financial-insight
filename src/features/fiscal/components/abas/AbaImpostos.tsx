import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from 'lucide-react';

export function AbaImpostos() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Impostos Destacados</h3>
          <p className="text-xs text-muted-foreground">Tributos informados no documento. Apenas para controle gerencial.</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Adicionar Linha
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Tributo</TableHead>
              <TableHead>Base de Cálculo</TableHead>
              <TableHead>Alíquota (%)</TableHead>
              <TableHead className="text-right">Valor Apurado</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><Input defaultValue="ISS" className="h-8 w-24 text-xs font-medium" /></TableCell>
              <TableCell><Input type="number" defaultValue="45000.00" className="h-8 text-xs font-mono" /></TableCell>
              <TableCell><Input type="number" defaultValue="5.00" className="h-8 text-xs font-mono" /></TableCell>
              <TableCell className="text-right font-medium text-amber-600">{formatCurrency(2250.00)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Input defaultValue="PIS" className="h-8 w-24 text-xs font-medium" /></TableCell>
              <TableCell><Input type="number" defaultValue="45000.00" className="h-8 text-xs font-mono" /></TableCell>
              <TableCell><Input type="number" defaultValue="0.65" className="h-8 text-xs font-mono" /></TableCell>
              <TableCell className="text-right font-medium text-amber-600">{formatCurrency(292.50)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted/30">
              <TableCell colSpan={3} className="text-right font-medium">Total de Impostos</TableCell>
              <TableCell className="text-right font-bold text-amber-700">{formatCurrency(2542.50)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
