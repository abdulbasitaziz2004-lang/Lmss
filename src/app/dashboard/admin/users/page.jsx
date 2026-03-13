import AdminUserList from "@/components/AdminUserList";
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
     const user = await getCurrentDbUser();

  if (!user || !["admin"].includes(user.role)) {
    redirect("/dashboard");
  }
  return (
    <div className="p-6">
      <AdminUserList />
    </div>
  );
}

  