// CoursesSection.jsx
"use client";

import { useState } from "react";
import CoursesGrid from "./CoursesGrid"; // client-safe grid
import CourseFilters from "./CourseFilters";

export default function CoursesSection({ courses }) {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Filter courses by category
  const filteredCourses =
    selectedCategory === "All Courses"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <section className="max-w-[1400px] mx-auto py-20 px-12 max-md:py-12 max-md:px-6" id="courses">
      <div className="text-center mb-16">
        <span className="inline-block py-[0.4rem] px-4 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-[50px] text-[0.8rem] font-semibold text-[#a78bfa] mb-4 uppercase tracking-wider">
          Learn & Build
        </span>
        <h2 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent max-md:text-3xl">
          Web Development Courses
        </h2>
        <p className="text-lg text-[#71717a] max-w-[600px] mx-auto">
          Master the complete web development stack with hands-on projects and expert guidance
        </p>
      </div>

      {/* Filters */}
      <CourseFilters selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {/* Grid */}
      <CoursesGrid courses={paginatedCourses} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-700 text-white"}`}>
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50">Next</button>
        </div>
      )}
    </section>
  );
}
