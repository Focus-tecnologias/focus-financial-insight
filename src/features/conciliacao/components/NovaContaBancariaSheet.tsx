import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

import { useLocalStorageState } from '@/hooks/useDataStore';
import { ContaBancaria } from '../types';

export function NovaContaBancariaSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [banco, setBanco] = useState('');
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');
  const [digito, setDigito] = useState('');
  const [tipoConta, setTipoConta] = useState<'Corrente' | 'Poupança' | 'Investimento'>('Corrente');
  const [titular, setTitular] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [chavePix, setChavePix] = useState('');
  const [saldoAtual, setSaldoAtual] = useState('');

  const { addItem } = useLocalStorageState<ContaBancaria>('focus_contas_bancarias');

  const handleSave = () => {
    if (!banco || !agencia || !conta || !titular) {
      toast.error("Banco, Agência, Conta e Titular são obrigatórios!");
      return;
    }

    const novaConta: ContaBancaria = {
      id: `cb-${Date.now()}`,
      banco,
      agencia,
      conta,
      digito: digito || '0',
      tipoConta,
      titular,
      cnpj,
      chavePix,
      saldoInicial: Number(saldoAtual) || 0,
      saldoAtual: Number(saldoAtual) || 0,
      status: 'Ativa'
    };

    addItem(novaConta);
    toast.success("Conta bancária cadastrada com sucesso!");
    setOpen(false);
    
    // Limpar campos
    setBanco('');
    setAgencia('');
    setConta('');
    setDigito('');
    setTitular('');
    setCnpj('');
    setChavePix('');
    setSaldoAtual('');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Nova Conta Bancária</SheetTitle>
          <SheetDescription>
            Cadastre uma conta real para integração com os extratos e conciliação.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Banco *</Label>
            <Input value={banco} onChange={e => setBanco(e.target.value)} placeholder="Ex: Itaú, Nubank, Bradesco" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-1">
              <Label>Agência *</Label>
              <Input value={agencia} onChange={e => setAgencia(e.target.value)} placeholder="0000" />
            </div>
            <div className="space-y-2 col-span-1">
              <Label>Conta *</Label>
              <Input value={conta} onChange={e => setConta(e.target.value)} placeholder="00000" />
            </div>
            <div className="space-y-2 col-span-1">
              <Label>Dígito</Label>
              <Input value={digito} onChange={e => setDigito(e.target.value)} placeholder="0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Conta</Label>
            <Select value={tipoConta} onValueChange={(v: any) => setTipoConta(v)}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Corrente">Corrente</SelectItem>
                <SelectItem value="Poupança">Poupança</SelectItem>
                <SelectItem value="Investimento">Investimento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Titular da Conta *</Label>
            <Input value={titular} onChange={e => setTitular(e.target.value)} placeholder="Razão Social ou Nome Completo" />
          </div>

          <div className="space-y-2">
            <Label>CNPJ / CPF do Titular</Label>
            <Input value={cnpj} onChange={e => setCnpj(e.target.value)} placeholder="00.000.000/0001-00" />
          </div>

          <div className="space-y-2">
            <Label>Chave PIX Principal</Label>
            <Input value={chavePix} onChange={e => setChavePix(e.target.value)} placeholder="e-mail, telefone, cpf ou aleatória" />
          </div>

          <div className="space-y-2">
            <Label>Saldo Inicial (R$)</Label>
            <Input type="number" step="0.01" value={saldoAtual} onChange={e => setSaldoAtual(e.target.value)} placeholder="0.00" />
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Conta</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
