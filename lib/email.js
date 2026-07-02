import { Resend } from "resend";

/**
 * Email helper (Resend).
 *
 * All sends are best-effort: if Resend isn't configured or a send fails,
 * we log and return { ok:false } instead of throwing, so a failed email
 * never breaks a form submission or a Stripe webhook (the data is already
 * persisted by the time we email).
 *
 * Required env vars:
 *  - RESEND_API_KEY      re_...
 *  - EMAIL_FROM          e.g. "GCSA Consulting <noreply@gcsaconsulting.co.uk>"
 *                        (the domain must be verified in Resend)
 *  - EMAIL_TO            internal inbox for notifications, e.g.
 *                        info@gcsaconsulting.co.uk
 *  - EMAIL_FROM          e.g. "Prime Homes <noreply@primehomes.ng>"
 *                        (the domain must be verified in Resend)
 *  - EMAIL_TO            internal inbox for notifications, e.g.
 *                        info@primehomes.ng
 */

const FROM = process.env.EMAIL_FROM || "Prime Homes <onboarding@resend.dev>";
const TEAM_INBOX = process.env.EMAIL_TO || "info@primehomes.ng";

let resend = null;
function getResend() {
  if (resend) return resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  resend = new Resend(key);
  return resend;
}

async function send({ to, subject, html, replyTo }) {
  const client = getResend();
  if (!client) {
    console.warn("[email] RESEND_API_KEY not set, skipping email:", subject);
    return { ok: false, skipped: true };
  }
  try {
    const { data, error } = await client.emails.send({
      from: FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("[email] send failed:", error);
      return { ok: false, error };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    console.error("[email] send threw:", err);
    return { ok: false, error: err };
  }
}

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const row = (label, value) =>
  value
    ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;font-size:13px;">${esc(
        label
      )}</td><td style="padding:4px 0;color:#141210;font-size:13px;font-weight:600;">${esc(
        value
      )}</td></tr>`
    : "";

const shell = (heading, bodyHtml) => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
    <div style="background:#141210;padding:20px 24px;">
      <span style="color:#E6A032;font-weight:700;letter-spacing:.18em;font-size:11px;text-transform:uppercase;">Prime Homes</span>
    </div>
    <div style="padding:24px;">
      <h2 style="margin:0 0 16px;color:#141210;font-size:18px;">${esc(heading)}</h2>
      ${bodyHtml}
    </div>
  </div>`;

// ─────────────────────────────────────────────────────────────────────
// Public senders
// ─────────────────────────────────────────────────────────────────────

/** Notify the team that a contact-form message arrived. */
export function notifyContactMessage(msg) {
  const html = shell(
    "New contact message",
    `<table style="border-collapse:collapse;width:100%;">
      ${row("Name", `${msg.firstName} ${msg.lastName}`)}
      ${row("Email", msg.email)}
      ${row("Phone", msg.phone)}
      ${row("Company", msg.company)}
      ${row("Subject", msg.subject)}
    </table>
    <p style="margin:16px 0 4px;color:#6b7280;font-size:13px;">Message</p>
    <p style="margin:0;color:#141210;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(
      msg.message
    )}</p>`
  );
  return send({
    to: TEAM_INBOX,
    subject: `New enquiry: ${msg.subject || "General Enquiry"}, ${msg.firstName} ${msg.lastName}`,
    html,
    replyTo: msg.email,
  });
}

/** Confirm to the visitor that we received their message. */
export function confirmContactMessage(msg) {
  const html = shell(
    `Thanks, ${esc(msg.firstName)}, we've got your message`,
    `<p style="margin:0 0 12px;color:#141210;font-size:14px;line-height:1.7;">
      Thank you for reaching out to GCSA Consulting. A member of our team will
      respond within one business day.</p>
     <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.7;">
      If your enquiry is urgent, email us directly at
        <a href="mailto:info@primehomes.ng" style="color:#141210;">info@primehomes.ng</a>.</p>`
  );
  return send({
      to: msg.email,
      subject: "We've received your message, Prime Homes",
    html,
  });
}

/** Notify the team of a new newsletter subscriber. */
export function notifyNewSubscriber(sub) {
  const html = shell(
    "New newsletter subscriber",
    `<table style="border-collapse:collapse;width:100%;">
      ${row("Email", sub.email)}
      ${row("Name", [sub.firstName, sub.lastName].filter(Boolean).join(" "))}
      ${row("Source", sub.source)}
    </table>`
  );
  return send({
    to: TEAM_INBOX,
    subject: `New subscriber: ${sub.email}`,
    html,
  });
}

/** Confirm a registration after a successful payment. */
export function confirmRegistration(reg) {
  const html = shell(
    `Welcome, ${esc(reg.firstName)}, your place is confirmed`,
    `<p style="margin:0 0 12px;color:#141210;font-size:14px;line-height:1.7;">
      Thank you for registering. We've received your payment and reserved your
      seat. Our team will be in touch shortly with next steps and joining details.</p>
     <table style="border-collapse:collapse;width:100%;margin-top:8px;">
      ${row("Programme", reg.programmeId)}
      ${row("Plan", reg.plan)}
     </table>`
  );
  return send({
    to: reg.email,
    subject: "Your registration is confirmed, GCSA Consulting",
    html,
  });
}

/** Notify the team of a paid registration. */
export function notifyRegistration(reg) {
  const html = shell(
    "New paid registration",
    `<table style="border-collapse:collapse;width:100%;">
      ${row("Name", `${reg.firstName} ${reg.lastName}`)}
      ${row("Email", reg.email)}
      ${row("Phone", reg.phone)}
      ${row("Country", reg.country)}
      ${row("Programme", reg.programmeId)}
      ${row("Plan", reg.plan)}
      ${row("Amount", reg.amountTotal != null ? `${(reg.amountTotal / 100).toFixed(2)} ${String(reg.currency || "").toUpperCase()}` : "")}
      ${row("Company", reg.company)}
      ${row("Role", reg.currentRole)}
    </table>`
  );
  return send({
    to: TEAM_INBOX,
    subject: `New registration: ${reg.firstName} ${reg.lastName}, ${reg.programmeId}`,
    html,
    replyTo: reg.email,
  });
}
