import crypto from "crypto";

/**
 * Minimal, dependency-free admin authentication.
 *
 * A successful login issues a stateless session cookie:
 *   <base64url(payload)>.<base64url(HMAC-SHA256(payload))>
 * where payload = { exp } (unix seconds). We verify the signature and
 * expiry on every protected request. No database table needed, the
 * single admin credential lives in env vars.
 *
 * Required env vars:
 *  - ADMIN_EMAIL            the admin login email
 *  - ADMIN_PASSWORD         the admin login password
 *  - ADMIN_SESSION_SECRET   long random string used to sign cookies
 */

export const ADMIN_COOKIE = "gcsa_admin";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  return s;
}

const b64url = (buf) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function sign(payloadStr) {
  return b64url(crypto.createHmac("sha256", secret()).update(payloadStr).digest());
}

function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Validate a submitted email + password against the configured admin. */
export function checkCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  const emailOk = safeEqual(String(email || "").trim().toLowerCase(), adminEmail.trim().toLowerCase());
  const passOk = safeEqual(String(password || ""), adminPassword);
  // Evaluate both before returning so timing doesn't leak which field failed.
  return emailOk && passOk;
}

/** Create a signed session token valid for SESSION_MAX_AGE seconds. */
export function createSessionToken() {
  const payload = JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE });
  const payloadB64 = b64url(payload);
  return `${payloadB64}.${sign(payloadB64)}`;
}

/** Verify a session token: correct signature AND not expired. */
export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;
  if (!safeEqual(sig, sign(payloadB64))) return false;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString());
    return typeof payload.exp === "number" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
