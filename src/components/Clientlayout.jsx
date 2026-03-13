"use client";
// components/ClientLayout.jsx
import Navbar from "./navbar";
import Footer from "./footer";
import DashboardSidebar from "./DashboardSidebar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children, userRole }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return (
      <div className="h-screen flex overflow-hidden">
        <aside className="w-64 h-screen shrink-0 sticky top-0">
          <DashboardSidebar userRole={userRole} />
        </aside>
        <main className="flex-1 h-screen overflow-y-auto p-8">
          {children}
        </main>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}