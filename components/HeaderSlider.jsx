"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiSearch, FiMapPin } from "react-icons/fi";

/**
 * Hero — Real Estate homepage
 *
 * Full-bleed property image with a navy gradient, a prominent search bar
 * (location · type · status), trust stats, and dual CTAs.
 *
 * Brand: Navy #0A1A36 · Gold #FFC72C · Montserrat
 */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80";

const TYPES = ["Any type", "House", "Apartment", "Condo", "Townhouse", "Loft", "Villa", "Commercial"];
const STATUSES = ["Any", "For Sale", "For Rent"];

const Hero = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [status, setStatus] = useState(STATUSES[0]);

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("q", location.trim());
    if (type !== TYPES[0]) params.set("category", type);
    if (status !== STATUSES[0]) params.set("status", status);
    router.push(`/all-products${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[94vh] md:min-h-screen overflow-hidden bg-[#06122A]"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="A beautiful modern home at dusk"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(6,18,42,0.95) 0%, rgba(10,26,54,0.85) 38%, rgba(10,26,54,0.6) 68%, rgba(6,18,42,0.5) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[94vh] md:min-h-screen flex items-center">
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-20 pt-32 md:pt-36 pb-16 max-w-[1600px] mx-auto">
          <div className="max-w-4xl">
            <p className="text-[10.5px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-[#FFC72C] mb-5 opacity-0 animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_200ms_forwards]">
              <span className="inline-block w-8 h-px bg-[#FFC72C] align-middle mr-3" />
              Find · Buy · Rent · Manage
            </p>

            <h1
              id="hero-heading"
              className="text-white font-extrabold leading-[0.98] tracking-[-0.02em] text-[44px] sm:text-[60px] md:text-[78px] lg:text-[92px] opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_350ms_forwards]"
            >
              Find a place you&apos;ll{" "}
              <span className="relative inline-block" style={{ color: "#FFC72C" }}>
                love
                <svg
                  className="absolute left-0 -bottom-2 md:-bottom-3 w-full h-3 md:h-4"
                  viewBox="0 0 300 16"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 10 Q 75 2, 150 8 T 298 6" stroke="#FFC72C" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              to call home.
            </h1>

            <p className="mt-9 md:mt-11 max-w-2xl text-[15px] md:text-[18px] leading-[1.7] text-white/80 font-light opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_550ms_forwards]">
              Browse thousands of homes for sale and rent, connect with trusted
              local agents, and let our team handle everything from valuation to
              keys in hand.
            </p>

            {/* Search bar */}
            <form
              onSubmit={onSearch}
              className="mt-10 md:mt-12 bg-white/95 backdrop-blur rounded-sm shadow-[0_24px_60px_-20px_rgba(6,18,42,0.7)] p-3 md:p-4 opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_700ms_forwards]"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_auto] gap-3">
                <label className="flex items-center gap-2.5 px-4 py-3 rounded-sm bg-[#0A1A36]/[0.04] border border-transparent focus-within:border-[#FFC72C]">
                  <FiMapPin className="w-4 h-4 text-[#FFC72C] shrink-0" aria-hidden="true" />
                  <span className="sr-only">Location</span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="District, area, or address (e.g. Maitama)"
                    className="w-full bg-transparent text-[14px] text-[#0A1A36] placeholder:text-[#0A1A36]/45 focus:outline-none"
                  />
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  aria-label="Property type"
                  className="px-4 py-3 rounded-sm bg-[#0A1A36]/[0.04] text-[14px] font-medium text-[#0A1A36] focus:outline-none focus:border-[#FFC72C] border border-transparent cursor-pointer"
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  aria-label="Buy or rent"
                  className="px-4 py-3 rounded-sm bg-[#0A1A36]/[0.04] text-[14px] font-medium text-[#0A1A36] focus:outline-none focus:border-[#FFC72C] border border-transparent cursor-pointer"
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-sm bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[12px] font-extrabold tracking-[0.16em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1A36]"
                >
                  <FiSearch className="w-4 h-4" aria-hidden="true" />
                  Search
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_900ms_forwards]">
              <Link
                href="/all-products"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/30 hover:border-[#FFC72C] text-[11.5px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300"
              >
                Browse All Listings
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/agents"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-white/80 hover:text-[#FFC72C] text-[11.5px] font-bold tracking-[0.18em] uppercase transition-colors"
              >
                Meet Our Agents
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          section[aria-labelledby="hero-heading"] *[class*="animate-"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
