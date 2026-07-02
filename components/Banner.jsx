"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { servicesData } from "@/assets/realEstateData";

/**
 * Services, the full-service real estate offering.
 * Sticky positioning statement on the left, expandable service rows on the
 * right. Navy/gold brand.
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

const Services = () => {
  const [headerRef, headerVisible] = useReveal();
  const [listRef, listVisible] = useReveal();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Fine grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(120% 120% at 100% 0%, #000 25%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(120% 120% at 100% 0%, #000 25%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: sticky positioning */}
          <div ref={headerRef} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6 transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              What We Do
            </p>

            <h2
              id="services-heading"
              className={[
                "font-display font-light leading-[1.03] tracking-[-0.005em] text-[#141210] text-[42px] md:text-[54px] lg:text-[62px] transition-all duration-[900ms] delay-100",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              ].join(" ")}
            >
              Every step of your{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                property journey
              </span>
              .
            </h2>

            <p
              className={[
                "mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.75] text-[#141210]/75 max-w-md transition-all duration-700 delay-200",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              Whether you&apos;re buying your first home, selling a family
              property, renting out an investment, or building a portfolio, our
              agents and managers handle it end to end.
            </p>

            <div
              className={[
                "mt-8 md:mt-10 transition-all duration-700 delay-300",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#141210] hover:bg-[#0A0806] text-white text-[11.5px] font-bold tracking-[0.16em] uppercase transition-colors"
              >
                Talk to an agent
                <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right: services list */}
          <div ref={listRef} className="lg:col-span-7">
            <ul className="divide-y divide-[#141210]/15 border-t border-[#141210]/15">
              {servicesData.map((s, i) => (
                <ServiceRow key={s.number} service={s} index={i} visible={listVisible} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceRow = ({ service, index, visible }) => {
  const { number, title, summary, detail } = service;
  return (
    <li
      className={[
        "group transition-all duration-[700ms] ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: visible ? `${120 + index * 80}ms` : "0ms" }}
    >
      <Link href="/services" className="block relative py-7 md:py-9 focus:outline-none">
        <div className="flex items-start gap-6 md:gap-10">
          <span
            className="shrink-0 text-[13px] font-display font-light tracking-[0.18em] pt-1 md:pt-2 min-w-[28px]"
            style={{ color: "#E6A032" }}
            aria-hidden="true"
          >
            {number}
          </span>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-normal leading-[1.12] tracking-[-0.005em] text-[#141210] text-[25px] md:text-[31px] lg:text-[35px] transition-transform duration-500 ease-out group-hover:translate-x-1">
              {title}
            </h3>
            <p className="mt-3 text-[14.5px] md:text-[15px] leading-[1.65] text-[#141210]/70 max-w-xl">
              {summary}
            </p>
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
              <div className="overflow-hidden">
                <p className="mt-4 text-[13.5px] leading-[1.7] text-[#141210]/55 max-w-xl italic">
                  {detail}
                </p>
              </div>
            </div>
          </div>

          <span
            className="shrink-0 self-start mt-2 md:mt-3 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-[#141210]/20 text-white transition-all duration-500 ease-out group-hover:bg-[#E6A032] group-hover:border-[#E6A032]"
            aria-hidden="true"
          >
            <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <span
          className="absolute left-0 right-0 -bottom-px h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[600ms] ease-out"
          style={{ backgroundColor: "#E6A032" }}
          aria-hidden="true"
        />
      </Link>
    </li>
  );
};

export default Services;
