"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiArrowUpRight, FiStar, FiEye, FiTarget, FiCheck } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { testimonialsData, strategicGoals, companyInfo } from "@/assets/realEstateData";

const STATS = [
  { value: "100%", label: "Verified Titles" },
  { value: "End-to-End", label: "Solutions" },
  { value: "Nigeria + Diaspora", label: "Clients Served" },
];

const OFFERINGS = [
  "Property sourcing and acquisition",
  "Investment advisory and portfolio guidance",
  "Real estate development and project supervision",
  "Legal verification and documentation",
  "Property management and consultancy",
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
        <header className="relative bg-[#141210] text-white pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-8">
              <Link href="/" className="hover:text-[#E6A032] transition-colors">Home</Link>
              <span aria-hidden="true">·</span>
              <span className="text-[#E6A032]">About</span>
            </nav>
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-6">
              About Prime Homes
            </p>
            <h1 className="font-display font-light leading-[0.98] tracking-[-0.02em] text-[44px] sm:text-[60px] md:text-[80px] max-w-4xl">
              Your trusted partner in{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                building wealth
              </span>{" "}
              through property.
            </h1>
            <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
              Prime Homes is a premium real estate company committed to redefining
              the standards of property acquisition, investment, and development
              in Nigeria.
            </p>
            <p className="mt-6 inline-flex items-center gap-3 text-[12px] font-bold tracking-[0.2em] uppercase text-[#E6A032]">
              {companyInfo.tagline}
            </p>
          </div>
        </header>

        {/* Story + image */}
        <section className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[#141210]/5 lg:sticky lg:top-28">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="A premium home delivered by Prime Homes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="font-light leading-[1.18] tracking-[-0.01em] text-[#141210] text-[26px] md:text-[34px] max-w-2xl">
                In a market often challenged by uncertainty, we stand out by
                prioritising{" "}
                <span className="italic font-medium" style={{ color: "#E6A032" }}>
                  transparency, due diligence, and value delivery
                </span>
                .
              </p>
              <div className="mt-6 space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-[#141210]/80 max-w-xl">
                <p>
                  We specialise in delivering secure, well-structured, and
                  high-value property solutions tailored to the needs of
                  individuals, corporate organisations, and diaspora investors,
                  ensuring every client makes informed and profitable real estate
                  decisions.
                </p>
                <p>
                  We understand that real estate is one of the most significant
                  investments anyone can make. That is why we go beyond
                  conventional practice with{" "}
                  <em className="not-italic font-bold text-[#141210]">
                    end-to-end solutions
                  </em>,{" "}
                  every transaction backed by thorough due diligence and
                  professional expertise.
                </p>
              </div>

              {/* Offerings list */}
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OFFERINGS.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-[14.5px] text-[#141210]/85">
                    <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#005A32] text-white shrink-0">
                      <FiCheck className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-[15px] md:text-[16px] leading-[1.8] text-[#141210]/80 max-w-xl">
                Prime Homes is not just a real estate company, we are your
                trusted partner in building wealth through property.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#141210] text-white py-14 md:py-20">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-[26px] md:text-[36px] font-display font-light text-[#E6A032] leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <article className="relative bg-[#FBF8F1] border border-[#141210]/10 rounded-sm p-8 md:p-12 overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#E6A032" }} aria-hidden="true" />
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E6A032]/15 border border-[#E6A032]/30 text-white mb-6">
                <FiEye className="w-6 h-6" aria-hidden="true" />
              </span>
              <h2 className="font-display font-light text-[#141210] text-[26px] md:text-[32px] mb-4">Our Vision</h2>
              <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#141210]/75">
                {companyInfo.vision}
              </p>
            </article>

            <article className="relative bg-[#141210] text-white rounded-sm p-8 md:p-12 overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#E6A032" }} aria-hidden="true" />
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E6A032]/15 border border-[#E6A032]/30 text-[#E6A032] mb-6">
                <FiTarget className="w-6 h-6" aria-hidden="true" />
              </span>
              <h2 className="font-display font-light text-[26px] md:text-[32px] mb-4">Our Mission</h2>
              <p className="text-[15px] md:text-[16px] leading-[1.8] text-white/75">
                {companyInfo.mission}
              </p>
            </article>
          </div>
        </section>

        {/* Strategic goals */}
        <section className="bg-[#FBF8F1] py-16 md:py-24">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
            <div className="max-w-2xl mb-12 md:mb-16">
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-5">
                Strategic Goals
              </p>
              <h2 className="font-display font-light leading-[1.04] tracking-[-0.02em] text-[#141210] text-[36px] md:text-[48px]">
                Where we&apos;re{" "}
                <span className="font-light italic" style={{ color: "#E6A032" }}>
                  headed
                </span>
                .
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#141210]/10">
              {strategicGoals.map((g) => (
                <article key={g.number} className="group relative bg-[#FBF8F1] p-8 md:p-10 hover:bg-white transition-colors">
                  <span className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ backgroundColor: "#E6A032" }} aria-hidden="true" />
                  <span className="text-[34px] md:text-[40px] font-display font-light leading-none" style={{ color: "#E6A032" }}>
                    {g.number}
                  </span>
                  <h3 className="mt-4 font-display font-light leading-[1.15] tracking-[-0.01em] text-[#141210] text-[20px] md:text-[23px] mb-3">
                    {g.title}
                  </h3>
                  <p className="text-[14px] leading-[1.75] text-[#141210]/70">
                    {g.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* POSH ecosystem */}
        <section className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-24">
          <div className="bg-[#141210] text-white rounded-sm p-8 md:p-14 relative overflow-hidden">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E6A032] mb-5">
                  The Prime Homes Ecosystem
                </p>
                <h2 className="font-display font-light leading-[1.08] tracking-[-0.01em] text-[28px] md:text-[40px] max-w-xl">
                  Powered by{" "}
                  <span className="font-light italic" style={{ color: "#E6A032" }}>
                    POSH
                  </span>
                  .
                </h2>
                <p className="mt-6 text-[15px] md:text-[16px] leading-[1.8] text-white/75 max-w-xl">
                  Prime One Stop Homes (POSH) operates as part of the Prime Homes
                  ecosystem, providing clients with a complete, end-to-end real
                  estate experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-sm p-6">
                  <p className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#E6A032] mb-3">
                    Prime Homes
                  </p>
                  <p className="text-[14px] leading-[1.7] text-white/75">
                    The front-facing brand, sales, marketing, and acquisition.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-sm p-6">
                  <p className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#E6A032] mb-3">
                    POSH Ltd
                  </p>
                  <p className="text-[14px] leading-[1.7] text-white/75">
                    The back-end ecosystem, technology, services, artisans, and
                    execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#FBF8F1] py-16 md:py-24">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-5">
                Client Stories
              </p>
              <h2 className="font-display font-light leading-[1.04] tracking-[-0.02em] text-[#141210] text-[36px] md:text-[48px]">
                Trusted by buyers, investors &{" "}
                <span className="font-light italic" style={{ color: "#E6A032" }}>
                  landlords
                </span>
                .
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonialsData.map((t) => (
                <figure key={t.name} className="bg-white border border-[#141210]/10 rounded-sm p-8 flex flex-col">
                  <div className="flex gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-[#E6A032] fill-[#E6A032]" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[15px] leading-[1.75] text-[#141210]/80 flex-1">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-[#141210]/10">
                    <p className="font-bold text-[#141210] text-[14px]">{t.name}</p>
                    <p className="text-[12px] text-[#141210]/55">{t.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#141210] text-white py-16 md:py-24">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto text-center">
            <h2 className="font-display font-light text-[32px] md:text-[48px] leading-tight max-w-3xl mx-auto">
              Ready to invest with confidence?
            </h2>
            <p className="mt-4 text-white/70 text-[15px] md:text-[17px] max-w-xl mx-auto">
              Browse our verified listings or talk to a Prime Homes advisor today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/all-products"
                className="group inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.16em] uppercase transition-colors"
              >
                Browse Listings
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white/5 border border-white/30 hover:border-white/55 text-white text-[12px] font-bold tracking-[0.16em] uppercase transition-colors"
              >
                Speak to an Advisor
                <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
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
