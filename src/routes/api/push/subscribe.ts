// API Route: POST /api/push/subscribe
// Receives and stores a push subscription from the client
import { createAPIFileRoute } from '@tanstack/start/api';

// In-memory store for subscriptions (persists per serverless instance)
// For production, replace with a database (Vercel KV, Supabase, etc.)
const subscriptions: Map<string, PushSubscription> = new Map();

// Make subscriptions accessible to the send route
if (typeof globalThis !== 'undefined') {
  (globalThis as any).__pushSubscriptions = (globalThis as any).__pushSubscriptions || new Map();
}

export const APIRoute = createAPIFileRoute('/api/push/subscribe')({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const { subscription, userId = 'default' } = body;

      if (!subscription || !subscription.endpoint) {
        return new Response(JSON.stringify({ error: 'Invalid subscription' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Store subscription globally (survives across requests in same instance)
      (globalThis as any).__pushSubscriptions.set(userId, subscription);

      console.log(`[Push] Subscription stored for user: ${userId}`);
      console.log(`[Push] Endpoint: ${subscription.endpoint.substring(0, 60)}...`);

      return new Response(
        JSON.stringify({ success: true, message: 'Subscription registered' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error: any) {
      console.error('[Push] Error storing subscription:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to store subscription', details: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },

  GET: async () => {
    const count = (globalThis as any).__pushSubscriptions?.size || 0;
    return new Response(
      JSON.stringify({ subscriptionCount: count }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  },
});
