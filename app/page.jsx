"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { FiX, FiArrowRight, FiCheck } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Hero from "@/components/HeaderSlider";
import FeaturedListings from "@/components/HomeProducts";
import AboutTeaser from "@/components/FeaturedProduct";
import HowItWorks from "@/components/process";
import AgentsTeaser from "@/components/training";
import Services from "@/components/Banner";
import ClosingCTA from "@/components/NewsLetterx";
import Footer from "@/components/Footer";

/**
 * Home, GCSA Consulting UK LTD
 *
 * Section order (top → bottom):
 *  1. Navbar, fixed, transparent over hero, white on scroll
 *  2. Hero, "Taking Your Business to the Next Level"
 *  3. Services, 5 GCSA pillars
 *  4. About, Story + 4 differentiators
 *  5. Process, 4-phase GCSA Method
 *  6. Training, 🆕 "Transition to Architecture in 6 Weeks"
 *  7. Team, 🆕 4 team members
 *  8. GlobalReach, 🆕 Africa · Europe · Asia + London HQ
 *  9. ClosingCTA, "Let's redefine success, together."
 * 10. Footer
 *
 * Overlays:
 *  - NewsLetter, floating bottom-right, every page load (session-dismissable)
 *  - CookieBanner, visits 1, 5, 9, … (every 4th)
 *
 * Brand:
 *  - Navy: #141210
 *  - Gold: #E6A032
 *  - Font: Montserrat
 */

// ═══════════════════════════════════════════════════════════════════════
// Storage keys + constants
// ═══════════════════════════════════════════════════════════════════════
const STORAGE = {
  visitCount: "gcsa.visitCount",
  cookieConsent: "gcsa.cookieConsent",
  newsletterDismissedSession: "gcsa.newsletterDismissed",
};

const COOKIE_INTERVAL = 4;
const NEWSLETTER_DELAY_MS = 1200;
const COOKIE_DELAY_MS = 600;

// ═══════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════
const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());

const safeGet = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (key, value, store = "local") => {
  try {
    if (store === "session") window.sessionStorage.setItem(key, value);
    else window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};
const safeGetSession = (key) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

// ═══════════════════════════════════════════════════════════════════════
// JSON-LD (homepage-specific)
// ═══════════════════════════════════════════════════════════════════════
const HOMEPAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.primehomes.ng/#webpage",
  url: "https://www.primehomes.ng",
  name: "Prime Homes, Property Listings & Agents",
  isPartOf: { "@id": "https://www.primehomes.ng/#website" },
  about: { "@id": "https://www.primehomes.ng/#organization" },
  description:
    "Find homes, apartments, and commercial properties near you. Browse listings, contact agents, and schedule viewings.",
  inLanguage: "en-GB",
};

