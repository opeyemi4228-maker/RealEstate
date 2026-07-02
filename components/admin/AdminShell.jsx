"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiGrid,
  FiUsers,
  FiMail,
  FiMessageSquare,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";

const NAV = [
  { href: "/admin", label: "Overview", Icon: FiGrid, exact: true },
  { href: "/admin/trainees", label: "Trainees", Icon: FiUsers },
  { href: "/admin/subscribers", label: "Subscribers", Icon: FiMail },
  { href: "/admin/messages", label: "Messages", Icon: FiMessageSquare },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div
      className="min-h-screen bg-[#F4F6FA] flex"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 bg-[#141210] text-white flex flex-col fixed inset-y-0 left-0">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#E6A032]">
            GCSA Consulting
          </p>
          <p className="text-sm font-bold mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ href, label, Icon, exact }) => {
            const active = isActive({ href, exact });
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition",
                  active
                    ? "bg-[#E6A032] text-white font-bold"
                    : "text-white/70 hover:text-white hover:bg-white/[0.07]",
                ].join(" ")}
              >
                <Icon className="w-[18px] h-[18px]" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-white/60 hover:text-white hover:bg-white/[0.07] transition"
          >
            <FiExternalLink className="w-[18px] h-[18px]" />
            View website
          </Link>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-white/60 hover:text-white hover:bg-white/[0.07] transition disabled:opacity-50"
          >
            <FiLogOut className="w-[18px] h-[18px]" />
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-[240px] p-8 lg:p-10">{children}</main>
    </div>
  );
}
