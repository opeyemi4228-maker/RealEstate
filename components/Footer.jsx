"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaLinkedinIn,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";
import { FiArrowUpRight, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

/**
 * Footer — Real Estate
 *
 * Content (extracted):
 * - Brand: Real Estate · Property Marketplace
 * - Address: 71-75 Shelton Street, Covent Garden, London WC2H 9JQ
 * - Email: info@realestate.com
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
  { label: "Buy a Home", href: "/services#buy" },
  { label: "Sell a Property", href: "/services#sell" },
  { label: "Rent & Lettings", href: "/services#rent" },
  { label: "Property Management", href: "/services#manage" },
  { label: "Valuations & Advice", href: "/services#valuation" },
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
  { label: "Email", href: "mailto:info@realestate.com", Icon: FaEnvelope },
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
      className="relative bg-[#06122A] text-white overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Real Estate — site footer
      </h2>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 92% 8%, rgba(255,199,44,0.15), transparent 48%), radial-gradient(circle at 6% 95%, rgba(255,199,44,0.05), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Top gold hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,199,44,0.6) 30%, rgba(255,199,44,0.9) 50%, rgba(255,199,44,0.6) 70%, transparent 100%)",
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
                className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm mb-10 md:mb-14"
                aria-label="Real Estate — home"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]"
                >
                  <path
                    d="M16 2 L28 6 V16 C28 22 22.6 27.5 16 30 C9.4 27.5 4 22 4 16 V6 L16 2 Z"
                    fill="#FFC72C"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <text
                    x="16"
                    y="20"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="800"
                    fill="#0A1A36"
                    fontFamily="Montserrat, sans-serif"
                    letterSpacing="0.5"
                  >
                    RE
                  </text>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[16px] md:text-[17px] font-extrabold tracking-[0.04em] text-white">
                    Real Estate
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.28em] uppercase mt-1 text-[#FFC72C]">
                    Property Marketplace
                  </span>
                </div>
              </Link>

              <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6">
                <span
                  className="inline-block w-10 h-px"
                  style={{ backgroundColor: "#FFC72C" }}
                />
                Local expertise, every step
              </p>

              <p className="font-light leading-[1.15] tracking-[-0.01em] text-white text-[28px] md:text-[36px] lg:text-[42px] max-w-2xl">
                Helping people find, sell, and manage properties with
                <span className="italic font-normal" style={{ color: "#FFC72C" }}>
                  expert local service
                </span>.
              </p>

              <p className="mt-6 md:mt-8 text-[14px] md:text-[15px] leading-[1.75] text-white/65 max-w-lg">
                Trusted property marketplace with listings, valuations, and
                agent services to support buyers, sellers, and landlords.
              </p>
            </div>

            {/* Newsletter card */}
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/10">
              <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6">
                <span
                  className="inline-block w-10 h-px"
                  style={{ backgroundColor: "#FFC72C" }}
                />
                Stay Connected
              </p>

              <p className="text-[15px] md:text-[16px] leading-[1.7] text-white/75 mb-8 max-w-md">
                Be first to see new listings. Subscribe for fresh properties,
                price drops, and local market insights — straight to your inbox.
              </p>

              <form onSubmit={onSubscribe} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    aria-label="First name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/15 rounded-sm text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFC72C] focus:bg-white/[0.10] transition-colors"
                  />
                  <input
                    type="text"
                    aria-label="Last name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/15 rounded-sm text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFC72C] focus:bg-white/[0.10] transition-colors"
                  />
                </div>
                <input
                  type="email"
                  required
                  aria-label="Email address"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.06] border border-white/15 rounded-sm text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFC72C] focus:bg-white/[0.10] transition-colors"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[11.5px] font-extrabold tracking-[0.18em] uppercase shadow-[0_8px_24px_-8px_rgba(255,199,44,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(255,199,44,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06122A] focus-visible:ring-[#FFC72C] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {subscribing ? "Subscribing…" : "Subscribe"}
                  <FiArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
                {submitted && (
                  <p className="text-[12px] text-[#FFC72C] mt-2" role="status">
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
                  value="info@realestate.com"
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
              <h3 className="flex items-center gap-3 text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-6">
                <span
                  className="inline-block w-7 h-px"
                  style={{ backgroundColor: "#FFC72C" }}
                />
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
              <h3 className="flex items-center gap-3 text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-6">
                <span
                  className="inline-block w-7 h-px"
                  style={{ backgroundColor: "#FFC72C" }}
                />
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
              <h3 className="flex items-center gap-3 text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-6">
                <span
                  className="inline-block w-7 h-px"
                  style={{ backgroundColor: "#FFC72C" }}
                />
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
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFC72C]/[0.12] border border-[#FFC72C]/30 text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#FFC72C] hover:bg-[#FFC72C] hover:text-[#0A1A36] transition-colors"
              >
                List Your Property
                <FiArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </nav>

            {/* Social */}
            <div className="md:col-span-2">
              <h3 className="flex items-center gap-3 text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-6">
                <span
                  className="inline-block w-7 h-px"
                  style={{ backgroundColor: "#FFC72C" }}
                />
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
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/80 hover:bg-[#FFC72C] hover:border-[#FFC72C] hover:text-[#0A1A36] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/60 transition-all duration-300"
                    >
                      <Icon className="w-[13px] h-[13px]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[11.5px] leading-[1.6] text-white/50">
                New listings & market updates — delivered weekly.
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
            © {currentYear} Real Estate.{" "}
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
    className="group relative inline-block text-[14px] text-white/75 hover:text-white focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm transition-colors duration-200"
  >
    <span className="relative">
      {label}
      <span
        className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[400ms] ease-out"
        style={{ backgroundColor: "#FFC72C" }}
        aria-hidden="true"
      />
    </span>
  </Link>
);

const FooterContactLink = ({ Icon, label, value, href }) => (
  <Link
    href={href}
    className="group flex items-center gap-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm"
  >
    <Icon
      className="shrink-0 w-4 h-4 text-[#FFC72C] transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    />
    <span className="flex items-baseline gap-2 flex-wrap">
      <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-300">
        {label}
      </span>
      <span className="text-[13.5px] text-white/85 group-hover:text-[#FFC72C] transition-colors duration-300 flex items-center gap-1.5">
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
    <Icon className="shrink-0 mt-0.5 w-4 h-4 text-[#FFC72C]" aria-hidden="true" />
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
    className="group relative text-[10.5px] font-bold tracking-[0.18em] uppercase text-white/60 hover:text-white focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm transition-colors duration-200"
  >
    <span className="relative">
      {label}
      <span
        className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[400ms] ease-out"
        style={{ backgroundColor: "#FFC72C" }}
        aria-hidden="true"
      />
    </span>
  </Link>
);

export default Footer;