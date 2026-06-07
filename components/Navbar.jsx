"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

/**
 * Navbar — Real Estate
 *
 * Brand identity (per training flyer):
 * - Navy:  #0A1A36   (primary dark)
 * - Gold:  #FFC72C   (accent)
 * - White: #FFFFFF
 * - Font:  Montserrat
 *
 * Behavior:
 * - Transparent over the hero; on scroll past 24px, fades to white with shadow
 * - Gold monogram (GCSA shield) anchors the wordmark
 * - Services dropdown links to anchor sections on the home page
 * - Mobile: right-side drawer with accordion sub-menus
 *
 * Integration:
 * - Ensure Montserrat is loaded globally (next/font)
 * - Hero must sit flush at top (no margin/padding above it)
 */

const BRAND = {
  navy: "#0A1A36",
  navyDeep: "#06122A",
  gold: "#FFC72C",
  goldHover: "#E6B324",
};

// Primary navigation for the property marketplace
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    href: "/all-products",
    children: [
      { label: "All Properties", href: "/all-products" },
      { label: "For Sale", href: "/all-products?status=For Sale" },
      { label: "For Rent", href: "/all-products?status=For Rent" },
      { label: "Houses", href: "/all-products?category=House" },
      { label: "Apartments", href: "/all-products?category=Apartment" },
      { label: "Commercial", href: "/all-products?category=Commercial" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Buy a Home", href: "/services#buy" },
      { label: "Sell a Property", href: "/services#sell" },
      { label: "Rent & Lettings", href: "/services#rent" },
      { label: "Property Management", href: "/services#manage" },
      { label: "Valuations & Advice", href: "/services#valuation" },
    ],
  },
  { label: "Agents", href: "/agents" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleDropdownEnter = useCallback((label) => setOpenDropdown(label), []);
  const handleDropdownLeave = useCallback(() => setOpenDropdown(null), []);

  const textColor = scrolled ? "text-[#0A1A36]" : "text-white";

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          scrolled
            ? "bg-white shadow-[0_1px_0_0_rgba(10,26,54,0.08),0_8px_24px_-12px_rgba(10,26,54,0.18)]"
            : "bg-transparent",
        ].join(" ")}
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <div className="px-6 md:px-10 lg:px-12 xl:px-16">
          <div
            className={[
              "flex items-center justify-between transition-all duration-300",
              scrolled ? "h-[86px]" : "h-[98px]",
            ].join(" ")}
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/60 rounded-sm group"
              aria-label="Real Estate — home"
              onClick={() => setMobileOpen(false)}
            >
              {/* Shield monogram */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]"
              >
                <path
                  d="M16 2 L28 6 V16 C28 22 22.6 27.5 16 30 C9.4 27.5 4 22 4 16 V6 L16 2 Z"
                  fill={scrolled ? BRAND.navy : BRAND.gold}
                  stroke={scrolled ? BRAND.gold : "#FFFFFF"}
                  strokeWidth="1.5"
                />
                <text
                  x="16"
                  y="20"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="800"
                  fill={scrolled ? BRAND.gold : BRAND.navy}
                  fontFamily="Montserrat, sans-serif"
                  letterSpacing="0.25"
                >
                  RE
                </text>
              </svg>

              <div className="flex flex-col leading-none">
                <span
                  className={[
                    "font-extrabold tracking-[0.04em] whitespace-nowrap transition-colors duration-300",
                    scrolled ? "text-[#0A1A36]" : "text-white",
                    "text-[22px] sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[26px]",
                  ].join(" ")}
                >
                  Real Estate
                  <span className="hidden sm:inline font-light">
                    {" "}
                    PROPERTY
                  </span>
                </span>
                <span
                  className={[
                    "hidden sm:block text-[11px] font-semibold tracking-[0.28em] uppercase mt-1 transition-colors duration-300",
                    scrolled ? "text-[#FFC72C]" : "text-[#FFC72C]",
                  ].join(" ")}
                >
                  Property Listings
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {NAV_ITEMS.map((item) => {
                const hasChildren = !!item.children;
                const isOpen = openDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
                      className={[
                        "group relative inline-flex items-center gap-1 px-2.5 py-2 text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] xl:text-[17px] font-semibold tracking-[0.02em] rounded-sm transition-colors duration-200",
                        textColor,
                        "hover:text-[#FFC72C] focus:text-[#FFC72C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40",
                      ].join(" ")}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? isOpen : undefined}
                    >
                      {item.label}
                      {hasChildren && (
                        <ChevronDown
                          className={[
                            "w-3.5 h-3.5 transition-transform duration-200",
                            isOpen ? "rotate-180" : "",
                          ].join(" ")}
                          strokeWidth={2.5}
                          style={{ color: BRAND.gold }}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className="pointer-events-none absolute left-3 right-3 bottom-1 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        style={{ backgroundColor: BRAND.gold }}
                        aria-hidden="true"
                      />
                    </Link>

                    {hasChildren && isOpen && (
                      <div className="absolute left-0 top-full pt-3 min-w-[300px]" role="menu">
                        <div
                          className="bg-white border-t-[3px] shadow-[0_12px_40px_-8px_rgba(10,26,54,0.25)] rounded-b-sm py-3 animate-in fade-in slide-in-from-top-1 duration-200"
                          style={{ borderTopColor: BRAND.gold }}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              role="menuitem"
                              className="block px-5 py-2.5 text-[16px] text-[#0A1A36] hover:text-[#FFC72C] hover:bg-[#0A1A36]/[0.03] focus:bg-[#0A1A36]/[0.03] focus:text-[#FFC72C] focus:outline-none transition-colors font-medium"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className={[
                  "group inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] md:text-[15px] lg:text-[15px] font-bold tracking-[0.14em] uppercase transition-all duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFC72C]",
                  scrolled
                    ? "bg-[#0A1A36] hover:bg-[#06122A] text-white shadow-sm hover:shadow-md focus-visible:ring-offset-white"
                    : "bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] shadow-[0_8px_24px_-8px_rgba(255,199,44,0.6)] focus-visible:ring-offset-transparent",
                ].join(" ")}
              >
                Contact Us
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={[
                "lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm transition-colors",
                textColor,
                "hover:text-[#FFC72C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40",
              ].join(" ")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={[
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileOpen}
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <div
          className="absolute inset-0 bg-[#0A1A36]/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={[
            "absolute top-0 right-0 bottom-0 w-full sm:w-[360px] md:w-[400px] lg:w-[360px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
            <div className="flex items-center justify-between px-6 h-[64px] border-b border-[#0A1A36]/10">
            <span className="text-[15px] md:text-[16px] font-extrabold tracking-[0.04em] text-[#0A1A36]">
              Real Estate <span className="font-light">PROPERTY</span>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 inline-flex items-center justify-center text-[#0A1A36] hover:text-[#FFC72C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-5" aria-label="Mobile primary">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <MobileNavItem key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
              ))}
            </ul>
          </nav>

            <div className="p-6 border-t border-[#0A1A36]/10 space-y-3">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[14px] md:text-[15px] font-bold tracking-[0.14em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFC72C]"
            >
              List Your Property
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <Link
              href="/all-products"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#0A1A36] text-[#0A1A36] text-[14px] md:text-[15px] font-bold tracking-[0.14em] uppercase transition-colors hover:bg-[#0A1A36] hover:text-white"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileNavItem = ({ item, onNavigate }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!item.children;

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex items-center justify-between py-3.5 text-[15px] md:text-[16px] font-semibold text-[#0A1A36] hover:text-[#FFC72C] transition-colors border-b border-[#0A1A36]/10"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between py-3.5 text-[15px] font-semibold text-[#0A1A36] hover:text-[#FFC72C] transition-colors border-b border-[#0A1A36]/10 focus:outline-none"
        aria-expanded={expanded}
      >
        {item.label}
        <ChevronDown
          className={["w-4 h-4 transition-transform duration-200", expanded ? "rotate-180" : ""].join(" ")}
          strokeWidth={2.5}
          style={{ color: "#FFC72C" }}
          aria-hidden="true"
        />
      </button>
      <div
        className={[
          "overflow-hidden transition-[max-height] duration-300 ease-out",
          expanded ? "max-h-[600px]" : "max-h-0",
        ].join(" ")}
      >
        <ul className="py-2 pl-4 border-l-2 ml-1 my-2" style={{ borderLeftColor: "#FFC72C" }}>
          {item.children.map((child) => (
            <li key={child.label}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="block py-2.5 pl-3 text-[15px] text-[#0A1A36]/75 hover:text-[#FFC72C] transition-colors"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Navbar;