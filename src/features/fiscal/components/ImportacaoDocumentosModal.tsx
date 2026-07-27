import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileType2, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export function ImportacaoDocumentosModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<'upload' | 'processing' | 'success'>('upload');
  const [progress, setProgress] = useState(0);

  const handleSimulateUpload = () => {
    setStep('processing');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep('success');
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep('upload');
      setProgress(0);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importação Inteligente de Documentos</DialogTitle>
          <DialogDescription>
            Faça upload de XMLs ou PDFs. O sistema tentará extrair os dados e criar os vínculos automaticamente.
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-6 py-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer" onClick={handleSimulateUpload}>
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <UploadCloud className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Arraste seus arquivos aqui</h3>
              <p className="text-sm text-muted-foreground mb-4">ou clique para selecionar do seu computador</p>
              
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><FileType2 className="w-3 h-3" /> XML</span>
                <span className="flex items-center gap-1"><FileType2 className="w-3 h-3" /> PDF</span>
              </div>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="space-y-6 py-10 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <div className="space-y-2 w-full max-w-sm">
              <h3 className="text-lg font-medium">Processando arquivos...</h3>
              <p className="text-sm text-muted-foreground">Extraindo CNPJs, valores e impostos.</p>
              <Progress value={progress} className="h-2 w-full mt-4" />
            </div>
            <div className="space-y-2 text-left w-full max-w-sm mt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {progress > 20 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                Lendo metadados do XML...
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {progress > 50 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : (progress > 20 ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="w-4 h-4" />)}
                Identificando Cliente/Fornecedor...
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {progress > 80 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : (progress > 50 ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="w-4 h-4" />)}
                Buscando vínculos de Projetos...
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6 py-8 flex flex-col items-center justify-center text-center">
            <div className="bg-emerald-100 dark:bg-emerald-500/20 p-4 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Importação Concluída</h3>
              <p className="text-muted-foreground">2 documentos processados com sucesso.</p>
            </div>
            
            <div className="w-full bg-muted/50 rounded-lg p-4 text-left space-y-3 mt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">NF-e 45892.xml</p>
                  <p className="text-xs text-muted-foreground">Vinculado ao fornecedor Kalunga Comércio.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">NFS-e 2024001.pdf</p>
                  <p className="text-xs text-muted-foreground">Importado. Faltam vínculos de centro de custo.</p>
                </div>
              </div>
            </div>

            <Button className="w-full mt-4" onClick={handleClose}>Concluir e Atualizar Tabela</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
