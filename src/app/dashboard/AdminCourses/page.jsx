// app/dashboard/AdminCourses/page.jsx
import { redirect } from "next/navigation";
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import AdminCoursesClient from "@/components/AdminCourses";

export default async function AdminCoursesPage() {
  const user = await getCurrentDbUser();

  if (!user || !["admin", "instructor"].includes(user.role)) {
    redirect("/dashboard?restricted=true");
  }

  return (
    <AdminCoursesClient
      userRole={user.role}
      actorName={user.name || user.email}
      actorEmail={user.email}
    />
  );
}