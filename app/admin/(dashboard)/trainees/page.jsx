import prisma from "@/lib/prisma";
import { PageHeader, TableCard, EmptyState, DbError, fmtDate } from "@/components/admin/table";

export const dynamic = "force-dynamic";

async function getTrainees() {
  try {
    const docs = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return { docs, error: null };
  } catch (err) {
    return { docs: [], error: err.message };
  }
}

const money = (amount, currency) =>
  amount != null ? `${(amount / 100).toFixed(2)} ${String(currency || "").toUpperCase()}` : "N/A";

const STATUS_STYLES = {
  paid: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  awaiting_payment: "bg-amber-50 text-amber-700",
};
const STATUS_LABELS = {
  paid: "Paid",
  pending: "Pending payment",
  awaiting_payment: "Awaiting payment",
};
const StatusBadge = ({ status }) => {
  const key = status || "pending";
  return (
    <span
      className={[
        "inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap",
        STATUS_STYLES[key] || "bg-[#141210]/5 text-[#141210]/60",
      ].join(" ")}
    >
      {STATUS_LABELS[key] || key}
    </span>
  );
};

export default async function TraineesPage() {
  const { docs, error } = await getTrainees();

  return (
    <div>
      <PageHeader
        title="Registered Trainees"
        subtitle="Programme registrations from the training pages."
        count={error ? undefined : docs.length}
      />

      {error ? (
        <DbError message={error} />
      ) : docs.length === 0 ? (
        <EmptyState>No registrations yet.</EmptyState>
      ) : (
        <TableCard
          headers={["Name", "Email", "Phone", "Country", "Programme", "Plan", "Amount", "Status", "Registered"]}
        >
          {docs.map((d) => (
            <tr
              key={d.id}
              className="border-b border-[#141210]/[0.06] last:border-0 hover:bg-[#141210]/[0.02]"
            >
              <td className="px-4 py-3 text-[13px] font-semibold text-[#141210] whitespace-nowrap">
                {d.firstName} {d.lastName}
              </td>
              <td className="px-4 py-3 text-[13px] text-[#141210]/80">
                <a href={`mailto:${d.email}`} className="hover:text-[#141210] underline-offset-2 hover:underline">
                  {d.email}
                </a>
              </td>
              <td className="px-4 py-3 text-[13px] text-[#141210]/70 whitespace-nowrap">{d.phone || "N/A"}</td>
              <td className="px-4 py-3 text-[13px] text-[#141210]/70 whitespace-nowrap">{d.country || "N/A"}</td>
              <td className="px-4 py-3 text-[13px] text-[#141210]/70 whitespace-nowrap">{d.programmeId || "N/A"}</td>
              <td className="px-4 py-3 text-[13px] text-[#141210]/70 whitespace-nowrap">{d.plan || "N/A"}</td>
              <td className="px-4 py-3 text-[13px] text-[#141210]/70 whitespace-nowrap">{money(d.amountTotal, d.currency)}</td>
              <td className="px-4 py-3"><StatusBadge status={d.paymentStatus} /></td>
              <td className="px-4 py-3 text-[12px] text-[#141210]/55 whitespace-nowrap">{fmtDate(d.createdAt)}</td>
            </tr>
          ))}
        </TableCard>
      )}
    </div>
  );
}
