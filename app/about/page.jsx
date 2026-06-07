"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiArrowUpRight, FiStar } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { testimonialsData } from "@/assets/realEstateData";

const STATS = [
  { value: "1,200+", label: "Properties Listed" },
  { value: "₦400B+", label: "In Sales Closed" },
  { value: "20+", label: "Expert Agents" },
  { value: "98%", label: "Client Satisfaction" },
];

const VALUES = [
  {
    number: "01",
    title: "People First",
    copy: "A home is the biggest decision most people ever make. We treat it that way — with patience, honesty, and zero pressure.",
  },
  {
    number: "02",
    title: "Local Expertise",
    copy: "Our agents live and work in the neighbourhoods they sell. They know the streets, the schools, and the real value.",
  },
  {
    number: "03",
    title: "Total Transparency",
    copy: "Clear fees, honest advice, and straight answers. No hidden costs, no surprises — ever.",
  },
  {
    number: "04",
    title: "Results That Move",
    copy: "Sharper marketing, harder negotiation, faster closings. We measure ourselves on the outcomes we deliver for you.",
  },
];

const AboutPage = () => {
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
              <span className="text-[#FFC72C]">About</span>
            </nav>
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6">
              <span className="inline-block w-12 h-px" style={{ backgroundColor: "#FFC72C" }} />
              Our Story
            </p>
            <h1 className="font-extrabold leading-[0.98] tracking-[-0.02em] text-[44px] sm:text-[60px] md:text-[80px] max-w-4xl">
              Helping people find{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                home
              </span>{" "}
              since day one.
            </h1>
            <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
              We&apos;re a full-service real estate agency built on local knowledge,
              honest advice, and a genuine love for matching people with the
              right place to live and invest.
            </p>
          </div>
        </header>

        {/* Story + image */}
        <section className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[#0A1A36]/5">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="A modern home we recently sold"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div
                  className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
                  style={{ background: "linear-gradient(225deg, #FFC72C 0%, #FFC72C 50%, transparent 50%)" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="font-light leading-[1.18] tracking-[-0.01em] text-[#0A1A36] text-[26px] md:text-[34px] max-w-2xl">
                Founded on the belief that great property service should feel{" "}
                <span className="italic font-medium" style={{ color: "#FFC72C" }}>
                  simple, honest, and human
                </span>
                .
              </p>
              <div className="mt-6 space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-[#0A1A36]/80 max-w-xl">
                <p>
                  What started as a small team of local agents has grown into a
                  full-service agency covering sales, lettings, and property
                  management across Abuja and the FCT — without ever losing the
                  personal touch that defined us from the start.
                </p>
                <p>
                  Whether you&apos;re buying your first home, selling a family
                  property, renting, or building an investment portfolio, our
                  agents are with you at every step — from valuation to keys in
                  hand and long after.
                </p>
              </div>
              <Link
                href="/agents"
                className="mt-8 group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] uppercase text-[#0A1A36] hover:text-[#FFC72C] transition-colors"
              >
                Meet the team
                <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#0A1A36] text-white py-14 md:py-20">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-[34px] md:text-[44px] font-extrabold text-[#FFC72C] leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-24">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-5">
              <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
              What We Stand For
            </p>
            <h2 className="font-extrabold leading-[1.04] tracking-[-0.02em] text-[#0A1A36] text-[36px] md:text-[48px]">
              Values that{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                guide
              </span>{" "}
              every deal.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0A1A36]/10">
            {VALUES.map((v) => (
              <article key={v.number} className="group relative bg-white p-8 md:p-10 lg:p-12 hover:bg-[#FBF8F1] transition-colors">
                <span className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ backgroundColor: "#FFC72C" }} aria-hidden="true" />
                <span className="text-[36px] md:text-[44px] font-extrabold leading-none" style={{ color: "#FFC72C" }}>
                  {v.number}
                </span>
                <h3 className="mt-5 font-extrabold leading-[1.15] tracking-[-0.01em] text-[#0A1A36] text-[22px] md:text-[26px] mb-4">
                  {v.title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.75] text-[#0A1A36]/70 max-w-md">
                  {v.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#FBF8F1] py-16 md:py-24">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-5">
                <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
                Client Stories
              </p>
              <h2 className="font-extrabold leading-[1.04] tracking-[-0.02em] text-[#0A1A36] text-[36px] md:text-[48px]">
                Loved by buyers, sellers &{" "}
                <span className="font-light italic" style={{ color: "#FFC72C" }}>
                  landlords
                </span>
                .
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonialsData.map((t) => (
                <figure key={t.name} className="bg-white border border-[#0A1A36]/10 rounded-sm p-8 flex flex-col">
                  <div className="flex gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-[#FFC72C] fill-[#FFC72C]" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[15px] leading-[1.75] text-[#0A1A36]/80 flex-1">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-[#0A1A36]/10">
                    <p className="font-bold text-[#0A1A36] text-[14px]">{t.name}</p>
                    <p className="text-[12px] text-[#0A1A36]/55">{t.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A1A36] text-white py-16 md:py-24">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto text-center">
            <h2 className="font-extrabold text-[32px] md:text-[48px] leading-tight max-w-3xl mx-auto">
              Ready to make your move?
            </h2>
            <p className="mt-4 text-white/70 text-[15px] md:text-[17px] max-w-xl mx-auto">
              Browse our latest listings or talk to a local agent today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/all-products"
                className="group inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[12px] font-extrabold tracking-[0.16em] uppercase transition-colors"
              >
                Browse Listings
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white/5 border border-white/30 hover:border-white/55 text-white text-[12px] font-bold tracking-[0.16em] uppercase transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
