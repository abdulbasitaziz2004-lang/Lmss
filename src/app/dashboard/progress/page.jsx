// app/dashboard/progress/page.jsx
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import { getCoursesByIds } from "@/lib/actions/course.action";
import { Trophy, BookOpen, CheckCircle2, TrendingUp } from "lucide-react";

export default async function ProgressPage() {
  const user = await getCurrentDbUser();
  if (!user) return <div className="p-8">Not authenticated</div>;

  const enrolledCourses =
    user.enrolledCourses?.length > 0
      ? await getCoursesByIds(user.enrolledCourses)
      : [];

  const completedCourses =
    user.completedCourses?.length > 0
      ? await getCoursesByIds(user.completedCourses)
      : [];

  const progressMap = user.chapterProgress
    ? Object.fromEntries(
        Object.entries(user.chapterProgress).map(([k, v]) => [
          k,
          { watchPercent: v.watchPercent || 0, completed: v.completed || false },
        ])
      )
    : {};

  // Calculate per-course stats
  const courseStats = enrolledCourses.map((course) => {
    const chapters = course.chapters || [];
    const total = chapters.length;
    const completedChapters = chapters.filter(
      (ch) => progressMap[ch._id.toString()]?.completed
    ).length;
    const percent = total > 0 ? Math.round((completedChapters / total) * 100) : 0;
    const isCourseCompleted = completedCourses.some(
      (c) => c._id.toString() === course._id.toString()
    );
    return { course, total, completedChapters, percent, isCourseCompleted };
  });

  const totalChapters = courseStats.reduce((acc, s) => acc + s.total, 0);
  const totalCompleted = courseStats.reduce((acc, s) => acc + s.completedChapters, 0);
  const overallPercent = totalChapters > 0
    ? Math.round((totalCompleted / totalChapters) * 100)
    : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Progress</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-purple-400" />}
          label="Enrolled"
          value={enrolledCourses.length}
          bg="bg-purple-900/20 border-purple-500/20"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5 text-yellow-400" />}
          label="Completed"
          value={completedCourses.length}
          bg="bg-yellow-900/20 border-yellow-500/20"
        />
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5 text-green-400" />}
          label="Chapters Done"
          value={`${totalCompleted}/${totalChapters}`}
          bg="bg-green-900/20 border-green-500/20"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
          label="Overall"
          value={`${overallPercent}%`}
          bg="bg-blue-900/20 border-blue-500/20"
        />
      </div>

      {/* Overall progress bar */}
      <div className="mb-10 p-5 bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300 font-medium">Overall Progress</span>
          <span className="text-white font-bold">{overallPercent}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="h-4 rounded-full bg-linear-to-r from-purple-500 to-green-400 transition-all duration-700"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {totalCompleted} of {totalChapters} chapters completed across all courses
        </p>
      </div>

      {/* Per-course breakdown */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold">Course Breakdown</h2>
        {courseStats.length > 0 ? (
          courseStats.map(({ course, total, completedChapters, percent, isCourseCompleted }) => (
            <div
              key={course._id}
              className="p-5 bg-gray-800 rounded-xl border border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                {course.icon && (
                  <img src={course.icon} className="w-12 h-12 rounded-lg object-contain" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-white truncate">{course.title}</h3>
                    {isCourseCompleted && (
                      <span className="flex items-center gap-1 text-xs text-green-400 bg-green-900/30 border border-green-500/30 px-2 py-0.5 rounded-full">
                        <Trophy className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{course.instructor}</p>
                </div>
                <span className="text-xl font-bold text-white shrink-0">{percent}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isCourseCompleted
                      ? "bg-green-400"
                      : "bg-linear-to-r from-purple-500 to-purple-300"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {completedChapters} of {total} chapters completed
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg }) {
  return (
    <div className={`p-4 rounded-xl border ${bg} flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}