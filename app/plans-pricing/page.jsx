"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PROGRAMMES, formatGBP, totalInPence } from "@/lib/programmes";

// ── Training pricing, derived from the single source of truth ──────────
const TRAINING = PROGRAMMES["transition-to-architecture"];
const TRAINING_PRICE = {
  registration: formatGBP(TRAINING.registrationFeeInPence),
  course: formatGBP(TRAINING.courseFeeInPence),
  total: formatGBP(totalInPence(TRAINING)),
  instalments: TRAINING.instalments,
  instalmentAmount: formatGBP(TRAINING.instalmentAmountInPence),
};

/**
 * Plans & Pricing, GCSA Consulting UK LTD
 *
 * Sections:
 *  1. Page hero
 *  2. Three consulting tiers (Advisory · Engagement · Transformation)
 *  3. Training pricing callout (links to /training)
 *  4. Comparison table
 *  5. Pricing FAQ
 *  6. CTA strip
 *
 * Pricing strategy:
 *  - Consulting engagements are quoted bespoke; we show a "starting from"
 *    indicator and lead every tier to /contact for a tailored proposal.
 *  - Training is fixed-price: £300 registration fee + £1,200 course fee
 *    (£1,500 total), with the course fee payable in 4 weekly instalments
 *    of £300. Links to /training for registration.
 */

function useReveal(options = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) { setVisible(true); return; }
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      options
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ═══════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════
const TIERS = [
  {
    id: "infrastructure",
    eyebrow: "Tier 01",
    name: "Infrastructure Consulting",
    headline: "Specialised infrastructure strategy and delivery.",
    priceFrom: "£50,000",
    priceUnit: "per week + £1,000 engagement fee",
    description:
      "Expert infrastructure consulting for complex, large-scale projects. Our team provides strategic guidance, architecture design, and implementation support across enterprise infrastructure workstreams.",
    features: [
      "Weekly engagement model",
      "£1,000 engagement fee (one-time)",
      "Senior infrastructure architect assigned",
      "Strategic planning and roadmap development",
      "Implementation oversight and governance",
      "Risk assessment and mitigation planning",
      "Post-delivery support retainer available",
    ],
    bestFor: "Organisations executing major infrastructure transformation",
    ctaLabel: "Discuss your project",
    ctaHref: "/contact",
    featured: false,
  },
  {
    id: "governance-strategy",
    eyebrow: "Tier 02",
    name: "Governance & Strategy Consulting",
    headline: "Governance frameworks and strategic alignment.",
    priceFrom: "£15,000",
    priceUnit: "per week (7-day free trial)",
    description:
      "Transform your governance structures and align strategy across the enterprise. Includes governance framework design, risk management setup, and strategic planning. Try risk-free for 7 days.",
    features: [
      "Weekly consulting engagement",
      "7-day free trial (no commitment)",
      "Governance framework design",
      "Strategic roadmap development",
      "Risk and compliance framework",
      "Stakeholder alignment sessions",
      "Quarterly governance reviews included",
    ],
    bestFor: "Enterprises strengthening governance and strategy",
    ctaLabel: "Start Free Trial",
    ctaHref: "/contact",
    featured: true, // Most popular
  },
  {
    id: "enterprise-architecture",
    eyebrow: "Tier 03",
    name: "Enterprise Architecture",
    headline: "Holistic architecture transformation programme.",
    priceFrom: "£10,000",
    priceUnit: "per month (1-day free trial)",
    description:
      "Full enterprise architecture consulting with ongoing monthly retainer model. Includes architecture reviews, technology strategy, and continuous optimisation. Start with a complimentary 1-day discovery session.",
    features: [
      "Monthly retainer model",
      "1-day free trial consultation",
      "Enterprise architecture reviews",
      "Technology roadmap development",
      "Architecture governance framework",
      "Capability and talent assessment",
      "Continuous optimisation support",
    ],
    bestFor: "Large enterprises building sustainable architecture practice",
    ctaLabel: "Book Free Day",
    ctaHref: "/contact",
    featured: false,
  },
];

