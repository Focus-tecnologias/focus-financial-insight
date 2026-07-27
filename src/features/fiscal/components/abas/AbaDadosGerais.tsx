import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function AbaDadosGerais() {
  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipo de Documento</Label>
          <Select defaultValue="NF-e">
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="NFS-e">NFS-e (Serviço)</SelectItem>
              <SelectItem value="NF-e">NF-e (Produto)</SelectItem>
              <SelectItem value="CT-e">CT-e (Transporte)</SelectItem>
              <SelectItem value="Fatura">Fatura / Boleto</SelectItem>
              <SelectItem value="Recibo">Recibo</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Número</Label>
            <Input defaultValue="45892" />
          </div>
          <div className="space-y-2">
            <Label>Série</Label>
            <Input defaultValue="2" />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Chave de Acesso (NF-e / CT-e)</Label>
          <Input defaultValue="35240112345678901234550010002024001123456789" className="font-mono text-xs" />
        </div>

        <div className="space-y-2">
          <Label>Entidade Vinculada (Sacado/Emitente)</Label>
          <Select defaultValue="FOR-045">
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="CLI-001">Cliente: Tech Solutions SA</SelectItem>
              <SelectItem value="FOR-045">Fornecedor: Kalunga Comércio</SelectItem>
              <SelectItem value="INT-000">Interno: Focus Tecnologia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Data de Emissão</Label>
            <Input type="date" defaultValue="2026-07-18" />
          </div>
          <div className="space-y-2">
            <Label>Data de Entrada</Label>
            <Input type="date" defaultValue="2026-07-19" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Valor Total (R$)</Label>
          <Input type="number" defaultValue="1250.50" step="0.01" />
        </div>

        <div className="space-y-2">
          <Label>Status Fiscal</Label>
          <Select defaultValue="Conferido">
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="Recebido">Recebido</SelectItem>
              <SelectItem value="Emitido">Emitido</SelectItem>
              <SelectItem value="Conferido">Conferido</SelectItem>
              <SelectItem value="Vinculado">Vinculado</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Observações Internas</Label>
          <Textarea placeholder="Detalhes sobre retenções, cancelamentos ou particularidades deste documento..." className="resize-none" rows={3} />
        </div>
      </div>
    </div>
  );
}
