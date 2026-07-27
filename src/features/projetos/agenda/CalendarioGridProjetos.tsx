import React, { useState } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventoProjeto, TipoEventoProjeto } from './types';

interface CalendarioGridProjetosProps {
  eventos: EventoProjeto[];
  onEventClick: (evento: EventoProjeto) => void;
}

const getEventTypeBadgeClass = (tipo: TipoEventoProjeto, status: string) => {
  if (status === 'Atrasado') {
    return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800 font-bold';
  }
  if (status === 'Concluído') {
    return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
  }

  switch (tipo) {
    case 'Entrega de Projeto':
      return 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800';
    case 'Kickoff':
      return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
    case 'Homologação':
      return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
    case 'Implantação':
      return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
    case 'Marco / Milestone':
      return 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800';
  }
};

export function CalendarioGridProjetos({ eventos, onEventClick }: CalendarioGridProjetosProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
  const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getEventsForDay = (day: Date) => {
    return eventos.filter((evento) => isSameDay(new Date(evento.data), day));
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="flex flex-col h-[750px] bg-card border border-border/80 rounded-xl shadow-sm overflow-hidden animate-fade-in pt-2">
      {/* Header do Calendário de Projetos */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold capitalize w-48 text-foreground">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={goToToday}>
              Hoje
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Dias da Semana */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/10">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground border-r border-border/60 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid do Calendário Mensal */}
      <div className="flex-1 grid grid-cols-7 bg-muted/5">
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const dayEvents = getEventsForDay(day);

          return (
            <div
              key={i}
              className={`min-h-[110px] border-b border-r border-border/50 last:border-r-0 p-1.5 flex flex-col transition-colors hover:bg-muted/30 ${
                !isCurrentMonth ? 'bg-muted/10 opacity-50' : 'bg-background'
              }`}
            >
              {/* Número do Dia */}
              <div className="flex justify-end p-0.5">
                <span
                  className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday(day)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground'
                  }`}
                >
                  {format(day, 'd')}
                </span>
              </div>

              {/* Eventos / Prazos do Dia */}
              <div className="flex-1 flex flex-col gap-1 overflow-y-auto pb-1 mt-0.5 px-0.5">
                {dayEvents.map((evento) => (
                  <div
                    key={evento.id}
                    onClick={() => onEventClick(evento)}
                    className={`text-[10px] font-semibold truncate px-2 py-1 border rounded-lg cursor-pointer transition-all hover:brightness-95 hover:shadow-sm flex items-center gap-1 ${getEventTypeBadgeClass(
                      evento.tipo,
                      evento.status
                    )}`}
                    title={`${evento.titulo} (${evento.status})`}
                  >
                    {evento.status === 'Atrasado' && (
                      <AlertTriangle className="h-3 w-3 text-rose-600 shrink-0 inline" />
                    )}
                    <span className="truncate">{evento.titulo}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
