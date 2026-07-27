import React, { useState } from 'react';
import { consolidateFluxoFromStores } from '../utils/consolidateData';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { TituloReceber } from '@/features/contas-receber/types';
import { ContaPagar } from '@/features/contas-pagar/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmada': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-0';
    case 'Prevista': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-0';
    case 'Parcial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-0';
    case 'Cancelada': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-0 line-through opacity-70';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-0';
  }
};

export function FluxoTimeline() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');

  const { data: titulos } = useLocalStorageState<TituloReceber>('focus_contas_receber');
  const { data: contas } = useLocalStorageState<ContaPagar>('focus_contas_pagar');

  const fluxoConsolidado = consolidateFluxoFromStores(titulos, contas);

  const filteredData = fluxoConsolidado.filter(mov => {
    const matchSearch = (mov.clienteFornecedor || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (mov.descricao || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'todos' || 
                     (filterType === 'entradas' && mov.tipo === 'Entrada') ||
                     (filterType === 'saidas' && mov.tipo === 'Saída');
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar histórico..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="entradas">Apenas Entradas</SelectItem>
              <SelectItem value="saidas">Apenas Saídas</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Extrato
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria / Origem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right bg-muted/30">Saldo Acumulado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  Nenhuma movimentação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((mov) => (
                <TableRow key={mov.id} className="group cursor-pointer hover:bg-muted/50">
                  <TableCell className="whitespace-nowrap">
                    {new Date(mov.dataCompetencia).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium flex items-center gap-2">
                      {mov.tipo === 'Entrada' ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      {mov.descricao}
                    </div>
                    <div className="text-xs text-muted-foreground ml-6">
                      {mov.clienteFornecedor}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{mov.categoria}</div>
                    <div className="text-xs text-muted-foreground">Via {mov.moduloOrigem}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(mov.status)}>
                      {mov.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${mov.tipo === 'Entrada' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {mov.tipo === 'Entrada' ? '+' : '-'}{formatCurrency(mov.status === 'Confirmada' || mov.status === 'Parcial' ? mov.valorRealizado : mov.valorOriginal)}
                  </TableCell>
                  <TableCell className="text-right font-semibold bg-muted/10">
                    {formatCurrency(mov.saldoAcumuladoDia)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
