import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Wallet, Building2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export function AbaVinculos() {
  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <div>
        <h3 className="text-sm font-medium">Vínculos Sistêmicos</h3>
        <p className="text-xs text-muted-foreground">Relações deste documento com outras entidades do ERP. Vínculos são lógicos e imutáveis por segurança.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cliente / Fornecedor */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Users className="w-4 h-4 text-muted-foreground" /> Entidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-sm">Tech Solutions SA</p>
            <p className="text-xs text-muted-foreground">CNPJ: 12.345.678/0001-99</p>
            <Badge variant="outline" className="mt-2 text-[10px]">Cliente</Badge>
          </CardContent>
        </Card>

        {/* Projeto */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-muted-foreground" /> Projeto Relacionado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-sm text-blue-600 dark:text-blue-400">PRJ-001 - Implantação ERP</p>
            <p className="text-xs text-muted-foreground">Gerente: Maria Silva</p>
            <Badge variant="outline" className="mt-2 text-[10px] bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">Em Andamento</Badge>
          </CardContent>
        </Card>

        {/* Financeiro */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Wallet className="w-4 h-4 text-muted-foreground" /> Título Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-sm">FAT-1045</p>
            <p className="text-xs text-muted-foreground">Vencimento: 25/08/2026</p>
            <Badge variant="outline" className="mt-2 text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">Pago</Badge>
          </CardContent>
        </Card>

        {/* Centro de Custo */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Building2 className="w-4 h-4 text-muted-foreground" /> Centro de Custo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-sm">Operações (OP-01)</p>
            <p className="text-xs text-muted-foreground">Classificação Fiscal Padrão</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
