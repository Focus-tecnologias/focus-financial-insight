import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Landmark, Upload, ShieldCheck, KeyRound, CheckCircle2 } from 'lucide-react';
import { CertificadoDigital } from '../types';
import { toast } from 'sonner';

interface CertificadosManagerProps {
  certificados: CertificadoDigital[];
}

export function CertificadosManager({ certificados }: CertificadosManagerProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Banner Gov.br Integration */}
      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500 text-white shrink-0 shadow-md">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-emerald-800 dark:text-emerald-300">Conectidade Gov.br (Assinador Federal)</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Integração ativa com o serviço oficial de assinaturas eletrônicas avançadas do Governo Federal.
            </p>
          </div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold text-xs shrink-0" onClick={() => toast.success("Sua conta Gov.br (Nível Ouro) está conectada e pronta!")}>
          <CheckCircle2 className="w-4 h-4" /> Conta Gov.br Conectada (Ouro)
        </Button>
      </div>

      {/* Certificados ICP-Brasil */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Certificados Digitais (ICP-Brasil)</h3>
            <p className="text-xs text-muted-foreground">Chaves privadas A1 (.pfx/.p12) e A3 (Token/Cartão) vinculadas ao Focus Finance</p>
          </div>
          <Button className="gap-2 text-xs" onClick={() => toast.info("Selecione o arquivo .p12 ou .pfx do seu Certificado A1")}>
            <Upload className="w-4 h-4" /> Importar Certificado A1
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificados.map((cert) => (
            <Card key={cert.id} className="hover:shadow-md transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-cyan-600 text-white text-[10px]">{cert.tipo}</Badge>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50 text-[10px]">{cert.status}</Badge>
                </div>
                <CardTitle className="text-sm font-bold mt-2">{cert.titular}</CardTitle>
                <CardDescription className="text-xs font-mono">{cert.cpfCnpj}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between border-t pt-2">
                  <span className="text-muted-foreground">Emissor:</span>
                  <span className="font-medium text-right">{cert.emissor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Validade:</span>
                  <span className="font-medium">{new Date(cert.validade).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serial Number:</span>
                  <span className="font-mono text-[10px]">{cert.serialNumber}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
