"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Script from "next/script";
import toast from "react-hot-toast";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiUsers,
  FiAward,
  FiCalendar,
  FiCreditCard,
  FiX,
  FiLock,
} from "react-icons/fi";
import {
  LuRocket,
  LuTarget,
  LuTrendingUp,
  LuGraduationCap,
} from "react-icons/lu";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PROGRAMMES, formatGBP, totalInPence } from "@/lib/programmes";

/**
 * /training, GCSA Training (single-page)
 *
 * One self-contained page that delivers:
 *   - Training landing/intro                 (was /training)
 *   - Transition to Architecture detail      (was /training/transition-to-architecture)
 *   - Seamless registration modal            (was components/RegistrationModal.jsx)
 *
 * Sections:
 *   1.  Page hero
 *   2.  Why train with GCSA (3 reasons)
 *   3.  ── DIVIDER ── Active Programme banner
 *   4.  Programme hero (mirrors flyer)
 *   5.  Outcomes
 *   6.  Curriculum (interactive 6-week panel)
 *   7.  Who it's for
 *   8.  What's included
 *   9.  Schedule + Investment block (registration trigger)
 *   10. Programme FAQs
 *   11. Corporate / in-house training
 *   12. Final CTA
 *
 * Plus the embedded RegistrationModal (Stripe Checkout flow).
 *
 * Brand: navy #141210 + gold #E6A032 + Montserrat
 */

const PROGRAMME_ID = "transition-to-architecture";
const PROGRAMME_NAME = "Transition to Architecture in 6 Weeks";

// ── Pricing, derived from the single source of truth (lib/programmes.js)
const PROGRAMME = PROGRAMMES[PROGRAMME_ID];
const PRICING = {
  registration: formatGBP(PROGRAMME.registrationFeeInPence), // £300
  course: formatGBP(PROGRAMME.courseFeeInPence), //             £1,200
  total: formatGBP(totalInPence(PROGRAMME)), //                 £1,500
  instalments: PROGRAMME.instalments, //                        4
  instalmentAmount: formatGBP(PROGRAMME.instalmentAmountInPence), // £300
};

// Payment plans offered in the registration modal
const PAYMENT_PLAN_OPTIONS = [
  {
    id: "registration",
    label: "Secure my place",
    amount: PRICING.registration,
    amountNote: "Registration fee · due today",
    blurb: `Pay the ${PRICING.registration} registration fee now to lock in your seat. The ${PRICING.course} course fee is then spread across ${PRICING.instalments} weekly instalments of ${PRICING.instalmentAmount}.`,
    highlight: true,
  },
  {
    id: "full",
    label: "Pay in full",
    amount: PRICING.total,
    amountNote: "Registration + course · due today",
    blurb: `Settle everything in one payment, ${PRICING.registration} registration + ${PRICING.course} course fee. Nothing further to pay.`,
    highlight: false,
  },
];

// ═══════════════════════════════════════════════════════════════════════
// Reveal-on-scroll hook
// ═══════════════════════════════════════════════════════════════════════
function useReveal(options = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setVisible(true);
        return;
      }
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
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
const WHY_GCSA = [
  {
    Icon: LuTarget,
    title: "Real-world cases",
    copy: "Every programme is grounded in transformation case studies pulled from live GCSA consulting engagements.",
  },
  {
    Icon: LuGraduationCap,
    title: "Expert mentorship",
    copy: "Small cohorts. Practising consultants, not career trainers, leading every session.",
  },
  {
    Icon: LuTrendingUp,
    title: "Career-changing outcomes",
    copy: "Portfolio-ready deliverables and a roadmap to your next role, not just a certificate of attendance.",
  },
];

const OUTCOMES = [
  "Real-world architecture experience",
  "A portfolio of project deliverables to showcase your skills",
  "Confidence to apply for architect-level roles",
  "A clear roadmap for your next career step",
  "Industry-recognised frameworks and templates",
  "Direct mentorship from practising consultants",
];

const CURRICULUM = [
  {
    week: "Week 1",
    title: "End-to-End Solution Design",
    summary: "Design scalable, integrated solutions that deliver real business value.",
    deliverables: [
      "Solution-design canvas",
      "Stakeholder requirement pack",
      "First case-study walkthrough",
    ],
  },
  {
    week: "Week 2",
    title: "Architecture Thinking & Modelling",
    summary: "Apply structured frameworks across business, data, application, and technology layers.",
    deliverables: [
      "Capability model",
      "Conceptual architecture diagram",
      "Framework primer (TOGAF essentials)",
    ],
  },
  {
    week: "Week 3",
    title: "Data & Integration Architecture",
    summary: "Design data flows, APIs, integrations and information models that power modern systems.",
    deliverables: [
      "Data flow diagram",
      "API contract example",
      "Integration pattern playbook",
    ],
  },
  {
    week: "Week 4",
    title: "Platform & Technology Strategy",
    summary: "Evaluate and align platforms, cloud, and technologies to build future-ready solutions.",
    deliverables: [
      "Platform comparison matrix",
      "Cloud-strategy one-pager",
      "Tech-radar starter",
    ],
  },
  {
    week: "Week 5",
    title: "Stakeholder Influence & Communication",
    summary: "Present architectural decisions with clarity, confidence, and executive impact.",
    deliverables: [
      "Architecture decision record (ADR) pack",
      "Executive deck template",
      "Live presentation rehearsal",
    ],
  },
  {
    week: "Week 6",
    title: "Governance & Best Practices",
    summary: "Apply standards, principles and decision frameworks used in enterprise environments.",
    deliverables: [
      "Architecture review-board kit",
      "Governance scorecard",
      "Final capstone presentation",
    ],
  },
];

