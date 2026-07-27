/**
 * Focus ERP - Push Notification Client Utilities
 * Handles Service Worker registration, VAPID subscription, and sending push via API
 */

const VAPID_PUBLIC_KEY = 'BEweG7jjNfn6TCYk3V68sAjeXapH31Qlcy1DUhmzvB_TV5cUebOrWHlR7QI81BpNb6ivphx-z8pjb906bq1f8tA';

/**
 * Converts a base64 string to a Uint8Array (required for VAPID applicationServerKey)
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Registers the Service Worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('[SW] Service Workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
    console.log('[SW] Service Worker registered:', registration.scope);
    return registration;
  } catch (error) {
    console.error('[SW] Service Worker registration failed:', error);
    return null;
  }
}

/**
 * Checks if push notifications are supported
 */
export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

/**
 * Gets the current notification permission status
 */
export function getNotificationPermission(): NotificationPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'denied';
  return Notification.permission;
}

/**
 * Requests notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'denied';
  return await Notification.requestPermission();
}

/**
 * Subscribes to Web Push notifications using VAPID
 * Returns the PushSubscription or null
 */
export async function subscribeToPush(userId = 'default'): Promise<PushSubscription | null> {
  if (!isPushSupported()) {
    console.warn('[Push] Push notifications not supported');
    return null;
  }

  try {
    // Get or wait for service worker registration
    let registration = await navigator.serviceWorker.getRegistration('/');
    if (!registration) {
      registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      // Wait for it to be ready
      await navigator.serviceWorker.ready;
      registration = await navigator.serviceWorker.getRegistration('/');
    }

    if (!registration) {
      throw new Error('Service Worker registration not found');
    }

    // Check for existing subscription
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // Create new subscription
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    // Send subscription to our API
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription, userId }),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    console.log('[Push] Successfully subscribed to push notifications');
    return subscription;
  } catch (error) {
    console.error('[Push] Error subscribing:', error);
    return null;
  }
}

/**
 * Unsubscribes from push notifications
 */
export async function unsubscribeFromPush(): Promise<boolean> {
  if (!isPushSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.getRegistration('/');
    if (!registration) return false;

    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return true;

    return await subscription.unsubscribe();
  } catch (error) {
    console.error('[Push] Error unsubscribing:', error);
    return false;
  }
}

/**
 * Sends a push notification via the Focus ERP API
 * This sends to all subscribed devices
 */
export async function sendPushNotification(payload: {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  userId?: string;
}): Promise<boolean> {
  try {
    const response = await fetch('/api/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('[Push] API send failed:', data.error);
      return false;
    }

    console.log(`[Push] Sent to ${data.sent}/${data.total} devices`);
    return data.sent > 0;
  } catch (error) {
    console.error('[Push] Error calling send API:', error);
    return false;
  }
}

/**
 * Shows a local notification immediately using the Service Worker
 * Works even when app is in background (without server push)
 */
export async function showLocalNotification(payload: {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const registration = await navigator.serviceWorker.getRegistration('/');
    if (!registration) return false;

    await registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: payload.tag || `focus-local-${Date.now()}`,
      vibrate: [100, 50, 100],
      data: { url: payload.url || '/' },
    });

    return true;
  } catch (error) {
    console.error('[Push] Error showing local notification:', error);
    return false;
  }
}

/**
 * Full setup: register SW + request permission + subscribe
 * Returns: { supported, permission, subscribed }
 */
export async function setupPushNotifications(userId = 'default'): Promise<{
  supported: boolean;
  permission: NotificationPermission;
  subscribed: boolean;
  error?: string;
}> {
  if (!isPushSupported()) {
    return {
      supported: false,
      permission: 'denied',
      subscribed: false,
      error: 'Push notifications not supported in this browser/device',
    };
  }

  // Register SW
  await registerServiceWorker();

  // Request permission
  const permission = await requestNotificationPermission();

  if (permission !== 'granted') {
    return {
      supported: true,
      permission,
      subscribed: false,
      error: permission === 'denied' ? 'Permission denied by user' : 'Permission dismissed',
    };
  }

  // Subscribe
  const subscription = await subscribeToPush(userId);

  return {
    supported: true,
    permission,
    subscribed: !!subscription,
    error: !subscription ? 'Failed to create push subscription' : undefined,
  };
}
