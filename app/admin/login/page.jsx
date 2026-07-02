"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowRight } from "react-icons/fi";

/**
 * Admin login portal, standalone, not linked anywhere on the public site.
 * Reachable only by typing /admin (which redirects here when signed out).
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Invalid credentials");
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#141210] px-6"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[0.32em] uppercase text-[#E6A032] mb-3">
            GCSA Consulting
          </p>
          <h1 className="text-white text-2xl font-extrabold tracking-tight">Admin Portal</h1>
          <p className="text-white/50 text-sm mt-2">Authorised staff only</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        >
          <div className="mb-4">
            <label className="block text-[12px] font-semibold text-[#141210] mb-1.5">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#141210]/15 text-[14px] text-[#141210] focus:outline-none focus:border-[#E6A032] focus:ring-2 focus:ring-[#E6A032]/30 transition"
              placeholder="admin@gcsaconsulting.co.uk"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[12px] font-semibold text-[#141210] mb-1.5">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#141210]/15 text-[14px] text-[#141210] focus:outline-none focus:border-[#E6A032] focus:ring-2 focus:ring-[#E6A032]/30 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mb-4 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#141210] hover:bg-[#141210] text-white text-[12px] font-bold tracking-[0.16em] uppercase transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiLock className="w-4 h-4" />
            {loading ? "Signing in…" : "Sign in"}
            {!loading && (
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
