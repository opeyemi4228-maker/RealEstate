"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FaLinkedinIn,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";
import { FiArrowUpRight, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

/**
 * Footer, Prime Homes
 *
 * Content (extracted):
 * - Brand: Prime Homes · Property Marketplace
 * - Address: 71-75 Shelton Street, Covent Garden, London WC2H 9JQ
 * - Email: info@primehomes.ng
 * - Tel: 123-456-7890 (placeholder)
 * - Newsletter: "Stay Connected. Listings & Insights"
 * - Socials: Twitter, LinkedIn, Email
 * - Footer nav: About · Services · Contact
 *
 * Brand: navy + gold + Montserrat
 */

const PRIMARY_LINKS = [
  { label: "All Properties", href: "/all-products" },
  { label: "Our Agents", href: "/agents" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SERVICES_LINKS = [
  { label: "Sourcing & Acquisition", href: "/services#sourcing" },
  { label: "Investment Advisory", href: "/services#investment" },
  { label: "Development & Supervision", href: "/services#development" },
  { label: "Legal & Documentation", href: "/services#legal" },
  { label: "Management & Consultancy", href: "/services#management" },
];

const TRAINING_LINKS = [
  { label: "For Sale", href: "/all-products?status=For Sale" },
  { label: "For Rent", href: "/all-products?status=For Rent" },
  { label: "Meet Our Agents", href: "/agents" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Preferences", href: "/cookie-preferences" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: FaLinkedinIn },
  { label: "X (Twitter)", href: "https://x.com/", Icon: FaXTwitter },
  { label: "Email", href: "mailto:info@primehomes.ng", Icon: FaEnvelope },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubscribing(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Subscription failed");
      setSubmitted(true);
      setEmail("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer
      className="relative bg-[#0A0806] text-white overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Prime Homes, site footer
      </h2>

      {/* Fine top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" aria-hidden="true" />

      {/* Fine grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(120% 120% at 0% 0%, #000 30%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 120% at 0% 0%, #000 30%, transparent 72%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* ── Zone 1: Brand + Newsletter ─────────────────────────── */}
        <div className="pt-20 md:pt-24 lg:pt-28 pb-14 md:pb-20 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand block */}
            <div className="lg:col-span-7">
              <Link
                href="/"
                className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40 rounded-sm mb-10 md:mb-14"
                aria-label="Prime Homes, home"
              >
                <Image
                  src="/prime-homes-logo.png"
                  alt="Prime Homes"
                  width={956}
                  height={481}
                  className="h-[62px] w-auto transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>

              <p className="text-[10.5px] font-semibold tracking-[0.28em] uppercase text-[#C88C28] mb-6">
                Local expertise, every step
              </p>

              <p className="font-display font-light leading-[1.12] text-white text-[30px] md:text-[40px] lg:text-[46px] max-w-2xl">
                Do it right, deliver value, and
                <span className="italic font-normal" style={{ color: "#EBB45A" }}>
                  {" "}build trust
                </span>.
              </p>

              <p className="mt-6 md:mt-8 text-[14px] md:text-[15px] leading-[1.75] text-white/65 max-w-lg">
                A premium real estate company redefining property acquisition,
                investment, and development in Nigeria, backed by transparency,
                due diligence, and end-to-end value delivery.
              </p>
            </div>

            {/* Newsletter card */}
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/10">
              <p className="text-[10.5px] font-semibold tracking-[0.28em] uppercase text-[#C88C28] mb-6">
                Stay Connected
              </p>

              <p className="text-[15px] md:text-[16px] leading-[1.7] text-white/75 mb-8 max-w-md">
                Be first to see new listings. Subscribe for fresh properties,
                price drops, and local market insights, straight to your inbox.
              </p>

              <form onSubmit={onSubscribe} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    aria-label="First name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/15 rounded-sm text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#E6A032] focus:bg-white/[0.10] transition-colors"
                  />
                  <input
                    type="text"
                    aria-label="Last name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/15 rounded-sm text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#E6A032] focus:bg-white/[0.10] transition-colors"
                  />
                </div>
                <input
                  type="email"
                  required
                  aria-label="Email address"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.06] border border-white/15 rounded-sm text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#E6A032] focus:bg-white/[0.10] transition-colors"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[11.5px] font-extrabold tracking-[0.18em] uppercase shadow-[0_8px_24px_-8px_rgba(230,160,50,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(230,160,50,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0806] focus-visible:ring-[#E6A032] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {subscribing ? "Subscribing…" : "Subscribe"}
                  <FiArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
                {submitted && (
                  <p className="text-[12px] text-[#E6A032] mt-2" role="status">
                    Thanks for subscribing!
                  </p>
                )}
              </form>

              {/* Contact anchors */}
              <div className="mt-10 space-y-1.5">
                <FooterMetaLine
                  Icon={FiMapPin}
                  label="Address"
                  value="Plot 123, Adetokunbo Ademola Crescent, Wuse 2, Abuja, Nigeria"
                />
                <FooterContactLink
                  Icon={FiMail}
                  label="Email"
                  value="info@primehomes.ng"
                  href="/contact"
                />
                <FooterContactLink
                  Icon={FiPhone}
                  label="Tel"
                  value="123-456-7890"
                  href="/contact"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Zone 2: Navigation ────────────────────────────────── */}
        <div className="py-14 md:py-16 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Explore */}
            <nav aria-label="Footer primary" className="md:col-span-3">
              <h3 className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#C88C28] mb-6 pb-3 border-b border-white/10">
                Explore
              </h3>
              <ul className="space-y-3.5">
                {PRIMARY_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <nav aria-label="Footer services" className="md:col-span-4">
              <h3 className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#C88C28] mb-6 pb-3 border-b border-white/10">
                Services
              </h3>
              <ul className="space-y-3.5">
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick links */}
            <nav aria-label="Footer quick links" className="md:col-span-3">
              <h3 className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#C88C28] mb-6 pb-3 border-b border-white/10">
                Browse
              </h3>
              <ul className="space-y-3.5">
                {TRAINING_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink {...link} />
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6A032]/[0.12] border border-[#E6A032]/30 text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#E6A032] hover:bg-[#E6A032] hover:text-white transition-colors"
              >
                List Your Property
                <FiArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </nav>

            {/* Social */}
            <div className="md:col-span-2">
              <h3 className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#C88C28] mb-6 pb-3 border-b border-white/10">
                Follow
              </h3>
              <ul className="flex items-center flex-wrap gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/80 hover:bg-[#E6A032] hover:border-[#E6A032] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/60 transition-all duration-300"
                    >
                      <Icon className="w-[13px] h-[13px]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[11.5px] leading-[1.6] text-white/50">
                New listings & market updates, delivered weekly.
              </p>
            </div>
          </div>
        </div>

        {/* ── Zone 3: Legal + copyright ─────────────────────────── */}
        <div className="py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <LegalLink {...link} />
              </li>
            ))}
          </ul>

          <p className="text-[11.5px] text-white/45 md:text-right">
            © {currentYear} Prime Homes.{" "}
            <span className="hidden md:inline" aria-hidden="true">
              ·{" "}
            </span>
            <span className="block md:inline mt-1 md:mt-0">
              All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// ═══════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════

const FooterNavLink = ({ label, href }) => (
  <Link
    href={href}
    className="group relative inline-block text-[14px] text-white/75 hover:text-white focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40 rounded-sm transition-colors duration-200"
  >
    <span className="relative">
      {label}
      <span
        className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[400ms] ease-out"
        style={{ backgroundColor: "#E6A032" }}
        aria-hidden="true"
      />
    </span>
  </Link>
);

const FooterContactLink = ({ Icon, label, value, href }) => (
  <Link
    href={href}
    className="group flex items-center gap-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40 rounded-sm"
  >
    <Icon
      className="shrink-0 w-4 h-4 text-[#E6A032] transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    />
    <span className="flex items-baseline gap-2 flex-wrap">
      <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-300">
        {label}
      </span>
      <span className="text-[13.5px] text-white/85 group-hover:text-[#E6A032] transition-colors duration-300 flex items-center gap-1.5">
        {value}
        <FiArrowUpRight
          className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          aria-hidden="true"
        />
      </span>
    </span>
  </Link>
);

const FooterMetaLine = ({ Icon, label, value }) => (
  <div className="flex items-start gap-3 py-2">
    <Icon className="shrink-0 mt-0.5 w-4 h-4 text-[#E6A032]" aria-hidden="true" />
    <span className="flex flex-col gap-0.5">
      <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/40">
        {label}
      </span>
      <span className="text-[13.5px] text-white/85">{value}</span>
    </span>
  </div>
);

const LegalLink = ({ label, href }) => (
  <Link
    href={href}
    className="group relative text-[10.5px] font-bold tracking-[0.18em] uppercase text-white/60 hover:text-white focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40 rounded-sm transition-colors duration-200"
  >
    <span className="relative">
      {label}
      <span
        className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[400ms] ease-out"
        style={{ backgroundColor: "#E6A032" }}
        aria-hidden="true"
      />
    </span>
  </Link>
);

export default Footer;