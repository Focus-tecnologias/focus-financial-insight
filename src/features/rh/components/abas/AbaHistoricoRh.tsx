import React from 'react';
import { Clock } from 'lucide-react';

export function AbaHistoricoRh() {
  const eventos = [
    { id: 1, data: "2024-05-01T09:00:00", user: "Sistema", acao: "Admissão", desc: "Colaborador cadastrado no sistema." },
    { id: 2, data: "2024-05-01T09:30:00", user: "Mariana Costa", acao: "Atribuição de Equipamento", desc: "Notebook (FCT-0042) entregue ao colaborador." },
    { id: 3, data: "2024-06-15T14:20:00", user: "Sistema", acao: "Avaliação de Desempenho", desc: "Ciclo Q2 concluído com nota 4.1." },
    { id: 4, data: "2024-12-10T16:45:00", user: "Roberto Almeida", acao: "Promoção", desc: "Cargo alterado de Pleno para Sênior." },
  ];

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-8">
      <div>
        <h3 className="text-sm font-medium">Timeline de Auditoria de RH</h3>
        <p className="text-xs text-muted-foreground">Registro imutável de todas as alterações cadastrais e movimentações.</p>
      </div>

      <div className="space-y-8 pl-4 border-l-2 border-muted ml-2">
        {eventos.map((evento) => (
          <div key={evento.id} className="relative">
            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary border-2 border-background"></div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{evento.acao}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3"/> {new Date(evento.data).toLocaleString('pt-BR')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{evento.desc}</p>
              <p className="text-xs font-medium mt-1">Por: <span className="text-blue-600 dark:text-blue-400">{evento.user}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
