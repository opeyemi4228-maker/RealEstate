import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { confirmRegistration, notifyRegistration } from "@/lib/email";

/**
 * POST /api/webhook
 *
 * Stripe webhook handler. Stripe calls this URL with payment events.
 * The most important event is `checkout.session.completed` — this is
 * where we register the participant after their payment succeeds.
 *
 * Required env vars:
 *  - STRIPE_SECRET_KEY        (sk_test_... or sk_live_...)
 *  - STRIPE_WEBHOOK_SECRET    (whsec_...) — REQUIRED for signature verification
 *
 * Local testing (one-time):
 *   1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
 *   2. Login:              stripe login
 *   3. Forward webhooks:   stripe listen --forward-to localhost:3000/api/webhook
 *      → Stripe CLI prints a `whsec_...` value. Put it in .env.local as
 *         STRIPE_WEBHOOK_SECRET.
 *   4. In another terminal: stripe trigger checkout.session.completed
 *
 * Production setup:
 *   1. Stripe Dashboard → Developers → Webhooks → Add endpoint
 *   2. URL: https://www.realestate.com/api/webhook
 *   3. Events: checkout.session.completed, payment_intent.payment_failed
 *   4. Copy the signing secret → set as STRIPE_WEBHOOK_SECRET in your host env
 *
 * IMPORTANT — Next.js App Router:
 *   This route uses runtime: "nodejs" and reads the raw body via req.text().
 *   Do NOT use req.json() here — Stripe's signature is calculated against the
 *   raw bytes, so JSON-parsing first will break verification.
 */

export const runtime = "nodejs";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2024-12-18.acacia" });
}

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook signature or secret missing" },
      { status: 400 }
    );
  }

  let event;
  try {
    const rawBody = await req.text(); // raw, unparsed body
    event = getStripe().webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("[/api/webhook] signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // ── Handle events ──────────────────────────────────────────────────
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        await handleCheckoutCompleted(session);
        break;
      }
      case "payment_intent.payment_failed": {
        const intent = event.data.object;
        console.warn(
          "[/api/webhook] payment_intent failed:",
          intent.id,
          intent.last_payment_error?.message
        );
        break;
      }
      default:
        // Unhandled event type — fine, just ignore.
        break;
    }
  } catch (err) {
    console.error("[/api/webhook] handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

// ─────────────────────────────────────────────────────────────────────
// Handler — checkout.session.completed
// ─────────────────────────────────────────────────────────────────────
async function handleCheckoutCompleted(session) {
  // Pull metadata we attached in /api/checkout
  const m = session.metadata || {};

  const registration = {
    stripeSessionId: session.id,
    stripeCustomerId: session.customer || null,
    paymentIntentId: session.payment_intent || null,
    amountTotal: session.amount_total, // in pence
    currency: session.currency,
    paymentStatus: session.payment_status, // "paid"
    programmeId: m.programmeId,
    firstName: m.firstName,
    lastName: m.lastName,
    email: m.email,
    phone: m.phone,
    country: m.country,
    currentRole: m.currentRole,
    experience: m.experience,
    company: m.company,
    linkedin: m.linkedin,
    motivation: m.motivation,
    hearAbout: m.hearAbout,
    plan: m.plan,
  };

  // ── Persist to Postgres (idempotent) ─────────────────────────────────
  // /api/checkout already wrote this registration as "pending" keyed by the
  // same stripeSessionId, so we UPSERT: upgrade the existing row to "paid"
  // (or create it if, for any reason, the checkout write didn't land).
  //
  // Stripe may deliver this event more than once. If the row is already
  // "paid", we've handled it — skip re-emailing.
  const existing = await prisma.registration.findUnique({
    where: { stripeSessionId: registration.stripeSessionId },
  });
  if (existing?.paymentStatus === "paid") {
    console.log("[webhook] duplicate event, already paid:", registration.stripeSessionId);
    return;
  }

  await prisma.registration.upsert({
    where: { stripeSessionId: registration.stripeSessionId },
    update: {
      stripeCustomerId: registration.stripeCustomerId,
      paymentIntentId: registration.paymentIntentId,
      amountTotal: registration.amountTotal,
      currency: registration.currency,
      paymentStatus: registration.paymentStatus, // "paid"
    },
    create: registration,
  });

  console.log("[webhook] stored paid registration:", registration.email, registration.programmeId);

  // ── Notify team + confirm to participant (best-effort) ──────────────
  await Promise.allSettled([
    notifyRegistration(registration),
    confirmRegistration(registration),
  ]);
}