import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Save, Hash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function ConfigNumeracao() {
  const modulosNumeracao = [
    { nome: 'Contratos', prefixo: 'CTR-', sufixo: '/26', digitos: 5, prox: 1, reinicioAnual: true },
    { nome: 'Projetos', prefixo: 'PRJ-', sufixo: '', digitos: 4, prox: 120, reinicioAnual: false },
    { nome: 'Clientes', prefixo: 'CLI-', sufixo: '', digitos: 5, prox: 85, reinicioAnual: false },
    { nome: 'Fornecedores', prefixo: 'FOR-', sufixo: '', digitos: 5, prox: 42, reinicioAnual: false },
    { nome: 'Contas a Receber (Faturas)', prefixo: 'FAT-', sufixo: '', digitos: 6, prox: 1045, reinicioAnual: true },
    { nome: 'Contas a Pagar', prefixo: 'PAG-', sufixo: '', digitos: 6, prox: 890, reinicioAnual: true }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Numeração Automática</h2>
          <p className="text-muted-foreground mt-1">Configure o padrão de geração de IDs e códigos da plataforma.</p>
        </div>
        <Button className="gap-2">
          <Save className="w-4 h-4" /> Salvar Alterações
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Hash className="w-5 h-5 text-primary" /> Padrões por Módulo</CardTitle>
          <CardDescription>Defina como os identificadores visuais (Human IDs) serão formatados.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Prefixo</TableHead>
                  <TableHead>Sufixo</TableHead>
                  <TableHead>Dígitos (Zeros)</TableHead>
                  <TableHead>Próximo N°</TableHead>
                  <TableHead className="text-center">Reinício Anual</TableHead>
                  <TableHead>Exemplo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modulosNumeracao.map((mod, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{mod.nome}</TableCell>
                    <TableCell>
                      <Input defaultValue={mod.prefixo} className="w-20 h-8 text-xs font-mono" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue={mod.sufixo} className="w-20 h-8 text-xs font-mono" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={mod.digitos} className="w-20 h-8" min={1} max={10} />
                    </TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={mod.prox} className="w-24 h-8" min={1} />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Switch defaultChecked={mod.reinicioAnual} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {mod.prefixo}{String(mod.prox).padStart(mod.digitos, '0')}{mod.sufixo}
                      </code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
