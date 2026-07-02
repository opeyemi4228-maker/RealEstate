"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

/**
 * FeaturedListings, homepage grid of featured properties.
 * Filter chips switch between Buy / Rent. Navy/gold brand.
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

const FILTERS = ["Featured", "For Sale", "For Rent"];

const FeaturedListings = () => {
  const { products } = useAppContext();
  const [headerRef, headerVisible] = useReveal();
  const [filter, setFilter] = useState("Featured");

  const listings = useMemo(() => {
    let list = products;
    if (filter === "Featured") list = products.filter((p) => p.featured);
    else list = products.filter((p) => p.status === filter);
    return list.slice(0, 6);
  }, [products, filter]);

  return (
    <section
      id="listings"
      aria-labelledby="listings-heading"
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
            "radial-gradient(120% 120% at 0% 0%, #000 25%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(120% 120% at 0% 0%, #000 25%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={[
            "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#141210]/60 mb-5">
              Featured Listings
            </p>
            <h2
              id="listings-heading"
              className="font-display font-light leading-[1.05] tracking-[-0.005em] text-[#141210] text-[38px] md:text-[52px] lg:text-[60px]"
            >
              Handpicked homes{" "}
              <span className="font-light italic" style={{ color: "#E6A032" }}>
                worth viewing
              </span>
              .
            </h2>
          </div>

          <Link
            href="/all-products"
            className="group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] uppercase text-[#141210] hover:text-[#E6A032] transition-colors shrink-0"
          >
            View all properties
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={[
                "px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300",
                filter === f
                  ? "bg-[#141210] text-white"
                  : "bg-[#141210]/[0.04] text-[#141210]/70 hover:bg-[#141210]/10",
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {listings.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-[#141210]/60 text-[15px] py-10">
            No listings in this category right now, check back soon.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
