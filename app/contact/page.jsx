"use client";

import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import toast from "react-hot-toast";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Contact, GCSA Consulting UK LTD
 *
 * Full contact page:
 *  1. Page hero
 *  2. Two-column form + contact methods
 *  3. London HQ address strip with map placeholder
 *  4. FAQs
 *
 * Brand: navy + gold + Montserrat
 * The form posts to /api/contact (TODO: implement endpoint).
 */

const SUBJECTS = [
  "General Enquiry",
  "Property Sourcing & Acquisition",
  "Investment Advisory",
  "Development & Project Supervision",
  "Legal Verification & Documentation",
  "Property Management & Consultancy",
  "Careers",
];

const FAQS = [
  {
    q: "How do I book a viewing?",
    a: "Open any listing and tap “Schedule a Viewing,” or send us a message with the property in mind. Your dedicated agent will confirm a time that works for you, in person or virtually.",
  },
  {
    q: "How much does it cost to list my property?",
    a: "We offer a free, no-obligation valuation and transparent fee options. Once we understand your property and goals, we'll recommend the right marketing package, with no hidden costs.",
  },
  {
    q: "Do you handle rentals and property management?",
    a: "Yes. We help tenants find quality rentals and support landlords with tenant screening, rent collection, maintenance, and full compliance through our managed service.",
  },
  {
    q: "Which areas do you cover?",
    a: "Our agents operate across Abuja and the wider FCT, Maitama, Asokoro, Wuse, Gwarinpa, Jabi, Guzape, Lokogoma, Lugbe and more, covering houses, apartments, and commercial property. Tell us your area and we'll connect you with a local specialist.",
  },
  {
    q: "How quickly will you respond to my enquiry?",
    a: "Within one business day. For time-sensitive viewings or offers, call us and we'll prioritise your request.",
  },
];

const CONTACT_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.primehomes.ng/contact/#webpage",
  url: "https://www.primehomes.ng/contact",
  name: "Contact Prime Homes",
  description:
    "Get in touch with Prime Homes. Call, email, or schedule a viewing with a local agent. Buy, sell, rent, and manage property.",
  isPartOf: { "@id": "https://www.primehomes.ng/#website" },
  about: { "@id": "https://www.primehomes.ng/#organization" },
  inLanguage: "en-GB",
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
const ContactPage = () => {
  return (
    <>
      <Script
        id="ld-json-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_LD) }}
      />

      <Navbar />

      <main
        id="main-content"
        role="main"
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <PageHero />
        <FormAndDetails />
        <HQAddress />
        <FAQ />
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
      aria-labelledby="contact-hero-heading"
      className="relative bg-[#141210] text-white overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
    >

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-8"
        >
          <Link href="/" className="hover:text-[#E6A032] transition-colors">Home</Link>
          <span aria-hidden="true">·</span>
          <span className="text-[#E6A032]">Contact</span>
        </nav>

        <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
          Get in touch
        </p>

        <h1
          id="contact-hero-heading"
          className="font-display font-light leading-[0.98] tracking-[-0.02em] text-white text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] max-w-5xl"
        >
          Let's start the{" "}
          <span className="font-light italic" style={{ color: "#E6A032" }}>
            conversation
          </span>
          .
        </h1>

        <p className="mt-8 md:mt-10 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
          Whether you&apos;re buying your first home, selling a property, renting,
          or looking for management, tell us what you need, and a local agent
          will be in touch.
        </p>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 2. Form + contact methods
// ═══════════════════════════════════════════════════════════════════════
const FormAndDetails = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "General Enquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.email ||
      !formState.message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formState.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: wire to real /api/contact endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error("Submission failed");
      toast.success("Message sent. We'll be in touch within 1 business day.");
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "General Enquiry",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="form-heading"
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT, contact methods */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
              Reach us directly
            </p>

            <h2
              id="form-heading"
              className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[32px] md:text-[40px] mb-8"
            >
              Three ways to{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                connect
              </span>
              .
            </h2>

            <div className="space-y-5">
              <ContactMethod
                Icon={FiMail}
                label="Email"
                value="info@primehomes.ng"
                href="mailto:info@primehomes.ng"
              />
              <ContactMethod
                Icon={FiPhone}
                label="Call"
                value="+234 803 000 0100"
                href="tel:+2348030000100"
              />
              <ContactMethod
                Icon={FiMapPin}
                label="Visit"
                value="Plot 123, Adetokunbo Ademola Cres, Wuse 2, Abuja"
                href="#hq"
              />
              <ContactMethod
                Icon={FiClock}
                label="Hours"
                value="Mon to Sat · 9:00 to 18:00"
              />
            </div>

            <div className="mt-10 pt-8 border-t border-[#141210]/10">
              <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#141210]/60 mb-4">
                Follow us
              </p>
              <ul className="flex items-center gap-2.5">
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#141210]/20 text-white hover:bg-[#E6A032] hover:border-[#E6A032] transition-all"
                  >
                    <FaLinkedinIn className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#141210]/20 text-white hover:bg-[#E6A032] hover:border-[#E6A032] transition-all"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* RIGHT, form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={onSubmit}
              noValidate
              className="bg-[#FBF8F1] border border-[#141210]/10 rounded-sm p-6 md:p-10 lg:p-12"
            >
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-3">
                Send a message
              </p>
              <h3 className="font-display font-light tracking-[-0.01em] text-[#141210] text-[24px] md:text-[28px] mb-8">
                We'll respond within one UK business day.
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <Field
                  label="First Name"
                  name="firstName"
                  value={formState.firstName}
                  onChange={onChange}
                  required
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  value={formState.lastName}
                  onChange={onChange}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={onChange}
                  required
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={onChange}
                />
                <Field
                  label="Company / Organisation"
                  name="company"
                  value={formState.company}
                  onChange={onChange}
                  full
                />
                <SelectField
                  label="Subject"
                  name="subject"
                  value={formState.subject}
                  onChange={onChange}
                  options={SUBJECTS}
                  full
                />
                <Field
                  label="Tell us about your project or question"
                  name="message"
                  value={formState.message}
                  onChange={onChange}
                  required
                  full
                  textarea
                />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#141210] hover:bg-[#0A0806] text-white text-[11.5px] font-extrabold tracking-[0.18em] uppercase shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {submitting ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="text-[12px] text-[#141210]/60 leading-[1.6] sm:flex-1">
                  By submitting, you agree to our privacy practices. Required
                  fields marked <span className="text-[#E6A032] font-bold">*</span>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text", value, onChange, required, full, textarea }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label
      htmlFor={name}
      className="block text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#141210]/65 mb-2"
    >
      {label} {required && <span className="text-[#E6A032]">*</span>}
    </label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
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
        className="w-full px-4 py-3 bg-white border border-[#141210]/15 rounded-sm text-[14px] text-[#141210] placeholder:text-[#141210]/40 focus:outline-none focus:border-[#E6A032] focus:ring-2 focus:ring-[#E6A032]/20 transition-all"
      />
    )}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label
      htmlFor={name}
      className="block text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#141210]/65 mb-2"
    >
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

const ContactMethod = ({ Icon, label, value, href }) => {
  const Inner = (
    <>
      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#E6A032]/15 border border-[#E6A032]/30 group-hover:bg-[#E6A032] group-hover:border-[#E6A032] transition-colors duration-300 shrink-0">
        <Icon className="w-4 h-4 text-[#141210]" />
      </span>
      <span className="flex flex-col">
        <span className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#141210]/55 group-hover:text-[#141210]/80 transition-colors">
          {label}
        </span>
        <span className="text-[14.5px] md:text-[15px] font-bold text-[#141210] group-hover:text-[#E6A032] transition-colors">
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="group flex items-center gap-4 py-2 focus:outline-none">
        {Inner}
      </a>
    );
  }
  return <div className="group flex items-center gap-4 py-2">{Inner}</div>;
};

