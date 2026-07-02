"use client";

import React, { useEffect, useState } from "react";
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
 * Terms of Use, GCSA Consulting UK LTD
 *
 * General website terms-of-use template, governed by English law.
 *
 * IMPORTANT: This is a strong template, but every business should have
 * its terms reviewed by a qualified solicitor before publication.
 * Specific items to verify with counsel:
 *  - Liability cap matches your professional indemnity insurance
 *  - Acceptable use covers your specific risk surface
 *  - Engagement-letter precedence clause matches your contract template
 */

const LAST_UPDATED = "1 May 2026";
const COMPANY_NAME = "Prime Homes";
const CONTACT_EMAIL = "info@primehomes.ng";
const CONTACT_PHONE = "+234 803 000 0100";
const CONTACT_ADDRESS = "Plot 123, Adetokunbo Ademola Crescent, Wuse 2, Abuja, Nigeria";

const SECTIONS = [
  { id: "introduction", label: "1. Introduction" },
  { id: "acceptance", label: "2. Acceptance of terms" },
  { id: "about-us", label: "3. About us" },
  { id: "use-of-site", label: "4. Use of our website" },
  { id: "acceptable-use", label: "5. Acceptable use" },
  { id: "accounts-registrations", label: "6. Accounts & registrations" },
  { id: "ip", label: "7. Intellectual property" },
  { id: "user-content", label: "8. User-submitted content" },
  { id: "third-party", label: "9. Third-party links & services" },
  { id: "training", label: "10. Training programmes & payments" },
  { id: "consulting", label: "11. Consulting engagements" },
  { id: "disclaimers", label: "12. Disclaimers" },
  { id: "liability", label: "13. Limitation of liability" },
  { id: "indemnity", label: "14. Indemnity" },
  { id: "termination", label: "15. Termination" },
  { id: "changes", label: "16. Changes to these terms" },
  { id: "law", label: "17. Governing law & jurisdiction" },
  { id: "contact", label: "18. Contact us" },
];

const TERMS_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.gcsaconsulting.co.uk/terms-of-use/#webpage",
  url: "https://www.gcsaconsulting.co.uk/terms-of-use",
  name: "Terms of Use | GCSA Consulting",
  description:
    "Terms governing your use of GCSA Consulting's website, training programmes, and online services.",
  isPartOf: { "@id": "https://www.gcsaconsulting.co.uk/#website" },
  inLanguage: "en-GB",
};

