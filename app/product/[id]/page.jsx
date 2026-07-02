"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiCheck,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import { LuBedDouble, LuBath, LuMaximize, LuCar, LuCalendarClock } from "react-icons/lu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

const Property = () => {
  const { id } = useParams();
  const { products, formatPrice, getAgentById } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const property = useMemo(
    () => products.find((p) => p._id === id),
    [products, id]
  );

  useEffect(() => {
    setMainImage(null);
  }, [id]);

  if (!property) return <Loading />;

  const agent = getAgentById?.(property.agentId);
  const isRent = property.status === "For Rent";
  const similar = products
    .filter((p) => p._id !== property._id && p.category === property.category)
    .slice(0, 4);
  const fallback = products.filter((p) => p._id !== property._id).slice(0, 4);
  const related = similar.length ? similar : fallback;

  const SPECS = [
    { Icon: LuBedDouble, label: "Bedrooms", value: property.bedrooms },
    { Icon: LuBath, label: "Bathrooms", value: property.bathrooms },
    { Icon: LuMaximize, label: "Area", value: `${property.areaSqFt?.toLocaleString()} sqft` },
    { Icon: LuCar, label: "Garage", value: property.garage ?? 0 },
    { Icon: LuCalendarClock, label: "Year Built", value: property.yearBuilt ?? "N/A" },
  ];

  return (
    <>
      <Navbar />

      <main
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto pt-28 md:pt-32 pb-16">
          <Link
            href="/all-products"
            className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#141210]/60 hover:text-[#E6A032] transition-colors mb-8"
          >
            <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14">
            {/* Left: gallery + details */}
            <div>
              {/* Gallery */}
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-[#141210]/5">
                <Image
                  src={mainImage || property.image[0]}
                  alt={property.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <span
                  className={[
                    "absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-[0.16em] uppercase shadow-sm",
                    isRent ? "bg-[#005A32] text-white" : "bg-[#E6A032] text-white",
                  ].join(" ")}
                >
                  {property.status}
                </span>
              </div>

              {property.image.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {property.image.map((image, index) => {
                    const active = (mainImage || property.image[0]) === image;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setMainImage(image)}
                        className={[
                          "relative aspect-[4/3] rounded-sm overflow-hidden bg-[#141210]/5 transition-all",
                          active ? "ring-2 ring-[#E6A032]" : "opacity-80 hover:opacity-100",
                        ].join(" ")}
                      >
                        <Image
                          src={image}
                          alt={`${property.name}, photo ${index + 1}`}
                          fill
                          sizes="20vw"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Title + price (mobile) */}
              <div className="mt-8">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#141210]/[0.05] text-[10px] font-bold tracking-[0.14em] uppercase text-[#141210]/65 mb-3">
                  {property.category}
                </span>
                <h1 className="font-display font-light leading-[1.1] tracking-[-0.01em] text-[#141210] text-[28px] md:text-[36px]">
                  {property.name}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-[14px] text-[#141210]/65">
                  <FiMapPin className="w-4 h-4 text-[#E6A032]" aria-hidden="true" />
                  {property.location?.address}, {property.location?.city}, {property.location?.state}
                </p>
              </div>

              {/* Specs */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#141210]/10 border border-[#141210]/10 rounded-sm overflow-hidden">
                {SPECS.map((s) => (
                  <div key={s.label} className="bg-white p-4 md:p-5 text-center">
                    <s.Icon className="w-5 h-5 text-[#E6A032] mx-auto mb-2" aria-hidden="true" />
                    <p className="text-[16px] font-display font-light text-[#141210] leading-none">
                      {s.value}
                    </p>
                    <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-[#141210]/50 mt-1.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-10">
                <h2 className="font-display text-[23px] font-normal text-[#141210] mb-4">About this property</h2>
                <p className="text-[15px] leading-[1.8] text-[#141210]/75">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-display text-[23px] font-normal text-[#141210] mb-5">Features & amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-2 text-[14px] text-[#141210]/80"
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#005A32] text-white">
                          <FiCheck className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sticky price + agent */}
            <aside className="lg:sticky lg:top-28 lg:self-start space-y-5">
              <div className="bg-white border border-[#141210]/10 rounded-sm p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.4)]">
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#141210]/50 mb-1">
                  {isRent ? "Monthly Rent" : "Asking Price"}
                </p>
                <p className="text-[34px] font-display font-normal text-[#141210] leading-none">
                  {formatPrice(property.offerPrice ?? property.price)}
                  {isRent && <span className="text-[14px] font-semibold text-[#141210]/50"> /mo</span>}
                </p>
                {property.price > (property.offerPrice ?? property.price) && (
                  <p className="mt-1 text-[13px] text-[#141210]/45 line-through">
                    {formatPrice(property.price)}
                  </p>
                )}

                <div className="mt-6 space-y-3">
                  <Link
                    href={`/contact?property=${property._id}&action=schedule`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[12px] font-extrabold tracking-[0.14em] uppercase transition-colors"
                  >
                    <FiCalendar className="w-4 h-4" aria-hidden="true" />
                    Schedule a Viewing
                  </Link>
                  <Link
                    href={`/contact?property=${property._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#141210] hover:bg-[#0A0806] text-white text-[12px] font-extrabold tracking-[0.14em] uppercase transition-colors"
                  >
                    Request Info
                  </Link>
                </div>
              </div>

              {/* Agent card */}
              {agent && (
                <div className="bg-[#141210] text-white rounded-sm p-6">
                  <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#E6A032] mb-4">
                    Listed by
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-[#E6A032]/40">
                      <Image src={agent.photo} alt={agent.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-[16px]">{agent.name}</p>
                      <p className="text-white/60 text-[12px]">{agent.title}</p>
                      <p className="text-white/40 text-[11px] mt-0.5">License {agent.license}</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2.5">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-3 text-[13.5px] text-white/85 hover:text-[#E6A032] transition-colors"
                    >
                      <FiPhone className="w-4 h-4 text-[#E6A032]" aria-hidden="true" />
                      {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 text-[13.5px] text-white/85 hover:text-[#E6A032] transition-colors"
                    >
                      <FiMail className="w-4 h-4 text-[#E6A032]" aria-hidden="true" />
                      {agent.email}
                    </a>
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-20 md:mt-28">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display font-light text-[#141210] text-[26px] md:text-[34px]">
                  Similar{" "}
                  <span className="font-light italic" style={{ color: "#E6A032" }}>
                    properties
                  </span>
                </h2>
                <Link
                  href="/all-products"
                  className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#141210] hover:text-[#E6A032] transition-colors"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {related.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Property;
