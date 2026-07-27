import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Calendar, Plus } from 'lucide-react';
import { useAgendaEvents } from '../useAgendaEvents';
import { CategoriaAgenda, PrioridadeAgenda, StatusAgenda } from '../types';

export function NovoEventoAgendaSheet({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState<CategoriaAgenda>('Recebimento');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [hora, setHora] = useState('09:00');
  const [valor, setValor] = useState('');
  const [entidadeVinculo, setEntidadeVinculo] = useState('');
  const [prioridade, setPrioridade] = useState<PrioridadeAgenda>('Média');
  const [observacoes, setObservacoes] = useState('');

  const { addEvent } = useAgendaEvents();

  const handleSave = () => {
    if (!titulo || !data) {
      toast.error('Preencha o título e a data do evento.');
      return;
    }

    addEvent({
      titulo,
      categoria,
      data,
      hora,
      valor: valor ? parseFloat(valor) : undefined,
      entidadeVinculo: entidadeVinculo || undefined,
      status: 'Em Aberto' as StatusAgenda,
      prioridade,
      observacoes: observacoes || undefined,
      moduloOrigem: 'Fiscal',
      linkOrigem: '/agenda'
    });

    toast.success('Evento agendado na Agenda Financeira!');
    setOpen(false);
    // Limpar campos
    setTitulo('');
    setValor('');
    setEntidadeVinculo('');
    setObservacoes('');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Novo Evento / Lembrete
          </SheetTitle>
          <SheetDescription>
            Agende um compromisso ou lembrete financeiro no seu calendário central.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título do Evento *</Label>
            <Input 
              id="titulo" 
              placeholder="Ex: Reunião de Alinhamento Fiscal" 
              value={titulo} 
              onChange={e => setTitulo(e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={categoria} onValueChange={(val: any) => setCategoria(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recebimento">Recebimento</SelectItem>
                  <SelectItem value="Pagamento">Pagamento</SelectItem>
                  <SelectItem value="Imposto">Imposto</SelectItem>
                  <SelectItem value="Contrato">Contrato</SelectItem>
                  <SelectItem value="Projeto">Projeto</SelectItem>
                  <SelectItem value="Obrigação Fiscal">Obrigação Fiscal</SelectItem>
                  <SelectItem value="Renovação">Renovação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select value={prioridade} onValueChange={(val: any) => setPrioridade(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="data">Data *</Label>
              <Input 
                id="data" 
                type="date" 
                value={data} 
                onChange={e => setData(e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hora">Horário</Label>
              <Input 
                id="hora" 
                type="time" 
                value={hora} 
                onChange={e => setHora(e.target.value)} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor Estimado (R$)</Label>
              <Input 
                id="valor" 
                type="number" 
                placeholder="0.00" 
                value={valor} 
                onChange={e => setValor(e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entidade">Cliente / Entidade</Label>
              <Input 
                id="entidade" 
                placeholder="Nome da empresa ou pessoa" 
                value={entidadeVinculo} 
                onChange={e => setEntidadeVinculo(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="obs">Observações / Anotações</Label>
            <Textarea 
              id="obs" 
              placeholder="Detalhes adicionais sobre o compromisso..." 
              value={observacoes} 
              onChange={e => setObservacoes(e.target.value)} 
              rows={3} 
            />
          </div>
        </div>

        <SheetFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Evento</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