const TermsPage = () => {
  return (
    <>
      <Script
        id="ld-json-terms"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TERMS_LD) }}
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
          title="Terms of"
          titleAccent="Use"
          intro="The terms governing your use of the GCSA Consulting website, training programmes, and online services."
          breadcrumbLabel="Terms of Use"
        />

        <Body sections={SECTIONS}>
          <Section id="introduction" heading="1. Introduction">
            <p>
              Welcome to {COMPANY_NAME} ("we", "us", "our"). These Terms of Use
              (the "Terms") govern your access to and use of our website
              (gcsaconsulting.co.uk and any related subdomains) and the
              services we make available through it, including but not limited
              to enquiry forms, newsletter subscriptions, training programme
              registrations, and online payments (collectively, the "Site").
            </p>
            <p>
              These Terms should be read alongside our{" "}
              <Link href="/privacy-policy" className="font-bold text-[#141210] underline underline-offset-4 hover:text-[#E6A032] transition-colors">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/cookie-preferences" className="font-bold text-[#141210] underline underline-offset-4 hover:text-[#E6A032] transition-colors">
                Cookie Preferences
              </Link>{" "}
              page, which together form our agreement with you in relation to
              your use of the Site.
            </p>
          </Section>

          <Section id="acceptance" heading="2. Acceptance of terms">
            <p>
              By accessing or using the Site, you agree to be bound by these
              Terms. If you do not agree, you must not use the Site.
            </p>
            <p>
              We may amend these Terms from time to time. The version in force
              is the one published on this page on the date you access the
              Site. By continuing to use the Site after any changes, you accept
              the revised Terms.
            </p>
          </Section>

          <Section id="about-us" heading="3. About us">
            <p>
              {COMPANY_NAME} is a management consulting firm registered in
              England and Wales, with our registered office at{" "}
              {CONTACT_ADDRESS}. You can contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-[#141210] underline underline-offset-4 hover:text-[#E6A032] transition-colors">
                {CONTACT_EMAIL}
              </a>{" "}
              or {CONTACT_PHONE}.
            </p>
          </Section>

          <Section id="use-of-site" heading="4. Use of our website">
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable
              licence to access and use the Site for lawful, personal, and
              business purposes consistent with these Terms.
            </p>
            <p>
              We may modify, suspend, or discontinue any part of the Site at any
              time without notice. We do not guarantee that the Site will
              always be available, uninterrupted, or error-free.
            </p>
          </Section>

          <Section id="acceptable-use" heading="5. Acceptable use">
            <p>You agree that you will not:</p>
            <BulletList
              items={[
                "Use the Site in any way that breaches applicable law or regulation",
                "Use the Site to send unsolicited commercial communications or spam",
                "Attempt to gain unauthorised access to the Site, the server on which it is hosted, or any connected database or system",
                "Introduce viruses, trojans, worms, logic bombs, or other malicious code",
                "Conduct denial-of-service attacks or disrupt the operation of the Site",
                "Scrape, harvest, or mine data from the Site without our prior written consent",
                "Reverse-engineer, decompile, or disassemble any part of the Site",
                "Impersonate any person or misrepresent your affiliation with GCSA or any third party",
                "Use the Site in any way that infringes the intellectual property rights or privacy of others",
              ]}
            />
            <p>
              We reserve the right to suspend or terminate your access if we
              reasonably believe you have breached this section.
            </p>
          </Section>

          <Section id="accounts-registrations" heading="6. Accounts & registrations">
            <p>
              Where the Site allows you to register for a training programme,
              subscribe to a newsletter, or submit an enquiry, you agree to
              provide accurate, current, and complete information, and to update
              that information promptly if it changes.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of any
              login credentials issued to you, and for all activity that occurs
              under your account. You must notify us immediately at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-[#141210] underline underline-offset-4 hover:text-[#E6A032] transition-colors">
                {CONTACT_EMAIL}
              </a>{" "}
              of any unauthorised access or security incident.
            </p>
          </Section>

          <Section id="ip" heading="7. Intellectual property">
            <p>
              All content on the Site, including text, graphics, logos, icons,
              photographs, frameworks, methodologies, training materials, and
              software, is owned by or licensed to {COMPANY_NAME} and is
              protected by UK and international intellectual property laws.
            </p>
            <p>
              The "GCSA Consulting" name, logo, and brand identity are trade
              marks of {COMPANY_NAME}. You may not use them without our prior
              written consent.
            </p>
            <p>
              Subject to your compliance with these Terms, we grant you a
              limited, non-exclusive, non-transferable licence to view,
              download, and print Site content for your personal, non-commercial
              use, provided you do not alter or remove any copyright or
              proprietary notices. All other use is prohibited without our
              prior written permission.
            </p>
          </Section>

          <Section id="user-content" heading="8. User-submitted content">
            <p>
              When you submit content to the Site (such as enquiry messages,
              registration responses, or testimonials), you:
            </p>
            <BulletList
              items={[
                "Confirm that you own or have the right to share the content",
                "Confirm that the content does not infringe any third-party rights or any law",
                "Grant us a worldwide, royalty-free licence to use the content for the purposes of operating, promoting, and improving our services, in accordance with our Privacy Policy",
              ]}
            />
            <p>
              We may remove or refuse to display any user-submitted content at
              our sole discretion.
            </p>
          </Section>

          <Section id="third-party" heading="9. Third-party links & services">
            <p>
              The Site may contain links to third-party websites and embedded
              services (for example, mapping services, social media platforms,
              and payment processors such as Stripe). We do not control these
              third parties and are not responsible for their content,
              practices, or terms.
            </p>
            <p>
              Your use of any third-party service is subject to that party's
              terms and privacy policy. You should review them before engaging.
            </p>
          </Section>

          <Section id="training" heading="10. Training programmes & payments">
            <p>
              When you register and pay for a training programme:
            </p>
            <BulletList
              items={[
                "Payments are processed by Stripe Payments Europe Ltd. By submitting payment, you also agree to Stripe's terms of service",
                "Programme places are confirmed only once payment has been successfully processed",
                "Programme content, schedule, and instructors are subject to reasonable change. Material changes will be communicated in advance",
                "Refunds are governed by the refund policy displayed on the relevant programme page (typically full refund within 7 days of payment, provided the cohort has not yet started)",
                "Certificates of Completion are issued on satisfactory programme participation, at our reasonable discretion",
                "All training materials, slides, frameworks, and templates supplied during a programme remain our intellectual property and are licensed to participants for personal, non-commercial use only",
              ]}
            />
          </Section>

          <Section id="consulting" heading="11. Consulting engagements">
            <p>
              The Site provides general information about our consulting
              services. It does not constitute an offer to enter into a
              consulting engagement or professional advice. Any consulting
              engagement is governed by a separate written engagement letter
              between {COMPANY_NAME} and the client.
            </p>
            <p>
              In the event of any conflict between these Terms and an executed
              engagement letter, the engagement letter shall prevail in respect
              of the consulting services it covers.
            </p>
          </Section>

          <Section id="disclaimers" heading="12. Disclaimers">
            <p>
              The Site and its content are provided "as is" and "as available"
              without warranties of any kind, whether express or implied. To the
              fullest extent permitted by law, we disclaim all warranties,
              including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p>
              Information on the Site is for general guidance only and does not
              constitute legal, financial, tax, technical, or other professional
              advice. You should obtain independent advice before acting on any
              information on the Site.
            </p>
          </Section>

          <Section id="liability" heading="13. Limitation of liability">
            <p>
              Nothing in these Terms limits or excludes our liability for:
            </p>
            <BulletList
              items={[
                "Death or personal injury caused by our negligence",
                "Fraud or fraudulent misrepresentation",
                "Any other liability that cannot be limited or excluded under English law",
              ]}
            />
            <p>
              Subject to the above, and to the fullest extent permitted by law:
            </p>
            <BulletList
              items={[
                "We will not be liable for any indirect, special, consequential, or punitive damages, or for loss of profits, revenue, business, goodwill, or anticipated savings, however arising",
                "Our total aggregate liability arising out of or in connection with your use of the Site is limited to the greater of (a) the total fees paid by you to us in the 12 months preceding the event giving rise to the claim, or (b) £100",
              ]}
            />
            <p>
              Liability arising from a separate consulting engagement is
              governed by the relevant engagement letter and is not affected by
              this section.
            </p>
          </Section>

          <Section id="indemnity" heading="14. Indemnity">
            <p>
              You agree to indemnify and hold harmless {COMPANY_NAME}, its
              directors, employees, and contractors from and against any claims,
              losses, liabilities, damages, costs, and expenses (including
              reasonable legal fees) arising out of or in connection with:
            </p>
            <BulletList
              items={[
                "Your breach of these Terms",
                "Your misuse of the Site",
                "Your violation of any law or third-party right",
              ]}
            />
          </Section>

          <Section id="termination" heading="15. Termination">
            <p>
              We may suspend or terminate your access to the Site at any time
              and for any reason, including for breach of these Terms. On
              termination, the rights and licences granted to you under these
              Terms will end, but the provisions that by their nature should
              survive termination (including those on intellectual property,
              disclaimers, liability, indemnity, and governing law) will remain
              in force.
            </p>
          </Section>

          <Section id="changes" heading="16. Changes to these terms">
            <p>
              We may update these Terms from time to time. The "last updated"
              date at the top of the page indicates when they were last
              revised. Material changes will be brought to your attention via
              the Site or by email where appropriate. Your continued use of the
              Site constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section id="law" heading="17. Governing law & jurisdiction">
            <p>
              These Terms and any dispute or claim arising out of or in
              connection with them or their subject matter (including
              non-contractual disputes or claims) are governed by and construed
              in accordance with the laws of England and Wales.
            </p>
            <p>
              The courts of England and Wales have exclusive jurisdiction to
              settle any dispute or claim arising out of or in connection with
              these Terms or their subject matter, save that we retain the
              right to bring proceedings against you in the courts of any
              jurisdiction in which you reside or have assets.
            </p>
          </Section>

          <Section id="contact" heading="18. Contact us">
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
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
// Shared sub-components (same as privacy page)
// ═══════════════════════════════════════════════════════════════════════
const PageHero = ({ eyebrow, title, titleAccent, intro, breadcrumbLabel }) => {
  return (
    <section
      aria-labelledby="legal-hero-heading"
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
          <span className="text-[#E6A032]">{breadcrumbLabel}</span>
        </nav>
        <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
          {eyebrow}
        </p>
        <h1
          id="legal-hero-heading"
          className="font-display font-light leading-[0.98] tracking-[-0.02em] text-white text-[44px] sm:text-[60px] md:text-[80px] lg:text-[88px]"
        >
          {title}{" "}
          <span className="font-light italic" style={{ color: "#E6A032" }}>
            {titleAccent}
          </span>
          .
        </h1>
        <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
          {intro}
        </p>
        <div className="mt-10 flex items-center gap-6 text-[11px] font-bold tracking-[0.22em] uppercase text-white/55">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6A032]" />
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

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);

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
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#141210]/[0.06] z-[40]" aria-hidden="true">
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{ width: `${progress * 100}%`, backgroundColor: "#E6A032" }}
        />
      </div>

      <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#141210]/55 mb-5">
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
                              ? "border-[#E6A032] text-white font-bold bg-[#E6A032]/[0.06]"
                              : "border-[#141210]/10 text-[#141210]/65 hover:text-[#141210] hover:border-[#141210]/40",
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
          <article className="lg:col-span-8 xl:col-span-9 max-w-3xl">
            <div className="prose-legal">{children}</div>
          </article>
        </div>
      </div>

      <style jsx global>{`
        .prose-legal { color: #141210; }
        .prose-legal h2 {
          font-weight: 800; font-size: 1.75rem; line-height: 1.15;
          letter-spacing: -0.015em; color: #141210;
          margin-top: 3rem; margin-bottom: 1rem; scroll-margin-top: 7rem;
        }
        @media (min-width: 768px) { .prose-legal h2 { font-size: 2.125rem; } }
        .prose-legal section:first-child h2 { margin-top: 0; }
        .prose-legal h3 {
          font-weight: 700; font-size: 1.05rem; color: #141210;
          margin-top: 1.75rem; margin-bottom: 0.6rem; letter-spacing: -0.005em;
        }
        .prose-legal p {
          font-size: 15px; line-height: 1.8;
          color: rgba(10, 26, 54, 0.8); margin-bottom: 1.1rem;
        }
        @media (min-width: 768px) { .prose-legal p { font-size: 15.5px; } }
        .prose-legal ul {
          margin: 0 0 1.4rem 0; padding: 0; list-style: none;
        }
        .prose-legal ul li {
          position: relative; padding-left: 1.5rem; margin-bottom: 0.6rem;
          font-size: 14.5px; line-height: 1.7; color: rgba(10, 26, 54, 0.8);
        }
        .prose-legal ul li::before {
          content: ""; position: absolute; left: 0; top: 0.7rem;
          width: 0.5rem; height: 1px; background-color: #E6A032;
        }
        .prose-legal a { transition: color 0.2s; }
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

const BulletList = ({ items }) => (
  <ul>
    {items.map((it) => <li key={it}>{it}</li>)}
  </ul>
);

const ContactBlock = () => (
  <div className="not-prose mt-6 mb-4 p-6 md:p-7 bg-[#FBF8F1] border border-[#141210]/10 rounded-sm">
    <ul className="space-y-3">
      <li className="flex items-start gap-3">
        <FiMail className="shrink-0 mt-1 w-4 h-4 text-[#E6A032]" />
        <div>
          <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#141210]/55 mb-1">Email</div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[14px] font-bold text-[#141210] hover:text-[#E6A032] transition-colors">
            {CONTACT_EMAIL}
          </a>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <FiPhone className="shrink-0 mt-1 w-4 h-4 text-[#E6A032]" />
        <div>
          <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#141210]/55 mb-1">Phone</div>
          <a href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`} className="text-[14px] font-bold text-[#141210] hover:text-[#E6A032] transition-colors">
            {CONTACT_PHONE}
          </a>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <FiMapPin className="shrink-0 mt-1 w-4 h-4 text-[#E6A032]" />
        <div>
          <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#141210]/55 mb-1">Post</div>
          <span className="text-[14px] font-bold text-[#141210]">{CONTACT_ADDRESS}</span>
        </div>
      </li>
    </ul>
  </div>
);

const BottomCta = () => (
  <section className="relative bg-[#0A0806] text-white overflow-hidden">
    <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-4">
            Have questions?
          </p>
          <h2 className="font-display font-light leading-[1.02] tracking-[-0.02em] text-white text-[28px] md:text-[40px] lg:text-[44px]">
            Our team is{" "}
            <span className="font-light italic" style={{ color: "#E6A032" }}>here to help</span>.
          </h2>
        </div>
        <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
          <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(230,160,50,0.55)] transition-all duration-300">
            Contact Us
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/privacy-policy" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-white/55 text-white text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300">
            Privacy Policy
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
        "fixed bottom-6 right-6 z-[50] inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#141210] hover:bg-[#0A0806] text-[#E6A032] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <FiArrowUp className="w-5 h-5" strokeWidth={2.5} />
    </button>
  );
};

export default TermsPage;