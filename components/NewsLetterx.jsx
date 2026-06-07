"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";

/**
 * ClosingCTA — Real Estate | Final call-to-action before footer

 * Content adapted from realestate.com:
 * - "Explore the possibilities with us. Let's redefine success, together."
 * - "Whether you're a startup aiming to disrupt the market or an
 *    established enterprise..."
 *
 * Brand: deep navy + gold + radial concentric arcs decorative motif
 */

function useReveal(options = { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }) {
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

const CONTACT_ANCHORS = [
  {
    label: "Write to us",
    value: "info@realestate.com",
    href: "/contact",
  },
  {
    label: "Book a viewing",
    value: "Schedule a tour",
    href: "/all-products",
  },
  {
    label: "Coverage",
    value: "15 cities & growing",
    href: "/all-products",
  },
];

const ClosingCTA = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="relative bg-[#0A1A36] text-white overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 opacity-80 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 15%, rgba(255,199,44,0.18), transparent 50%), radial-gradient(circle at 8% 90%, rgba(255,199,44,0.08), transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Concentric gold arcs */}
      <svg
        className="pointer-events-none absolute -top-40 -right-40 md:-top-48 md:-right-48 w-[520px] h-[520px] md:w-[700px] md:h-[700px] opacity-30"
        viewBox="0 0 700 700"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="350" cy="350" r="320" stroke="#FFC72C" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="350" cy="350" r="240" stroke="#FFC72C" strokeWidth="1" opacity="0.7" />
        <circle cx="350" cy="350" r="160" stroke="#FFC72C" strokeWidth="1" opacity="0.5" />
        <circle cx="350" cy="350" r="90" stroke="#FFC72C" strokeWidth="1" opacity="0.3" />
      </svg>

      <div
        ref={ref}
        className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-24 md:py-36 lg:py-44"
      >
        {/* Eyebrow */}
        <p
          className={[
            "flex items-center gap-3 text-[11px] font-bold tracking-[0.36em] uppercase text-[#FFC72C] mb-8 md:mb-10 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <span className="inline-block w-12 h-px" style={{ backgroundColor: "#FFC72C" }} />
          Begin the conversation
        </p>

        {/* Headline */}
        <h2
          id="closing-cta-heading"
          className={[
            "font-extrabold leading-[0.95] tracking-[-0.025em] text-white max-w-5xl text-[48px] sm:text-[68px] md:text-[92px] lg:text-[112px] xl:text-[132px] transition-all duration-[1100ms] ease-out delay-200",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          Let&apos;s find your{" "}
          <span className="font-light italic" style={{ color: "#FFC72C" }}>
            next home
          </span>
          ,<br />
          together.
        </h2>

        {/* Body */}
        <p
          className={[
            "mt-10 md:mt-12 max-w-2xl text-[16px] md:text-[18px] leading-[1.75] text-white/75 font-light transition-all duration-700 delay-[400ms]",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          Whether you're searching for your next home, selling a property, or
          looking for professional property management —{" "}
          <span className="text-white font-medium">
            Real Estate is here to help you every step of the way.
          </span>
        </p>

        {/* CTAs */}
        <div
          className={[
            "mt-12 md:mt-14 flex flex-wrap items-center gap-4 transition-all duration-700 delay-[600ms]",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          <Link
            href="/all-products"
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[12px] md:text-[13px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-10px_rgba(255,199,44,0.6)] hover:shadow-[0_16px_40px_-10px_rgba(255,199,44,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1A36] focus-visible:ring-[#FFC72C] transition-all duration-300"
          >
            Browse Listings
            <FiArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-white/55 text-white text-[12px] md:text-[13px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1A36] focus-visible:ring-white/50 transition-all duration-300"
          >
            List Your Property
            <FiArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Contact anchors */}
        <div
          className={[
            "mt-20 md:mt-28 pt-10 md:pt-12 border-t border-white/10 transition-all duration-700 delay-[800ms]",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {CONTACT_ANCHORS.map((anchor) => (
              <Link
                key={anchor.label}
                href={anchor.href}
                className="group relative flex flex-col gap-2 md:gap-3 py-3 focus:outline-none"
              >
                <span className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-white/50 group-hover:text-[#FFC72C] transition-colors duration-300">
                  {anchor.label}
                </span>
                <span className="text-[15px] md:text-[17px] font-bold text-white group-hover:text-[#FFC72C] transition-colors duration-300 flex items-center gap-2">
                  {anchor.value}
                  <FiArrowUpRight
                    className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    aria-hidden="true"
                  />
                </span>

                <span
                  className="absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ backgroundColor: "#FFC72C" }}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;