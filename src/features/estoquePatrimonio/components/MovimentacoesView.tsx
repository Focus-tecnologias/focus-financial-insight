import React, { useState } from 'react';
import {
  History,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Wrench,
  UserCheck,
  Search,
  Calendar,
  User,
  MapPin,
  Tag,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEstoquePatrimonio } from '../hooks/useEstoquePatrimonio';

export function MovimentacoesView() {
  const { movimentacoes } = useEstoquePatrimonio();
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState('todos');

  const filtered = movimentacoes.filter((m) => {
    const matchesSearch =
      (m.equipamentoNome && m.equipamentoNome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.estoqueItemNome && m.estoqueItemNome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.usuarioNome && m.usuarioNome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.observacoes && m.observacoes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTipo = tipoFilter === 'todos' || m.tipo === tipoFilter;
    return matchesSearch && matchesTipo;
  });

  const renderBadgeTipo = (tipo: string) => {
    switch (tipo) {
      case 'Entrada':
        return (
          <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1">
            <ArrowUpRight className="h-3 w-3" /> Entrada
          </Badge>
        );
      case 'Saída':
        return (
          <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/30 gap-1">
            <ArrowDownLeft className="h-3 w-3" /> Saída
          </Badge>
        );
      case 'Transferência':
        return (
          <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-600 border-blue-500/30 gap-1">
            <ArrowRightLeft className="h-3 w-3" /> Transferência
          </Badge>
        );
      case 'Alteração Responsável':
        return (
          <Badge variant="outline" className="text-[10px] bg-indigo-500/10 text-indigo-600 border-indigo-500/30 gap-1">
            <UserCheck className="h-3 w-3" /> Novo Responsável
          </Badge>
        );
      case 'Manutenção':
        return (
          <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-600 border-purple-500/30 gap-1">
            <Wrench className="h-3 w-3" /> Manutenção
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-[10px]">
            {tipo}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Trilha de Auditoria de Movimentações</h2>
          <p className="text-xs text-muted-foreground">
            Log temporal e rastreável de todas as movimentações, trocas de titularidade, manutenção e ajustes de estoque
          </p>
        </div>
      </div>

      {/* FILTROS */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por equipamento, item, usuário responsável ou observação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
          <div className="w-full sm:w-52">
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Tipo de Operação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="Entrada">Entrada</SelectItem>
                <SelectItem value="Saída">Saída</SelectItem>
                <SelectItem value="Transferência">Transferência</SelectItem>
                <SelectItem value="Alteração Responsável">Alteração Responsável</SelectItem>
                <SelectItem value="Manutenção">Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* TABELA DE MOVIMENTAÇÕES */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-semibold">Registro Histórico ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs">Data / Hora</TableHead>
                <TableHead className="text-xs">Operação</TableHead>
                <TableHead className="text-xs">Ativo / Item de Estoque</TableHead>
                <TableHead className="text-xs">Origem &rarr; Destino</TableHead>
                <TableHead className="text-xs">Usuário Registrante</TableHead>
                <TableHead className="text-xs">Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-xs text-muted-foreground">
                    Nenhuma movimentação registrada com os filtros atuais.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((mov) => (
                  <TableRow key={mov.id} className="hover:bg-muted/50">
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {mov.dataHora}
                    </TableCell>

                    <TableCell>{renderBadgeTipo(mov.tipo)}</TableCell>

                    <TableCell className="text-xs">
                      <span className="font-bold text-foreground">
                        {mov.equipamentoNome || mov.estoqueItemNome || 'Item não especificado'}
                      </span>
                    </TableCell>

                    <TableCell className="text-xs">
                      <div className="flex flex-col text-[11px]">
                        <span className="text-muted-foreground">De: {mov.origem || 'Interno'}</span>
                        <span className="font-medium text-foreground">Para: {mov.destino || 'Local final'}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <User className="h-3.5 w-3.5 text-primary" />
                        <span>{mov.usuarioNome}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground max-w-[250px] truncate">
                      {mov.observacoes || '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
