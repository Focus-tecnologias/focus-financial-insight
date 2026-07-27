import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Phone, Mail, MessageSquare, RefreshCw, Star } from 'lucide-react';
import { useCrmStore } from '../hooks/useCrmStore';

export function LeadsView() {
  const { leads } = useCrmStore();

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-base flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Gestão de Leads (ClickUp Sync)
          </h3>
          <p className="text-xs text-muted-foreground">Qualificação e acompanhamento de leads capturados pelo ClickUp e canais digitais.</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="border rounded-lg overflow-hidden bg-card text-xs">
            <table className="w-full">
              <thead className="bg-muted/50 border-b text-left">
                <tr>
                  <th className="p-3">ClickUp Task</th>
                  <th className="p-3">Nome / Empresa</th>
                  <th className="p-3">Contatos</th>
                  <th className="p-3">Origem</th>
                  <th className="p-3">Score Lead</th>
                  <th className="p-3">Responsável</th>
                  <th className="p-3 text-right">Ação WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px] font-mono border-orange-500/40 text-orange-600 bg-orange-50">
                        {lead.clickUpTaskId}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-primary">{lead.nome}</div>
                      <div className="text-[10px] text-muted-foreground">{lead.empresa} ({lead.cidade}/{lead.estado})</div>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      <div>{lead.email}</div>
                      <div className="text-[10px]">{lead.telefone}</div>
                    </td>
                    <td className="p-3"><Badge variant="secondary">{lead.origem}</Badge></td>
                    <td className="p-3 font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {lead.score}/100
                    </td>
                    <td className="p-3 font-medium">{lead.responsavel}</td>
                    <td className="p-3 text-right">
                      <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                          <MessageSquare className="w-3.5 h-3.5" /> Conversar WhatsApp
                        </Button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
