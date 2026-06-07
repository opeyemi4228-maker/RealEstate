"use client";

import React from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiHome,
  FiTrendingUp,
  FiKey,
  FiTool,
  FiClipboard,
  FiCheck,
} from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesData } from "@/assets/realEstateData";

const ICONS = {
  buy: FiHome,
  sell: FiTrendingUp,
  rent: FiKey,
  manage: FiTool,
  valuation: FiClipboard,
};

const BULLETS = {
  buy: ["Curated, on-budget shortlists", "Private & virtual viewings", "Expert offer negotiation", "Financing & inspection support"],
  sell: ["Free market valuation", "Pro photography & staging advice", "Premium portal marketing", "Vetted buyer network"],
  rent: ["Move-in-ready rentals", "Full tenant referencing", "Digital applications", "Landlord listing support"],
  manage: ["Rent collection", "24/7 maintenance handling", "Routine inspections", "Regulatory compliance"],
  valuation: ["No-obligation appraisal", "Comparable sales analysis", "Local market trends", "Actionable pricing advice"],
};

const ServicesPage = () => {
  return (
    <>
      <Navbar />

      <main
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        {/* Hero */}
        <header className="relative bg-[#0A1A36] text-white pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 88% 15%, rgba(255,199,44,0.18), transparent 50%), radial-gradient(circle at 8% 90%, rgba(255,199,44,0.06), transparent 55%)",
            }}
            aria-hidden="true"
          />
          <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-8">
              <Link href="/" className="hover:text-[#FFC72C] transition-colors">Home</Link>
              <span aria-hidden="true">·</span>
              <span className="text-[#FFC72C]">Services</span>
            </nav>
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6">
              <span className="inline-block w-12 h-px" style={{ backgroundColor: "#FFC72C" }} />
              What We Do
            </p>
            <h1 className="font-extrabold leading-[0.98] tracking-[-0.02em] text-[44px] sm:text-[60px] md:text-[80px] max-w-4xl">
              Full-service{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                real estate
              </span>
              .
            </h1>
            <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
              From your first viewing to long-term management, our agents handle
              every part of your property journey — so you don&apos;t have to.
            </p>

            {/* Quick nav */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {servicesData.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-[11px] font-bold tracking-[0.14em] uppercase text-white/80 hover:bg-[#FFC72C] hover:text-[#0A1A36] hover:border-[#FFC72C] transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* Service sections */}
        <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-24 space-y-20 md:space-y-28">
          {servicesData.map((s, i) => {
            const Icon = ICONS[s.slug] || FiHome;
            const reverse = i % 2 === 1;
            return (
              <section
                key={s.slug}
                id={s.slug}
                className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div className={reverse ? "lg:order-2" : ""}>
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFC72C]/15 border border-[#FFC72C]/30 text-[#0A1A36] mb-6">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <p className="text-[12px] font-extrabold tracking-[0.2em] uppercase text-[#FFC72C] mb-3">
                    {s.number}
                  </p>
                  <h2 className="font-extrabold leading-[1.05] tracking-[-0.02em] text-[#0A1A36] text-[32px] md:text-[44px] mb-5">
                    {s.title}
                  </h2>
                  <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#0A1A36]/75 mb-4">
                    {s.summary}
                  </p>
                  <p className="text-[14.5px] leading-[1.8] text-[#0A1A36]/65 mb-8">
                    {s.detail}
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0A1A36] hover:bg-[#06122A] text-white text-[11.5px] font-bold tracking-[0.16em] uppercase transition-colors"
                  >
                    Get started
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>

                <div className={reverse ? "lg:order-1" : ""}>
                  <div className="bg-[#FBF8F1] border border-[#0A1A36]/10 rounded-sm p-8 md:p-10">
                    <p className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#0A1A36]/50 mb-6">
                      What&apos;s included
                    </p>
                    <ul className="space-y-4">
                      {(BULLETS[s.slug] || []).map((b) => (
                        <li key={b} className="flex items-center gap-3 text-[15px] text-[#0A1A36]/85">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFC72C] text-[#0A1A36] shrink-0">
                            <FiCheck className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <section className="bg-[#0A1A36] text-white py-16 md:py-24">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto text-center">
            <h2 className="font-extrabold text-[32px] md:text-[48px] leading-tight max-w-3xl mx-auto">
              Not sure where to start?
            </h2>
            <p className="mt-4 text-white/70 text-[15px] md:text-[17px] max-w-xl mx-auto">
              Tell us your goal and we&apos;ll match you with the right agent and the
              right service — at no cost.
            </p>
            <Link
              href="/contact"
              className="mt-8 group inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[12px] font-extrabold tracking-[0.16em] uppercase transition-colors"
            >
              Talk to an agent
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;
