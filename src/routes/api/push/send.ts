// API Route: POST /api/push/send
// Sends a push notification to all subscribed clients
import { createAPIFileRoute } from '@tanstack/start/api';
import webpush from 'web-push';

// VAPID Keys — generated for Focus ERP
const VAPID_PUBLIC_KEY = 'BEweG7jjNfn6TCYk3V68sAjeXapH31Qlcy1DUhmzvB_TV5cUebOrWHlR7QI81BpNb6ivphx-z8pjb906bq1f8tA';
const VAPID_PRIVATE_KEY = 'NThTl8fP9BAsO0WPvFPvHzAEan5aU2-QXqtqH6rN0bE';

webpush.setVapidDetails(
  'mailto:contato@focustecnologia.com.br',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export const APIRoute = createAPIFileRoute('/api/push/send')({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const { title, body: msgBody, url = '/', tag, userId } = body;

      if (!title) {
        return new Response(JSON.stringify({ error: 'Title is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const subscriptions: Map<string, any> = (globalThis as any).__pushSubscriptions || new Map();

      if (subscriptions.size === 0) {
        return new Response(
          JSON.stringify({ error: 'No subscriptions found. User must enable push notifications first.' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      const payload = JSON.stringify({
        title,
        body: msgBody,
        url,
        tag: tag || `focus-${Date.now()}`,
        requireInteraction: false,
      });

      const results: { userId: string; success: boolean; error?: string }[] = [];

      // Send to specific user or all subscribed users
      const targets = userId
        ? subscriptions.has(userId) ? [[userId, subscriptions.get(userId)]] : []
        : Array.from(subscriptions.entries());

      for (const [uid, subscription] of targets) {
        try {
          await webpush.sendNotification(subscription, payload);
          results.push({ userId: uid, success: true });
          console.log(`[Push] Sent notification to user: ${uid}`);
        } catch (err: any) {
          console.error(`[Push] Failed to send to user ${uid}:`, err.message);
          results.push({ userId: uid, success: false, error: err.message });

          // If subscription expired/invalid, remove it
          if (err.statusCode === 404 || err.statusCode === 410) {
            subscriptions.delete(uid);
          }
        }
      }

      const successCount = results.filter((r) => r.success).length;
      return new Response(
        JSON.stringify({
          success: true,
          sent: successCount,
          total: results.length,
          results,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error: any) {
      console.error('[Push] Error sending notification:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send notification', details: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },
});
