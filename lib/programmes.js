/**
 * Programme configuration, GCSA Training
 *
 * Single source of truth for programme metadata and pricing.
 * Used by both the registration modal (display) and the Stripe
 * checkout API route (server-side price reference).
 *
 * IMPORTANT, Stripe security model:
 *  - Never trust the price the client sends. The server reads the fee
 *    breakdown from this map using the `programmeId` the client supplied,
 *    then creates the Stripe Checkout Session with the trusted
 *    server-side amount via `getCheckoutLineItem()`.
 *  - The client may only choose a *plan* ("full" | "registration").
 *    The server maps that plan to a trusted amount, it never reads a
 *    price from the request body.
 *
 * Fee structure (Transition to Architecture):
 *  - £300 registration fee, secures the cohort place
 *  - £1,200 course fee, payable in full, or in 4 weekly
 *                              instalments of £300 each
 *  - £1,500 total
 */

export const PROGRAMMES = {
  "transition-to-architecture": {
    id: "transition-to-architecture",
    name: "Transition to Architecture in 6 Weeks",
    description:
      "A 6-week intensive, hands-on programme to fast-track professionals into architecture roles.",
    currency: "gbp",

    // ── Fee breakdown (all amounts in pence) ─────────────────────────
    registrationFeeInPence: 30000, //   £300, secures your place
    courseFeeInPence: 120000, //       £1,200, tuition
    instalments: 4, //                 weekly instalments for the course fee
    instalmentAmountInPence: 30000, // £300/week × 4

    successPath: "/training/success",
    cancelPath: "/training/cancelled",
  },
};

export const getProgramme = (id) => PROGRAMMES[id] || null;

/** Total programme cost (registration + course) in pence. */
export const totalInPence = (p) =>
  p.registrationFeeInPence + p.courseFeeInPence;

/** Format a pence amount as a GBP string, e.g. 120000 → "£1,200". */
export const formatGBP = (pence) =>
  `£${(pence / 100).toLocaleString("en-GB", {
    minimumFractionDigits: pence % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

/**
 * Valid checkout plans the client may request. The server uses this to
 * derive a trusted Stripe line item, the amount is never taken from the
 * request body.
 */
export const PAYMENT_PLANS = ["full", "registration"];

/**
 * Build the server-trusted Stripe line item for a programme + plan.
 *
 *  - "full"         → £1,500 paid today (£300 registration + £1,200 course)
 *  - "registration" → £300 today to secure the place; the £1,200 course fee
 *                     is then collected in 4 weekly instalments of £300
 *
 * Returns { unitAmount, name, description } or null for an unknown plan.
 */
export function getCheckoutLineItem(programme, plan) {
  if (!programme) return null;

  const reg = formatGBP(programme.registrationFeeInPence);
  const course = formatGBP(programme.courseFeeInPence);
  const inst = formatGBP(programme.instalmentAmountInPence);

  if (plan === "full") {
    return {
      unitAmount: totalInPence(programme),
      name: `${programme.name}, Full Payment`,
      description: `${reg} registration fee + ${course} course fee, paid in full today.`,
    };
  }

  if (plan === "registration") {
    return {
      unitAmount: programme.registrationFeeInPence,
      name: `${programme.name}, Registration Fee`,
      description: `${reg} secures your cohort place. The remaining ${course} course fee is then payable in ${programme.instalments} weekly instalments of ${inst}.`,
    };
  }

  return null;
}