// ═══════════════════════════════════════════════════════════════════════
// NewsLetter, floating bottom-right (every page load, session-dismissable)
// ═══════════════════════════════════════════════════════════════════════
const NewsLetterFloater = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMounted(true);
    if (safeGetSession(STORAGE.newsletterDismissedSession)) return;
    const t = setTimeout(() => setVisible(true), NEWSLETTER_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleDismiss = () => {
    safeSet(STORAGE.newsletterDismissedSession, "1", "session");
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "homepage-floater",
        }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
      setTimeout(() => setVisible(false), 3200);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="newsletter-heading"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[55] w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[420px] animate-[floatIn_600ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
    >
      <style jsx>{`
        @keyframes floatIn {
          from {
            transform: translate(20px, 20px) scale(0.96);
            opacity: 0;
          }
          to {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div[role="dialog"] {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative bg-[#0A0806] text-white rounded-sm shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] overflow-hidden border border-white/5">
        {/* Top gold hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #E6A032 20%, #F0AA3C 50%, #E6A032 80%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close newsletter signup"
          className="absolute top-4 right-4 z-10 w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/60 transition-colors"
        >
          <FiX className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="relative px-7 pt-9 pb-7">
          {status === "success" ? (
            <div
              className="flex flex-col items-start"
              style={{ animation: "fadeIn 400ms ease-out forwards" }}
              role="status"
              aria-live="polite"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#E6A032" }}
              >
                <FiCheck
                  className="w-6 h-6 text-[#141210]"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </div>
              <h2
                id="newsletter-heading"
                className="font-display text-[22px] font-normal leading-tight text-white mb-2"
              >
                You&apos;re on the list.
              </h2>
              <p className="text-[13px] leading-relaxed text-white/70">
                Thank you, fresh listings from{" "}
                <span style={{ color: "#E6A032" }}>Prime Homes</span> will arrive
                in your inbox.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#EBB45A] mb-3">
                New Listings Alert
              </p>
              <h2
                id="newsletter-heading"
                className="font-display text-[26px] md:text-[28px] font-light leading-[1.15] text-white mb-3"
              >
                Be first to see{" "}
                <span className="italic font-normal" style={{ color: "#EBB45A" }}>
                  new homes
                </span>
                .
              </h2>
              <p className="text-[13px] leading-relaxed text-white/70 mb-5">
                Get new listings, price drops, and open-house dates in your area,
                delivered the moment they go live.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>

                <div className="relative flex items-stretch rounded-full border border-white/20 focus-within:border-[#E6A032] transition-colors duration-200 overflow-hidden bg-white/[0.04]">
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setErrorMsg("");
                      }
                    }}
                    disabled={status === "submitting"}
                    aria-invalid={!!errorMsg}
                    aria-describedby={errorMsg ? "newsletter-error" : undefined}
                    className="flex-1 min-w-0 bg-transparent px-5 py-3 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group shrink-0 inline-flex items-center gap-1.5 px-5 py-3 bg-[#E6A032] hover:bg-[#C88C28] text-white text-[11px] font-extrabold tracking-[0.16em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0806] focus-visible:ring-[#E6A032] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <span
                          className="w-3.5 h-3.5 rounded-full border-2 border-[#141210]/40 border-t-[#141210] animate-spin"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Subscribing…</span>
                      </>
                    ) : (
                      <>
                        Sign Up
                        <FiArrowRight
                          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </div>

                {errorMsg && (
                  <p
                    id="newsletter-error"
                    role="alert"
                    className="text-[12px] text-red-400 pl-1"
                  >
                    {errorMsg}
                  </p>
                )}

                <p className="text-[10.5px] leading-relaxed text-white/45 pt-1">
                  By subscribing, you agree to our privacy practices.
                  Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// CookieBanner, visits 1, 5, 9, … (every 4th)
// ═══════════════════════════════════════════════════════════════════════
const CookieBanner = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentCount = parseInt(safeGet(STORAGE.visitCount) || "0", 10) + 1;
    safeSet(STORAGE.visitCount, String(currentCount));

    const shouldShow = currentCount % COOKIE_INTERVAL === 1;
    if (shouldShow) {
      const t = setTimeout(() => setVisible(true), COOKIE_DELAY_MS);
      return () => clearTimeout(t);
    }
  }, []);

  const persist = (value) => {
    safeSet(STORAGE.cookieConsent, value);
    try {
      window.dispatchEvent(
        new CustomEvent("cookie-consent-change", { detail: { consent: value } })
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[60] animate-[slideUp_500ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
    >
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div[role="dialog"] {
            animation: none !important;
          }
        }
      `}</style>

      <div className="bg-[#0A0806] text-white border-t-2 border-[#E6A032]/80 shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.55)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-6 md:py-7">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-1 min-w-0">
                <h2
                  id="cookie-banner-title"
                  className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#EBB45A] mb-2"
                >
                  Your Privacy Matters
                </h2>
                <p
                  id="cookie-banner-desc"
                  className="text-[13.5px] leading-relaxed text-white/75"
                >
                  Prime Homes uses cookies and related technologies to improve
                  site functionality, analyse traffic, and personalise content.
                  You can control your preferences at any time, details in our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#E6A032] underline underline-offset-2 hover:text-[#F0AA3C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/50 rounded-sm transition-colors"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
              <button
                type="button"
                onClick={() => persist("rejected")}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/40 text-white/85 text-[11px] font-bold tracking-[0.16em] uppercase hover:border-white hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-colors duration-200"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => persist("accepted")}
                className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[11px] font-extrabold tracking-[0.16em] uppercase shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0806] focus-visible:ring-[#E6A032] transition-all duration-200"
              >
                I Agree
              </button>
              <Link
                href="/cookie-preferences"
                className="hidden md:inline-flex items-center text-[11px] font-bold tracking-[0.16em] uppercase text-white/55 hover:text-[#E6A032] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/50 rounded-sm transition-colors duration-200"
              >
                Manage Preferences
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Home page
// ═══════════════════════════════════════════════════════════════════════
const Home = () => {
  return (
    <>
      {/* Homepage JSON-LD */}
      <Script
        id="ld-json-homepage"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_LD) }}
      />

      <Navbar />

      <main id="main-content" role="main" className="bg-white">
        <Hero />
        <FeaturedListings />
        <Services />
        <HowItWorks />
        <AboutTeaser />
        <AgentsTeaser />
        <ClosingCTA />
      </main>

      <Footer />

      {/* Overlays */}
      <NewsLetterFloater />
      <CookieBanner />
    </>
  );
};

export default Home;