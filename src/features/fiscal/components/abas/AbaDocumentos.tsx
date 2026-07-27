import React from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud, FileType2, Download, Trash2, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function AbaDocumentos() {
  const anexos = [
    { id: 'ANX-1', nome: 'nfse_2024001.xml', extensao: 'xml', tamanho: '45 KB', dataUpload: '2024-07-20T10:05:00', usuario: 'Sistema' },
    { id: 'ANX-2', nome: 'nfse_2024001.pdf', extensao: 'pdf', tamanho: '120 KB', dataUpload: '2024-07-20T10:05:00', usuario: 'Sistema' }
  ];

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
        <UploadCloud className="w-8 h-8 text-primary mb-2" />
        <h3 className="text-sm font-semibold mb-1">Upload de Anexos</h3>
        <p className="text-xs text-muted-foreground">Arraste arquivos (PDF, XML, XLSX, PNG) ou clique para procurar.</p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Arquivo</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Data / Usuário</TableHead>
              <TableHead className="w-[120px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {anexos.map((anexo) => (
              <TableRow key={anexo.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileType2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{anexo.nome}</p>
                      <Badge variant="secondary" className="text-[10px] py-0">{anexo.extensao.toUpperCase()}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{anexo.tamanho}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs">{new Date(anexo.dataUpload).toLocaleString('pt-BR')}</span>
                    <span className="text-[10px] text-muted-foreground">por {anexo.usuario}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-500" title="Visualizar">
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" title="Baixar">
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-rose-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
