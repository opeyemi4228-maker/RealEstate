import prisma from "@/lib/prisma";
import { PageHeader, EmptyState, DbError, fmtDate } from "@/components/admin/table";

export const dynamic = "force-dynamic";

async function getMessages() {
  try {
    const docs = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return { docs, error: null };
  } catch (err) {
    return { docs: [], error: err.message };
  }
}

export default async function MessagesPage() {
  const { docs, error } = await getMessages();

  return (
    <div>
      <PageHeader
        title="Contact Messages"
        subtitle="Submissions from the Contact Us page."
        count={error ? undefined : docs.length}
      />

      {error ? (
        <DbError message={error} />
      ) : docs.length === 0 ? (
        <EmptyState>No messages yet.</EmptyState>
      ) : (
        <div className="space-y-4">
          {docs.map((d) => (
            <article
              key={d.id}
              className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.12)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[14px] font-bold text-[#141210]">
                    {d.firstName} {d.lastName}
                    {d.company ? (
                      <span className="font-normal text-[#141210]/50"> · {d.company}</span>
                    ) : null}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[12.5px] text-[#141210]/65">
                    <a href={`mailto:${d.email}`} className="hover:underline underline-offset-2">
                      {d.email}
                    </a>
                    {d.phone && <span>{d.phone}</span>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#E6A032]/15 text-[#8A6410] text-[11px] font-semibold">
                    {d.subject || "General Enquiry"}
                  </span>
                  <p className="text-[11.5px] text-[#141210]/45 mt-1.5">{fmtDate(d.createdAt)}</p>
                </div>
              </div>
              <p className="text-[13.5px] leading-[1.7] text-[#141210]/85 whitespace-pre-wrap border-t border-[#141210]/[0.07] pt-3">
                {d.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
