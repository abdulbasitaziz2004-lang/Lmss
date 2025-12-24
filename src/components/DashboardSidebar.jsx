"use client";
import React from "react";
import Link from "next/link";

const DashboardSidebar = ({ userRole }) => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
        Dashboard
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-4">
          {/* Role-based links */}
          {userRole === "admin" && (
            <>
              <li>
                <Link
                  href="/dashboard/AdminCourses"
                  className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Add Course
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/admin/users"
                  className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Manage Users
                </Link>
              </li>
            </>
          )}

          {userRole === "instructor" && (
            <>
              <li>
                <Link
                  href="/dashboard/AdminCourses"
                  className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Add Course
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/students-progress"
                  className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Students Progress
                </Link>
              </li>
            </>
          )}

          {userRole === "student" && (
            <>
              <li>
                <Link
                  href="/dashboard/my-courses"
                  className="block text-red-400 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/progress"
                  className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  My Progress
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="px-6 py-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">© 2025 DevAcademy</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
