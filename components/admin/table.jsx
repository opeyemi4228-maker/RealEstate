import React from "react";

/** Shared presentational pieces for admin data pages (server components). */

export function PageHeader({ title, subtitle, count }) {
  return (
    <header className="mb-7 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[#141210] tracking-tight">{title}</h1>
        {subtitle && <p className="text-[#141210]/55 text-sm mt-1">{subtitle}</p>}
      </div>
      {typeof count === "number" && (
        <span className="shrink-0 inline-flex items-center px-3 py-1.5 rounded-full bg-[#141210] text-white text-[12px] font-bold">
          {count} total
        </span>
      )}
    </header>
  );
}

export function DbError({ message }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
      Could not reach the database. Check <code className="font-mono">DATABASE_URL</code>.{" "}
      <span className="opacity-70">({message})</span>
    </div>
  );
}

export function EmptyState({ children }) {
  return (
    <div className="bg-white rounded-2xl p-12 text-center text-[#141210]/45 text-sm shadow-[0_2px_12px_-4px_rgba(0,0,0,0.12)]">
      {children}
    </div>
  );
}

export function TableCard({ headers, children }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.12)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#141210]/[0.03] border-b border-[#141210]/10">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#141210]/55 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";
