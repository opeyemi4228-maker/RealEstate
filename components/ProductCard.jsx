"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiArrowUpRight } from "react-icons/fi";
import { LuBedDouble, LuBath, LuMaximize } from "react-icons/lu";
import { useAppContext } from "@/context/AppContext";

/**
 * PropertyCard, Prime Homes listing card
 *
 * Navy/gold brand, image with status badge + price chip, location, and a
 * spec row (beds · baths · area). Entire card links to the detail page.
 */
const ProductCard = ({ product }) => {
  const { formatPrice } = useAppContext();
  if (!product) return null;

  const { _id, name, image, status, offerPrice, price, category, location } =
    product;
  const href = `/product/${_id}`;
  const isRent = status === "For Rent";

  return (
    <Link
      href={href}
      onClick={() => scrollTo(0, 0)}
      className="group flex flex-col bg-white rounded-sm border border-[#141210]/10 overflow-hidden hover:border-[#E6A032] hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.35)] transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#141210]/5">
        <Image
          src={image[0]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />

        {/* Status badge */}
        <span
          className={[
            "absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-[0.16em] uppercase shadow-sm",
            isRent ? "bg-[#005A32] text-white" : "bg-[#E6A032] text-white",
          ].join(" ")}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {status || "For Sale"}
        </span>

        {/* Category chip */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-[0.14em] uppercase text-[#141210]">
          {category}
        </span>

        {/* Price chip */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0A0806]/90 to-transparent">
          <p className="text-white font-display font-normal text-[22px] leading-none">
            {formatPrice(offerPrice ?? price)}
            {isRent && (
              <span className="text-[11px] font-semibold text-white/70"> /mo</span>
            )}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-[18px] font-normal text-[#141210] leading-snug line-clamp-2 group-hover:text-[#E6A032] transition-colors">
          {name}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-[12.5px] text-[#141210]/60">
          <FiMapPin className="w-3.5 h-3.5 text-[#E6A032] shrink-0" aria-hidden="true" />
          <span className="truncate">
            {location?.city}, {location?.state}
          </span>
        </p>

        {/* Spec row */}
        <div className="mt-4 pt-4 border-t border-[#141210]/10 flex items-center justify-between text-[12.5px] text-[#141210]/75">
          <Spec Icon={LuBedDouble} value={product.bedrooms} label="bd" />
          <Spec Icon={LuBath} value={product.bathrooms} label="ba" />
          <Spec Icon={LuMaximize} value={product.areaSqFt?.toLocaleString()} label="sqft" />
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#141210]/15 text-white group-hover:bg-[#E6A032] group-hover:border-[#E6A032] transition-all duration-300"
            aria-hidden="true"
          >
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const Spec = ({ Icon, value, label }) => (
  <span className="inline-flex items-center gap-1.5">
    <Icon className="w-4 h-4 text-[#141210]/45" aria-hidden="true" />
    <span className="font-semibold">{value ?? "N/A"}</span>
    <span className="text-[#141210]/45">{label}</span>
  </span>
);

export default ProductCard;
