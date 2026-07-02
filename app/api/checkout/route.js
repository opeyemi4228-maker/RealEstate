import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { notifyRegistration } from "@/lib/email";
import {
  getProgramme,
  getCheckoutLineItem,
  PAYMENT_PLANS,
} from "@/lib/programmes";

/**
 * POST /api/checkout
 *
 * Registers a trainee and starts payment.
 *
 * The registration is ALWAYS persisted to the database first (as a
 * "pending" lead) so it appears in the admin dashboard immediately,
 * even if the visitor never finishes payment, and even if Stripe is not
 * yet configured. The Stripe webhook later upgrades the same record to
 * "paid" once payment completes.
 *
 * Request body:
 * {
 *   programmeId: "transition-to-architecture",
 *   plan: "registration" | "full",
 *   firstName, lastName, email, phone, country,
 *   currentRole, experience, company, linkedin,
 *   motivation, hearAbout
 * }
 *
 * Response:
 *   200 → { url: "https://checkout.stripe.com/..." }   (Stripe configured)
 *   200 → { pending: true, message: "..." }            (Stripe not configured)
 *   400/500 → { error: "..." }
 *
 * Security:
 *  - Server reads price from /lib/programmes.js, never from client
 *  - Stores ALL registration data in session.metadata (≤500 chars per field)
 *    and reads it back in the webhook handler when payment succeeds
 *
 * Required env vars:
 *  - STRIPE_SECRET_KEY        (sk_test_... or sk_live_...), optional; lead is
 *                             still captured without it
 *  - NEXT_PUBLIC_SITE_URL     (https://www.primehomes.ng)
 */

export const runtime = "nodejs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.primehomes.ng";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-12-18.acacia" });
}

// Stripe metadata values must be strings ≤ 500 chars; clamp defensively.
const clamp = (v, max = 490) =>
  typeof v === "string" ? v.slice(0, max) : String(v ?? "").slice(0, max);

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim());

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      programmeId,
      plan,
      firstName,
      lastName,
      email,
      phone,
      country,
      currentRole,
      experience,
      company,
      linkedin,
      motivation,
      hearAbout,
    } = body || {};

    // ── Validate ─────────────────────────────────────────────────────
    if (!programmeId || typeof programmeId !== "string") {
      return NextResponse.json({ error: "Missing programmeId" }, { status: 400 });
    }
    const programme = getProgramme(programmeId);
    if (!programme) {
      return NextResponse.json({ error: "Unknown programme" }, { status: 404 });
    }

    // Default to the registration fee if no plan is supplied. The amount is
    // resolved server-side, the client only ever sends the plan name.
    const selectedPlan = PAYMENT_PLANS.includes(plan) ? plan : "registration";
    const lineItem = getCheckoutLineItem(programme, selectedPlan);
    if (!lineItem) {
      return NextResponse.json({ error: "Invalid payment plan" }, { status: 400 });
    }

    if (!firstName || !lastName || !isEmail(email) || !phone || !country) {
      return NextResponse.json(
        { error: "Missing or invalid personal details" },
        { status: 400 }
      );
    }
    if (!motivation || String(motivation).trim().length < 20) {
      return NextResponse.json(
        { error: "Motivation must be at least 20 characters" },
        { status: 400 }
      );
    }

    // ── Trainee details (shared by the DB record and Stripe metadata) ──
    const details = {
      programmeId: clamp(programme.id, 100),
      plan: clamp(selectedPlan, 40),
      firstName: clamp(firstName, 100),
      lastName: clamp(lastName, 100),
      email: clamp(String(email).toLowerCase(), 200),
      phone: clamp(phone, 50),
      country: clamp(country, 100),
      currentRole: clamp(currentRole, 100),
      experience: clamp(experience, 50),
      company: clamp(company, 200),
      linkedin: clamp(linkedin, 300),
      motivation: clamp(motivation, 490),
      hearAbout: clamp(hearAbout, 100),
    };

    const stripe = getStripe();

    // ── Create the Stripe Checkout Session (if Stripe is configured) ──
    let session = null;
    if (stripe) {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: details.email,

        // Line items, price is server-controlled (derived from the plan)
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: programme.currency,
              unit_amount: lineItem.unitAmount,
              product_data: {
                name: lineItem.name,
                description: lineItem.description,
                metadata: { programmeId: programme.id, plan: selectedPlan },
              },
            },
          },
        ],

        success_url: `${SITE_URL}${programme.successPath}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SITE_URL}${programme.cancelPath}?session_id={CHECKOUT_SESSION_ID}`,

        // Capture full registration in metadata; the webhook reads it back
        metadata: details,

        locale: "auto",
        billing_address_collection: "required",
        allow_promotion_codes: true,
        submit_type: "pay",
      });
    }

    // ── Persist the registration so it shows in the admin dashboard ──
    // With Stripe: keyed by the real session id → webhook upgrades to "paid".
    // Without Stripe: keyed by a placeholder → stays "awaiting_payment".
    const stripeSessionId = session?.id || `pending_${randomUUID()}`;
    await prisma.registration.upsert({
      where: { stripeSessionId },
      update: { ...details },
      create: {
        ...details,
        stripeSessionId,
        amountTotal: lineItem.unitAmount,
        currency: programme.currency,
        paymentStatus: session ? "pending" : "awaiting_payment",
      },
    });

    if (session) {
      return NextResponse.json({ url: session.url, id: session.id });
    }

    // Stripe not configured, the lead is captured; notify the team so they
    // can follow up to arrange payment.
    await Promise.allSettled([
      notifyRegistration({ ...details, paymentStatus: "awaiting_payment" }),
    ]);

    return NextResponse.json({
      pending: true,
      message:
        "Your registration has been received. Our team will email you shortly to arrange payment and confirm your place.",
    });
  } catch (err) {
    console.error("[/api/checkout] error:", err);
    return NextResponse.json(
      { error: err?.message || "Checkout creation failed" },
      { status: 500 }
    );
  }
}