"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";

/**
 * ClosingCTA, Prime Homes | Final call-to-action before footer

 * Content adapted from primehomes.ng:
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
    value: "info@primehomes.ng",
    href: "/contact",
  },
  {
    label: "Book a viewing",
    value: "Schedule a tour",
    href: "/all-products",
  },
  {
    label: "Coverage",
    value: "Abuja & key Nigerian cities",
    href: "/all-products",
  },
];

const ClosingCTA = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="relative bg-[#E6A032] text-[#141210] overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,18,16,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,18,16,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(120% 120% at 100% 0%, #000 30%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 120% at 100% 0%, #000 30%, transparent 72%)",
        }}
        aria-hidden="true"
      />
      {/* Warm light bloom */}
      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 62%)",
        }}
        aria-hidden="true"
      />
      {/* Concentric arcs */}
      <div
        className="pointer-events-none absolute -bottom-56 -left-40 w-[620px] h-[620px] rounded-full border border-[#141210]/12"
        aria-hidden="true"
      >
        <div className="absolute inset-12 rounded-full border border-[#141210]/12" />
        <div className="absolute inset-24 rounded-full border border-white/40" />
        <div className="absolute inset-40 rounded-full border border-[#141210]/12" />
      </div>

      <div
        ref={ref}
        className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-24 md:py-36 lg:py-44"
      >
        {/* Eyebrow */}
        <p
          className={[
            "flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210] mb-8 md:mb-10 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          Begin the conversation
        </p>

        {/* Headline */}
        <h2
          id="closing-cta-heading"
          className={[
            "font-display font-light leading-[1.0] tracking-[-0.01em] text-[#141210] max-w-5xl text-[46px] sm:text-[64px] md:text-[84px] lg:text-[100px] xl:text-[116px] transition-all duration-[1100ms] ease-out delay-200",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          Let&apos;s find your{" "}
          <span className="font-light italic text-white">
            next home
          </span>
          ,<br />
          together.
        </h2>

        {/* Body */}
        <p
          className={[
            "mt-10 md:mt-12 max-w-2xl text-[16px] md:text-[18px] leading-[1.75] text-[#141210]/80 font-light transition-all duration-700 delay-[400ms]",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          Whether you're searching for your next home, selling a property, or
          looking for professional property management,{" "}
          <span className="text-[#141210] font-semibold">
            Prime Homes is here to help you every step of the way.
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
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full bg-[#141210] hover:bg-[#0A0806] text-white text-[12px] md:text-[13px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-10px_rgba(20,18,16,0.55)] hover:shadow-[0_16px_40px_-10px_rgba(20,18,16,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E6A032] focus-visible:ring-[#141210] transition-all duration-300"
          >
            Browse Listings
            <FiArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full bg-transparent hover:bg-[#141210]/[0.06] border-2 border-[#141210]/35 hover:border-[#141210] text-[#141210] text-[12px] md:text-[13px] font-bold tracking-[0.18em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E6A032] focus-visible:ring-[#141210]/50 transition-all duration-300"
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
            "mt-20 md:mt-28 pt-10 md:pt-12 border-t border-[#141210]/15 transition-all duration-700 delay-[800ms]",
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
                <span className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#141210]/55 group-hover:text-[#141210] transition-colors duration-300">
                  {anchor.label}
                </span>
                <span className="text-[15px] md:text-[17px] font-bold text-[#141210] group-hover:text-[#0A0806] transition-colors duration-300 flex items-center gap-2">
                  {anchor.value}
                  <FiArrowUpRight
                    className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    aria-hidden="true"
                  />
                </span>

                <span
                  className="absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ backgroundColor: "#141210" }}
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