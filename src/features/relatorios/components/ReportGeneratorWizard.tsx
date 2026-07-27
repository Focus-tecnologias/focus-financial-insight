import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, ArrowLeft, Wand2, FileText, Filter, Settings, Eye } from 'lucide-react';
import { useRelatoriosStore } from '../hooks/useRelatoriosStore';
import { ReportDefinition, ReportFilterConfig, GeneratedReportData } from '../types';
import { ReportDocumentPreviewModal } from './ReportDocumentPreviewModal';

export function ReportGeneratorWizard() {
  const { catalog, generateReportData } = useRelatoriosStore();

  const [step, setStep] = useState<number>(1);
  const [selectedReportId, setSelectedReportId] = useState<string>(catalog[0].id);

  // Filter state
  const [dataInicio, setDataInicio] = useState('2026-01-01');
  const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0]);
  const [empresa, setEmpresa] = useState('Focus Tecnologia Ltda');
  const [status, setStatus] = useState('Todos');
  const [incluirGraficos, setIncluirGraficos] = useState(true);
  const [incluirResumoExecutivo, setIncluirResumoExecutivo] = useState(true);
  const [observacoesPersonalizadas, setObservacoesPersonalizadas] = useState('');

  // Preview Modal
  const [previewData, setPreviewData] = useState<GeneratedReportData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const selectedDef: ReportDefinition = catalog.find(r => r.id === selectedReportId) || catalog[0];

  const handleGeneratePreview = () => {
    const filterConfig: ReportFilterConfig = {
      dataInicio,
      dataFim,
      empresa,
      status,
      colunasSelecionadas: selectedDef.columns.map(c => c.key),
      incluirGraficos,
      incluirResumoExecutivo,
      observacoesPersonalizadas
    };

    const data = generateReportData(selectedDef.id, filterConfig);
    setPreviewData(data);
    setShowPreview(true);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pt-2">
      {/* Steps Progress Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Assistente de Geração de Relatórios</h2>
            <p className="text-xs text-muted-foreground">Configure e personalize os parâmetros do seu documento corporativo.</p>
          </div>
        </div>

        {/* Step Indicator Badges */}
        <div className="flex items-center gap-3 text-xs">
          <Badge variant={step === 1 ? 'default' : 'outline'} className={step === 1 ? 'bg-orange-500' : ''}>1. Relatório</Badge>
          <span>→</span>
          <Badge variant={step === 2 ? 'default' : 'outline'} className={step === 2 ? 'bg-orange-500' : ''}>2. Filtros</Badge>
          <span>→</span>
          <Badge variant={step === 3 ? 'default' : 'outline'} className={step === 3 ? 'bg-orange-500' : ''}>3. Personalização</Badge>
        </div>
      </div>

      {/* STEP 1: Seleção do Relatório */}
      {step === 1 && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Etapa 1 de 3: Selecionar Tipo de Relatório
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catalog.map(item => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedReportId(item.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${selectedReportId === item.id ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'hover:border-muted-foreground/40 bg-card'}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-[10px]">{item.category}</Badge>
                      {selectedReportId === item.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                    <h4 className="font-semibold text-sm leading-tight mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t p-4">
            <Button onClick={() => setStep(2)} className="gap-2">
              Avançar para Filtros <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 2: Filtros */}
      {step === 2 && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              Etapa 2 de 3: Filtros de Dados ({selectedDef.title})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data Inicial</Label>
                <Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Data Final</Label>
                <Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Empresa / Filial</Label>
                <Select value={empresa} onValueChange={setEmpresa}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Focus Tecnologia Ltda">Focus Tecnologia Ltda (Matriz)</SelectItem>
                    <SelectItem value="Focus Finance Filial SP">Focus Finance Filial SP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status dos Registros</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos os Status</SelectItem>
                    <SelectItem value="Ativos">Apenas Ativos / Concluídos</SelectItem>
                    <SelectItem value="Pendentes">Pendentes / Em Aberto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Button>
            <Button onClick={() => setStep(3)} className="gap-2">
              Avançar para Personalização <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 3: Personalização e Pré-Visualização */}
      {step === 3 && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              Etapa 3 de 3: Layout & Emissão do Documento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 border p-4 rounded-lg bg-muted/20">
              <h4 className="font-semibold text-sm">Opções de Exibição Corporativa</h4>
              <div className="flex items-center space-x-2">
                <Checkbox id="inc-res" checked={incluirResumoExecutivo} onCheckedChange={(v: any) => setIncluirResumoExecutivo(v)} />
                <Label htmlFor="inc-res" className="text-xs">Incluir Cards de Resumo Executivo no Cabeçalho</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="inc-graf" checked={incluirGraficos} onCheckedChange={(v: any) => setIncluirGraficos(v)} />
                <Label htmlFor="inc-graf" className="text-xs">Incluir Gráficos Analíticos no Relatório</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Observações Customizadas (Visíveis no Rodapé do Relatório)</Label>
              <Textarea 
                placeholder="Ex: Documento para apreciação da auditoria interna do Q3..." 
                value={observacoesPersonalizadas}
                onChange={e => setObservacoesPersonalizadas(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Button>
            <Button onClick={handleGeneratePreview} className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
              <Eye className="w-4 h-4" /> Visualizar & Exportar Documento
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Modal de Pré-Visualização Corporativa */}
      <ReportDocumentPreviewModal 
        data={previewData}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}
