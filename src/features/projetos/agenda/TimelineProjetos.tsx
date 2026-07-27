import React from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle2, User, ExternalLink, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EventoProjeto } from './types';

interface TimelineProjetosProps {
  eventos: EventoProjeto[];
  onEventClick: (evento: EventoProjeto) => void;
}

export function TimelineProjetos({ eventos, onEventClick }: TimelineProjetosProps) {
  if (eventos.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <CalendarIcon className="h-10 w-10 text-muted-foreground/60" />
          <h3 className="text-base font-bold text-foreground">Nenhum prazo ou entrega agendada</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Nenhum evento ou entrega encontrado para os filtros selecionados.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Agrupar eventos por data
  const groupedEvents = eventos.reduce((acc, evt) => {
    const dateKey = evt.data.split('T')[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(evt);
    return acc;
  }, {} as Record<string, EventoProjeto[]>);

  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedDates.map((dateStr) => {
        const dateObj = parseISO(dateStr);
        const dayEvents = groupedEvents[dateStr];
        const isHoje = isSameDay(dateObj, new Date());

        return (
          <div key={dateStr} className="space-y-3">
            {/* Header da Data */}
            <div className="flex items-center gap-3">
              <div
                className={`px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 ${
                  isHoje
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground border border-border'
                }`}
              >
                <CalendarIcon className="h-3.5 w-3.5" />
                {format(dateObj, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>
              <div className="flex-1 h-[1px] bg-border/60" />
            </div>

            {/* Lista de Eventos do Dia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
              {dayEvents.map((evt) => {
                const isAtrasado = evt.status === 'Atrasado';
                const isConcluido = evt.status === 'Concluído';

                return (
                  <Card
                    key={evt.id}
                    onClick={() => onEventClick(evt)}
                    className={`hover:shadow-md transition-all cursor-pointer border-l-4 ${
                      isAtrasado
                        ? 'border-l-rose-500 bg-rose-500/5 dark:bg-rose-950/20'
                        : isConcluido
                        ? 'border-l-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20'
                        : 'border-l-primary bg-card'
                    }`}
                  >
                    <CardContent className="p-4 flex flex-col justify-between space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] uppercase font-bold">
                              {evt.tipo}
                            </Badge>
                            {evt.prioridade && (
                              <Badge
                                variant="secondary"
                                className={`text-[10px] ${
                                  evt.prioridade === 'Crítica' || evt.prioridade === 'Alta'
                                    ? 'text-rose-600 bg-rose-500/10'
                                    : ''
                                }`}
                              >
                                Prioridade: {evt.prioridade}
                              </Badge>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-foreground mt-1.5 leading-snug">
                            {evt.titulo}
                          </h4>
                          {evt.projetoNome && (
                            <p className="text-xs font-semibold text-primary mt-0.5">
                              Projeto: {evt.projetoNome}
                            </p>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          {isAtrasado && (
                            <Badge variant="destructive" className="text-[10px] gap-1 font-bold">
                              <AlertTriangle className="h-3 w-3" /> Atrasado
                            </Badge>
                          )}
                          {isConcluido && (
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1 font-bold"
                            >
                              <CheckCircle2 className="h-3 w-3" /> Entregue
                            </Badge>
                          )}
                          {!isAtrasado && !isConcluido && (
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-blue-500/10 text-blue-600 border-blue-500/30 font-semibold"
                            >
                              {evt.status}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 pt-2">
                        {evt.responsavel ? (
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-primary" /> {evt.responsavel}
                          </span>
                        ) : (
                          <span className="italic text-[11px]">Sem responsável</span>
                        )}

                        <span className="flex items-center gap-1 text-primary font-semibold hover:underline">
                          Detalhes <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
