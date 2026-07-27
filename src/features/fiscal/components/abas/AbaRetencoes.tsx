import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AbaRetencoes() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Impostos Retidos (Retenções)</h3>
          <p className="text-xs text-muted-foreground">Tributos retidos na fonte que abatem o valor líquido a receber/pagar.</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Adicionar Retenção
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Tributo</TableHead>
              <TableHead>Percentual (%)</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="text-right">Valor Retido</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><Input defaultValue="IRRF" className="h-8 w-24 text-xs font-medium" /></TableCell>
              <TableCell><Input type="number" defaultValue="1.50" className="h-8 text-xs font-mono" /></TableCell>
              <TableCell>
                <Select defaultValue="tomador">
                  <SelectTrigger className="h-8 text-xs"><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tomador">Tomador (Cliente)</SelectItem>
                    <SelectItem value="prestador">Prestador</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right font-medium text-rose-600">{formatCurrency(675.00)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted/30">
              <TableCell colSpan={3} className="text-right font-medium">Total de Retenções</TableCell>
              <TableCell className="text-right font-bold text-rose-700">{formatCurrency(675.00)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
