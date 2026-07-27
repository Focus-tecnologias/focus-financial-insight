import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Send, Clock } from 'lucide-react';
import { toast } from 'sonner';

export function NovaCobrancaSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [agendado, setAgendado] = useState(false);
  
  const handleSave = () => {
    toast.success("Cobrança disparada/agendada com sucesso!");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Nova Cobrança</SheetTitle>
          <SheetDescription>
            Configure o envio multicanal para notificar seu cliente.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Dados Iniciais */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium border-b pb-2">1. Selecione o Título</h4>
            <div className="space-y-2">
              <Label htmlFor="titulo">Título Referência *</Label>
              <Select>
                <SelectTrigger id="titulo">
                  <SelectValue placeholder="Selecione um título em aberto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t1">REC-1020 - João Silva (Vence amanhã)</SelectItem>
                  <SelectItem value="t2">REC-1025 - Indústria ABC (R$ 8.500)</SelectItem>
                  <SelectItem value="t3">REC-1033 - Tech Solutions Ltda (Atrasado)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Canais */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium border-b pb-2">2. Canais de Envio</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <Checkbox id="whatsapp" defaultChecked />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="whatsapp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    WhatsApp
                  </label>
                  <p className="text-xs text-muted-foreground">Envio direto com PDF e Código PIX.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <Checkbox id="email" defaultChecked />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    E-mail
                  </label>
                  <p className="text-xs text-muted-foreground">Envio formalizado com anexo e histórico.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <Checkbox id="sms" />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="sms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    SMS
                  </label>
                  <p className="text-xs text-muted-foreground">Lembrete rápido de vencimento (Texto curto).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mensagem Personalizada */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium border-b pb-2">3. Mensagem</h4>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Texto de acompanhamento</Label>
              <Textarea 
                id="mensagem" 
                placeholder="Olá [Cliente], segue anexa sua fatura referente a..." 
                className="h-24"
              />
              <p className="text-xs text-muted-foreground">
                As variáveis [Cliente], [Valor] e [Vencimento] serão substituídas automaticamente. O PIX e Boleto serão inseridos ao final.
              </p>
            </div>
          </div>

          {/* Agendamento */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium border-b pb-2">4. Disparo</h4>
            
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <div>
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 
                  Agendar envio
                </h4>
                <p className="text-xs text-muted-foreground">Em vez de enviar agora, programar para depois.</p>
              </div>
              <Switch checked={agendado} onCheckedChange={setAgendado} />
            </div>

            {agendado && (
              <div className="grid gap-4 p-4 border rounded-lg animate-in fade-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label>Selecione a Regra de Agendamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7_dias_antes">7 dias antes do vencimento</SelectItem>
                      <SelectItem value="3_dias_antes">3 dias antes do vencimento</SelectItem>
                      <SelectItem value="1_dia_antes">1 dia antes do vencimento</SelectItem>
                      <SelectItem value="no_vencimento">No dia do vencimento</SelectItem>
                      <SelectItem value="1_dia_depois">1 dia após o vencimento (Atraso)</SelectItem>
                      <SelectItem value="data_customizada">Data específica personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} className="gap-2">
            {agendado ? <Clock className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            {agendado ? "Agendar Cobrança" : "Disparar Agora"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
