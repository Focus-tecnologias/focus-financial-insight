import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, User, Building2, ShieldCheck, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useEstoquePatrimonio } from '../hooks/useEstoquePatrimonio';

interface RelatoriosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RelatoriosModal({ open, onOpenChange }: RelatoriosModalProps) {
  const { equipamentos, licencas, patrimonios, estoqueItens } = useEstoquePatrimonio();

  const [tipoRelatorio, setTipoRelatorio] = useState('equipamentos_colaborador');

  const handleExportCSV = () => {
    let rows: string[][] = [];
    let filename = 'relatorio_itam.csv';

    if (tipoRelatorio === 'equipamentos_colaborador') {
      filename = 'relatorio_equipamentos_por_colaborador.csv';
      rows.push(['Patrimonio', 'Marca', 'Modelo', 'Categoria', 'Colaborador', 'Departamento', 'Localizacao', 'Situacao']);
      equipamentos.forEach((eq) => {
        rows.push([
          eq.codigoPatrimonial,
          eq.marca,
          eq.modelo,
          eq.categoria,
          eq.colaboradorNome || 'Estoque Central',
          eq.departamento || 'TI',
          eq.localFisica || '',
          eq.situacao,
        ]);
      });
    } else if (tipoRelatorio === 'patrimonio_depreciacao') {
      filename = 'relatorio_patrimonio_depreciacao.csv';
      rows.push(['Patrimonio', 'Categoria', 'Valor Compra', 'Valor Atual', 'Depreciacao Acumulada', 'Vida Util (Anos)']);
      patrimonios.forEach((p) => {
        rows.push([
          p.numeroPatrimonial,
          p.categoria,
          p.valorCompra.toString(),
          p.valorAtual.toString(),
          p.depreciacaoAcumulada.toString(),
          p.vidaUtilAnos.toString(),
        ]);
      });
    } else if (tipoRelatorio === 'licencas_saas') {
      filename = 'relatorio_licencas_saas.csv';
      rows.push(['Software', 'Fabricante', 'Plano', 'Qtd Total', 'Qtd Usada', 'Qtd Disponivel', 'Vencimento', 'Valor Unitario']);
      licencas.forEach((l) => {
        rows.push([
          l.nome,
          l.fabricante,
          l.plano,
          l.quantidadeTotal.toString(),
          l.quantidadeUsada.toString(),
          l.quantidadeDisponivel.toString(),
          l.vencimento || 'Perpetua',
          l.valor.toString(),
        ]);
      });
    } else {
      filename = 'relatorio_estoque_fisico.csv';
      rows.push(['Codigo', 'Item', 'Categoria', 'Qtd Atual', 'Qtd Minima', 'Localizacao']);
      estoqueItens.forEach((i) => {
        rows.push([i.codigo, i.nome, i.categoria, i.quantidade.toString(), i.quantidadeMinima.toString(), i.localizacao]);
      });
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Central de Relatórios ITAM & Patrimônio
          </DialogTitle>
          <DialogDescription className="text-xs">
            Gere relatórios executivos e contábeis prontos para conferência de auditoria e desligamento RH.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Tipo de Relatório *</Label>
            <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equipamentos_colaborador">Equipamentos por Colaborador (Termo / RH)</SelectItem>
                <SelectItem value="patrimonio_depreciacao">Patrimônio e Depreciação Contábil</SelectItem>
                <SelectItem value="licencas_saas">Licenças SaaS e Utilização de Assentos</SelectItem>
                <SelectItem value="estoque_fisico">Posição de Estoque Físico Almoxarifado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-muted/30 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-foreground">
              <span>Registros Selecionados:</span>
              <span className="text-primary font-mono">
                {tipoRelatorio === 'equipamentos_colaborador' && `${equipamentos.length} equipamentos`}
                {tipoRelatorio === 'patrimonio_depreciacao' && `${patrimonios.length} bens patrimoniais`}
                {tipoRelatorio === 'licencas_saas' && `${licencas.length} assinaturas`}
                {tipoRelatorio === 'estoque_fisico' && `${estoqueItens.length} itens no estoque`}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              O arquivo exportado estará formatado em formato CSV universal (compatível com Excel, Google Sheets e PowerBI).
            </p>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleExportCSV} className="gap-1.5">
            <Download className="h-4 w-4" /> Baixar Planilha CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
