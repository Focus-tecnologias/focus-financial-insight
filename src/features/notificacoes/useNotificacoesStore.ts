import { useState, useEffect, useCallback } from 'react';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { Notificacao, UserNotificationPreferences, NotificationCategory, NotificationPriority, NotificationType } from './types';
import { INITIAL_NOTIFICACOES, DEFAULT_PREFERENCES } from './data/initialData';
import { toast } from 'sonner';
import {
  isPushSupported,
  getNotificationPermission,
  setupPushNotifications,
  sendPushNotification,
  showLocalNotification,
  unsubscribeFromPush,
  registerServiceWorker,
} from '@/lib/push-notifications';

// Função para reprodução de som agradável usando Web Audio API nativo do navegador
function playNotificationChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(880, ctx.currentTime); // Note A5
    osc2.frequency.setValueAtTime(1320, ctx.currentTime); // Note E6

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.35);
    osc2.stop(ctx.currentTime + 0.35);
  } catch {
    // Ignorar se o áudio do navegador estiver bloqueado
  }
}

export function useNotificacoesStore() {
  const { data: notificacoes, save: saveNotificacoes } = useLocalStorageState<Notificacao>('focus_notificacoes', INITIAL_NOTIFICACOES);
  const [preferences, setPreferences] = useState<UserNotificationPreferences>(() => {
    if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
    try {
      const item = window.localStorage.getItem('focus_notificacoes_prefs');
      return item ? JSON.parse(item) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const savePreferences = useCallback((newPrefs: UserNotificationPreferences) => {
    setPreferences(newPrefs);
    try {
      window.localStorage.setItem('focus_notificacoes_prefs', JSON.stringify(newPrefs));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Escutar eventos de novas notificações em tempo real
  const [hasNewArrival, setHasNewArrival] = useState(false);

  useEffect(() => {
    const handleNewNotif = () => {
      setHasNewArrival(true);
      const timer = setTimeout(() => setHasNewArrival(false), 2000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('focus_new_notification_event', handleNewNotif);
    return () => window.removeEventListener('focus_new_notification_event', handleNewNotif);
  }, []);

  // Dispatcher Global de Notificações
  const notificar = useCallback((payload: {
    titulo: string;
    descricao: string;
    origem: NotificationCategory;
    tipo?: NotificationType;
    prioridade?: NotificationPriority;
    responsavel?: string;
    targetUrl?: string;
    entidadeId?: string;
  }) => {
    const novaNotificacao: Notificacao = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      titulo: payload.titulo,
      descricao: payload.descricao,
      origem: payload.origem,
      tipo: payload.tipo || 'Informação',
      prioridade: payload.prioridade || 'Normal',
      lida: false,
      arquivada: false,
      dataCriacao: new Date().toISOString(),
      responsavel: payload.responsavel || 'Sistema',
      usuarioDestino: 'Você',
      targetUrl: payload.targetUrl || '/',
      entidadeId: payload.entidadeId
    };

    // Salvar na store
    const updated = [novaNotificacao, ...notificacoes];
    saveNotificacoes(updated);

    // Disparar efeito sonoro
    if (preferences.somHabilitado) {
      playNotificationChime();
    }

    // Disparar evento visual no Sino
    window.dispatchEvent(new Event('focus_new_notification_event'));

    // Disparar Toast Sonner
    if (payload.tipo === 'Sucesso') {
      toast.success(payload.titulo, { description: payload.descricao });
    } else if (payload.tipo === 'Erro' || payload.tipo === 'Crítico') {
      toast.error(payload.titulo, { description: payload.descricao });
    } else if (payload.tipo === 'Aviso') {
      toast.warning(payload.titulo, { description: payload.descricao });
    } else {
      toast.info(payload.titulo, { description: payload.descricao });
    }

    // Disparar Push Notification real via Service Worker (funciona com tela bloqueada)
    if (preferences.canais.pushNavegador && typeof window !== 'undefined') {
      const permission = getNotificationPermission();
      if (permission === 'granted') {
        const pushPayload = {
          title: payload.titulo,
          body: payload.descricao,
          url: payload.targetUrl || '/',
          tag: `focus-${payload.origem}-${Date.now()}`,
        };

        // Tenta enviar push real via servidor (funciona com tela bloqueada)
        sendPushNotification(pushPayload).then((sent) => {
          if (!sent) {
            // Fallback: notificação local via Service Worker (funciona em background)
            showLocalNotification(pushPayload);
          }
        }).catch(() => {
          // Fallback para notificação local se API falhar
          showLocalNotification(pushPayload);
        });
      }
    }

    return novaNotificacao;
  }, [notificacoes, saveNotificacoes, preferences]);

  // Ações de gerenciamento
  const marcarComoLida = useCallback((id: string) => {
    const updated = notificacoes.map(n => n.id === id ? { ...n, lida: true } : n);
    saveNotificacoes(updated);
  }, [notificacoes, saveNotificacoes]);

  const marcarTodasComoLidas = useCallback(() => {
    const updated = notificacoes.map(n => ({ ...n, lida: true }));
    saveNotificacoes(updated);
    toast.success('Todas as notificações foram marcadas como lidas.');
  }, [notificacoes, saveNotificacoes]);

  const arquivar = useCallback((id: string) => {
    const updated = notificacoes.map(n => n.id === id ? { ...n, arquivada: true } : n);
    saveNotificacoes(updated);
    toast.info('Notificação arquivada.');
  }, [notificacoes, saveNotificacoes]);

  const excluir = useCallback((id: string) => {
    const updated = notificacoes.filter(n => n.id !== id);
    saveNotificacoes(updated);
    toast.info('Notificação removida.');
  }, [notificacoes, saveNotificacoes]);

  const solicitarPermissaoPush = useCallback(async () => {
    if (!isPushSupported()) {
      toast.error('Este dispositivo/navegador não suporta notificações Push.');
      return false;
    }

    toast.loading('Configurando notificações push...', { id: 'push-setup' });

    const result = await setupPushNotifications('focus-user-default');

    if (result.permission === 'granted' && result.subscribed) {
      savePreferences({
        ...preferences,
        canais: { ...preferences.canais, pushNavegador: true }
      });
      toast.success(
        '🔔 Notificações Push ativadas! Você receberá alertas mesmo com a tela bloqueada.',
        { id: 'push-setup', duration: 5000 }
      );
      return true;
    } else if (result.permission === 'denied') {
      toast.error(
        'Permissão negada. Habilite as notificações nas configurações do seu dispositivo.',
        { id: 'push-setup', duration: 6000 }
      );
      return false;
    } else {
      toast.warning(
        result.error || 'Não foi possível configurar as notificações push.',
        { id: 'push-setup' }
      );
      return false;
    }
  }, [preferences, savePreferences]);

  const desativarPush = useCallback(async () => {
    await unsubscribeFromPush();
    savePreferences({
      ...preferences,
      canais: { ...preferences.canais, pushNavegador: false }
    });
    toast.info('Notificações push desativadas.');
  }, [preferences, savePreferences]);

  const pushAtivo = preferences.canais.pushNavegador && getNotificationPermission() === 'granted';
  const pushSuportado = isPushSupported();

  const naoLidasCount = notificacoes.filter(n => !n.lida && !n.arquivada).length;
  const notificacoesAtivas = notificacoes.filter(n => !n.arquivada);

  return {
    notificacoes: notificacoesAtivas,
    todasNotificacoes: notificacoes,
    naoLidasCount,
    hasNewArrival,
    preferences,
    savePreferences,
    notificar,
    marcarComoLida,
    marcarTodasComoLidas,
    arquivar,
    excluir,
    solicitarPermissaoPush,
    desativarPush,
    pushAtivo,
    pushSuportado,
  };
}
