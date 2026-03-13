"use client";
// components/LockedChapters.jsx
import { Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LockedChapters({ chapters, isEnrolled, courseId }) {
  const handleLockedClick = () => {
    toast.error("Please enroll in this course first to access the chapters!");
  };

  return (
    <div className="space-y-3">
      <Toaster position="top-right" />
      {chapters.map((chapter, i) => (
        <div
          key={i}
          onClick={!isEnrolled ? handleLockedClick : undefined}
          className={`flex items-center justify-between p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl ${
            !isEnrolled ? "cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-[#a1a1aa] text-sm w-6">{i + 1}.</span>
            <span className="text-white font-medium">{chapter.title}</span>
          </div>
          {!isEnrolled ? (
            <Lock className="w-4 h-4 text-[#a1a1aa]" />
          ) : (
            <span className="text-xs text-green-400 font-medium">Unlocked</span>
          )}
        </div>
      ))}
      {!isEnrolled && (
        <p className="text-[#a1a1aa] text-sm mt-3">
          Enroll to unlock all {chapters.length} chapters.
        </p>
      )}
    </div>
  );
}