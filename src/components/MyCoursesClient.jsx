"use client";
// components/MyCoursesClient.jsx
import { useState } from "react";
import { Trophy, BookOpen } from "lucide-react";
import Link from "next/link";
import CourseChaptersAccordion from "./CourseChaptersAccordion";

export default function MyCoursesClient({ enrolledCourses, initialCompletedIds, progressMap }) {
  const [completedIds, setCompletedIds] = useState(new Set(initialCompletedIds));

  const handleCompletionChange = (courseId, isCompleted) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (isCompleted) next.add(courseId);
      else next.delete(courseId);
      return next;
    });
  };

  const completedCourses = enrolledCourses.filter((c) => completedIds.has(c._id));

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">My Courses</h1>
        <p className="text-gray-400 mt-1">
          {enrolledCourses.length} enrolled · {completedIds.size} completed
        </p>
      </div>

      {/* Trophy banner — updates live */}
      {completedCourses.length > 0 && (
        <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-2xl flex items-center gap-4 flex-wrap">
          <Trophy className="w-6 h-6 text-yellow-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-yellow-300 font-semibold text-sm">
              🎉 You've completed {completedCourses.length} course{completedCourses.length > 1 ? "s" : ""}!
            </p>
            <p className="text-yellow-500/70 text-xs mt-0.5 truncate">
              {completedCourses.map((c) => c.title).join(" · ")}
            </p>
          </div>
        </div>
      )}

      {enrolledCourses.length > 0 ? (
        <div className="space-y-4">
          {enrolledCourses.map((course) => (
            <CourseChaptersAccordion
              key={course._id}
              course={course}
              initialProgress={progressMap}
              initialCourseCompleted={completedIds.has(course._id)}
              onCompletionChange={handleCompletionChange}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-gray-900 border border-gray-800 rounded-2xl">
          <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Browse Courses →
          </Link>
        </div>
      )}
    </div>
  );
}