// app/my-courses/page.jsx
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import { getCoursesByIds } from "@/lib/actions/course.action";
import CourseProgressCard from "@/components/CourseProgressCard"; // we'll create this for progress UI

export default async function MyCoursesPage() {
  const user = await getCurrentDbUser();
  if (!user) return <div className="p-8">Not authenticated</div>;

  // Fetch course details for enrolled and completed courses
  const enrolledCourses =
    user.enrolledCourses?.length > 0
      ? await getCoursesByIds(user.enrolledCourses)
      : [];

  const completedCourses =
    user.completedCourses?.length > 0
      ? await getCoursesByIds(user.completedCourses)
      : [];

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Courses
      </h1>

      {/* Enrolled Courses */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <CourseProgressCard
                key={course._id}
                course={course}
                isCompleted={completedCourses.some(c => c._id === course._id)}
                progress={user.videoProgress?.[course._id] || 0} // progress as 0–1
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have not enrolled in any courses yet.</p>
        )}
      </section>

      {/* Completed Courses */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Completed Courses</h2>
        {completedCourses.length > 0 ? (
          <ul className="space-y-4">
            {completedCourses.map((course) => (
              <li
                key={course._id}
                className="p-4 bg-gray-800 text-white rounded shadow flex justify-between items-center"
              >
                {course.title}
                <span className="text-green-400 font-semibold">Completed</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't completed any courses yet.</p>
        )}
      </section>
    </div>
  );
}
