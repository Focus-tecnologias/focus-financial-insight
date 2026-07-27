import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Terminal, User } from 'lucide-react';
import { useIntegracoesStore } from '../hooks/useIntegracoesStore';

export function HubLogsView() {
  const { logs } = useIntegracoesStore();

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Monitor em Tempo Real & Logs de Requisições HTTP
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground border border-dashed rounded-lg">
              <Terminal className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Nenhum log de requisição registrado ainda.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card text-xs">
              <table className="w-full">
                <thead className="bg-muted/50 border-b text-left">
                  <tr>
                    <th className="p-3">Data / Hora</th>
                    <th className="p-3">Conector / Provedor</th>
                    <th className="p-3">Módulo Origem</th>
                    <th className="p-3">Endpoint & Método</th>
                    <th className="p-3">Status HTTP</th>
                    <th className="p-3">Latência</th>
                    <th className="p-3 text-right">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString('pt-BR')}
                      </td>
                      <td className="p-3 font-semibold text-primary">{log.nomeConector}</td>
                      <td className="p-3"><Badge variant="outline">{log.moduloOrigem}</Badge></td>
                      <td className="p-3 font-mono text-[11px]">
                        <span className="font-bold text-foreground mr-1">[{log.metodo}]</span>
                        <span className="text-muted-foreground">{log.endpoint}</span>
                      </td>
                      <td className="p-3 font-bold font-mono">{log.statusHttp}</td>
                      <td className="p-3 text-muted-foreground">{log.tempoRespostaMs} ms</td>
                      <td className="p-3 text-right">
                        <Badge 
                          className={
                            log.status === 'Sucesso' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'
                          }
                        >
                          {log.status}
                        </Badge>
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
