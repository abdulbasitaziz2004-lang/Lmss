"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [emailVisibility, setEmailVisibility] = useState({}); // Track visibility per user

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => toast.error("Failed to fetch users"));
  }, []);

  const updateRole = async (userId, role) => {
    // Optimistic update: update UI immediately
    const prevUsers = [...users];
    setUsers((prev) =>
      prev.map((user) => (user._id === userId ? { ...user, role } : user))
    );
    setUpdatingUserId(userId);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error("Failed to update role: " + errorData.error);
        setUsers(prevUsers); // revert UI if API fails
      } else {
        const data = await res.json();
        toast.success(`User role changed to ${data.user.role}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setUsers(prevUsers); // revert UI if error
    } finally {
      setUpdatingUserId(null);
    }
  };

  const toggleEmailVisibility = (userId) => {
    setEmailVisibility((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:text-white dark:bg-[#0a0a0f] text-black overflow-x-hidden transition-all duration-300">
      <div className="pt-[140px] pb-20 px-12 max-w-4xl mx-auto max-md:pt-24 max-md:px-6">
        <Toaster position="top-right" />
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-6 bg-linear-to-r from-blue-50 via-blue-300 to-blue-700 dark:from-white dark:via-[#b9b9c6] dark:to-[#a1a1aa] bg-clip-text text-transparent animate-[fadeInUp_1s] max-lg:text-4xl max-md:text-3xl">
            Manage Users
          </h1>
          <p className="text-lg text-[#a1a1aa] animate-[fadeInUp_1.2s]">
            Admin dashboard for user role management
          </p>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-8 shadow-md animate-[fadeInUp_1.4s]">
          {users.length === 0 && (
            <p className="text-[#71717a] text-center py-8">No users found</p>
          )}

          <div className="space-y-6">
            {users.map((user, idx) => (
              <div
                key={user._id}
                className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[15px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(59,130,246,0.3)] hover:translate-y-[-5px] hover:shadow-[0_6px_25px_rgba(59,130,246,0.1)] animate-[fadeInUp_1.6s]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg mb-2">{user.firstName || "No Name"}</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#71717a] text-xs font-medium">Email:</span>
                    <div className="flex items-center gap-3">
                      <p
                        className={`text-[#71717a] text-sm transition-all duration-300 ${
                          emailVisibility[user._id]
                            ? "opacity-100 max-h-6"
                            : "opacity-0 max-h-0 overflow-hidden"
                        }`}
                      >
                        {user.email}
                      </p>
                      <button
                        onClick={() => toggleEmailVisibility(user._id)}
                        className="text-[#71717a] hover:text-white transition-colors duration-300"
                        title={emailVisibility[user._id] ? "Hide Email" : "Show Email"}
                      >
                        {emailVisibility[user._id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[#71717a] text-xs font-medium">Role:</span>
                  <select
                    value={user.role || "student"}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                    disabled={updatingUserId === user._id}
                    className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] text-white p-3 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:bg-[rgba(59,130,246,0.2)] cursor-pointer"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}