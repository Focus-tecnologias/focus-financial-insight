import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, MoreVertical, CreditCard } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { ContaBancaria } from '../types';
import { NovaContaBancariaSheet } from './NovaContaBancariaSheet';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export function ContasBancariasList() {
  const { data: contasBancarias } = useLocalStorageState<ContaBancaria>('focus_contas_bancarias', []);

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Gestão de Contas Bancárias</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Contas reais cadastradas para integração de extratos.
          </p>
        </div>
        <NovaContaBancariaSheet>
          <Button><Plus className="w-4 h-4 mr-2" /> Adicionar Conta</Button>
        </NovaContaBancariaSheet>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contasBancarias.map(conta => (
          <Card key={conta.id} className="relative overflow-hidden transition-all hover:shadow-md">
            <div className={`absolute top-0 left-0 w-1 h-full ${conta.status === 'Ativa' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{conta.banco}</CardTitle>
                    <CardDescription className="mt-1 flex gap-2 items-center">
                      <CreditCard className="w-3 h-3" /> Conta {conta.tipoConta}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mt-2 -mr-2"><MoreVertical className="w-4 h-4 text-muted-foreground" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar Conta</DropdownMenuItem>
                    <DropdownMenuItem>Extrato Histórico</DropdownMenuItem>
                    <DropdownMenuItem className="text-rose-600">Inativar Conta</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded-lg border">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">Agência</p>
                    <p className="font-semibold">{conta.agencia}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">Número</p>
                    <p className="font-semibold">{conta.conta}-{conta.digito}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Saldo Real Bancário</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(conta.saldoAtual)}</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Reflete Agora</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <NovaContaBancariaSheet>
          <Card className="border-dashed bg-transparent flex flex-col items-center justify-center text-center p-6 min-h-[250px] hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg mb-2">Nova Conta</CardTitle>
            <CardDescription>
              Adicione uma nova conta corrente, poupança ou de investimentos.
            </CardDescription>
          </Card>
        </NovaContaBancariaSheet>
      </div>
    </div>
  );
}
