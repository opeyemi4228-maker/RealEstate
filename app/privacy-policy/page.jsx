"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Privacy Policy — GCSA Consulting UK LTD
 *
 * UK GDPR / Data Protection Act 2018-aligned policy template.
 *
 * IMPORTANT: This is a strong template grounded in UK GDPR principles,
 * but every business should have its policy reviewed by a qualified
 * solicitor before publication. Specific items to verify with counsel:
 *  - Lawful bases listed match how data is actually used
 *  - Retention periods reflect GCSA's real internal practice
 *  - International transfer mechanisms (SCCs, IDTA) match your contracts
 *  - Cookie list is accurate after analytics/tooling decisions are final
 */

const LAST_UPDATED = "1 May 2026";
const COMPANY_NAME = "Real Estate";
const CONTACT_EMAIL = "info@realestate.com";
const CONTACT_PHONE = "123-456-7890";
const CONTACT_ADDRESS = "";

const SECTIONS = [
  { id: "introduction", label: "1. Introduction" },
  { id: "who-we-are", label: "2. Who we are" },
  { id: "information-we-collect", label: "3. Information we collect" },
  { id: "how-we-use", label: "4. How we use your information" },
  { id: "lawful-basis", label: "5. Lawful basis for processing" },
  { id: "sharing", label: "6. Sharing your information" },
  { id: "international", label: "7. International transfers" },
  { id: "retention", label: "8. Data retention" },
  { id: "your-rights", label: "9. Your rights" },
  { id: "cookies", label: "10. Cookies" },
  { id: "security", label: "11. Security" },
  { id: "children", label: "12. Children's privacy" },
  { id: "changes", label: "13. Changes to this policy" },
  { id: "contact", label: "14. Contact us" },
];

