// Focus ERP - Service Worker
// Handles push notifications for mobile iOS/Android when screen is locked

const CACHE_NAME = 'focus-erp-v1';
const ICON_URL = '/icon-192.png';

// ── Push Event: fired by server push ──────────────────────────────────────────
self.addEventListener('push', function (event) {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'Focus ERP', body: event.data ? event.data.text() : 'Nova notificação' };
  }

  const title = data.title || 'Focus ERP';
  const options = {
    body: data.body || data.descricao || 'Você tem uma nova notificação.',
    icon: ICON_URL,
    badge: ICON_URL,
    tag: data.tag || 'focus-notif-' + Date.now(),
    renotify: true,
    vibrate: [100, 50, 100],
    requireInteraction: data.requireInteraction || false,
    data: {
      url: data.url || data.targetUrl || '/',
      notifId: data.notifId || null,
    },
    actions: [
      { action: 'open', title: 'Abrir' },
      { action: 'dismiss', title: 'Fechar' },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ── Notification Click ─────────────────────────────────────────────────────────
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const targetUrl = (event.notification.data && event.notification.data.url) || '/';
  const absoluteUrl = new URL(targetUrl, self.location.origin).href;

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        // Se já existe janela aberta com a URL, focar nela
        for (const client of clientList) {
          if (client.url === absoluteUrl && 'focus' in client) {
            return client.focus();
          }
        }
        // Caso contrário, abrir nova aba/janela
        if (clients.openWindow) {
          return clients.openWindow(absoluteUrl);
        }
      })
  );
});

// ── Activate: limpar caches antigos ───────────────────────────────────────────
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

// ── Install ────────────────────────────────────────────────────────────────────
self.addEventListener('install', function (event) {
  self.skipWaiting();
});
