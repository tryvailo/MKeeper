// Billing service mock
// Future integration with Stripe will be implemented here

export type Plan = "free" | "premium";
export type SubscriptionStatus = "active" | "cancelled" | "past_due" | "trialing";

export interface Subscription {
  id: string;
  userId: string;
  plan: Plan;
  status: SubscriptionStatus;
  startedAt: Date;
  endsAt: Date | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export async function createCheckoutSession(userId: string, plan: Plan = "premium"): Promise<{ url: string; sessionId: string }> {
  // Mock implementation - in production this will create Stripe Checkout Session
  console.log("💳 Checkout session would be created:", { userId, plan });

  return {
    url: `/billing/success?session_id=mock-${Date.now()}`,
    sessionId: `mock-session-${Date.now()}`,
  };
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  // Mock implementation - in production this will query Stripe/Supabase
  console.log("💳 Getting subscription for user:", userId);

  // Default to free plan
  return {
    id: `sub-${userId}`,
    userId,
    plan: "free",
    status: "active",
    startedAt: new Date(),
    endsAt: null,
  };
}

export async function cancelSubscription(userId: string): Promise<boolean> {
  // Mock implementation
  console.log("💳 Cancelling subscription for user:", userId);
  return true;
}

export async function handleWebhook(event: any): Promise<{ success: boolean }> {
  // Mock implementation for Stripe webhook
  console.log("💳 Webhook received:", event.type);
  return { success: true };
}

