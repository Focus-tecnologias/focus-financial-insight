import React from 'react';

export function AbaHistorico() {
  const eventos = [
    { id: 1, dataHora: '2026-07-20T10:05:00', usuario: 'Sistema', acao: 'Importação automática via XML', detalhes: 'Arquivo nfse_2024001.xml processado com sucesso.' },
    { id: 2, dataHora: '2026-07-20T10:06:00', usuario: 'Sistema', acao: 'Vínculo Automático', detalhes: 'Documento vinculado ao Cliente Tech Solutions SA via CNPJ.' },
    { id: 3, dataHora: '2026-07-20T14:30:00', usuario: 'Maria Silva', acao: 'Alteração de Status', detalhes: 'Status alterado de Recebido para Conferido.' }
  ];

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <div>
        <h3 className="text-sm font-medium">Timeline de Auditoria Fiscal</h3>
        <p className="text-xs text-muted-foreground">Registro imutável de todas as ações e alterações realizadas neste documento.</p>
      </div>

      <div className="space-y-8 pl-4 border-l-2 border-muted ml-2">
        {eventos.map((evento) => (
          <div key={evento.id} className="relative">
            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary border-2 border-background"></div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{evento.acao}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{new Date(evento.dataHora).toLocaleString('pt-BR')}</span>
              </div>
              <p className="text-sm text-muted-foreground">{evento.detalhes}</p>
              <p className="text-xs font-medium mt-1">Por: <span className="text-blue-600 dark:text-blue-400">{evento.usuario}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