const WHO_FOR = [
  { Icon: LuTarget, title: "Business Analyst", copy: "Ready to move from documenting requirements to designing solutions." },
  { Icon: LuRocket, title: "Developer / Engineer", copy: "Want to step beyond delivery into architecture leadership." },
  { Icon: LuTrendingUp, title: "Project / Programme Manager", copy: "Seeking the technical depth to lead transformation programmes." },
  { Icon: LuGraduationCap, title: "Product Owner", copy: "Building the architectural vocabulary to shape product platforms." },
  { Icon: FiUsers, title: "IT / Operations Professional", copy: "Translating ops experience into design-and-decision authority." },
];

const INCLUDED = [
  "6 weeks of live cohort sessions",
  "Hands-on weekly workshops",
  "Industry frameworks, tools, and templates",
  "Real-life transformation case studies",
  "Portfolio-ready deliverables",
  "Expert mentorship and career guidance",
  "Small-cohort access to instructors",
  "Certificate of Completion",
];

const FAQS = [
  {
    q: "How much does the programme cost, and can I pay in instalments?",
    a: "The programme is £1,500 in total, a £300 registration fee plus a £1,200 course fee. You can pay everything in one go, or pay the £300 registration fee to secure your place and spread the £1,200 course fee across 4 weekly instalments of £300. You choose your plan at checkout.",
  },
  {
    q: "What's the time commitment per week?",
    a: "Plan for around 6 to 8 hours per week: live sessions, workshops, and self-paced exercises. Sessions are scheduled outside standard working hours where possible to accommodate working professionals.",
  },
  {
    q: "Do I need a technical background?",
    a: "Not at a deep-engineering level. The programme is built for professionals from any background, business analysts, project managers, product owners, IT/ops professionals, provided you can solve problems and think structurally. We bring the technical scaffolding.",
  },
  {
    q: "Is the programme delivered live or recorded?",
    a: "All cohort sessions are live (delivered virtually). Recordings are available afterwards so you can revisit anything you missed. Workshops require live participation.",
  },
  {
    q: "What happens after I register?",
    a: "You'll be redirected to Stripe to complete payment securely. Once payment is confirmed, you'll receive a welcome email within minutes including your cohort details, pre-work, and access to the participant portal.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, full refunds within 7 days of payment, provided the cohort has not yet started. After the start date, refunds are reviewed case-by-case. See our terms for the full policy.",
  },
  {
    q: "Can my employer be invoiced directly?",
    a: "Yes. For corporate-funded registrations, contact us at info@gcsaconsulting.co.uk before registering and we'll issue a pro forma invoice and arrange bank transfer.",
  },
];

// Registration form options
const ROLE_OPTIONS = [
  "Business Analyst",
  "Developer / Engineer",
  "Project / Programme Manager",
  "Product Owner",
  "IT / Operations Professional",
  "Other",
];
const EXPERIENCE_OPTIONS = [
  "Less than 2 years",
  "2 to 5 years",
  "5 to 10 years",
  "10+ years",
];
const HEAR_ABOUT_OPTIONS = [
  "LinkedIn",
  "Search engine",
  "Referral",
  "Email / Newsletter",
  "Social media",
  "Other",
];

// JSON-LD
const COURSE_LD = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://www.gcsaconsulting.co.uk/training/#course",
  name: PROGRAMME_NAME,
  description:
    "A 6-week intensive, hands-on programme to fast-track professionals into architecture roles. Master 6 architectural skillsets including solution design, architecture thinking, data & integration, platform strategy, stakeholder influence, and governance.",
  provider: {
    "@type": "Organization",
    name: "GCSA Consulting UK LTD",
    sameAs: "https://www.gcsaconsulting.co.uk",
  },
  url: "https://www.gcsaconsulting.co.uk/training",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT8H",
    instructor: { "@type": "Organization", name: "GCSA Consulting" },
  },
  offers: {
    "@type": "Offer",
    category: "Paid",
    price: (totalInPence(PROGRAMME) / 100).toFixed(2),
    priceCurrency: "GBP",
    availability: "https://schema.org/LimitedAvailability",
    url: "https://www.gcsaconsulting.co.uk/training",
  },
  inLanguage: "en-GB",
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
const TrainingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Script
        id="ld-json-training"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_LD) }}
      />

      <Navbar />

      <main
        id="main-content"
        role="main"
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        {/* ── Intro / Index ─────────────────────────────────── */}
        <PageHero />
        <WhyGCSA />

        {/* ── Active Programme Detail ───────────────────────── */}
        <ProgrammeDivider />
        <ProgrammeHero onRegister={openModal} />
        <Outcomes />
        <Curriculum />
        <WhoFor />
        <Included onRegister={openModal} />
        <ScheduleInvestment onRegister={openModal} />
        <FAQ />

        <CorporateTraining />
        <FinalCta onRegister={openModal} />
      </main>

      <Footer />

      <RegistrationModal
        open={modalOpen}
        onClose={closeModal}
        programmeId={PROGRAMME_ID}
        programmeName={PROGRAMME_NAME}
      />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 1. Page hero
