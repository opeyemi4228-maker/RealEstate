"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiSearch, FiMapPin } from "react-icons/fi";

/**
 * Hero, Prime Homes homepage
 *
 * Full-bleed property image with a navy gradient, a prominent search bar
 * (location · type · status), trust stats, and dual CTAs.
 *
 * Brand: Navy #141210 · Gold #E6A032 · Montserrat
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
      className="relative w-full min-h-[94vh] md:min-h-screen overflow-hidden bg-black"
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
        {/* Black gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 38%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.4) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Warm gold patches */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(680px circle at 10% 82%, rgba(230,160,50,0.24), transparent 60%), radial-gradient(560px circle at 90% 12%, rgba(235,180,90,0.18), transparent 55%), radial-gradient(420px circle at 62% 96%, rgba(200,140,40,0.14), transparent 60%)",
          }}
          aria-hidden="true"
        />
        {/* Fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(140% 120% at 20% 40%, #000 35%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(140% 120% at 20% 40%, #000 35%, transparent 75%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[94vh] md:min-h-screen flex items-center">
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-20 pt-32 md:pt-36 pb-16 max-w-[1600px] mx-auto">
          <div className="max-w-4xl">
            <p className="text-[10.5px] md:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#EBB45A] mb-6 opacity-0 animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_200ms_forwards]">
              <span className="inline-block w-8 h-px bg-[#EBB45A]/70 align-middle mr-3" />
              Acquire · Invest · Develop · Manage
            </p>

            <h1
              id="hero-heading"
              className="font-display text-white font-light leading-[1.02] tracking-[-0.01em] text-[46px] sm:text-[62px] md:text-[80px] lg:text-[94px] opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_350ms_forwards]"
            >
              Find a place you&apos;ll{" "}
              <span className="italic font-normal" style={{ color: "#EBB45A" }}>
                love
              </span>{" "}
              to call home.
            </h1>

            <p className="mt-9 md:mt-11 max-w-2xl text-[15px] md:text-[18px] leading-[1.75] text-white/80 font-light opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_550ms_forwards]">
              Prime Homes delivers secure, verified, high-value property across
              Nigeria, backed by transparency, due diligence, and end-to-end
              service. Do it right, deliver value, build trust.
            </p>

            {/* Search bar */}
            <form
              onSubmit={onSearch}
              className="mt-10 md:mt-12 bg-white/95 backdrop-blur rounded-sm shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] p-3 md:p-4 opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_700ms_forwards]"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_auto] gap-3">
                <label className="flex items-center gap-2.5 px-4 py-3 rounded-sm bg-[#141210]/[0.04] border border-transparent focus-within:border-[#E6A032]">
                  <FiMapPin className="w-4 h-4 text-[#E6A032] shrink-0" aria-hidden="true" />
                  <span className="sr-only">Location</span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="District, area, or address (e.g. Maitama)"
                    className="w-full bg-transparent text-[14px] text-[#141210] placeholder:text-[#141210]/45 focus:outline-none"
                  />
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  aria-label="Property type"
                  className="px-4 py-3 rounded-sm bg-[#141210]/[0.04] text-[14px] font-medium text-[#141210] focus:outline-none focus:border-[#E6A032] border border-transparent cursor-pointer"
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  aria-label="Buy or rent"
                  className="px-4 py-3 rounded-sm bg-[#141210]/[0.04] text-[14px] font-medium text-[#141210] focus:outline-none focus:border-[#E6A032] border border-transparent cursor-pointer"
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-sm bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.16em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141210]"
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
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/30 hover:border-[#E6A032] text-[11.5px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300"
              >
                Browse All Listings
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/agents"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-white/80 hover:text-[#E6A032] text-[11.5px] font-bold tracking-[0.18em] uppercase transition-colors"
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
