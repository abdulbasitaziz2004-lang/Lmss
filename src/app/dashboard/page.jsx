
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import { getCoursesByIds } from "@/lib/actions/course.action";
import Course from "@/lib/models/course";
import { connect } from "@/lib/db";
import User from "@/lib/models/user";
import Link from "next/link";
import {
  BookOpen, Trophy, CheckCircle2, TrendingUp,
  Users, GraduationCap, BarChart3, Layers
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentDbUser();
  if (!user) return <div>Not authenticated</div>;

  await connect();

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

  // Per-course chapter stats
  const courseStats = enrolledCourses.map((course) => {
    const chapters = course.chapters || [];
    const total = chapters.length;
    const done = chapters.filter(ch => progressMap[ch._id.toString()]?.completed).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    const isCompleted = completedCourses.some(c => c._id.toString() === course._id.toString());
    return { course, total, done, percent, isCompleted };
  });

  const totalChapters = courseStats.reduce((a, s) => a + s.total, 0);
  const totalDone = courseStats.reduce((a, s) => a + s.done, 0);
  const overallPercent = totalChapters > 0 ? Math.round((totalDone / totalChapters) * 100) : 0;

  // Admin/instructor stats
  let totalCourses = 0;
  let totalUsers = 0;
  let totalStudents = 0;
  if (["admin", "instructor"].includes(user.role)) {
    totalCourses = await Course.countDocuments();
    totalUsers = await User.countDocuments();
    totalStudents = await User.countDocuments({ role: "student" });
  }

  const isStudent = user.role === "student";
  const isAdmin = user.role === "admin";
  const isInstructor = user.role === "instructor";

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm text-purple-400 font-medium tracking-widest uppercase mb-1">Dashboard</p>
        <h1 className="text-4xl font-black text-white">
          Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">{user.firstName}</span>
        </h1>
        <p className="text-gray-400 mt-1 capitalize">{user.role} · {user.email}</p>
      </div>

      {/* ── STUDENT VIEW ── */}
      {isStudent && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={<BookOpen className="w-5 h-5" />} color="purple" label="Enrolled" value={enrolledCourses.length} />
            <StatCard icon={<Trophy className="w-5 h-5" />} color="yellow" label="Completed" value={completedCourses.length} />
            <StatCard icon={<CheckCircle2 className="w-5 h-5" />} color="green" label="Chapters Done" value={`${totalDone}/${totalChapters}`} />
            <StatCard icon={<TrendingUp className="w-5 h-5" />} color="blue" label="Overall" value={`${overallPercent}%`} />
          </div>

          {/* Overall progress */}
          <div className="mb-8 p-5 rounded-2xl bg-gray-900 border border-gray-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300 font-semibold">Overall Learning Progress</span>
              <span className="text-white font-bold text-lg">{overallPercent}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-green-400 transition-all duration-700"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{totalDone} of {totalChapters} chapters completed</p>
          </div>

          {/* Course cards */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Your Courses</h2>
            <Link href="/dashboard/my-courses" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View all →
            </Link>
          </div>

          {courseStats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courseStats.map(({ course, total, done, percent, isCompleted }) => (
                <Link
                  key={course._id}
                  href={`/courses/${course.slug}`}
                  className="group p-5 bg-gray-900 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {course.icon ? (
                      <img src={course.icon} className="w-12 h-12 rounded-xl object-contain bg-gray-800" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl">🎓</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-400">{course.instructor}</p>
                    </div>
                    {isCompleted && (
                      <span className="shrink-0 flex items-center gap-1 text-xs text-green-400 bg-green-900/30 border border-green-500/30 px-2 py-1 rounded-full">
                        <Trophy className="w-3 h-3" /> Done
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>{done}/{total} chapters</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isCompleted ? "bg-green-400" : "bg-linear-to-r from-purple-500 to-pink-400"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-gray-900 border border-gray-800 rounded-2xl">
              <GraduationCap className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
              <Link href="/courses" className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors">
                Browse Courses →
              </Link>
            </div>
          )}
        </>
      )}

      {/* ── INSTRUCTOR VIEW ── */}
      {isInstructor && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <StatCard icon={<Layers className="w-5 h-5" />} color="purple" label="Total Courses" value={totalCourses} />
            <StatCard icon={<Users className="w-5 h-5" />} color="blue" label="Total Students" value={totalStudents} />
            <StatCard icon={<GraduationCap className="w-5 h-5" />} color="green" label="Total Users" value={totalUsers} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <QuickLink href="/dashboard/AdminCourses" icon={<Layers className="w-5 h-5 text-purple-400" />} title="Manage Courses" desc="Add, edit or remove courses" />
            <QuickLink href="/dashboard/progress" icon={<BarChart3 className="w-5 h-5 text-blue-400" />} title="Student Progress" desc="View student learning stats" />
          </div>
        </>
      )}

      {/* ── ADMIN VIEW ── */}
      {isAdmin && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={<Layers className="w-5 h-5" />} color="purple" label="Total Courses" value={totalCourses} />
            <StatCard icon={<Users className="w-5 h-5" />} color="blue" label="Total Users" value={totalUsers} />
            <StatCard icon={<GraduationCap className="w-5 h-5" />} color="green" label="Students" value={totalStudents} />
            <StatCard icon={<BarChart3 className="w-5 h-5" />} color="pink" label="Instructors" value={totalUsers - totalStudents - 1} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <QuickLink href="/dashboard/AdminCourses" icon={<Layers className="w-5 h-5 text-purple-400" />} title="Manage Courses" desc="Add, edit or remove courses" />
            <QuickLink href="/dashboard/admin/users" icon={<Users className="w-5 h-5 text-blue-400" />} title="Manage Users" desc="View and edit user roles" />
            <QuickLink href="/dashboard/progress" icon={<BarChart3 className="w-5 h-5 text-green-400" />} title="Progress Overview" desc="Monitor student progress" />
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, color, label, value }) {
  const colors = {
    purple: "bg-purple-900/20 border-purple-500/20 text-purple-400",
    yellow: "bg-yellow-900/20 border-yellow-500/20 text-yellow-400",
    green:  "bg-green-900/20  border-green-500/20  text-green-400",
    blue:   "bg-blue-900/20   border-blue-500/20   text-blue-400",
    pink:   "bg-pink-900/20   border-pink-500/20   text-pink-400",
  };
  return (
    <div className={`p-5 rounded-2xl border ${colors[color]} flex flex-col gap-3`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function QuickLink({ href, icon, title, desc }) {
  return (
    <Link
      href={href}
      className="group p-5 bg-gray-900 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/20 flex items-start gap-4"
    >
      <div className="p-2.5 bg-gray-800 rounded-xl group-hover:bg-gray-700 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">{title}</h3>
        <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
      </div>
      <span className="ml-auto text-gray-600 group-hover:text-purple-400 transition-colors text-lg">→</span>
    </Link>
  );
}