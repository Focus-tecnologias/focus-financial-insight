import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, RotateCcw, ShieldAlert, FileText } from 'lucide-react';
import { useDocumentosStore } from '../hooks/useDocumentosStore';
import { toast } from 'sonner';

export function DmsTrashView() {
  const { lixeira, restoreFromTrash, deletePermanently } = useDocumentosStore();

  const handleRestore = (docId: string, nome: string) => {
    restoreFromTrash(docId);
    toast.success(`Documento "${nome}" restaurado com sucesso!`);
  };

  const handleDelete = (docId: string, nome: string) => {
    deletePermanently(docId);
    toast.success(`Documento "${nome}" excluído permanentemente.`);
  };

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-rose-500" />
            Lixeira Corporativa de Documentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lixeira.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground border border-dashed rounded-lg">
              <Trash2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Lixeira vazia.</p>
              <p className="text-xs mt-1">Nenhum documento aguardando restauração ou exclusão.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card text-xs">
              <table className="w-full">
                <thead className="bg-muted/50 border-b text-left">
                  <tr>
                    <th className="p-3">Nome do Documento</th>
                    <th className="p-3">Módulo</th>
                    <th className="p-3">Caminho Original</th>
                    <th className="p-3">Tamanho</th>
                    <th className="p-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {lixeira.map(item => (
                    <tr key={item.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-semibold text-rose-600 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> {item.nome}
                      </td>
                      <td className="p-3"><Badge variant="outline">{item.moduloOrigem}</Badge></td>
                      <td className="p-3 text-muted-foreground">{item.caminhoPasta}</td>
                      <td className="p-3 text-muted-foreground">{item.tamanho}</td>
                      <td className="p-3 text-right space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRestore(item.id, item.nome)}
                          className="h-7 text-xs gap-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Restaurar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleDelete(item.id, item.nome)}
                          className="h-7 text-xs gap-1"
                        >
                          Excluir Definitivamente
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
