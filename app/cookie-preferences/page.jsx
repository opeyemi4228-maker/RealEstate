"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import toast from "react-hot-toast";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiSettings,
  FiBarChart2,
  FiTarget,
  FiShield,
  FiInfo,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Cookie Preferences, GCSA Consulting UK LTD
 *
 * Interactive consent manager. Persists to localStorage under two keys:
 *
 *   gcsa.cookieConsent           "accepted" | "rejected" | "custom"
 *                                 (kept for backwards compatibility with the
 *                                 existing homepage cookie banner)
 *
 *   gcsa.cookieCategories        JSON: { necessary, analytics, marketing }
 *, fine-grained per-category state
 *
 * On save we dispatch a `cookie-consent-change` CustomEvent that the
 * analytics gate in app/layout.jsx already listens for.
 */

const STORAGE_KEYS = {
  consent: "gcsa.cookieConsent",
  categories: "gcsa.cookieCategories",
};

const COOKIE_CATEGORIES = [
  {
    id: "necessary",
    Icon: FiShield,
    title: "Strictly Necessary",
    required: true,
    description:
      "Required for the website to function. These enable core features such as page navigation, form submission, secure checkout, and access to protected areas.",
    examples: [
      "Session cookies (login state, form continuity)",
      "Cookie-consent state itself",
      "CSRF / security tokens",
      "Stripe checkout session identifiers",
    ],
  },
  {
    id: "analytics",
    Icon: FiBarChart2,
    title: "Performance & Analytics",
    required: false,
    description:
      "Help us understand how visitors use the site so we can improve it. All data is aggregated and anonymous unless otherwise stated.",
    examples: [
      "Page views and traffic sources",
      "Anonymised user-flow analysis",
      "Site speed and error monitoring",
    ],
  },
  {
    id: "marketing",
    Icon: FiTarget,
    title: "Marketing & Personalisation",
    required: false,
    description:
      "Used to deliver relevant content and measure campaign effectiveness across channels. May be set by us or by trusted third-party partners.",
    examples: [
      "Audience-segmentation cookies",
      "Conversion-tracking pixels",
      "Personalised content delivery",
    ],
  },
];

const COOKIE_TABLE = [
  {
    name: "gcsa.cookieConsent",
    provider: "GCSA Consulting (first-party)",
    purpose: "Stores your overall cookie-consent choice",
    type: "Strictly Necessary",
    expiry: "1 year",
  },
  {
    name: "gcsa.cookieCategories",
    provider: "GCSA Consulting (first-party)",
    purpose: "Stores your fine-grained per-category preferences",
    type: "Strictly Necessary",
    expiry: "1 year",
  },
  {
    name: "gcsa.visitCount",
    provider: "GCSA Consulting (first-party)",
    purpose: "Counts visits so the cookie banner reappears periodically",
    type: "Strictly Necessary",
    expiry: "1 year",
  },
  {
    name: "gcsa.newsletterDismissed",
    provider: "GCSA Consulting (session-only)",
    purpose: "Prevents the newsletter prompt from re-appearing in the same session",
    type: "Strictly Necessary",
    expiry: "Session",
  },
  {
    name: "__stripe_*",
    provider: "Stripe (third-party)",
    purpose: "Fraud detection and secure checkout flow",
    type: "Strictly Necessary",
    expiry: "Up to 1 year",
  },
];

const COOKIES_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.gcsaconsulting.co.uk/cookie-preferences/#webpage",
  url: "https://www.gcsaconsulting.co.uk/cookie-preferences",
  name: "Cookie Preferences | GCSA Consulting",
  description:
    "Manage your cookie preferences for the GCSA Consulting website.",
  isPartOf: { "@id": "https://www.gcsaconsulting.co.uk/#website" },
  inLanguage: "en-GB",
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
const CookiePreferencesPage = () => {
  const [mounted, setMounted] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true, // always true, cannot be disabled
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  // Load existing prefs on mount
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.categories);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPrefs({
          necessary: true,
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
        setSaved(true);
      } else {
        // Fallback to overall consent if categories aren't set
        const overall = localStorage.getItem(STORAGE_KEYS.consent);
        if (overall === "accepted") {
          setPrefs({ necessary: true, analytics: true, marketing: true });
          setSaved(true);
        } else if (overall === "rejected") {
          setPrefs({ necessary: true, analytics: false, marketing: false });
          setSaved(true);
        }
      }
      const ts = localStorage.getItem(STORAGE_KEYS.consent + ".savedAt");
      if (ts) setSavedAt(new Date(ts));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (id) => {
    if (id === "necessary") return; // cannot toggle
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
    setSaved(false);
  };

  const persist = (overall, categories) => {
    try {
      localStorage.setItem(STORAGE_KEYS.consent, overall);
      localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
      const now = new Date();
      localStorage.setItem(STORAGE_KEYS.consent + ".savedAt", now.toISOString());
      setSavedAt(now);
      window.dispatchEvent(
        new CustomEvent("cookie-consent-change", {
          detail: { consent: overall, categories },
        })
      );
    } catch {
      /* ignore */
    }
  };

  const allOn = () => {
    const next = { necessary: true, analytics: true, marketing: true };
    setPrefs(next);
    persist("accepted", next);
    setSaved(true);
    toast.success("All cookies accepted.");
  };

  const allOff = () => {
    const next = { necessary: true, analytics: false, marketing: false };
    setPrefs(next);
    persist("rejected", next);
    setSaved(true);
    toast.success("Only strictly-necessary cookies enabled.");
  };

  const saveCustom = () => {
    const allChecked = prefs.analytics && prefs.marketing;
    const allUnchecked = !prefs.analytics && !prefs.marketing;
    const overall = allChecked ? "accepted" : allUnchecked ? "rejected" : "custom";
    persist(overall, prefs);
    setSaved(true);
    toast.success("Preferences saved.");
  };

  return (
    <>
      <Script
        id="ld-json-cookies"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COOKIES_LD) }}
      />

      <Navbar />

      <main
        id="main-content"
        role="main"
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <PageHero />
        <SettingsSection
          mounted={mounted}
          prefs={prefs}
          onToggle={toggle}
          onAllOn={allOn}
          onAllOff={allOff}
          onSave={saveCustom}
          saved={saved}
          savedAt={savedAt}
        />
        <CookieTableSection />
        <ResourcesSection />
      </main>

      <Footer />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 1. Page hero
