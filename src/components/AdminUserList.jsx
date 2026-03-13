"use client";
import useRoleGuard from "@/hooks/useRoleGuard/route";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Shield, GraduationCap, User, Search, Users, Trash2 } from "lucide-react";

const ROLE_CONFIG = {
  admin:      { label: "Admin",      icon: Shield,         color: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/30",   dot: "bg-rose-400" },
  instructor: { label: "Instructor", icon: GraduationCap,  color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",  dot: "bg-amber-400" },
  student:    { label: "Student",    icon: User,           color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30",dot: "bg-emerald-400" },
};

function RoleBadge({ role }) {
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.student;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cfg.color} ${cfg.bg} border ${cfg.border}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function Avatar({ name, email }) {
  const initials = name
    ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : (email?.[0] || "?").toUpperCase();
  const hue = (email || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0 shadow-lg"
      style={{ background: `linear-gradient(135deg, hsl(${hue},60%,45%), hsl(${(hue + 40) % 360},60%,35%))` }}>
      {initials}
    </div>
  );
}

export default function AdminUserList() {
  useRoleGuard(["admin"]);
  const [users, setUsers]                   = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [emailVisibility, setEmailVisibility] = useState({});
  const [search, setSearch]                 = useState("");
  const [filterRole, setFilterRole]         = useState("all");

  useEffect(() => {
    fetch("/api/admin/users")
      .then(r => r.json())
      .then(d => setUsers(d.users || []))
      .catch(() => toast.error("Failed to fetch users"));
  }, []);

  const updateRole = async (userId, role) => {
    const prev = [...users];
    setUsers(u => u.map(x => x._id === userId ? { ...x, role } : x));
    setUpdatingUserId(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const e = await res.json();
        toast.error("Failed: " + e.error);
        setUsers(prev);
      } else {
        const d = await res.json();
        toast.success(`Role updated to ${d.user.role}`);
      }
    } catch {
      toast.error("Something went wrong");
      setUsers(prev);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const deleteUser = async (userId, userName) => {
    if (!confirm(`Delete "${userName}"? This removes them from Clerk and the database permanently.`)) return;

    setDeletingUserId(userId);
    // optimistic remove
    const prev = [...users];
    setUsers(u => u.filter(x => x._id !== userId));

    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      if (!res.ok) {
        const e = await res.json();
        toast.error("Delete failed: " + e.error);
        setUsers(prev); // revert
      } else {
        toast.success(`${userName} deleted successfully`);
      }
    } catch {
      toast.error("Something went wrong");
      setUsers(prev);
    } finally {
      setDeletingUserId(null);
    }
  };

  const toggleEmail = id => setEmailVisibility(p => ({ ...p, [id]: !p[id] }));

  const filtered = users.filter(u => {
    const matchRole   = filterRole === "all" || u.role === filterRole;
    const matchSearch = !search ||
      (u.firstName || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const counts = {
    total:      users.length,
    admin:      users.filter(u => u.role === "admin").length,
    instructor: users.filter(u => u.role === "instructor").length,
    student:    users.filter(u => u.role === "student").length,
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <Toaster position="top-right" />

      <div className="mb-8">
        <p className="text-xs text-purple-400 font-medium tracking-widest uppercase mb-1">Admin Panel</p>
        <h1 className="text-3xl font-black text-white">Manage Users</h1>
        <p className="text-gray-500 text-sm mt-1">Control roles and view member details</p>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total",       value: counts.total,      icon: Users,         color: "text-white",       bg: "bg-white/5",        border: "border-white/10" },
          { label: "Admins",      value: counts.admin,      icon: Shield,        color: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20" },
          { label: "Instructors", value: counts.instructor, icon: GraduationCap, color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
          { label: "Students",    value: counts.student,    icon: User,          color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        ].map(({ label, value, icon: Icon, color, bg, border }) => (
          <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${bg} ${border}`}>
            <Icon className={`w-4 h-4 shrink-0 ${color}`} />
            <div>
              <p className={`text-xl font-black leading-none ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors" />
        </div>
        <div className="flex gap-1.5 p-1 bg-gray-900 border border-gray-800 rounded-xl">
          {["all", "admin", "instructor", "student"].map(r => (
            <button key={r} onClick={() => setFilterRole(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterRole === r ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
              }`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* User list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-600 bg-gray-900 border border-gray-800 rounded-2xl">
            No users found
          </div>
        )}

        {filtered.map((user) => {
          const cfg        = ROLE_CONFIG[user.role] || ROLE_CONFIG.student;
          const isUpdating = updatingUserId === user._id;
          const isDeleting = deletingUserId === user._id;
          const userName   = user.firstName || "Unnamed User";

          return (
            <div key={user._id}
              className="group flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 rounded-2xl hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-200">

              <Avatar name={user.firstName} email={user.email} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-semibold text-sm truncate">{userName}</p>
                  <RoleBadge role={user.role} />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => toggleEmail(user._id)}
                    className="text-gray-600 hover:text-gray-400 transition-colors shrink-0">
                    {emailVisibility[user._id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  {emailVisibility[user._id]
                    ? <span className="text-gray-400 text-xs truncate">{user.email}</span>
                    : <span className="text-gray-600 text-xs">••••••••••••</span>
                  }
                </div>
              </div>

              {/* Role selector */}
              <div className="shrink-0">
                <div className={`relative rounded-xl border ${cfg.border} ${cfg.bg} transition-all`}>
                  <select value={user.role || "student"} onChange={e => updateRole(user._id, e.target.value)}
                    disabled={isUpdating}
                    className={`appearance-none bg-transparent pl-3 pr-8 py-2 text-xs font-semibold focus:outline-none cursor-pointer disabled:opacity-50 ${cfg.color}`}>
                    <option value="student"    className="bg-gray-900 text-white">Student</option>
                    <option value="instructor" className="bg-gray-900 text-white">Instructor</option>
                    <option value="admin"      className="bg-gray-900 text-white">Admin</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                    {isUpdating
                      ? <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin block opacity-60" />
                      : <svg className={`w-3 h-3 ${cfg.color} opacity-60`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    }
                  </div>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() => deleteUser(user._id, userName)}
                disabled={isDeleting}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all disabled:opacity-30"
                title="Delete user"
              >
                {isDeleting
                  ? <span className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin block" />
                  : <Trash2 className="w-3.5 h-3.5" />
                }
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}