"use client";

export default function CourseActions({ courseId, isCompleted }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={async () => {
          await fetch(`/api/enroll/${courseId}`, { method: "DELETE" });
          location.reload();
        }}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Leave
      </button>

      {!isCompleted && (
        <button
          onClick={async () => {
            await fetch(`/api/enroll/${courseId}`, { method: "PATCH" });
            location.reload();
          }}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Complete
        </button>
      )}
    </div>
  );
}
