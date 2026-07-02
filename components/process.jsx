"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiSearch, FiHome, FiFileText, FiKey } from "react-icons/fi";

/**
 * HowItWorks, a simple four-step path from search to keys in hand.
 * Navy section with gold accents.
 */

function useReveal(options = { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
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

const STEPS = [
  {
    number: "01",
    Icon: FiSearch,
    title: "Search & Discover",
    copy: "Filter by location, price, and type to shortlist homes that fit your life, then save your favourites.",
  },
  {
    number: "02",
    Icon: FiHome,
    title: "Book a Viewing",
    copy: "Schedule in-person or virtual tours with a dedicated local agent who knows the neighbourhood inside out.",
  },
  {
    number: "03",
    Icon: FiFileText,
    title: "Make an Offer",
    copy: "We negotiate on your behalf and guide you through paperwork, financing, and inspections with zero stress.",
  },
  {
    number: "04",
    Icon: FiKey,
    title: "Get the Keys",
    copy: "Close with confidence and move in. Our team stays with you long after the deal is done.",
  },
];

const HowItWorks = () => {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative bg-[#141210] text-white py-20 md:py-28 lg:py-32 overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(120% 120% at 0% 0%, #000 30%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 120% at 0% 0%, #000 30%, transparent 72%)",
        }}
        aria-hidden="true"
      />
      {/* Gold glow */}
      <div
        className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(230,160,50,0.2) 0%, transparent 62%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div
          ref={headerRef}
          className={[
            "max-w-2xl mb-14 md:mb-20 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
            How It Works
          </p>
          <h2
            id="how-heading"
            className="font-display font-light leading-[1.03] tracking-[-0.005em] text-white text-[40px] md:text-[52px] lg:text-[60px]"
          >
            From first search to{" "}
            <span className="font-light italic" style={{ color: "#E6A032" }}>
              front door
            </span>
            .
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 border border-white/15">
          {STEPS.map((step, i) => (
            <article
              key={step.number}
              className={[
                "group relative bg-[#141210] p-8 lg:p-10 transition-all duration-[700ms] ease-out hover:bg-[#0A0806]",
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: gridVisible ? `${120 * i}ms` : "0ms" }}
            >
              <span
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: "#E6A032" }}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between mb-8">
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E6A032]/10 border border-[#E6A032]/30 text-[#E6A032] group-hover:bg-[#E6A032] group-hover:text-white transition-all duration-300"
                  aria-hidden="true"
                >
                  <step.Icon className="w-5 h-5" />
                </span>
                <span className="text-[36px] font-display font-light text-white/10 leading-none">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-[22px] font-normal mb-3">{step.title}</h3>
              <p className="text-[14px] leading-[1.7] text-white/65">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
