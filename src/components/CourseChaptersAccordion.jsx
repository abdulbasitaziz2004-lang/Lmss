"use client";
// components/CourseChaptersAccordion.jsx
import { useState } from "react";
import { Trophy, BookOpen, ChevronDown } from "lucide-react";
import CourseChapters from "./CourseChapters";

export default function CourseChaptersAccordion({
  course,
  initialProgress = {},
  initialCourseCompleted = false,
  onCompletionChange, 
}) {
  const [open, setOpen] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(initialCourseCompleted);

  const handleComplete = () => {
    setCourseCompleted(true);
    onCompletionChange?.(course._id, true);
  };

  const handleUncomplete = () => {
    setCourseCompleted(false);
    onCompletionChange?.(course._id, false);
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        courseCompleted
          ? "bg-gray-900 border-green-500/40"
          : "bg-gray-900 border-gray-800"
      }`}
    >
      {/* Accordion header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-4 p-5 hover:bg-gray-800/50 transition-colors text-left"
      >
        {course.icon ? (
          <img src={course.icon} className="w-14 h-14 rounded-xl object-contain bg-gray-800 shrink-0" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center text-2xl shrink-0">🎓</div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate">{course.title}</h3>
          <p className="text-sm text-gray-400 mt-0.5">{course.instructor}</p>
          <p className="text-xs text-gray-500 mt-1">
            {course.chapters.length} chapter{course.chapters.length !== 1 ? "s" : ""}
          </p>
        </div>

        {courseCompleted ? (
          <span className="shrink-0 flex items-center gap-1.5 text-sm text-green-400 bg-green-900/30 border border-green-500/30 px-3 py-1 rounded-full font-medium">
            <Trophy className="w-3.5 h-3.5" /> Completed
          </span>
        ) : (
          <span className="shrink-0 flex items-center gap-1.5 text-sm text-purple-400 bg-purple-900/20 border border-purple-500/20 px-3 py-1 rounded-full font-medium">
            <BookOpen className="w-3.5 h-3.5" /> In Progress
          </span>
        )}

        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 pb-5 border-t border-gray-800 pt-4">
          {course.chapters.length > 0 ? (
            <CourseChapters
              chapters={course.chapters}
              initialProgress={initialProgress}
              courseId={course._id}
              initialCourseCompleted={courseCompleted}
              onCourseComplete={handleComplete}
              onCourseUncomplete={handleUncomplete}
            />
          ) : (
            <p className="text-gray-500 text-sm py-4">No chapters added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}