// app/courses/page.jsx
"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, BookOpen, Users, Star, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const COURSES_PER_PAGE = 6;

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses]         = useState([]);
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const res  = await fetch(`/api/courses?page=${page}&limit=${COURSES_PER_PAGE}`);
      const data = await res.json();
      setCourses(data.data || []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    }
    fetchCourses();
  }, [page]);

  const handlePage = (p) => { setPage(p); router.push(`/courses?page=${p}`); };

  const filtered = courses.filter(c =>
    !search ||
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase()) ||
    c.instructor?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-black dark:text-white overflow-x-hidden transition-all duration-300">

      {/* ── Hero ── */}
      <section className="pt-[140px] pb-16 px-12 text-center relative overflow-hidden max-md:pt-24 max-md:px-6
        before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2
        before:w-[900px] before:h-[600px]
        before:bg-[radial-gradient(circle,rgba(59,130,246,0.13)_0%,transparent_70%)]
        before:pointer-events-none">
        <div className="max-w-[700px] mx-auto relative z-10">
          <span className="inline-block py-2 px-5 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-[50px] text-[0.85rem] font-semibold text-[#60a5fa] mb-6 animate-[fadeInDown_0.8s]">
            📚 Expand Your Skills
          </span>
          <h1 className="text-[3.8rem] mb-5 font-black leading-[1.1] bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent animate-[fadeInUp_1s] max-lg:text-4xl max-md:text-3xl">
            All Courses
          </h1>
          <p className="text-lg text-[#a1a1aa] mb-8 leading-[1.8] animate-[fadeInUp_1.2s]">
            Browse our full library of expert-crafted courses and start building today.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto animate-[fadeInUp_1.4s]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses, topics, instructors…"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#4b5563] focus:outline-none focus:border-[rgba(59,130,246,0.4)] transition-all text-sm"
            />
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="px-12 pb-8 max-md:px-6">
        <div className="max-w-[1300px] mx-auto">
          {loading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 rounded-[20px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {filtered.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-[#4b5563]">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg">No courses found matching "{search}"</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && !search && (
        <div className="flex justify-center items-center gap-2 py-12">
          <button onClick={() => handlePage(Math.max(1, page - 1))} disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.08)] text-[#a1a1aa] hover:border-[rgba(59,130,246,0.4)] hover:text-white disabled:opacity-30 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button key={p} onClick={() => handlePage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                  p === page
                    ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    : "border border-[rgba(255,255,255,0.08)] text-[#a1a1aa] hover:border-[rgba(59,130,246,0.4)] hover:text-white"
                }`}>
                {p}
              </button>
            );
          })}
          <button onClick={() => handlePage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.08)] text-[#a1a1aa] hover:border-[rgba(59,130,246,0.4)] hover:text-white disabled:opacity-30 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="group flex flex-col bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(59,130,246,0.3)] hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]">

      {/* Top accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon + category */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-[14px] bg-[rgba(59,130,246,0.1)] flex items-center justify-center overflow-hidden shrink-0">
            {course.icon?.startsWith("https")
              ? <img src={course.icon} alt={course.title} className="w-10 h-10 object-contain" />
              : <span className="text-3xl">{course.icon || "🎓"}</span>
            }
          </div>
          <span className="text-xs font-semibold text-[#60a5fa] bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-2.5 py-1 rounded-full">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-1.5 leading-snug line-clamp-2">{course.title}</h3>
        <p className="text-[#71717a] text-xs mb-4">by {course.instructor}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-[#71717a] mb-5 flex-wrap">
          {course.hours && (
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.hours}h</span>
          )}
          {course.lessons && (
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
          )}
          {course.students && (
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students}</span>
          )}
          {course.rating && (
            <span className="flex items-center gap-1 text-amber-400"><Star className="w-3 h-3 fill-amber-400" />{course.rating}</span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-black text-white">
            {course.price === 0 || course.price === "0" ? "Free" : `$${course.price}`}
          </span>
          <Link href={`/courses/${course.slug}`}
            className="py-2 px-4 bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-[10px] shadow-[0_4px_12px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all duration-300">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}