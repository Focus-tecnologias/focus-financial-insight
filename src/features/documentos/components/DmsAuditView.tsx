import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, User, Clock, Terminal } from 'lucide-react';
import { useDocumentosStore } from '../hooks/useDocumentosStore';

export function DmsAuditView() {
  const { auditLogs } = useDocumentosStore();

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Trilha de Auditoria & Logs de Acesso DMS / ECM
          </CardTitle>
        </CardHeader>
        <CardContent>
          {auditLogs.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground border border-dashed rounded-lg">
              <Terminal className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Nenhum evento registrado ainda.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card text-xs">
              <table className="w-full">
                <thead className="bg-muted/50 border-b text-left">
                  <tr>
                    <th className="p-3">Data / Hora</th>
                    <th className="p-3">Ação</th>
                    <th className="p-3">Documento</th>
                    <th className="p-3">Usuário</th>
                    <th className="p-3">Endereço IP</th>
                    <th className="p-3">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground">
                        {new Date(log.dataHora).toLocaleString('pt-BR')}
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant="outline" 
                          className={
                            log.acao === 'Upload' ? 'text-emerald-600 border-emerald-200' :
                            log.acao === 'Exclusão' ? 'text-rose-600 border-rose-200' :
                            log.acao === 'Versão Criada' ? 'text-purple-600 border-purple-200' : 'text-blue-600 border-blue-200'
                          }
                        >
                          {log.acao}
                        </Badge>
                      </td>
                      <td className="p-3 font-semibold text-primary">{log.nomeDocumento}</td>
                      <td className="p-3 text-muted-foreground flex items-center gap-1">
                        <User className="w-3 h-3" /> {log.usuario}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-muted-foreground">{log.ip}</td>
                      <td className="p-3 text-muted-foreground">{log.detalhes || '-'}</td>
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