const COMPARISON_ROWS = [
  { feature: "Pricing model", infrastructure: "Weekly (£50k/week)", governance: "Weekly (£15k/week)", enterprise: "Monthly (£10k/month)" },
  { feature: "Engagement fee", infrastructure: "£1,000 (one-time)", governance: "7-day free trial", enterprise: "1-day free trial" },
  { feature: "Senior resource allocation", infrastructure: "Dedicated architect", governance: "Senior strategist", enterprise: "Enterprise architect" },
  { feature: "Governance framework", infrastructure: "Within infrastructure scope", governance: "Full framework design", enterprise: "Governance practice setup" },
  { feature: "Strategic roadmap", infrastructure: "Infrastructure-focused", governance: "Enterprise-wide", enterprise: "Architecture-focused" },
  { feature: "Implementation support", infrastructure: "Included", governance: "Strategy translation", enterprise: "Continuous support" },
  { feature: "Risk & compliance", infrastructure: "Infrastructure risks", governance: "Full coverage", enterprise: "Architecture risks" },
  { feature: "Ongoing retainer", infrastructure: "Available post-engagement", governance: "Quarterly reviews", enterprise: "Continuous included" },
];

const FAQS = [
  {
    q: "Why don't you publish fixed prices for consulting?",
    a: "Because no two engagements are alike. The diagnose-design-deliver scope for a 200-person fintech is different from a national infrastructure programme. We publish 'starting from' figures so you can budget, then quote bespoke after a discovery call.",
  },
  {
    q: "What does the discovery call cover?",
    a: "30 to 45 minutes. We learn about your goals, constraints, and timeline; you learn about our approach. There's no charge and no obligation. If we're a fit, we follow up with a written proposal within 5 business days.",
  },
  {
    q: "Can engagements be paid in instalments?",
    a: "Yes. Engagement and Transformation tiers are typically invoiced monthly against milestones. Advisory tier is invoiced 50% on signing and 50% on delivery.",
  },
  {
    q: "Do you offer fixed-price training?",
    a: "Yes. Public training programmes (like Transition to Architecture in 6 Weeks) are fixed-price per seat. Custom in-house cohorts are quoted bespoke based on cohort size and scope.",
  },
  {
    q: "Are prices VAT-inclusive?",
    a: "Prices shown exclude UK VAT (currently 20%). VAT is added on UK-registered invoices where applicable. Reverse-charge rules apply for valid EU/international VAT registrations.",
  },
  {
    q: "What's your refund policy?",
    a: "Consulting engagements: governed by the engagement letter. Training programmes: full refund within 7 days of payment, provided the cohort has not yet started. See our terms for full details.",
  },
];

const PRICING_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.gcsaconsulting.co.uk/plans-pricing/#webpage",
  url: "https://www.gcsaconsulting.co.uk/plans-pricing",
  name: "GCSA Consulting Plans & Pricing",
  description:
    "Three consulting tiers (Advisory, Engagement, Transformation) plus training programme pricing. Bespoke proposals available within 5 business days.",
  isPartOf: { "@id": "https://www.gcsaconsulting.co.uk/#website" },
  inLanguage: "en-GB",
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
const PlansPricingPage = () => {
  return (
    <>
      <Script
        id="ld-json-pricing"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_LD) }}
      />

      <Navbar />

      <main
        id="main-content"
        role="main"
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <PageHero />
        <Tiers />
        <TrainingCallout />
        <Comparison />
        <FAQ />
        <CtaStrip />
      </main>

      <Footer />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 1. Page hero
