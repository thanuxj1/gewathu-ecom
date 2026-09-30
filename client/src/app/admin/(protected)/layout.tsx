import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/server-session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar userName={session.name ?? session.email} />
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
