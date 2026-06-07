"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiMail, FiStar } from "react-icons/fi";

/**
 * AgentCard — a single agent profile card used on the homepage teaser and
 * the agents directory. Navy/gold brand.
 */
const AgentCard = ({ agent }) => {
  if (!agent) return null;
  const { _id, name, title, photo, phone, email, rating, sales, specialties } = agent;

  return (
    <article
      className="group flex flex-col bg-white rounded-sm border border-[#0A1A36]/10 overflow-hidden hover:border-[#FFC72C] hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(10,26,54,0.35)] transition-all duration-500"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0A1A36]/5">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06122A]/85 to-transparent" aria-hidden="true" />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#0A1A36]">
          <FiStar className="w-3 h-3 text-[#FFC72C] fill-[#FFC72C]" aria-hidden="true" />
          {rating}
        </span>
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-extrabold text-[18px] leading-tight">{name}</h3>
          <p className="text-white/75 text-[12px]">{title}</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {specialties?.slice(0, 3).map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full bg-[#0A1A36]/[0.05] text-[10px] font-semibold tracking-[0.06em] uppercase text-[#0A1A36]/65"
            >
              {s}
            </span>
          ))}
        </div>

        <p className="text-[12.5px] text-[#0A1A36]/60 mb-5">
          <span className="font-bold text-[#0A1A36]">{sales}+</span> properties closed
        </p>

        <div className="mt-auto flex items-center gap-2">
          <a
            href={`tel:${phone}`}
            aria-label={`Call ${name}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#0A1A36]/15 text-[#0A1A36] hover:bg-[#0A1A36] hover:text-white transition-colors"
          >
            <FiPhone className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${email}`}
            aria-label={`Email ${name}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#0A1A36]/15 text-[#0A1A36] hover:bg-[#0A1A36] hover:text-white transition-colors"
          >
            <FiMail className="w-4 h-4" aria-hidden="true" />
          </a>
          <Link
            href={`/contact?agent=${_id}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[11px] font-extrabold tracking-[0.14em] uppercase transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </article>
  );
};

export default AgentCard;
