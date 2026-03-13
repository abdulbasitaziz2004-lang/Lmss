"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, BarChart2, Users, PlusSquare,
  Home, LayoutDashboard, GraduationCap, ChevronRight
} from "lucide-react";

const NAV = {
  admin: [
    { href: "/dashboard",              icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/AdminCourses", icon: PlusSquare,      label: "Manage Courses" },
    { href: "/dashboard/admin/users",  icon: Users,           label: "Manage Users" },
    { href: "/",                       icon: Home,            label: "Home" },
  ],
  instructor: [
    { href: "/dashboard",              icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/AdminCourses", icon: PlusSquare,      label: "Manage Courses" },
    { href: "/dashboard/progress",     icon: BarChart2,       label: "Students Progress" },
    { href: "/",                       icon: Home,            label: "Home" },
  ],
  student: [
    { href: "/dashboard",              icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/my-courses",   icon: BookOpen,        label: "My Courses" },
    { href: "/dashboard/progress",     icon: BarChart2,       label: "My Progress" },
    { href: "/",                       icon: Home,            label: "Home" },
  ],
};

const ROLE_META = {
  admin:      { label: "Admin",      color: "text-rose-400",   dot: "bg-rose-400",   ring: "ring-rose-500/30" },
  instructor: { label: "Instructor", color: "text-amber-400",  dot: "bg-amber-400",  ring: "ring-amber-500/30" },
  student:    { label: "Student",    color: "text-emerald-400",dot: "bg-emerald-400",ring: "ring-emerald-500/30" },
};

export default function DashboardSidebar({ userRole }) {
  const pathname = usePathname();
  const links = NAV[userRole] ?? NAV.student;
  const meta  = ROLE_META[userRole] ?? ROLE_META.student;

  return (
    <aside className="relative w-64 min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d0d14 0%, #111118 60%, #0f0f1a 100%)" }}>

      {/* subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)" }} />

      {/* glow orb top */}
      <div className="pointer-events-none absolute -top-20 -left-10 w-56 h-56 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />

      {/* ── Brand ── */}
      <div className="relative px-6 pt-7 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
            <img src="/icon2.png" alt="logo" />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none tracking-tight">DevAcademy</p>
            <p className="text-gray-500 text-[11px] mt-0.5 tracking-widest uppercase">Learning Hub</p>
          </div>
        </div>

        {/* role badge */}
        <div className={`mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 ring-1 ${meta.ring}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} animate-pulse`} />
          <span className={`text-xs font-semibold tracking-wide ${meta.color}`}>{meta.label}</span>
        </div>
      </div>

      {/* divider */}
      <div className="mx-5 h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-4" />

      {/* ── Nav ── */}
      <nav className="relative flex-1 px-3">
        <p className="text-[10px] text-gray-600 font-semibold tracking-widest uppercase px-3 mb-3">Navigation</p>
        <ul className="space-y-1">
          {links.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link href={href}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {/* active indicator bar */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-violet-400" />
                  )}

                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                    active
                      ? "bg-violet-500/20 text-violet-300"
                      : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </span>

                  <span className="text-sm font-medium flex-1">{label}</span>

                  <ChevronRight className={`w-3.5 h-3.5 transition-all duration-200 ${
                    active ? "opacity-60 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0"
                  }`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Footer ── */}
      <div className="relative mt-4">
        <div className="mx-5 h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-4" />
        <div className="px-5 pb-6">
          <p className="text-[16px] text-gray-600 tracking-wide">
            © {new Date().getFullYear()} DevAcademy
          </p>
          <p className="text-[12px] text-gray-700 mt-0.5">All rights reserved</p>
        </div>
      </div>
    </aside>
  );
}