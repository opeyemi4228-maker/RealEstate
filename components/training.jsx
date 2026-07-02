"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { agentsData } from "@/assets/realEstateData";
import AgentCard from "@/components/AgentCard";

/**
 * AgentsTeaser, "Meet our agents" section on the homepage.
 * Shows the team in a responsive grid and links to the full directory.
 */

function useReveal(options = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }) {
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

const AgentsTeaser = () => {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section
      id="agents"
      aria-labelledby="agents-heading"
      className="relative bg-white py-20 md:py-28 overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Fine grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(120% 120% at 100% 100%, #000 25%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(120% 120% at 100% 100%, #000 25%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div
          ref={headerRef}
          className={[
            "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-5">
              Meet Our Agents
            </p>
            <h2
              id="agents-heading"
              className="font-display font-light leading-[1.05] tracking-[-0.005em] text-[#141210] text-[38px] md:text-[52px] lg:text-[60px]"
            >
              The people who get you{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                home
              </span>
              .
            </h2>
          </div>

          <Link
            href="/agents"
            className="group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] uppercase text-[#141210] hover:text-[#E6A032] transition-colors shrink-0"
          >
            View all agents
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {agentsData.map((agent, i) => (
            <div
              key={agent._id}
              className={[
                "transition-all duration-[700ms] ease-out",
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: gridVisible ? `${120 * i}ms` : "0ms" }}
            >
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsTeaser;
