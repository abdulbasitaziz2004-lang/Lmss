// CourseFilters.jsx
"use client";

const filters = [
  { label: "All Courses", value: null },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "Full Stack", value: "Full Stack" },
  { label: "UI/UX", value: "UI/UX" },
];

export default function CourseFilters({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex gap-4 justify-center mb-12 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.label}
          onClick={() => setSelectedCategory(filter.value || "All Courses")}
          className={`py-[0.7rem] px-6 rounded-[10px] border transition-all font-medium
            ${selectedCategory === filter.value || (selectedCategory === "All Courses" && !filter.value)
              ? "bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.5)] text-[#60a5fa]"
              : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-[#a1a1aa] hover:bg-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.5)] hover:text-[#60a5fa]"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
