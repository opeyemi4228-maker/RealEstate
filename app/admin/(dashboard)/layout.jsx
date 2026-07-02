import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminAuth";
import AdminShell from "@/components/admin/AdminShell";

/**
 * Guard for every page under /admin (except /admin/login, which lives
 * outside this route group). Reading cookies() makes the segment dynamic,
 * so the check runs on every request. An invalid/expired/absent session
 * is bounced to the login portal before any child renders.
 */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin, GCSA Consulting",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