// ═══════════════════════════════════════════════════════════════════════
const PageHero = () => {
  return (
    <section
      aria-labelledby="training-hero-heading"
      className="relative bg-[#141210] text-white overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
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
          <span className="text-[#E6A032]">Training</span>
        </nav>

        <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
          GCSA Training
        </p>

        <h1
          id="training-hero-heading"
          className="font-display font-light leading-[0.98] tracking-[-0.02em] text-white text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] max-w-5xl"
        >
          Ready to Become an{" "}
          <span className="font-light italic" style={{ color: "#E6A032" }}>
            Architect
          </span>{" "}
          in Just 6 Weeks?
        </h1>

        <p className="mt-8 md:mt-10 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
          Stop watching others lead transformation programmes while you remain
          stuck delivering requirements. This is your opportunity to transition
          into high-impact Architecture roles with real-world, hands-on
          experience, delivered by practising GCSA consultants.
        </p>

        <div className="mt-10 md:mt-12 flex flex-wrap gap-3">
          <a
            href="#programme"
            className="group inline-flex items-center gap-2 px-7 md:px-9 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] transition-all duration-300"
          >
            View Active Programme
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 2. Why train with GCSA
// ═══════════════════════════════════════════════════════════════════════
const WhyGCSA = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      aria-labelledby="why-heading"
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
            Why train with GCSA
          </p>
          <h2
            id="why-heading"
            className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[36px] md:text-[48px] lg:text-[56px]"
          >
            Practising consultants.{" "}
            <span className="font-light italic" style={{ color: "#E6A032" }}>Real</span>{" "}
            outcomes.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {WHY_GCSA.map((w, i) => (
            <article
              key={w.title}
              className={[
                "group relative p-7 md:p-8 bg-[#FBF8F1] border border-[#141210]/10 rounded-sm hover:border-[#E6A032] hover:-translate-y-1 transition-all duration-500 ease-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${130 * i}ms` : "0ms" }}
            >
              <span
                className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ backgroundColor: "#E6A032" }}
                aria-hidden="true"
              />
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5"
                style={{ backgroundColor: "#E6A032" }}
              >
                <w.Icon className="w-5 h-5 text-[#141210]" strokeWidth={2.2} />
              </div>
              <h3 className="font-display font-light tracking-[-0.01em] text-[#141210] text-[20px] md:text-[22px] mb-3">
                {w.title}
              </h3>
              <p className="text-[13.5px] md:text-[14px] leading-[1.7] text-[#141210]/70">
                {w.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 3. Programme divider, visual handoff between intro and detail
// ═══════════════════════════════════════════════════════════════════════
const ProgrammeDivider = () => {
  return (
    <section
      id="programme"
      aria-hidden="true"
      className="relative bg-[#FBF8F1] py-12 md:py-16 scroll-mt-24"
    >
      <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="flex-1 h-px bg-[#141210]/15" />
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#141210] text-white">
            <span className="w-2 h-2 rounded-full bg-[#E6A032] animate-pulse" />
            <span className="text-[10px] md:text-[11px] font-extrabold tracking-[0.22em] uppercase">
              Limited Cohort · High Demand, Now Enrolling
            </span>
          </span>
          <span className="flex-1 h-px bg-[#141210]/15" />
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 4. Programme hero, mirrors the flyer
// ═══════════════════════════════════════════════════════════════════════
const ProgrammeHero = ({ onRegister }) => {
  return (
    <section
      aria-labelledby="prog-hero-heading"
      className="relative bg-[#141210] text-white overflow-hidden pt-16 md:pt-24 pb-20 md:pb-28"
    >

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#E6A032] mb-7">
              <LuRocket className="w-3.5 h-3.5 text-[#141210]" strokeWidth={2.5} />
              <span className="text-[10px] md:text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#141210]">
                Design the Future. Lead the Change.
              </span>
            </div>

            <h2
              id="prog-hero-heading"
              className="font-display font-light leading-[0.92] tracking-[-0.025em] text-white text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[112px]"
            >
              Transition to <br />
              <span style={{ color: "#E6A032" }}>Architecture</span>
              <span className="block mt-3 text-[24px] md:text-[34px] lg:text-[40px] font-bold text-white/90 tracking-[-0.01em]">
                in just 6 weeks!
              </span>
            </h2>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              {[
                { Icon: LuTarget, label: "High-Impact Career" },
                { Icon: LuTrendingUp, label: "High-Demand Roles" },
                { Icon: LuGraduationCap, label: "Higher Influence" },
              ].map(({ Icon, label }) => (
                <div key={label} className="inline-flex items-center gap-2">
                  <Icon className="w-5 h-5" style={{ color: "#E6A032" }} />
                  <span className="text-[12px] md:text-[13px] font-bold tracking-[0.14em] uppercase text-white/85">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
              This is your opportunity to transition into high-impact
              Architecture roles with real-world, hands-on experience across
              Solution, Business, Data, Application, Platform, and Technology
              Architecture, led by practising GCSA consultants.
            </p>
          </div>

          {/* Right, investment / CTA card */}
          <div className="lg:col-span-4">
            <div className="relative bg-gradient-to-br from-white to-[#FBF8F1] text-[#141210] rounded-2xl p-7 md:p-8 shadow-[0_30px_80px_-20px_rgba(230,160,50,0.4)] overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: "#E6A032" }}
                aria-hidden="true"
              />

              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#141210]/50 mb-1.5">
                Reserve your seat from
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[44px] md:text-[48px] font-display font-light leading-none tracking-[-0.02em] text-[#141210]">
                  {PRICING.registration}
                </span>
                <span className="text-[12px] font-bold text-[#141210]/55">
                  registration fee
                </span>
              </div>
              <p className="text-[12.5px] leading-[1.6] text-[#141210]/70 mb-6">
                Then {PRICING.course} course fee, pay in full or across{" "}
                <span className="font-bold text-[#141210]">
                  {PRICING.instalments} weekly instalments of {PRICING.instalmentAmount}
                </span>
                . {PRICING.total} total.
              </p>

              <ul className="space-y-2 mb-7">
                {[
                  "6 weeks of live sessions",
                  "Hands-on workshops",
                  "Certificate of completion",
                  "Career-ready portfolio",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[13px] text-[#141210]/80">
                    <FiCheck className="shrink-0 mt-0.5 w-4 h-4" style={{ color: "#E6A032" }} strokeWidth={3} />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={onRegister}
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032] transition-all duration-300"
              >
                <FiCreditCard className="w-4 h-4" />
                Secure Your Spot Today
                <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-4 text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#141210]/55 text-center">
                Limited Cohort · High Demand
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 5. Outcomes
// ═══════════════════════════════════════════════════════════════════════
const Outcomes = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      aria-labelledby="outcomes-heading"
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
              You Will Walk Away With
            </p>
            <h2
              id="outcomes-heading"
              className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[36px] md:text-[48px] lg:text-[56px]"
            >
              Six weeks. Six{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>tangible</span>{" "}
              outcomes.
            </h2>
            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#141210]/75 max-w-md">
              Every week produces a portfolio piece you can show in an interview
              not just lecture notes. By Week 6, you have the experience,
              language, and confidence of an architect.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {OUTCOMES.map((o, i) => (
                <li
                  key={o}
                  className={[
                    "flex items-start gap-3 transition-all duration-700",
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  ].join(" ")}
                  style={{ transitionDelay: visible ? `${80 * i}ms` : "0ms" }}
                >
                  <span
                    className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: "#E6A032" }}
                  >
                    <FiCheck className="w-3.5 h-3.5 text-[#141210]" strokeWidth={3} />
                  </span>
                  <span className="text-[14.5px] md:text-[15px] leading-[1.55] text-[#141210]/85">
                    {o}
                  </span>
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
// 6. Curriculum, interactive 6-week panel
// ═══════════════════════════════════════════════════════════════════════
const Curriculum = () => {
  const [ref, visible] = useReveal();
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      aria-labelledby="curriculum-heading"
      className="relative bg-[#141210] text-white py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(230,160,50,0.10), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
            The Curriculum
          </p>
          <h2
            id="curriculum-heading"
            className="font-display font-light leading-[1.02] tracking-[-0.02em] text-white text-[36px] md:text-[48px] lg:text-[56px]"
          >
            Master the top{" "}
            <span style={{ color: "#E6A032" }}>6 architectural</span>{" "}
            skillsets.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left, week list */}
          <div className="lg:col-span-5">
            <ul className="space-y-2">
              {CURRICULUM.map((c, i) => {
                const isActive = active === i;
                return (
                  <li key={c.week}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={[
                        "group w-full text-left flex items-center gap-4 p-4 md:p-5 rounded-sm border transition-all duration-300",
                        isActive
                          ? "bg-white/[0.06] border-[#E6A032]/50"
                          : "bg-transparent border-white/10 hover:border-white/30",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full text-[14px] font-display font-light transition-colors",
                          isActive
                            ? "bg-[#E6A032] text-white"
                            : "bg-white/10 text-white/70 group-hover:bg-white/20",
                        ].join(" ")}
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={[
                            "block text-[10px] font-bold tracking-[0.24em] uppercase mb-0.5 transition-colors",
                            isActive ? "text-[#E6A032]" : "text-white/50",
                          ].join(" ")}
                        >
                          {c.week}
                        </span>
                        <span
                          className={[
                            "block text-[14px] md:text-[15px] font-bold transition-colors",
                            isActive ? "text-white" : "text-white/75 group-hover:text-white",
                          ].join(" ")}
                        >
                          {c.title}
                        </span>
                      </span>
                      <FiArrowUpRight
                        className={[
                          "shrink-0 w-4 h-4 transition-all duration-300",
                          isActive
                            ? "text-[#E6A032] translate-x-0.5 -translate-y-0.5"
                            : "text-white/40 group-hover:text-white/70",
                        ].join(" ")}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right, week detail */}
          <div className="lg:col-span-7">
            <div
              key={active}
              className="relative bg-gradient-to-br from-[#0A0806] via-[#141210] to-[#0A0806] border border-white/10 rounded-2xl p-8 md:p-10 lg:p-12 animate-[panelFade_500ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
            >
              <span
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ backgroundColor: "#E6A032" }}
                aria-hidden="true"
              />
              <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#E6A032] mb-3">
                {CURRICULUM[active].week}
              </p>
              <h3 className="font-display font-light leading-[1.05] tracking-[-0.015em] text-white text-[28px] md:text-[34px] mb-4">
                {CURRICULUM[active].title}
              </h3>
              <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/75 mb-8">
                {CURRICULUM[active].summary}
              </p>

              <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#E6A032] mb-3">
                Deliverables
              </p>
              <ul className="space-y-2.5">
                {CURRICULUM[active].deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[14px] text-white/85">
                    <FiCheck className="shrink-0 mt-0.5 w-4 h-4" style={{ color: "#E6A032" }} strokeWidth={3} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes panelFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-[panel"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 7. Who it's for
// ═══════════════════════════════════════════════════════════════════════
const WhoFor = () => {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      aria-labelledby="who-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
            Built for Professionals from Any Background
          </p>
          <h2
            id="who-heading"
            className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[36px] md:text-[48px] lg:text-[56px]"
          >
            If you can solve problems, you can become an{" "}
            <span className="font-light italic" style={{ color: "#E6A032" }}>architect</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
          {WHO_FOR.map((w, i) => (
            <article
              key={w.title}
              className={[
                "group relative p-6 bg-white border border-[#141210]/10 rounded-sm hover:border-[#E6A032] hover:-translate-y-1 transition-all duration-500",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${100 * i}ms` : "0ms" }}
            >
              <span
                className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: "#E6A032" }}
                aria-hidden="true"
              />
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-4"
                style={{ backgroundColor: "#E6A032" }}
              >
                <w.Icon className="w-4 h-4 text-[#141210]" strokeWidth={2.2} />
              </div>
              <h3 className="font-display font-light tracking-[-0.01em] text-[#141210] text-[15px] md:text-[16px] leading-tight mb-2">
                {w.title}
              </h3>
              <p className="text-[12.5px] leading-[1.6] text-[#141210]/65">
                {w.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 8. What's included
// ═══════════════════════════════════════════════════════════════════════
const Included = ({ onRegister }) => {
  return (
    <section
      aria-labelledby="included-heading"
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
              What's Included
            </p>
            <h2
              id="included-heading"
              className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[32px] md:text-[42px] lg:text-[48px] mb-8"
            >
              Everything you need to{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                succeed
              </span>
              .
            </h2>
            <button
              type="button"
              onClick={onRegister}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#141210] hover:bg-[#0A0806] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-md hover:shadow-lg transition-all duration-300"
            >
              Secure Your Spot Today
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: "#E6A032" }}
                  >
                    <FiCheck className="w-3.5 h-3.5 text-[#141210]" strokeWidth={3} />
                  </span>
                  <span className="text-[14.5px] md:text-[15px] leading-[1.55] text-[#141210]/85">
                    {item}
                  </span>
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
// 9. Schedule + Investment
// ═══════════════════════════════════════════════════════════════════════
const ScheduleInvestment = ({ onRegister }) => {
  return (
    <section
      aria-labelledby="schedule-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="bg-[#141210] text-white rounded-2xl overflow-hidden relative">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-14">
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-5">
                Schedule
              </p>
              <h2
                id="schedule-heading"
                className="font-display font-light leading-[1.05] tracking-[-0.02em] text-white text-[28px] md:text-[40px] lg:text-[46px] mb-8"
              >
                Six weeks to a{" "}
                <span className="font-light italic" style={{ color: "#E6A032" }}>
                  career-changing
                </span>{" "}
                future.
              </h2>

              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {[
                  { Icon: FiCalendar, label: "Next Cohort", value: "Starting Soon" },
                  { Icon: FiClock, label: "Duration", value: "6 weeks · 6 to 8h/wk" },
                  { Icon: FiUsers, label: "Format", value: "Live online + workshops" },
                  { Icon: FiAward, label: "Outcome", value: "Certificate + portfolio" },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="shrink-0 mt-0.5 w-4 h-4" style={{ color: "#E6A032" }} />
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50 mb-1">
                        {label}
                      </div>
                      <div className="text-[14px] md:text-[15px] font-bold text-white">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 lg:p-14 bg-gradient-to-br from-[#0A0806] to-[#141210] lg:border-l border-white/10 flex flex-col justify-center">

              <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#E6A032] mb-4">
                Your Investment
              </p>

              <dl className="space-y-3 mb-5">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[13px] text-white/75">Registration fee</dt>
                  <dd className="text-[15px] font-display font-light text-white">{PRICING.registration}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[13px] text-white/75">Course fee</dt>
                  <dd className="text-[15px] font-display font-light text-white">{PRICING.course}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-3 border-t border-white/10">
                  <dt className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#E6A032]">Total</dt>
                  <dd className="text-[22px] font-display font-light text-white leading-none">{PRICING.total}</dd>
                </div>
              </dl>

              <div className="flex items-start gap-2.5 mb-7 p-3.5 rounded-sm bg-[#E6A032]/[0.08] border border-[#E6A032]/25">
                <FiCreditCard className="shrink-0 mt-0.5 w-4 h-4" style={{ color: "#E6A032" }} />
                <p className="text-[12px] leading-[1.55] text-white/80">
                  Spread the course fee over{" "}
                  <span className="font-bold text-white">
                    {PRICING.instalments} weekly instalments of {PRICING.instalmentAmount}
                  </span>{" "}
                  pay the {PRICING.registration} registration fee today to secure your place.
                </p>
              </div>

              <button
                type="button"
                onClick={onRegister}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032] transition-all duration-300"
              >
                <FiCreditCard className="w-4 h-4" />
                Secure Your Spot Today
                <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-4 text-[11px] text-white/55 text-center">
                Secure checkout via Stripe · Cards accepted globally
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                <p className="text-[11.5px] font-bold text-white/80">
                  📍 Classes in London, Wales, Scotland &amp; North Ireland
                </p>
                <a
                  href="mailto:info@gcsaconsulting.co.uk"
                  className="block text-[11.5px] font-bold text-[#E6A032] hover:text-white transition-colors"
                >
                  📩 info@gcsaconsulting.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 10. Programme FAQs
// ═══════════════════════════════════════════════════════════════════════
const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section
      aria-labelledby="prog-faq-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
              Programme FAQs
            </p>
            <h2
              id="prog-faq-heading"
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
                        "shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 text-[18px] font-display font-light leading-none",
                        openIdx === i
                          ? "bg-[#E6A032] border-[#E6A032] text-white rotate-45"
                          : "border-[#141210]/20 text-[#141210] group-hover:border-[#E6A032]",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={[
                      "grid transition-[grid-template-rows] duration-500 ease-out",
                      openIdx === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pr-8 text-[14px] md:text-[15px] leading-[1.75] text-[#141210]/75 max-w-2xl">
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
// 12. Corporate / in-house training
// ═══════════════════════════════════════════════════════════════════════
const CorporateTraining = () => {
  return (
    <section
      aria-labelledby="corporate-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="bg-[#141210] text-white rounded-2xl overflow-hidden p-8 md:p-14 lg:p-16 relative">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-5">
                Corporate Training
              </p>
              <h2
                id="corporate-heading"
                className="font-display font-light leading-[1.05] tracking-[-0.02em] text-white text-[28px] md:text-[40px] lg:text-[46px] mb-5"
              >
                Need to upskill your{" "}
                <span className="font-light italic" style={{ color: "#E6A032" }}>
                  whole team
                </span>
                ?
              </h2>
              <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/75 max-w-2xl">
                We design and deliver custom in-house programmes, architecture
                upskilling, governance bootcamps, leadership academies, tailored
                to your sector, scale, and standards. Cohorts of 8 to 40, on-site or virtual.
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] transition-all duration-300"
              >
                Request a proposal
                <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 14. Final CTA
// ═══════════════════════════════════════════════════════════════════════
const FinalCta = ({ onRegister }) => {
  return (
    <section className="relative bg-[#0A0806] text-white overflow-hidden">
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-20 md:py-28 lg:py-32 text-center">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
          Limited Cohort · High Demand
        </p>
        <h2 className="font-display font-light leading-[0.98] tracking-[-0.025em] text-white text-[44px] md:text-[68px] lg:text-[88px] max-w-4xl mx-auto">
          Your next career breakthrough is only{" "}
          <span className="font-light italic" style={{ color: "#E6A032" }}>6 weeks</span>{" "}away.
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-[15px] md:text-[17px] leading-[1.7] text-white/75">
          If you're serious about accelerating your career and positioning
          yourself for Architecture opportunities, the time to act is NOW.
        </p>
        <button
          type="button"
          onClick={onRegister}
          className="group mt-10 inline-flex items-center gap-2 px-9 py-5 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[13px] font-extrabold tracking-[0.2em] uppercase shadow-[0_14px_40px_-10px_rgba(230,160,50,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0806] focus-visible:ring-[#E6A032] transition-all duration-300"
        >
          <FiCreditCard className="w-5 h-5" />
          Secure Your Spot Today
          <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-[13px] text-white/60">
          <span>📍 Classes in London, Wales, Scotland &amp; North Ireland</span>
          <span className="hidden sm:inline text-white/30">·</span>
          <a href="mailto:info@gcsaconsulting.co.uk" className="font-bold text-[#E6A032] hover:text-white transition-colors">
            📩 info@gcsaconsulting.co.uk
          </a>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// REGISTRATION MODAL, embedded in the same file
// ═══════════════════════════════════════════════════════════════════════
const RegistrationModal = ({
  open,
  onClose,
  programmeId,
  programmeName,
}) => {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    currentRole: "Business Analyst",
    experience: "2 to 5 years",
    company: "",
    linkedin: "",
    motivation: "",
    hearAbout: "LinkedIn",
    consent: false,
    plan: "registration",
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setStep(1), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !submitting) onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, submitting, onClose]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const validateStep1 = () => {
    if (!form.firstName.trim()) return toast.error("Please enter your first name."), false;
    if (!form.lastName.trim()) return toast.error("Please enter your last name."), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      return toast.error("Please enter a valid email address."), false;
    if (!form.phone.trim()) return toast.error("Please enter a phone number."), false;
    if (!form.country.trim()) return toast.error("Please enter your country."), false;
    return true;
  };

  const validateStep2 = () => {
    if (!form.motivation.trim() || form.motivation.trim().length < 20)
      return toast.error("Please share at least a couple of sentences about your motivation."), false;
    if (!form.consent) return toast.error("Please confirm you accept the terms to continue."), false;
    return true;
  };

  const next = () => {
    if (step === 1) return validateStep1() && setStep(2);
    if (step === 2) return validateStep2() && setStep(3);
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async (e) => {
    e?.preventDefault();
    if (!validateStep1() || !validateStep2()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programmeId,
          programmeName,
          plan: form.plan,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          country: form.country.trim(),
          currentRole: form.currentRole,
          experience: form.experience,
          company: form.company.trim(),
          linkedin: form.linkedin.trim(),
          motivation: form.motivation.trim(),
          hearAbout: form.hearAbout,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not start checkout");
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      // Stripe isn't configured yet, the registration was still captured.
      if (data?.pending) {
        toast.success(
          data.message ||
            "Registration received! We'll email you shortly to arrange payment."
        );
        onClose?.();
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-stretch md:items-center justify-center p-0 md:p-6"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-heading"
    >
      <button
        type="button"
        aria-label="Close registration"
        onClick={() => !submitting && onClose?.()}
        className="absolute inset-0 bg-[#0A0806]/80 backdrop-blur-sm animate-[modalFade_300ms_ease-out_forwards] cursor-default"
      />

      <div className="relative w-full md:max-w-[820px] md:max-h-[90vh] bg-white md:rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col animate-[modalPop_400ms_cubic-bezier(0.22,1,0.36,1)_forwards]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#E6A032]" aria-hidden="true" />

        {/* Header */}
        <div className="relative px-6 md:px-10 pt-7 md:pt-9 pb-5 border-b border-[#141210]/10 bg-white">
          <button
            type="button"
            onClick={() => !submitting && onClose?.()}
            disabled={submitting}
            aria-label="Close"
            className="absolute top-5 right-5 md:top-7 md:right-7 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#141210]/[0.05] hover:bg-[#141210]/10 text-[#141210] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiX className="w-5 h-5" />
          </button>

          <p className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-2">
            <span className="inline-block w-8 h-px bg-[#E6A032] align-middle mr-3" />
            Register
          </p>
          <h2
            id="registration-heading"
            className="font-display font-light leading-[1.1] tracking-[-0.01em] text-[#141210] text-[22px] md:text-[28px] pr-12"
          >
            {programmeName}
          </h2>

          <div className="mt-5 flex items-center gap-3">
            <Step n={1} active={step >= 1} done={step > 1} label="Your details" />
            <span className="flex-1 h-px bg-[#141210]/15" />
            <Step n={2} active={step >= 2} done={step > 2} label="Background" />
            <span className="flex-1 h-px bg-[#141210]/15" />
            <Step n={3} active={step >= 3} done={false} label="Payment" />
          </div>
        </div>

        {/* Body */}
        <form onSubmit={submit} noValidate className="flex-1 overflow-y-auto px-6 md:px-10 py-6 md:py-8 bg-[#FBF8F1]">
          {step === 1 && (
            <div key="step-1" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 animate-[stepFade_350ms_ease-out_forwards]">
              <Field label="First Name" name="firstName" value={form.firstName} onChange={onChange} required />
              <Field label="Last Name" name="lastName" value={form.lastName} onChange={onChange} required />
              <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required full />
              <Field label="Phone (with country code)" name="phone" type="tel" value={form.phone} onChange={onChange} required placeholder="+44 1234 567890" />
              <Field label="Country of residence" name="country" value={form.country} onChange={onChange} required placeholder="United Kingdom" />
            </div>
          )}

          {step === 2 && (
            <div key="step-2" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 animate-[stepFade_350ms_ease-out_forwards]">
              <SelectField label="Current role" name="currentRole" value={form.currentRole} onChange={onChange} options={ROLE_OPTIONS} />
              <SelectField label="Years of experience" name="experience" value={form.experience} onChange={onChange} options={EXPERIENCE_OPTIONS} />
              <Field label="Company / Organisation" name="company" value={form.company} onChange={onChange} full />
              <Field label="LinkedIn URL (optional)" name="linkedin" value={form.linkedin} onChange={onChange} full placeholder="https://linkedin.com/in/..." />
              <Field label="Why do you want to take this programme?" name="motivation" value={form.motivation} onChange={onChange} required full textarea placeholder="Tell us about your goals and what you hope to achieve…" />
              <SelectField label="How did you hear about GCSA?" name="hearAbout" value={form.hearAbout} onChange={onChange} options={HEAR_ABOUT_OPTIONS} full />

              <label className="md:col-span-2 flex items-start gap-3 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={onChange}
                  className="shrink-0 mt-0.5 w-4 h-4 rounded-sm border-2 border-[#141210]/30 accent-[#E6A032] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/60"
                />
                <span className="text-[12.5px] leading-[1.6] text-[#141210]/80">
                  I agree to the GCSA{" "}
                  <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="font-bold text-[#141210] underline underline-offset-2 hover:text-[#E6A032]">
                    terms of use
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-bold text-[#141210] underline underline-offset-2 hover:text-[#E6A032]">
                    privacy policy
                  </a>
                  , and consent to GCSA contacting me about this programme.
                </span>
              </label>
            </div>
          )}

          {step === 3 && (
            <div key="step-3" className="animate-[stepFade_350ms_ease-out_forwards]">
              <p className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#141210]/65 mb-1">
                Choose how to pay
              </p>
              <p className="text-[13px] leading-[1.6] text-[#141210]/70 mb-5">
                The programme is{" "}
                <span className="font-bold text-[#141210]">{PRICING.total}</span> in
                total, {PRICING.registration} registration fee plus {PRICING.course}{" "}
                course fee.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" role="radiogroup" aria-label="Payment plan">
                {PAYMENT_PLAN_OPTIONS.map((opt) => {
                  const selected = form.plan === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setForm((s) => ({ ...s, plan: opt.id }))}
                      className={[
                        "relative text-left p-5 rounded-lg border-2 bg-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/60",
                        selected
                          ? "border-[#E6A032] shadow-[0_10px_30px_-12px_rgba(230,160,50,0.7)]"
                          : "border-[#141210]/12 hover:border-[#141210]/30",
                      ].join(" ")}
                    >
                      {opt.highlight && (
                        <span className="absolute top-3 right-3 inline-flex px-2 py-1 rounded-full bg-[#E6A032] text-[8.5px] font-extrabold tracking-[0.16em] uppercase text-white">
                          Popular
                        </span>
                      )}
                      <span
                        className={[
                          "inline-flex items-center justify-center w-5 h-5 rounded-full border-2 mb-3 transition-colors",
                          selected ? "border-[#E6A032] bg-[#E6A032]" : "border-[#141210]/25",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {selected && <FiCheck className="w-3 h-3 text-[#141210]" strokeWidth={3.5} />}
                      </span>
                      <div className="text-[13px] font-bold tracking-[-0.01em] text-[#141210] mb-1">
                        {opt.label}
                      </div>
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-[28px] font-display font-light leading-none tracking-[-0.02em] text-[#141210]">
                          {opt.amount}
                        </span>
                      </div>
                      <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#E6A032] mb-3">
                        {opt.amountNote}
                      </div>
                      <p className="text-[12px] leading-[1.55] text-[#141210]/65">
                        {opt.blurb}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-start gap-2.5 p-4 rounded-sm bg-[#141210]/[0.04] border border-[#141210]/10">
                <FiLock className="shrink-0 mt-0.5 w-3.5 h-3.5 text-[#E6A032]" />
                <p className="text-[12px] leading-[1.6] text-[#141210]/70">
                  You'll be redirected to{" "}
                  <span className="font-bold text-[#141210]">Stripe</span> to pay your{" "}
                  {form.plan === "full" ? PRICING.total : PRICING.registration} securely.
                  {form.plan === "registration" && (
                    <>
                      {" "}
                      The remaining {PRICING.course} is then collected in{" "}
                      {PRICING.instalments} weekly instalments of {PRICING.instalmentAmount}.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="px-6 md:px-10 py-5 border-t border-[#141210]/10 bg-white flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 text-[11.5px] text-[#141210]/65">
            <FiLock className="w-3.5 h-3.5 text-[#E6A032]" />
            <span>
              Secure checkout via{" "}
              <span className="font-bold text-[#141210]">Stripe</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                disabled={submitting}
                className="inline-flex items-center justify-center px-5 py-3 rounded-full border-2 border-[#141210]/15 text-[#141210] text-[11px] font-bold tracking-[0.18em] uppercase hover:border-[#141210] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#141210] hover:bg-[#0A0806] text-white text-[11.5px] font-extrabold tracking-[0.18em] uppercase shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032] transition-all duration-300"
              >
                Continue
                <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[11.5px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-[#141210]/30 border-t-[#141210] animate-spin" />
                    Redirecting…
                  </>
                ) : (
                  <>
                    <FiCreditCard className="w-4 h-4" />
                    Pay {form.plan === "full" ? PRICING.total : PRICING.registration}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPop {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes stepFade {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-[modal"], [class*="animate-[step"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

// ─────────────────────────────────────────────────────────────────────
// Modal sub-components
// ─────────────────────────────────────────────────────────────────────
const Step = ({ n, active, done, label }) => (
  <div className="flex items-center gap-2 shrink-0">
    <span
      className={[
        "inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-[11px] md:text-[12px] font-display font-light transition-colors",
        done
          ? "bg-[#E6A032] text-white"
          : active
          ? "bg-[#141210] text-white"
          : "bg-[#141210]/10 text-[#141210]/40",
      ].join(" ")}
    >
      {done ? <FiCheck className="w-3.5 h-3.5" strokeWidth={3} /> : n}
    </span>
    <span
      className={[
        "hidden sm:inline text-[10.5px] md:text-[11px] font-bold tracking-[0.18em] uppercase",
        active || done ? "text-[#141210]" : "text-[#141210]/40",
      ].join(" ")}
    >
      {label}
    </span>
  </div>
);

const Field = ({ label, name, type = "text", value, onChange, required, full, textarea, placeholder }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label htmlFor={name} className="block text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#141210]/65 mb-2">
      {label} {required && <span className="text-[#E6A032]">*</span>}
    </label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-[#141210]/15 rounded-sm text-[14px] text-[#141210] placeholder:text-[#141210]/40 focus:outline-none focus:border-[#E6A032] focus:ring-2 focus:ring-[#E6A032]/20 transition-all resize-none"
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-[#141210]/15 rounded-sm text-[14px] text-[#141210] placeholder:text-[#141210]/40 focus:outline-none focus:border-[#E6A032] focus:ring-2 focus:ring-[#E6A032]/20 transition-all"
      />
    )}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label htmlFor={name} className="block text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#141210]/65 mb-2">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-white border border-[#141210]/15 rounded-sm text-[14px] text-[#141210] focus:outline-none focus:border-[#E6A032] focus:ring-2 focus:ring-[#E6A032]/20 transition-all appearance-none cursor-pointer"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230A1A36'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 1rem center",
        backgroundSize: "1.25em",
        paddingRight: "2.75rem",
      }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

export default TrainingPage;