// ═══════════════════════════════════════════════════════════════════════
const PageHero = () => (
  <section
    aria-labelledby="cookies-hero-heading"
    className="relative bg-[#141210] text-white overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24"
  >
    <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-8"
      >
        <Link href="/" className="hover:text-[#E6A032] transition-colors">
          Home
        </Link>
        <span aria-hidden="true">·</span>
        <span className="text-[#E6A032]">Cookie Preferences</span>
      </nav>

      <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
        Privacy Controls
      </p>

      <h1
        id="cookies-hero-heading"
        className="font-display font-light leading-[0.98] tracking-[-0.02em] text-white text-[44px] sm:text-[60px] md:text-[80px] lg:text-[88px]"
      >
        Cookie{" "}
        <span className="font-light italic" style={{ color: "#E6A032" }}>
          Preferences
        </span>
        .
      </h1>

      <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
        Choose which cookies and similar technologies GCSA Consulting may use
        on your device. Strictly necessary cookies are always on; everything
        else is yours to decide. Your choice is saved locally and applies on
        every visit until you change it.
      </p>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════
// 2. Settings (the live cookie manager)
// ═══════════════════════════════════════════════════════════════════════
const SettingsSection = ({ mounted, prefs, onToggle, onAllOn, onAllOff, onSave, saved, savedAt }) => {
  return (
    <section
      aria-labelledby="settings-heading"
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT, controls + status */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32">
            <p className="flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#141210]/55 mb-5">
              Quick Controls
            </p>

            <h2
              id="settings-heading"
              className="font-display font-light leading-[1.05] tracking-[-0.02em] text-[#141210] text-[28px] md:text-[34px] mb-6"
            >
              Set your{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                preferences
              </span>
              .
            </h2>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onAllOn}
                disabled={!mounted}
                className="group w-full inline-flex items-center justify-between gap-3 px-6 py-3.5 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[11.5px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032] disabled:opacity-50 transition-all duration-300"
              >
                Accept All
                <FiCheck className="w-4 h-4" strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={onAllOff}
                disabled={!mounted}
                className="group w-full inline-flex items-center justify-between gap-3 px-6 py-3.5 rounded-full bg-white border-2 border-[#141210]/15 hover:border-[#141210] text-[#141210] text-[11.5px] font-extrabold tracking-[0.18em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141210]/40 disabled:opacity-50 transition-all duration-300"
              >
                Reject Optional
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={!mounted}
                className="group w-full inline-flex items-center justify-between gap-3 px-6 py-3.5 rounded-full bg-[#141210] hover:bg-[#0A0806] text-white text-[11.5px] font-extrabold tracking-[0.18em] uppercase shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032] disabled:opacity-50 transition-all duration-300"
              >
                Save Selection
                <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Status badge */}
            {mounted && (
              <div
                role="status"
                aria-live="polite"
                className="mt-7 p-5 bg-[#FBF8F1] border border-[#141210]/10 rounded-sm"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={[
                      "shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full",
                      saved ? "bg-[#E6A032]" : "bg-[#141210]/10",
                    ].join(" ")}
                  >
                    {saved ? (
                      <FiCheck className="w-3.5 h-3.5 text-[#141210]" strokeWidth={3} />
                    ) : (
                      <FiInfo className="w-3.5 h-3.5 text-[#141210]" />
                    )}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#141210]/55 mb-1">
                      {saved ? "Saved" : "Unsaved Changes"}
                    </p>
                    <p className="text-[13px] leading-[1.55] text-[#141210]/80">
                      {saved && savedAt
                        ? `Last saved ${formatTimeAgo(savedAt)}.`
                        : saved
                        ? "Your preferences are in effect."
                        : "Click 'Save Selection' to apply your changes."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-6 text-[12px] leading-[1.6] text-[#141210]/55">
              Preferences are stored on your device using browser storage. Read
              full details in our{" "}
              <Link
                href="/privacy-policy"
                className="font-bold text-[#141210] underline underline-offset-4 hover:text-[#E6A032] transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </aside>

          {/* RIGHT, category toggles */}
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
              By Category
            </p>

            <div className="space-y-4">
              {COOKIE_CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  enabled={prefs[cat.id]}
                  onToggle={() => onToggle(cat.id)}
                  mounted={mounted}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category, enabled, onToggle, mounted }) => {
  const [open, setOpen] = useState(false);
  const { id, Icon, title, required, description, examples } = category;

  return (
    <article className="group relative bg-[#FBF8F1] border border-[#141210]/10 rounded-sm overflow-hidden transition-all duration-300 hover:border-[#E6A032]/50">
      <span
        className={[
          "absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-500",
          enabled ? "scale-x-100" : "scale-x-0",
        ].join(" ")}
        style={{ backgroundColor: "#E6A032" }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-6 md:p-7">
        <div className="flex items-center gap-4 sm:flex-1">
          <span
            className={[
              "shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full transition-colors",
              enabled ? "bg-[#E6A032]" : "bg-[#141210]/10",
            ].join(" ")}
          >
            <Icon
              className={["w-5 h-5", enabled ? "text-[#141210]" : "text-[#141210]/55"].join(" ")}
              strokeWidth={2.2}
            />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-display font-light tracking-[-0.01em] text-[#141210] text-[18px] md:text-[20px]">
                {title}
              </h3>
              {required && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#141210]/[0.06] text-[9.5px] font-bold tracking-[0.2em] uppercase text-[#141210]/65">
                  Always Active
                </span>
              )}
            </div>
            <p className="text-[13.5px] leading-[1.6] text-[#141210]/70">{description}</p>
          </div>
        </div>

        {/* Toggle */}
        <div className="shrink-0 self-start sm:self-center">
          <Toggle
            checked={enabled}
            disabled={required || !mounted}
            onChange={onToggle}
            label={`Toggle ${title}`}
          />
        </div>
      </div>

      {/* Disclosure */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-6 md:px-7 py-3.5 border-t border-[#141210]/10 text-[11px] font-bold tracking-[0.18em] uppercase text-[#141210]/65 hover:text-[#141210] hover:bg-white transition-colors focus:outline-none focus-visible:bg-white"
      >
        <span className="flex items-center gap-2">
          <FiSettings className="w-3.5 h-3.5" />
          {open ? "Hide examples" : "View examples"}
        </span>
        <span
          className={[
            "inline-block transition-transform duration-300",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-500 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-7 pb-6 pt-2 bg-white border-t border-[#141210]/[0.06]">
            <p className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#E6A032] mb-3">
              Typical examples
            </p>
            <ul className="space-y-2">
              {examples.map((ex) => (
                <li key={ex} className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-[#141210]/75">
                  <span
                    className="shrink-0 mt-0.5 inline-block w-1 h-1 rounded-full"
                    style={{ backgroundColor: "#E6A032" }}
                  />
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

const Toggle = ({ checked, disabled, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={onChange}
    className={[
      "relative inline-flex items-center w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032]",
      checked ? "bg-[#E6A032]" : "bg-[#141210]/15",
      disabled ? "cursor-not-allowed opacity-65" : "cursor-pointer hover:opacity-90",
    ].join(" ")}
  >
    <span className="sr-only">{label}</span>
    <span
      className={[
        "absolute top-1 inline-block w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300",
        checked ? "translate-x-7" : "translate-x-1",
      ].join(" ")}
      aria-hidden="true"
    />
  </button>
);

// ═══════════════════════════════════════════════════════════════════════
// 3. Cookie table
// ═══════════════════════════════════════════════════════════════════════
const CookieTableSection = () => {
  return (
    <section
      aria-labelledby="cookies-list-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
            Detailed Cookie List
          </p>
          <h2
            id="cookies-list-heading"
            className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[32px] md:text-[42px] lg:text-[48px]"
          >
            Cookies we{" "}
            <span className="font-light italic" style={{ color: "#E6A032" }}>
              currently use
            </span>
            .
          </h2>
          <p className="mt-6 text-[14.5px] md:text-[15px] leading-[1.75] text-[#141210]/70 max-w-2xl">
            This list is updated as our tooling changes. Strictly necessary
            cookies are required for core site functionality and cannot be
            disabled. Third-party cookies are governed by the providers' own
            terms.
          </p>
        </div>

        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="w-full min-w-[760px] border-collapse bg-white rounded-sm overflow-hidden">
            <thead>
              <tr className="bg-[#141210] text-white">
                <th className="text-left text-[10.5px] font-bold tracking-[0.22em] uppercase py-4 px-5">
                  Cookie / Storage Key
                </th>
                <th className="text-left text-[10.5px] font-bold tracking-[0.22em] uppercase py-4 px-5">
                  Provider
                </th>
                <th className="text-left text-[10.5px] font-bold tracking-[0.22em] uppercase py-4 px-5">
                  Purpose
                </th>
                <th className="text-left text-[10.5px] font-bold tracking-[0.22em] uppercase py-4 px-5">
                  Type
                </th>
                <th className="text-left text-[10.5px] font-bold tracking-[0.22em] uppercase py-4 px-5">
                  Expiry
                </th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_TABLE.map((c, i) => (
                <tr
                  key={c.name}
                  className={[
                    "border-t border-[#141210]/10",
                    i % 2 === 1 ? "bg-[#FBF8F1]/40" : "",
                  ].join(" ")}
                >
                  <td className="py-4 px-5 text-[13px] font-mono font-bold text-[#141210]">
                    {c.name}
                  </td>
                  <td className="py-4 px-5 text-[13px] text-[#141210]/80">{c.provider}</td>
                  <td className="py-4 px-5 text-[13px] text-[#141210]/80">{c.purpose}</td>
                  <td className="py-4 px-5 text-[12.5px]">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#E6A032]/15 text-[10.5px] font-bold tracking-[0.16em] uppercase text-white">
                      {c.type}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[13px] text-[#141210]/80">{c.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 4. Resources / further info
// ═══════════════════════════════════════════════════════════════════════
const ResourcesSection = () => {
  return (
    <section className="relative bg-[#0A0806] text-white overflow-hidden">
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-5">
              Learn More
            </p>
            <h2 className="font-display font-light leading-[1.02] tracking-[-0.02em] text-white text-[28px] md:text-[40px] lg:text-[44px]">
              Useful{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                resources
              </span>
              .
            </h2>
            <p className="mt-5 text-[14.5px] md:text-[15px] leading-[1.75] text-white/75">
              Helpful starting points if you'd like to understand cookies, your
              rights, and how to manage tracking on the web more broadly.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <ResourceLink
              title="ICO, Cookies and similar technologies"
              description="The UK Information Commissioner's official guidance for citizens."
              href="https://ico.org.uk/for-the-public/online/cookies/"
            />
            <ResourceLink
              title="aboutcookies.org"
              description="Independent guide to managing cookies in major browsers."
              href="https://www.aboutcookies.org/"
            />
            <ResourceLink
              title="Your Online Choices (EDAA)"
              description="Manage interest-based advertising preferences across providers."
              href="https://www.youronlinechoices.com/"
            />
            <ResourceLink
              title="GCSA Privacy Policy"
              description="Full details of how we handle your personal information."
              href="/privacy-policy"
              internal
            />
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-[13.5px] md:text-[14px] leading-[1.7] text-white/70 max-w-xl">
            Have questions about how we use cookies or your data? Our team is
            happy to help.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] transition-all duration-300"
            >
              Contact Us
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/terms-of-use"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-white/55 text-white text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300"
            >
              Terms of Use
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResourceLink = ({ title, description, href, internal }) => {
  const Wrapper = internal ? Link : "a";
  const props = internal
    ? { href }
    : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper
      {...props}
      className="group relative block p-6 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#E6A032]/40 rounded-sm transition-all duration-300"
    >
      <span
        className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: "#E6A032" }}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-light tracking-[-0.01em] text-white text-[15px] md:text-[16px] leading-tight mb-2 group-hover:text-[#E6A032] transition-colors">
            {title}
          </h3>
          <p className="text-[12.5px] leading-[1.6] text-white/65">{description}</p>
        </div>
        <FiArrowUpRight
          className="shrink-0 w-4 h-4 text-white/55 group-hover:text-[#E6A032] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
    </Wrapper>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════
function formatTimeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default CookiePreferencesPage;