// ═══════════════════════════════════════════════════════════════════════
// 3. HQ address
// ═══════════════════════════════════════════════════════════════════════
const HQAddress = () => {
  return (
    <section
      id="hq"
      aria-labelledby="hq-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Map placeholder */}
          <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto bg-[#141210] rounded-sm overflow-hidden">
            {/* Replace this with a Google Maps / Mapbox embed when available */}
            <iframe
              title="Prime Homes Head Office"
              src="https://www.google.com/maps?q=Adetokunbo+Ademola+Crescent,+Wuse+2,+Abuja&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div
              className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(135deg, #E6A032 0%, #E6A032 50%, transparent 50%)",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Address card */}
          <div className="lg:col-span-5 bg-[#141210] text-white p-8 md:p-10 lg:p-12 rounded-sm relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: "#E6A032" }}
              aria-hidden="true"
            />

            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
              Head Office
            </p>

            <h2
              id="hq-heading"
              className="font-display font-light leading-[1.05] tracking-[-0.01em] text-[28px] md:text-[34px] lg:text-[38px] mb-8"
            >
              Visit us in{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                Wuse 2
              </span>
              .
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <FiMapPin className="shrink-0 mt-1 w-4 h-4 text-[#E6A032]" />
                <div>
                  <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-white/50 mb-1">
                    Address
                  </div>
                  <div className="text-[14.5px] text-white">
                    Plot 123, Adetokunbo Ademola Crescent,<br />
                    Wuse 2, Abuja<br />
                    Federal Capital Territory, Nigeria
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiClock className="shrink-0 mt-1 w-4 h-4 text-[#E6A032]" />
                <div>
                  <div className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-white/50 mb-1">
                    Hours
                  </div>
                  <div className="text-[14.5px] text-white">
                    Monday to Saturday<br />
                    09:00 to 18:00
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-[14px] text-white/70 leading-[1.7] mb-6">
                Prefer to talk in person? Pop into our office or book ahead and
                we&apos;ll have the right agent ready to meet you.
              </p>
              <Link
                href="mailto:info@primehomes.ng?subject=Office%20Visit"
                className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#E6A032] hover:text-white transition-colors"
              >
                <span className="relative">
                  Plan your visit
                  <span
                    className="absolute left-0 right-0 -bottom-0.5 h-px scale-x-100 origin-left"
                    style={{ backgroundColor: "#E6A032" }}
                    aria-hidden="true"
                  />
                </span>
                <FiArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 4. FAQ
// ═══════════════════════════════════════════════════════════════════════
const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6">
              FAQs
            </p>
            <h2
              id="faq-heading"
              className="font-display font-light leading-[1.02] tracking-[-0.02em] text-[#141210] text-[32px] md:text-[42px] lg:text-[48px]"
            >
              Common{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                questions
              </span>
              .
            </h2>
            <p className="mt-6 text-[15px] leading-[1.75] text-[#141210]/70 max-w-md">
              Don't see what you're looking for?{" "}
              <a
                href="mailto:info@primehomes.ng"
                className="font-bold text-[#141210] hover:text-[#E6A032] underline underline-offset-4 transition-colors"
              >
                Email us
              </a>{" "}
              and we'll respond within one business day.
            </p>
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
                    <span className="text-[16px] md:text-[18px] font-display font-light tracking-[-0.01em] text-[#141210] group-hover:text-[#E6A032] transition-colors">
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
                      <p className="pb-7 pr-12 text-[14.5px] md:text-[15px] leading-[1.75] text-[#141210]/75 max-w-2xl">
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

export default ContactPage;