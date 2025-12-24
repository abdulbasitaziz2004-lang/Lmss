"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Users
      </h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
        {users.length === 0 && (
          <p className="text-gray-400 text-center">No users found</p>
        )}

        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gray-900 rounded hover:bg-gray-700 transition"
          >
            <div className="flex-1">
              <p className="text-white font-semibold">{user.firstName || "No Name"}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

            <div>
              <select
                value={user.role || "student"}
                onChange={(e) => updateRole(user._id, e.target.value)}
                disabled={updatingUserId === user._id}
                className="bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
  );
}
