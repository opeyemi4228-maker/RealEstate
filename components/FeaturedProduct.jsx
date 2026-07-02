"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { assets } from "../assets/assets";
/**
 * About, GCSA Consulting | Our Story + What Sets Us Apart
 *
 * Content (per gcsaconsulting.co.uk About page):
 * - "Founded with a passion for transforming businesses, GCSA was born
 *    from a vision to redefine how organizations approach challenges
 *    and embrace opportunities."
 * - 4 differentiators: Tailored Solutions, Innovation at the Core,
 *   Collaborative Approach, Proven Expertise
 *
 * Brand: navy + gold + warm cream backdrop for editorial feel
 */

function useReveal(options = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }) {
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

const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Tailored Solutions",
    copy: "Every business is unique. We take the time to understand your specific challenges and goals, delivering customized strategies that fit your organisation's DNA.",
  },
  {
    number: "02",
    title: "Innovation at the Core",
    copy: "We don't just solve problems; we innovate. Our consultants bring fresh perspectives and creative thinking, ensuring you not only adapt to change but thrive in it.",
  },
  {
    number: "03",
    title: "Collaborative Approach",
    copy: "We work hand-in-hand with your team, fostering a dynamic partnership that leverages collective expertise and drives sustainable success.",
  },
  {
    number: "04",
    title: "Proven Expertise",
    copy: "Backed by seasoned professionals with diverse industry backgrounds, we bring decades of experience navigating complex challenges and delivering impactful results worldwide.",
  },
];

// Founder portrait (Unsplash, allowed in next.config.mjs)
const PORTRAIT_IMAGE =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80";
const FOUNDER_NAME = "Barrister Morenikeji Fagbe Esq.";

const About = () => {
  const [headerRef, headerVisible] = useReveal();
  const [mainRef, mainVisible] = useReveal();
  const [listRef, listVisible] = useReveal();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28 lg:py-36"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Paper-grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* ── Header ───────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-14 md:mb-20"
        >
          <div className="max-w-2xl">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-6 transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              About Prime Homes
            </p>
            <h2
              id="about-heading"
              className={[
                "font-display font-light leading-[1.03] tracking-[-0.005em] text-[#141210] text-[42px] md:text-[54px] lg:text-[62px] transition-all duration-[900ms] delay-100",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              Built to{" "}
                <span className="font-light italic" style={{ color: "#E6A032" }}>
                  redefine
                </span>{" "}
                real estate in Nigeria.
            </h2>
          </div>

          <div
            className={[
              "shrink-0 transition-all duration-700 delay-200",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] uppercase text-[#141210] hover:text-[#E6A032] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40 rounded-sm transition-colors duration-200"
            >
              <span className="relative">
                Read our full story
                <span
                  className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: "#E6A032" }}
                  aria-hidden="true"
                />
              </span>
              <FiArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* ── Story panel ──────────────────────────────────────── */}
        <div
          ref={mainRef}
          className={[
            "mb-16 md:mb-24 transition-all duration-[900ms] ease-out",
            mainVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Image column */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-sm bg-[#141210] group">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={PORTRAIT_IMAGE}
                    alt={`${FOUNDER_NAME}, Founder & CEO`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-30"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Badge */}
                <div className="absolute left-5 bottom-5 md:left-7 md:bottom-7 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#E6A032" }}
                      aria-hidden="true"
                    />
                      <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#141210]">
                        Abuja · HQ
                      </span>
                  </span>
                </div>

              </div>
            </div>

            {/* Story column */}
            <div className="lg:col-span-7 lg:pl-4 lg:pt-4">
              <p className="font-display font-light leading-[1.2] tracking-[-0.005em] text-[#141210] text-[27px] md:text-[33px] lg:text-[39px] max-w-2xl">
                A real estate agency built on{" "}
                <span className="italic font-normal" style={{ color: "#C88C28" }}>
                  trust, local expertise
                </span>
                , and the relentless pursuit of the right home.
              </p>

              <div className="mt-6 md:mt-8 space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-[#141210]/80 max-w-xl">
                <p>
                  Founded with a passion for serving buyers, sellers, and
                  landlords, Prime Homes was born from a vision to make finding
                  and presenting properties simple, transparent, and stress-free.
                  Our journey began with one idea: great listings backed by
                  genuinely expert local service.
                </p>
                <p>
                  Whether you&apos;re a first-time buyer, a growing family, or an
                  investor building a{" "}
                  <em className="not-italic font-bold text-[#141210]">
                    portfolio across multiple cities
                  </em>
                  , our agents are your trusted partners for buying, selling,
                  renting, and managing property.
                </p>
              </div>

              {/* Pull quote */}
              <figure
                className="relative mt-10 md:mt-12 pl-8 border-l-[3px]"
                style={{ borderLeftColor: "#E6A032" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[8px] top-0 w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#E6A032" }}
                />
                <blockquote className="font-display text-[20px] md:text-[25px] leading-[1.4] italic font-light text-[#141210] max-w-xl">
                  Do it right, deliver value, and build trust.
                </blockquote>
                <figcaption className="mt-4 text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#141210]/60">
                  {FOUNDER_NAME} · Founder &amp; CEO
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* ── 4 Differentiators ─────────────────────────────── */}
        <div ref={listRef} className="pt-12 md:pt-14 border-t border-[#141210]/15">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
            <p className="text-[11px] font-semibold tracking-[0.26em] uppercase text-[#C88C28]">
              What Sets Us Apart
            </p>
            <p className="text-[14px] text-[#141210]/65 max-w-md">
              A unique blend of experience, creativity, and commitment that
              defines every Prime Homes experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#141210]/10">
            {DIFFERENTIATORS.map((d, i) => (
              <DifferentiatorCard
                key={d.number}
                differentiator={d}
                index={i}
                visible={listVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DifferentiatorCard = ({ differentiator, index, visible }) => {
  const { number, title, copy } = differentiator;
  return (
    <article
      className={[
        "group relative bg-[#FBF8F1] p-8 md:p-10 lg:p-12 transition-all duration-[700ms] ease-out hover:bg-white",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
      style={{ transitionDelay: visible ? `${120 * index}ms` : "0ms" }}
    >
      {/* Hover gold bar */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
        style={{ backgroundColor: "#E6A032" }}
        aria-hidden="true"
      />

      <div className="flex items-baseline gap-4 mb-6">
        <span
          className="text-[36px] md:text-[44px] font-display font-light leading-none transition-all duration-500"
          style={{ color: "#E6A032" }}
        >
          {number}
        </span>
        <span
          className="inline-block w-10 h-px mb-2"
          style={{ backgroundColor: "#141210", opacity: 0.3 }}
        />
      </div>

      <h3 className="font-display font-normal leading-[1.15] tracking-[-0.005em] text-[#141210] text-[23px] md:text-[27px] mb-4">
        {title}
      </h3>
      <p className="text-[14px] md:text-[15px] leading-[1.75] text-[#141210]/70 max-w-md">
        {copy}
      </p>
    </article>
  );
};

export default About;