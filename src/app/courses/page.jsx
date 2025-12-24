"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const COURSES_PER_PAGE = 6;

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [totalPages, setTotalPages] = useState(1);

  // Fetch courses from API
  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch(`/api/courses?page=${page}&limit=${COURSES_PER_PAGE}`);
      const data = await res.json();
      setCourses(data.data);
      setTotalPages(data.totalPages);
    }
    fetchCourses();
  }, [page]);

  const handlePage = (pageNum) => {
    setPage(pageNum);
    router.push(`/courses?page=${pageNum}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-black dark:text-white overflow-x-hidden transition-all duration-300 px-12 py-12">

      {/* Logo at Top Center */}
      <div className="flex justify-center mb-12">
        <div className="flex text-2xl items-center font-extrabold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
        <img
          src="/icon2.png" // Replace with your logo path
          alt="DevAcademy Logo"
          className="h-20 object-contain"
        />
        <p>
          DevAcademy
        </p>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-5xl font-extrabold mb-12 text-center bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent">
        All Courses
      </h1>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            {courses.map((course) => (
              <div key={course._id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-6 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(59,130,246,0.3)] hover:translate-y-[-5px] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  {course.icon?.startsWith("https") ? (
                    <img src={course.icon} alt={course.title} className="w-12 h-12 object-contain" />
                  ) : (
                    <span className="text-4xl">{course.icon || "🎓"}</span>
                  )}
                  <span className="text-sm text-[#60a5fa] font-semibold">{course.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-[#71717a] text-sm mb-4">
                  Instructor: {course.instructor} | {course.hours}h | {course.lessons} lessons
                </p>
                <p className="text-[#a1a1aa] mb-4">Students: {course.students} | Rating: {course.rating}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">${course.price}</span>
                  <a href={`/courses/${course.slug}`} className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-[10px] font-semibold transition-all duration-300">
                    View Course
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-4">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePage(pageNum)}
                  className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
                    pageNum === page
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-transparent text-[#a1a1aa] border-[#60a5fa] hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-center text-[#a1a1aa]">No courses available at the moment.</p>
      )}
    </div>
  );
}
