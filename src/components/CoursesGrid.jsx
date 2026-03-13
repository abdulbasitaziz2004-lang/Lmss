// CourseGrid.jsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function CoursesGrid({ courses }) {
  if (!courses.length) return <p className="text-center text-[#71717a]">No courses found.</p>;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8 max-lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {courses.map((course) => (
        <Link key={course._id} href={`/courses/${course.slug}`} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(59,130,246,0.3)]">
          <div className="lg:w-full lg:h-[220px] bg-linear-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center">
            {course.icon?.startsWith("https") ? (
  <img
    src={course.icon}
    alt="Course icon"
    width={80}
    height={80}
    className="object-cover"
  />
) : (
  <span className="text-6xl">{course.icon || "🎓"}</span>
)}
          </div>
          <div className="p-7">
            <span className="inline-block py-[0.3rem] px-3 sm:px-1 bg-[rgba(59,130,246,0.15)] rounded-md text-xs font-semibold text-[#60a5fa] mb-4 uppercase">{course.category}</span>
            <h3 className="text-[1.35rem] font-bold mb-3 text-white">{course.title}</h3>
            <p className="text-[#71717a] mb-5">👤 {course.instructor}</p>
            <div className="flex justify-between items-center">
              <div className="text-[#fbbf24] font-semibold">⭐ {course.rating}</div>
              <div className="text-xl font-bold text-white">${course.price}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
