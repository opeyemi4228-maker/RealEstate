import prisma from "@/lib/prisma";
import { PageHeader, TableCard, EmptyState, DbError, fmtDate } from "@/components/admin/table";

export const dynamic = "force-dynamic";

async function getSubscribers() {
  try {
    const docs = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 2000,
    });
    return { docs, error: null };
  } catch (err) {
    return { docs: [], error: err.message };
  }
}

export default async function SubscribersPage() {
  const { docs, error } = await getSubscribers();

  return (
    <div>
      <PageHeader
        title="Email Subscriptions"
        subtitle="People who subscribed via the website footer."
        count={error ? undefined : docs.length}
      />

      {error ? (
        <DbError message={error} />
      ) : docs.length === 0 ? (
        <EmptyState>No subscribers yet.</EmptyState>
      ) : (
        <TableCard headers={["Email", "Name", "Status", "Source", "Subscribed"]}>
          {docs.map((d) => (
            <tr
              key={d.id}
              className="border-b border-[#141210]/[0.06] last:border-0 hover:bg-[#141210]/[0.02]"
            >
              <td className="px-4 py-3 text-[13px] font-semibold text-[#141210]">
                <a href={`mailto:${d.email}`} className="hover:underline underline-offset-2">
                  {d.email}
                </a>
              </td>
              <td className="px-4 py-3 text-[13px] text-[#141210]/70">
                {[d.firstName, d.lastName].filter(Boolean).join(" ") || "N/A"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={[
                    "inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold",
                    d.status === "subscribed"
                      ? "bg-green-50 text-green-700"
                      : "bg-[#141210]/5 text-[#141210]/50",
                  ].join(" ")}
                >
                  {d.status || "subscribed"}
                </span>
              </td>
              <td className="px-4 py-3 text-[13px] text-[#141210]/70">{d.source || "N/A"}</td>
              <td className="px-4 py-3 text-[12px] text-[#141210]/55 whitespace-nowrap">{fmtDate(d.createdAt)}</td>
            </tr>
          ))}
        </TableCard>
      )}
    </div>
  );
}
