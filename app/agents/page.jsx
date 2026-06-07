"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { agentsData } from "@/assets/realEstateData";

const Agents = () => {
  return (
    <>
      <Navbar />

      <main
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        {/* Header */}
        <header className="relative bg-[#0A1A36] text-white pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
            aria-hidden="true"
          />
          <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-5">
              <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
              Our Team
            </p>
            <h1 className="font-extrabold leading-[1.02] tracking-[-0.02em] text-[42px] md:text-[60px] max-w-3xl">
              Meet the agents who{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                know your market
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-[15px] md:text-[16px] leading-[1.7] text-white/70">
              Experienced, local, and relentlessly on your side. Whether you&apos;re
              buying, selling, renting, or investing, there&apos;s an expert here for you.
            </p>
          </div>
        </header>

        {/* Grid */}
        <section className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {agentsData.map((agent) => (
              <AgentCard key={agent._id} agent={agent} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#FBF8F1] py-16 md:py-24">
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
            <div className="bg-[#0A1A36] rounded-sm p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="font-extrabold text-white text-[28px] md:text-[38px] leading-tight">
                  Thinking of joining our team?
                </h2>
                <p className="mt-4 text-white/70 text-[15px] leading-[1.7]">
                  We&apos;re always looking for driven, client-first agents. Get in
                  touch to learn about careers at Real Estate.
                </p>
              </div>
              <Link
                href="/contact?subject=Careers"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[12px] font-extrabold tracking-[0.16em] uppercase transition-colors shrink-0 self-start"
              >
                Get in touch
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Agents;