// ═══════════════════════════════════════════════════════════════════════
const PageHero = () => {
  return (
    <section
      aria-labelledby="pricing-hero-heading"
      className="relative bg-[#141210] text-white overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
    >

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-8"
        >
          <Link href="/" className="hover:text-[#E6A032] transition-colors">Home</Link>
          <span aria-hidden="true">·</span>
          <span className="text-[#E6A032]">Plans & Pricing</span>
        </nav>

        <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
          Plans & Pricing
        </p>

        <h1
          id="pricing-hero-heading"
          className="font-display font-light leading-[0.98] tracking-[-0.02em] text-white text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] max-w-5xl"
        >
          Pricing built for{" "}
          <span className="font-light italic" style={{ color: "#E6A032" }}>
            real
          </span>{" "}
          engagements.
        </h1>

        <p className="mt-8 md:mt-10 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
          Three consulting tiers and one fixed-price training programme.
          Every consulting engagement is quoted bespoke after a discovery
          call, what's published here is your starting point.
        </p>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 2. Three tiers
// ═══════════════════════════════════════════════════════════════════════
const Tiers = () => {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      aria-labelledby="tiers-heading"
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
            Consulting Tiers
          </p>
          <h2
            id="tiers-heading"
            className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[36px] md:text-[48px] lg:text-[56px]"
          >
            Three engagement{" "}
            <span className="font-light italic" style={{ color: "#E6A032" }}>
              shapes
            </span>
            .
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {TIERS.map((t, i) => (
            <article
              key={t.id}
              className={[
                "relative flex flex-col rounded-2xl overflow-hidden transition-all duration-700",
                t.featured
                  ? "bg-[#141210] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] lg:scale-[1.02]"
                  : "bg-[#FBF8F1] border border-[#141210]/10 hover:-translate-y-1 hover:shadow-lg",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${130 * i}ms` : "0ms" }}
            >
              {/* Top accent */}
              <span
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: "#E6A032" }}
                aria-hidden="true"
              />

              {/* Featured badge */}
              {t.featured && (
                <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E6A032] text-[10px] font-extrabold tracking-[0.18em] uppercase text-white">
                  Most Popular
                </span>
              )}

              <div className="p-7 md:p-9 flex-1 flex flex-col">
                <p
                  className={[
                    "text-[10.5px] font-semibold tracking-[0.26em] uppercase mb-3",
                    t.featured ? "text-[#E6A032]" : "text-[#141210]/55",
                  ].join(" ")}
                >
                  {t.eyebrow}
                </p>

                <h3
                  className={[
                    "font-display font-light leading-[1.05] tracking-[-0.015em] text-[28px] md:text-[34px] mb-3",
                    t.featured ? "text-white" : "text-[#141210]",
                  ].join(" ")}
                >
                  {t.name}
                </h3>

                <p
                  className={[
                    "text-[14.5px] leading-[1.55] mb-7",
                    t.featured ? "text-white/85" : "text-[#141210]/75",
                  ].join(" ")}
                >
                  {t.headline}
                </p>

                {/* Price */}
                <div className="mb-7 pb-7 border-b border-current/15">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold tracking-[0.24em] uppercase opacity-55"
                    >
                      Starting from
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={[
                        "text-[40px] md:text-[48px] font-display font-light leading-none tracking-[-0.02em]",
                        t.featured ? "text-white" : "text-[#141210]",
                      ].join(" ")}
                    >
                      {t.priceFrom}
                    </span>
                  </div>
                  <p
                    className={[
                      "mt-1 text-[12px]",
                      t.featured ? "text-white/55" : "text-[#141210]/55",
                    ].join(" ")}
                  >
                    {t.priceUnit} · ex VAT
                  </p>
                </div>

                {/* Description */}
                <p
                  className={[
                    "text-[13.5px] leading-[1.7] mb-6",
                    t.featured ? "text-white/75" : "text-[#141210]/70",
                  ].join(" ")}
                >
                  {t.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className={[
                        "flex items-start gap-2.5 text-[13.5px]",
                        t.featured ? "text-white/85" : "text-[#141210]/80",
                      ].join(" ")}
                    >
                      <FiCheck className="shrink-0 mt-0.5 w-4 h-4" style={{ color: "#E6A032" }} strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Best for */}
                <div
                  className={[
                    "p-4 rounded-sm mb-6",
                    t.featured ? "bg-white/[0.06]" : "bg-white",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "text-[10px] font-bold tracking-[0.22em] uppercase mb-1",
                      t.featured ? "text-[#E6A032]" : "text-[#E6A032]",
                    ].join(" ")}
                  >
                    Best for
                  </p>
                  <p
                    className={[
                      "text-[13px] font-bold",
                      t.featured ? "text-white" : "text-[#141210]",
                    ].join(" ")}
                  >
                    {t.bestFor}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={t.ctaHref}
                  className={[
                    "group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[11.5px] font-extrabold tracking-[0.18em] uppercase transition-all duration-300",
                    t.featured
                      ? "bg-[#E6A032] hover:bg-[#C88C28] text-white shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)]"
                      : "bg-[#141210] hover:bg-[#0A0806] text-white shadow-md hover:shadow-lg",
                  ].join(" ")}
                >
                  {t.ctaLabel}
                  <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] text-[#141210]/60 max-w-2xl mx-auto">
          All engagement pricing is indicative. Final scope and price are
          confirmed in a written proposal within 5 business days of your
          discovery call.
        </p>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 3. Training callout
// ═══════════════════════════════════════════════════════════════════════
const TrainingCallout = () => {
  return (
    <section
      aria-labelledby="training-pricing-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="bg-[#141210] text-white rounded-2xl overflow-hidden relative">
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: "#E6A032" }}
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 md:p-12 lg:p-16">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-5">
                Fixed-Price Training
              </p>
              <h2
                id="training-pricing-heading"
                className="font-display font-light leading-[1.05] tracking-[-0.02em] text-white text-[28px] md:text-[40px] lg:text-[46px] mb-5"
              >
                Transition to Architecture in{" "}
                <span className="font-light italic" style={{ color: "#E6A032" }}>
                  6 Weeks
                </span>
                .
              </h2>
              <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/75 max-w-2xl mb-7">
                A 6-week intensive, hands-on programme that fast-tracks
                professionals from any background into architecture roles.
                Live sessions, practical workshops, and a Certificate of
                Completion. Pay once, secure your seat instantly.
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {["6 weeks", "Live sessions", "Workshops", "Certificate", "Portfolio"].map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-[10.5px] font-bold tracking-[0.16em] uppercase text-white/85"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6A032]" />
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-white to-[#FBF8F1] text-[#141210] rounded-xl p-7 md:p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]">

                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#141210]/50 mb-1.5">
                  Reserve your seat from
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-[44px] md:text-[48px] font-display font-light leading-none tracking-[-0.02em] text-[#141210]">
                    {TRAINING_PRICE.registration}
                  </span>
                  <span className="text-[12px] font-bold text-[#141210]/55">
                    registration fee
                  </span>
                </div>

                <dl className="space-y-2.5 mb-5 pb-5 border-b border-[#141210]/10">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[12.5px] text-[#141210]/70">Registration fee</dt>
                    <dd className="text-[13px] font-display font-light text-[#141210]">{TRAINING_PRICE.registration}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[12.5px] text-[#141210]/70">Course fee</dt>
                    <dd className="text-[13px] font-display font-light text-[#141210]">{TRAINING_PRICE.course}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#E6A032]">Total</dt>
                    <dd className="text-[16px] font-display font-light text-[#141210]">{TRAINING_PRICE.total}</dd>
                  </div>
                </dl>

                <p className="text-[12px] leading-[1.6] text-[#141210]/65 mb-6">
                  Pay the {TRAINING_PRICE.registration} registration fee to secure your
                  place, the {TRAINING_PRICE.course} course fee can be spread over{" "}
                  <span className="font-bold text-[#141210]">
                    {TRAINING_PRICE.instalments} weekly instalments of {TRAINING_PRICE.instalmentAmount}
                  </span>
                  .
                </p>

                <Link
                  href="/training"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] transition-all duration-300"
                >
                  Register Today
                  <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <p className="mt-4 text-[11px] text-[#141210]/55 text-center">
                  Secure checkout via Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 4. Comparison table
// ═══════════════════════════════════════════════════════════════════════
const Comparison = () => {
  return (
    <section
      aria-labelledby="comparison-heading"
      className="relative bg-white py-20 md:py-28"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
            Side by Side
          </p>
          <h2
            id="comparison-heading"
            className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[32px] md:text-[42px] lg:text-[48px]"
          >
            Compare the{" "}
            <span className="font-light italic" style={{ color: "#E6A032" }}>
              tiers
            </span>
            .
          </h2>
        </div>

        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#141210]/55 pb-6 pr-6 align-bottom">
                  Feature
                </th>
                {TIERS.map((t) => (
                  <th
                    key={t.id}
                    className={[
                      "text-left pb-6 px-4 align-bottom",
                      t.featured ? "" : "",
                    ].join(" ")}
                  >
                    <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#E6A032] mb-1">
                      {t.eyebrow}
                    </div>
                    <div className="text-[18px] md:text-[20px] font-display font-light tracking-[-0.01em] text-[#141210]">
                      {t.name}
                    </div>
                    <div className="mt-1 text-[12px] text-[#141210]/65">
                      from {t.priceFrom}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={[
                    "border-t border-[#141210]/10",
                    i % 2 === 1 ? "bg-[#FBF8F1]" : "",
                  ].join(" ")}
                >
                  <td className="py-5 pr-6 text-[13.5px] font-bold text-[#141210]">
                    {row.feature}
                  </td>
                  <td className="py-5 px-4 text-[13.5px] text-[#141210]/75">
                    {row.infrastructure === "N/A" ? <span className="text-[#141210]/30">N/A</span> : row.infrastructure}
                  </td>
                  <td className="py-5 px-4 text-[13.5px] text-white/75 bg-[#E6A032]/[0.06]">
                    {row.governance === "N/A" ? <span className="text-[#141210]/30">N/A</span> : row.governance}
                  </td>
                  <td className="py-5 px-4 text-[13.5px] text-[#141210]/75">
                    {row.enterprise === "N/A" ? <span className="text-[#141210]/30">N/A</span> : row.enterprise}
                  </td>
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
// 5. FAQ
// ═══════════════════════════════════════════════════════════════════════
const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section
      aria-labelledby="pricing-faq-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
              Pricing FAQs
            </p>
            <h2
              id="pricing-faq-heading"
              className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[32px] md:text-[42px]"
            >
              Common{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                questions
              </span>
              .
            </h2>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-[#141210]/15 border-t border-[#141210]/15">
              {FAQS.map((f, i) => (
                <li key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                    aria-expanded={openIdx === i}
                    className="group w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left focus:outline-none"
                  >
                    <span className="text-[15px] md:text-[17px] font-display font-light tracking-[-0.01em] text-[#141210] group-hover:text-[#E6A032] transition-colors">
                      {f.q}
                    </span>
                    <span
                      className={[
                        "shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300",
                        openIdx === i
                          ? "bg-[#E6A032] border-[#E6A032] text-white"
                          : "border-[#141210]/20 text-[#141210] group-hover:border-[#E6A032]",
                      ].join(" ")}
                    >
                      {openIdx === i ? (
                        <FiMinus className="w-4 h-4" strokeWidth={2.5} />
                      ) : (
                        <FiPlus className="w-4 h-4" strokeWidth={2.5} />
                      )}
                    </span>
                  </button>
                  <div
                    className={[
                      "grid transition-[grid-template-rows] duration-500 ease-out",
                      openIdx === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pr-12 text-[14px] md:text-[15px] leading-[1.75] text-[#141210]/75 max-w-2xl">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 6. CTA strip
// ═══════════════════════════════════════════════════════════════════════
const CtaStrip = () => {
  return (
    <section className="relative bg-[#0A0806] text-white overflow-hidden">
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-4">
              Get a tailored proposal
            </p>
            <h2 className="font-display font-light leading-[1.02] tracking-[-0.02em] text-white text-[32px] md:text-[44px] lg:text-[52px]">
              Within{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                5 business days
              </span>{" "}
              of your call.
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] transition-all duration-300"
            >
              Schedule a Call
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-white/55 text-white text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300"
            >
              View Services
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansPricingPage;