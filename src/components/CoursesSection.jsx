"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CoursesGrid from "./CoursesGrid";
import CourseFilters from "./CourseFilters";

export default function CoursesSection({ courses }) {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(6);
  const [loading, setLoading] = useState(true);

  // Responsive courses per page
  useEffect(() => {
    const updateCoursesPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) setCoursesPerPage(2);
      else if (width < 1024) setCoursesPerPage(4);
      else setCoursesPerPage(6);
    };
    updateCoursesPerPage();
    window.addEventListener("resize", updateCoursesPerPage);
    return () => window.removeEventListener("resize", updateCoursesPerPage);
  }, []);

  // Reset page & show loading when filter or coursesPerPage changes
  useEffect(() => {
    setCurrentPage(1);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [selectedCategory, coursesPerPage]);

  // Filter & paginate courses
  const filteredCourses =
    selectedCategory === "All Courses"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  // Skeleton component
  const SkeletonCard = () => (
    <div className="border rounded-lg p-4 animate-pulse space-y-4 bg-gray-500 shadow">
      <div className="h-36 bg-linear-to-r from-gray-400 via-gray-300 to-gray-400 rounded-lg"></div>
      <div className="h-4 bg-linear-to-r from-gray-400 via-gray-300 to-gray-400 rounded w-3/4"></div>
      <div className="h-4 bg-linear-to-r from-gray-400 via-gray-300 to-gray-400 rounded w-1/2"></div>
    </div>
  );

  return (
    <section
      className="max-w-[1400px] mx-auto py-20 px-12 max-md:py-12 max-md:px-6"
      id="courses"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block py-[0.4rem] px-4 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-[50px] text-[0.8rem] font-semibold text-[#a78bfa] mb-4 uppercase tracking-wider">
          Learn & Build
        </span>
        <h2 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent max-md:text-3xl">
          Web Development Courses
        </h2>
        <p className="text-lg text-[#71717a] max-w-[600px] mx-auto">
          Master the complete web development stack with hands-on projects and
          expert guidance
        </p>
      </div>

      {/* Filters */}
      <CourseFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show skeletons
          Array.from({ length: coursesPerPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : filteredCourses.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No courses found for this category.
          </p>
        ) : (
          <AnimatePresence>
            {paginatedCourses.map((course, i) => (
              <motion.div
              key={course._id + "-" + i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              >
              <CoursesGrid courses={[course]} />
          </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-4 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}