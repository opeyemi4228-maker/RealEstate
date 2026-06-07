"use client";

import React, { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch, FiSliders } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { propertyCategories, propertyStatuses } from "@/assets/realEstateData";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const PropertiesInner = () => {
  const { products } = useAppContext();
  const searchParams = useSearchParams();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  // Seed filters from URL (set by the hero search / nav links)
  useEffect(() => {
    setQ(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "All");
    setStatus(searchParams.get("status") || "All");
  }, [searchParams]);

  const results = useMemo(() => {
    let list = [...products];
    const term = q.trim().toLowerCase();
    if (term) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.location?.city?.toLowerCase().includes(term) ||
          p.location?.state?.toLowerCase().includes(term) ||
          p.location?.address?.toLowerCase().includes(term)
      );
    }
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (status !== "All") list = list.filter((p) => p.status === status);

    if (sort === "price-asc") list.sort((a, b) => (a.offerPrice ?? a.price) - (b.offerPrice ?? b.price));
    else if (sort === "price-desc") list.sort((a, b) => (b.offerPrice ?? b.price) - (a.offerPrice ?? a.price));
    else list.sort((a, b) => b.date - a.date);

    return list;
  }, [products, q, category, status, sort]);

  return (
    <>
      <Navbar />

      {/* Page header */}
      <header className="relative bg-[#0A1A36] text-white pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
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
            Property Listings
          </p>
          <h1 className="font-extrabold leading-[1.02] tracking-[-0.02em] text-[40px] md:text-[56px]">
            Find your next{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              address
            </span>
            .
          </h1>
        </div>
      </header>

      {/* Filter bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#0A1A36]/10">
        <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-3">
            <label className="flex items-center gap-2.5 px-4 py-2.5 rounded-sm bg-[#0A1A36]/[0.04] border border-transparent focus-within:border-[#FFC72C]">
              <FiSearch className="w-4 h-4 text-[#FFC72C] shrink-0" aria-hidden="true" />
              <span className="sr-only">Search</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by city, address, or name"
                className="w-full bg-transparent text-[14px] text-[#0A1A36] placeholder:text-[#0A1A36]/45 focus:outline-none"
              />
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Property type"
              className="px-4 py-2.5 rounded-sm bg-[#0A1A36]/[0.04] text-[14px] font-medium text-[#0A1A36] focus:outline-none cursor-pointer"
            >
              {propertyCategories.map((c) => (
                <option key={c}>{c === "All" ? "All types" : c}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Status"
              className="px-4 py-2.5 rounded-sm bg-[#0A1A36]/[0.04] text-[14px] font-medium text-[#0A1A36] focus:outline-none cursor-pointer"
            >
              {propertyStatuses.map((s) => (
                <option key={s}>{s === "All" ? "Buy or rent" : s}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort"
              className="px-4 py-2.5 rounded-sm bg-[#0A1A36]/[0.04] text-[14px] font-medium text-[#0A1A36] focus:outline-none cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-12 md:py-16">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-[#0A1A36]/60 mb-8">
          <FiSliders className="w-4 h-4 text-[#FFC72C]" aria-hidden="true" />
          {results.length} {results.length === 1 ? "property" : "properties"} found
        </p>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {results.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[20px] font-bold text-[#0A1A36] mb-2">No matching properties</p>
            <p className="text-[14px] text-[#0A1A36]/60">
              Try widening your search or clearing the filters.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

const AllProducts = () => (
  <Suspense fallback={null}>
    <PropertiesInner />
  </Suspense>
);

export default AllProducts;
