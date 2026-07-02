"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  LayoutGrid,
  Tag,
  KeyRound,
  Home,
  Building2,
  Briefcase,
  TrendingUp,
  Wrench,
  ClipboardList,
} from "lucide-react";

/**
 * Navbar, Prime Homes
 *
 * Brand identity (per training flyer):
 * - Navy:  #141210   (primary dark)
 * - Gold:  #E6A032   (accent)
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
  navy: "#141210",
  navyDeep: "#0A0806",
  gold: "#E6A032",
  goldHover: "#C88C28",
};

// Primary navigation for the property marketplace
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    href: "/all-products",
    children: [
      { label: "All Properties", href: "/all-products", Icon: LayoutGrid, desc: "Browse every listing" },
      { label: "For Sale", href: "/all-products?status=For Sale", Icon: Tag, desc: "Homes available to buy" },
      { label: "For Rent", href: "/all-products?status=For Rent", Icon: KeyRound, desc: "Rentals & lettings" },
      { label: "Houses", href: "/all-products?category=House", Icon: Home, desc: "Duplexes & detached" },
      { label: "Apartments", href: "/all-products?category=Apartment", Icon: Building2, desc: "Flats & serviced units" },
      { label: "Commercial", href: "/all-products?category=Commercial", Icon: Briefcase, desc: "Offices & retail space" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Sourcing & Acquisition", href: "/services#sourcing", Icon: Home, desc: "Secure the right property" },
      { label: "Investment Advisory", href: "/services#investment", Icon: TrendingUp, desc: "Portfolio guidance" },
      { label: "Development & Supervision", href: "/services#development", Icon: Building2, desc: "Projects done right" },
      { label: "Legal & Documentation", href: "/services#legal", Icon: ClipboardList, desc: "Due diligence & titles" },
      { label: "Management & Consultancy", href: "/services#management", Icon: Wrench, desc: "Hands-off ownership" },
    ],
  },
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

  const textColor = scrolled ? "text-black" : "text-[#E6A032]";

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          scrolled
            ? "bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.08),0_8px_24px_-12px_rgba(0,0,0,0.18)]"
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
            {/* Logo + wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/60 rounded-sm group"
              aria-label="Prime Homes, home"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src="/prime-homes-logo.png"
                alt="Prime Homes"
                width={956}
                height={481}
                priority
                className={[
                  "w-auto transition-all duration-300",
                  scrolled ? "h-[46px] md:h-[50px]" : "h-[50px] md:h-[56px]",
                  scrolled ? "" : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]",
                ].join(" ")}
              />
              <span
                className={[
                  "flex flex-col justify-center leading-none pl-3.5 ml-0.5 border-l transition-colors duration-300",
                  scrolled ? "border-black/10" : "border-white/25",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-[10px] md:text-[11px] font-semibold tracking-[0.34em] uppercase whitespace-nowrap transition-colors duration-300",
                    scrolled ? "text-[#C88C28]" : "text-[#EBB45A]",
                  ].join(" ")}
                >
                  Premium Real Estate
                </span>
              </span>
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
                        scrolled
                          ? "hover:text-[#E6A032] focus:text-[#E6A032]"
                          : "hover:text-white focus:text-white",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40",
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
                      <div className="absolute left-0 top-full pt-3 min-w-[340px]" role="menu">
                        <div
                          className="bg-white border-t-[3px] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] rounded-b-sm p-2.5 animate-in fade-in slide-in-from-top-1 duration-200"
                          style={{ borderTopColor: BRAND.gold }}
                        >
                          {item.children.map((child) => {
                            const ChildIcon = child.Icon;
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                role="menuitem"
                                className="group/item flex items-center gap-3.5 px-3 py-2.5 rounded-sm hover:bg-[#141210]/[0.035] focus:bg-[#141210]/[0.035] focus:outline-none transition-colors"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {ChildIcon && (
                                  <span
                                    className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#005A32]/[0.08] text-[#005A32] group-hover/item:bg-[#E6A032] group-hover/item:text-white transition-colors duration-200"
                                    aria-hidden="true"
                                  >
                                    <ChildIcon className="w-[18px] h-[18px]" strokeWidth={2} />
                                  </span>
                                )}
                                <span className="flex flex-col leading-tight">
                                  <span className="text-[15px] font-semibold text-black group-hover/item:text-[#E6A032] transition-colors">
                                    {child.label}
                                  </span>
                                  {child.desc && (
                                    <span className="text-[12px] text-[#141210]/50">
                                      {child.desc}
                                    </span>
                                  )}
                                </span>
                                <ArrowRight
                                  className="ml-auto w-4 h-4 text-[#E6A032] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200"
                                  strokeWidth={2.5}
                                  aria-hidden="true"
                                />
                              </Link>
                            );
                          })}
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
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032]",
                  scrolled
                    ? "bg-[#141210] hover:bg-[#0A0806] text-white shadow-sm hover:shadow-md focus-visible:ring-offset-white"
                    : "bg-[#E6A032] hover:bg-[#C88C28] text-white shadow-[0_8px_24px_-8px_rgba(230,160,50,0.6)] focus-visible:ring-offset-transparent",
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
                "hover:text-[#E6A032] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40",
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
          className="absolute inset-0 bg-[#141210]/70 backdrop-blur-sm"
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
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-[#141210]/10">
            <div className="flex items-center gap-2.5">
              <Image
                src="/prime-homes-logo.png"
                alt="Prime Homes"
                width={956}
                height={481}
                className="h-[42px] w-auto"
              />
              <span className="font-display text-[18px] font-semibold tracking-[0.01em] text-[#141210] pl-2.5 border-l border-black/10">
                Prime Homes
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 inline-flex items-center justify-center text-[#141210] hover:text-[#E6A032] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A032]/40 rounded-sm"
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

            <div className="p-6 border-t border-[#141210]/10 space-y-3">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#E6A032] hover:bg-[#C88C28] text-white text-[14px] md:text-[15px] font-bold tracking-[0.14em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6A032]"
            >
              List Your Property
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <Link
              href="/all-products"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#141210] text-[#141210] text-[14px] md:text-[15px] font-bold tracking-[0.14em] uppercase transition-colors hover:bg-[#141210] hover:text-white"
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
          className="flex items-center justify-between py-3.5 text-[15px] md:text-[16px] font-semibold text-black hover:text-[#E6A032] transition-colors border-b border-[#141210]/10"
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
        className="w-full flex items-center justify-between py-3.5 text-[15px] font-semibold text-black hover:text-[#E6A032] transition-colors border-b border-[#141210]/10 focus:outline-none"
        aria-expanded={expanded}
      >
        {item.label}
        <ChevronDown
          className={["w-4 h-4 transition-transform duration-200", expanded ? "rotate-180" : ""].join(" ")}
          strokeWidth={2.5}
          style={{ color: "#E6A032" }}
          aria-hidden="true"
        />
      </button>
      <div
        className={[
          "overflow-hidden transition-[max-height] duration-300 ease-out",
          expanded ? "max-h-[600px]" : "max-h-0",
        ].join(" ")}
      >
        <ul className="py-2 pl-4 border-l-2 ml-1 my-2" style={{ borderLeftColor: "#E6A032" }}>
          {item.children.map((child) => {
            const ChildIcon = child.Icon;
            return (
              <li key={child.label}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className="group/item flex items-center gap-3 py-2.5 pl-3 text-[15px] text-[#141210]/75 hover:text-[#E6A032] transition-colors"
                >
                  {ChildIcon && (
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#005A32]/[0.08] text-[#005A32] group-hover/item:bg-[#E6A032] group-hover/item:text-white transition-colors"
                      aria-hidden="true"
                    >
                      <ChildIcon className="w-[16px] h-[16px]" strokeWidth={2} />
                    </span>
                  )}
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default Navbar;