const PRIVACY_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.realestate.com/privacy-policy/#webpage",
  url: "https://www.realestate.com/privacy-policy",
  name: "Privacy Policy | Real Estate",
  description:
    "How Real Estate collects, uses, and protects your personal information.",
  isPartOf: { "@id": "https://www.realestate.com/#website" },
  inLanguage: "en-GB",
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <Script
        id="ld-json-privacy"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRIVACY_LD) }}
      />

      <Navbar />

      <main
        id="main-content"
        role="main"
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <PageHero
          eyebrow="Legal"
          title="Privacy"
          titleAccent="Policy"
          intro="How we collect, use, and protect your personal information when you visit our website or engage with our consulting and training services."
          breadcrumbLabel="Privacy Policy"
        />
        <Body sections={SECTIONS}>
          <Section id="introduction" heading="1. Introduction">
            <p>
              {COMPANY_NAME} ("we", "us", "our") is committed to protecting and
              respecting your privacy. This privacy policy explains how we
              handle the personal information of clients, prospective clients,
              training participants, website visitors, and other individuals
              who interact with us.
            </p>
            <p>
              We comply with the UK General Data Protection Regulation (UK
              GDPR), the Data Protection Act 2018, and the Privacy and
              Electronic Communications Regulations (PECR). This policy should
              be read alongside our{" "}
              <Link href="/terms-of-use" className="font-bold text-[#0A1A36] underline underline-offset-4 hover:text-[#FFC72C] transition-colors">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/cookie-preferences" className="font-bold text-[#0A1A36] underline underline-offset-4 hover:text-[#FFC72C] transition-colors">
                Cookie Preferences
              </Link>{" "}
              page.
            </p>
          </Section>

          <Section id="who-we-are" heading="2. Who we are">
            <p>
              {COMPANY_NAME} is a management consulting firm registered in
              England and Wales, with our registered office at{" "}
              {CONTACT_ADDRESS}. We are the data controller responsible for
              your personal information unless otherwise stated in this
              policy.
            </p>
            <p>
              For any data protection enquiries, please contact our Data
              Protection lead at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-[#0A1A36] underline underline-offset-4 hover:text-[#FFC72C] transition-colors">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section id="information-we-collect" heading="3. Information we collect">
            <p>We may collect and process the following categories of personal data:</p>
            <Subheading>3.1 Information you provide directly</Subheading>
            <BulletList
              items={[
                "Identity information — name, job title, employer, professional background",
                "Contact information — email address, phone number, postal address, country of residence",
                "Engagement information — details of your enquiry, training application, or consulting brief",
                "Payment information — billing address and payment confirmation (card details are processed by Stripe and never stored by us)",
                "Communication preferences — newsletter subscriptions and marketing consents",
              ]}
            />
            <Subheading>3.2 Information collected automatically</Subheading>
            <BulletList
              items={[
                "Technical information — IP address, browser type and version, device identifiers, operating system",
                "Usage information — pages visited, time spent, navigation patterns, referrer URLs",
                "Cookie and similar tracking data — see Section 10 and our Cookie Preferences page",
              ]}
            />
            <Subheading>3.3 Information from third parties</Subheading>
            <BulletList
              items={[
                "Public business directories and professional networks (e.g. LinkedIn) where you have made information publicly available",
                "Referrals from existing clients or partners",
                "Payment confirmation data from Stripe (our payment processor)",
              ]}
            />
          </Section>

          <Section id="how-we-use" heading="4. How we use your information">
            <p>We use your personal information to:</p>
            <BulletList
              items={[
                "Respond to enquiries and deliver the consulting or training services you have requested",
                "Process payments and send confirmation, receipts, and onboarding materials",
                "Manage our contractual relationship and provide ongoing client support",
                "Send service communications (cohort logistics, schedule changes, important programme updates)",
                "Send newsletters and marketing communications where you have consented or where there is a legitimate interest under PECR's soft opt-in",
                "Operate, maintain, secure, and improve our website and services",
                "Comply with our legal, regulatory, and accounting obligations",
                "Defend or pursue legal claims where necessary",
              ]}
            />
          </Section>

          <Section id="lawful-basis" heading="5. Lawful basis for processing">
            <p>
              We process personal data only where we have a lawful basis to do
              so under Article 6 of the UK GDPR. The bases we rely on are:
            </p>
            <BulletList
              items={[
                "Contract — to deliver the services you have requested or to take steps before entering a contract",
                "Legitimate interests — to operate our business, maintain client relationships, prevent fraud, secure our systems, and conduct limited direct marketing where appropriate",
                "Consent — for marketing communications, optional cookies, and any sensitive processing",
                "Legal obligation — for accounting records, tax obligations, and regulatory compliance",
              ]}
            />
            <p>
              Where we rely on consent, you may withdraw it at any time by
              contacting us or using the unsubscribe link in our communications.
              Withdrawing consent does not affect the lawfulness of processing
              already carried out.
            </p>
          </Section>

          <Section id="sharing" heading="6. Sharing your information">
            <p>
              We do not sell your personal data. We share it only with carefully
              selected processors and partners who help us deliver our services:
            </p>
            <BulletList
              items={[
                "Stripe Payments Europe Ltd — for processing programme payments (Stripe is the data controller for card data)",
                "Cloud and email infrastructure providers — for hosting, email delivery, and document storage",
                "Professional advisers — accountants, auditors, insurers, and legal counsel under appropriate confidentiality obligations",
                "Regulators, law enforcement, and courts — where we are legally required to disclose information",
                "Successors in interest — in the event of a merger, acquisition, or restructuring of GCSA",
              ]}
            />
            <p>
              All third-party processors are bound by written agreements that
              include UK GDPR-compliant data protection terms.
            </p>
          </Section>

          <Section id="international" heading="7. International transfers">
            <p>
              Where personal data is transferred outside the United Kingdom or
              the European Economic Area, we ensure appropriate safeguards are
              in place. These typically include:
            </p>
            <BulletList
              items={[
                "Transfers to countries with a UK adequacy decision",
                "Standard Contractual Clauses (SCCs) approved by the UK Information Commissioner's Office",
                "The UK International Data Transfer Agreement (IDTA) or Addendum",
                "Other appropriate safeguards required under UK GDPR",
              ]}
            />
            <p>
              You may request a copy of the safeguards we use by contacting{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-[#0A1A36] underline underline-offset-4 hover:text-[#FFC72C] transition-colors">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section id="retention" heading="8. Data retention">
            <p>
              We retain personal information only for as long as necessary for
              the purposes set out in this policy or as required by law:
            </p>
            <BulletList
              items={[
                "Client engagement records — for the duration of the engagement and up to 7 years thereafter, in line with HMRC and contractual record-keeping requirements",
                "Training participant records — for 3 years after programme completion, to support certification verification and alumni communications",
                "Marketing contacts — until you withdraw consent or unsubscribe, plus reasonable suppression-list retention",
                "Website analytics data — typically up to 26 months",
                "Enquiry records where no engagement follows — up to 24 months",
              ]}
            />
            <p>
              Once retention periods expire, data is securely deleted or
              anonymised.
            </p>
          </Section>

          <Section id="your-rights" heading="9. Your rights">
            <p>Under UK GDPR you have the following rights:</p>
            <BulletList
              items={[
                "Right of access — to request a copy of the personal data we hold about you",
                "Right to rectification — to have inaccurate or incomplete data corrected",
                "Right to erasure — to request deletion of your personal data in certain circumstances",
                "Right to restrict processing — to limit how we use your data in certain circumstances",
                "Right to data portability — to receive your data in a structured, commonly used format",
                "Right to object — to processing based on legitimate interests, including direct marketing",
                "Right to withdraw consent — at any time where we rely on consent",
                "Right not to be subject to solely automated decision-making — we do not currently make decisions about you using solely automated means",
              ]}
            />
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-[#0A1A36] underline underline-offset-4 hover:text-[#FFC72C] transition-colors">
                {CONTACT_EMAIL}
              </a>
              . We respond to all valid requests within one calendar month.
            </p>
            <p>
              If you are unhappy with how we have handled your data, you have
              the right to lodge a complaint with the UK Information
              Commissioner's Office (ICO) at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0A1A36] underline underline-offset-4 hover:text-[#FFC72C] transition-colors"
              >
                ico.org.uk
              </a>
              . We would, however, appreciate the chance to address your
              concerns first.
            </p>
          </Section>

          <Section id="cookies" heading="10. Cookies">
            <p>
              Our website uses cookies and similar technologies to operate
              correctly, remember your preferences, and (with your consent)
              measure performance. You can manage your preferences at any time
              from our{" "}
              <Link href="/cookie-preferences" className="font-bold text-[#0A1A36] underline underline-offset-4 hover:text-[#FFC72C] transition-colors">
                Cookie Preferences
              </Link>{" "}
              page.
            </p>
          </Section>

          <Section id="security" heading="11. Security">
            <p>
              We have implemented appropriate technical and organisational
              measures to protect personal data against unauthorised access,
              loss, alteration, or disclosure. These include encryption of data
              in transit, access controls on internal systems, vendor due
              diligence, and staff data-protection training.
            </p>
            <p>
              While we work hard to protect your information, no method of
              transmission over the internet is 100% secure. If we become aware
              of a personal data breach affecting your rights or freedoms, we
              will notify the ICO and (where required) you within the
              timeframes set by UK GDPR.
            </p>
          </Section>

          <Section id="children" heading="12. Children's privacy">
            <p>
              Our services are directed at professionals and organisations and
              are not intended for children under 18. We do not knowingly
              collect personal data from children. If you believe a child has
              provided us with personal data, please contact us so we can
              delete it.
            </p>
          </Section>

          <Section id="changes" heading="13. Changes to this policy">
            <p>
              We review this policy regularly and may update it from time to
              time to reflect changes in our practices or in applicable law.
              The "last updated" date at the top of the page indicates when the
              policy was last revised. Material changes will be notified through
              our website or by email where appropriate.
            </p>
          </Section>

          <Section id="contact" heading="14. Contact us">
            <p>For questions, requests, or complaints regarding this policy:</p>
            <ContactBlock />
          </Section>
        </Body>
        <BottomCta />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Shared sub-components (used by all three legal pages)
// ═══════════════════════════════════════════════════════════════════════
const PageHero = ({ eyebrow, title, titleAccent, intro, breadcrumbLabel }) => {
  return (
    <section
      aria-labelledby="legal-hero-heading"
      className="relative bg-[#0A1A36] text-white overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24"
    >
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 15%, rgba(255,199,44,0.18), transparent 50%), radial-gradient(circle at 8% 90%, rgba(255,199,44,0.06), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-8"
        >
          <Link href="/" className="hover:text-[#FFC72C] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">·</span>
          <span className="text-[#FFC72C]">{breadcrumbLabel}</span>
        </nav>

        <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6">
          <span className="inline-block w-12 h-px" style={{ backgroundColor: "#FFC72C" }} />
          {eyebrow}
        </p>

        <h1
          id="legal-hero-heading"
          className="font-extrabold leading-[0.98] tracking-[-0.02em] text-white text-[44px] sm:text-[60px] md:text-[80px] lg:text-[88px]"
        >
          {title}{" "}
          <span className="font-light italic" style={{ color: "#FFC72C" }}>
            {titleAccent}
          </span>
          .
        </h1>

        <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
          {intro}
        </p>

        <div className="mt-10 flex items-center gap-6 text-[11px] font-bold tracking-[0.22em] uppercase text-white/55">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C]" />
            Last updated: <span className="text-white">{LAST_UPDATED}</span>
          </span>
        </div>
      </div>
    </section>
  );
};

const Body = ({ sections, children }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [progress, setProgress] = useState(0);

  // Scroll-spy + reading progress
  useEffect(() => {
    const onScroll = () => {
      // Reading progress (whole page)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);

      // Active section
      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean);
      const above = offsets.filter((o) => o.top <= 140);
      const current = above.length ? above[above.length - 1].id : sections[0]?.id;
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <section className="relative bg-white py-16 md:py-24">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#0A1A36]/[0.06] z-[40]"
        aria-hidden="true"
      >
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: "#FFC72C",
          }}
        />
      </div>

      <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky TOC */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-3 text-[10.5px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/55 mb-5">
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "#FFC72C" }} />
                On this page
              </p>
              <nav aria-label="Table of contents">
                <ul className="space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
                  {sections.map((s) => {
                    const isActive = activeId === s.id;
                    return (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className={[
                            "group block py-2 pl-4 pr-2 text-[12.5px] leading-[1.4] border-l-2 transition-all duration-200",
                            isActive
                              ? "border-[#FFC72C] text-[#0A1A36] font-bold bg-[#FFC72C]/[0.06]"
                              : "border-[#0A1A36]/10 text-[#0A1A36]/65 hover:text-[#0A1A36] hover:border-[#0A1A36]/40",
                          ].join(" ")}
                        >
                          {s.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Body */}
          <article className="lg:col-span-8 xl:col-span-9 max-w-3xl">
            <div className="prose-legal">{children}</div>
          </article>
        </div>
      </div>

      <style jsx global>{`
        .prose-legal {
          color: #0a1a36;
        }
        .prose-legal h2 {
          font-weight: 800;
          font-size: 1.75rem;
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: #0a1a36;
          margin-top: 3rem;
          margin-bottom: 1rem;
          scroll-margin-top: 7rem;
        }
        @media (min-width: 768px) {
          .prose-legal h2 {
            font-size: 2.125rem;
          }
        }
        .prose-legal section:first-child h2 {
          margin-top: 0;
        }
        .prose-legal h3 {
          font-weight: 700;
          font-size: 1.05rem;
          color: #0a1a36;
          margin-top: 1.75rem;
          margin-bottom: 0.6rem;
          letter-spacing: -0.005em;
        }
        .prose-legal p {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(10, 26, 54, 0.8);
          margin-bottom: 1.1rem;
        }
        @media (min-width: 768px) {
          .prose-legal p {
            font-size: 15.5px;
          }
        }
        .prose-legal ul {
          margin: 0 0 1.4rem 0;
          padding: 0;
          list-style: none;
        }
        .prose-legal ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.6rem;
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(10, 26, 54, 0.8);
        }
        .prose-legal ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.7rem;
          width: 0.5rem;
          height: 1px;
          background-color: #ffc72c;
        }
        .prose-legal a {
          transition: color 0.2s;
        }
      `}</style>
    </section>
  );
};

const Section = ({ id, heading, children }) => (
  <section id={id} className="scroll-mt-28">
    <h2>{heading}</h2>
    {children}
  </section>
);

const Subheading = ({ children }) => <h3>{children}</h3>;

const BulletList = ({ items }) => (
  <ul>
    {items.map((it) => (
      <li key={it}>{it}</li>
    ))}
  </ul>
);

const ContactBlock = () => (
  <div className="not-prose mt-6 mb-4 p-6 md:p-7 bg-[#FBF8F1] border border-[#0A1A36]/10 rounded-sm">
    <ul className="space-y-3">
      <li className="flex items-start gap-3">
        <FiMail className="shrink-0 mt-1 w-4 h-4 text-[#FFC72C]" />
        <div>
          <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#0A1A36]/55 mb-1">
            Email
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[14px] font-bold text-[#0A1A36] hover:text-[#FFC72C] transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <FiPhone className="shrink-0 mt-1 w-4 h-4 text-[#FFC72C]" />
        <div>
          <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#0A1A36]/55 mb-1">
            Phone
          </div>
          <a
            href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`}
            className="text-[14px] font-bold text-[#0A1A36] hover:text-[#FFC72C] transition-colors"
          >
            {CONTACT_PHONE}
          </a>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <FiMapPin className="shrink-0 mt-1 w-4 h-4 text-[#FFC72C]" />
        <div>
          <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#0A1A36]/55 mb-1">
            Post
          </div>
          <span className="text-[14px] font-bold text-[#0A1A36]">
            {CONTACT_ADDRESS}
          </span>
        </div>
      </li>
    </ul>
  </div>
);

const BottomCta = () => (
  <section className="relative bg-[#06122A] text-white overflow-hidden">
    <div
      className="absolute inset-0 opacity-50 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 90% 50%, rgba(255,199,44,0.18), transparent 55%)",
      }}
      aria-hidden="true"
    />
    <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-4">
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            Have questions?
          </p>
          <h2 className="font-extrabold leading-[1.02] tracking-[-0.02em] text-white text-[28px] md:text-[40px] lg:text-[44px]">
            Our team is{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              here to help
            </span>
            .
          </h2>
        </div>
        <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(255,199,44,0.55)] transition-all duration-300"
          >
            Contact Us
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/cookie-preferences"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-white/55 text-white text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300"
          >
            Cookie Preferences
            <FiArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={[
        "fixed bottom-6 right-6 z-[50] inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A1A36] hover:bg-[#06122A] text-[#FFC72C] shadow-[0_10px_30px_-8px_rgba(10,26,54,0.55)] transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <FiArrowUp className="w-5 h-5" strokeWidth={2.5} />
    </button>
  );
};

export default PrivacyPolicyPage;