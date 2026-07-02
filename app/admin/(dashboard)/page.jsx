import Link from "next/link";
import { FiUsers, FiMail, FiMessageSquare, FiArrowRight } from "react-icons/fi";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const [trainees, subscribers, messages, unread] = await Promise.all([
      prisma.registration.count(),
      prisma.subscriber.count({ where: { status: "subscribed" } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { handled: false } }),
    ]);
    return { trainees, subscribers, messages, unread, error: null };
  } catch (err) {
    return { trainees: 0, subscribers: 0, messages: 0, unread: 0, error: err.message };
  }
}

const CARDS = [
  { key: "trainees", label: "Registered trainees", href: "/admin/trainees", Icon: FiUsers },
  { key: "subscribers", label: "Email subscribers", href: "/admin/subscribers", Icon: FiMail },
  { key: "messages", label: "Contact messages", href: "/admin/messages", Icon: FiMessageSquare },
];

export default async function AdminOverview() {
  const counts = await getCounts();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#141210] tracking-tight">Overview</h1>
        <p className="text-[#141210]/55 text-sm mt-1">
          Everything captured from the website in one place.
        </p>
      </header>

      {counts.error && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
          Could not reach the database. Check <code className="font-mono">DATABASE_URL</code>.{" "}
          <span className="opacity-70">({counts.error})</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {CARDS.map(({ key, label, href, Icon }) => (
          <Link
            key={key}
            href={href}
            className="group bg-white rounded-2xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.2)] transition border border-transparent hover:border-[#E6A032]/40"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#141210]/[0.05] text-[#141210]">
                <Icon className="w-5 h-5" />
              </span>
              <FiArrowRight className="w-4 h-4 text-[#141210]/30 group-hover:text-[#E6A032] group-hover:translate-x-1 transition" />
            </div>
            <p className="text-3xl font-extrabold text-[#141210]">{counts[key]}</p>
            <p className="text-[13px] text-[#141210]/55 mt-1">{label}</p>
            {key === "messages" && counts.unread > 0 && (
              <p className="text-[12px] font-semibold text-[#E6A032] mt-2">
                {counts.unread} unread
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
