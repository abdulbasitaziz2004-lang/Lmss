"use client";

import { useState } from "react";
import CourseActions from "@/components/CourseActions";

export default function CourseProgressCard({ course, isCompleted, progress }) {
  const [percent, setPercent] = useState(Math.round(progress * 100));

  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{course.title}</h3>
        {isCompleted && <span className="text-green-400 font-semibold">Completed</span>}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-4 rounded overflow-hidden">
        <div
          className="h-4 bg-blue-500 rounded transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-300">{percent}% completed</p>

      {/* Actions */}
      <CourseActions courseId={course._id} isCompleted={isCompleted} />
    </div>
  );
}
