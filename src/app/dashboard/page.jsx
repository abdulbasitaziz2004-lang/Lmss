import DashboardSidebar from "@/components/DashboardSidebar";
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import { getCoursesByIds } from "@/lib/actions/course.action";
import CourseActions from "@/components/CourseActions";
import Layout from "@/components/layout";

export default async function DashboardPage() {
  const user = await getCurrentDbUser();  
  if (!user) return <div>Not authenticated</div>;

  // Fetch course details for enrolled courses
  const enrolledCourses =
    user.enrolledCourses?.length > 0
      ? await getCoursesByIds(user.enrolledCourses)
      : [];

  const completedCourses =
    user.completedCourses?.length > 0
      ? await getCoursesByIds(user.completedCourses)
      : [];

      
    
  return (  
    <Layout hideNavFooter={true}>
      
    <div className="min-h-screen flex">
      <DashboardSidebar userRole={user.role} />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome, {user.firstName}</h1>

        {/* STUDENT VIEW */}
        {user.role === "student" && (
          <div className="mt-6 space-y-6">
            {/* Enrolled Courses */}
            <div>
              <p className="text-gray-500 font-semibold">Your Enrolled Courses:</p>
              {enrolledCourses.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {enrolledCourses.map((course) => (
                    <li key={course._id} className="p-3 border rounded flex justify-between items-center">
                      <span>{course.icon}</span>
                      <span>{course.title}</span>
                      <CourseActions
  courseId={course._id}
  isCompleted={completedCourses.some(c => c._id === course._id)}
/>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-400">You have not enrolled in any courses yet.</p>
              )}
            </div>

            {/* Completed Courses */}
            <div>
              <p className="text-gray-500 font-semibold">Completed Courses:</p>
              {completedCourses.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {completedCourses.map((course) => (
                    <li key={course._id} className="p-3 border rounded bg-gray-800 text-white">
                      {course.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-400">You haven't completed any courses yet.</p>
              )}
            </div>
          </div>
        )}

        {/* INSTRUCTOR VIEW */}
        {user.role === "instructor" && (
          <p className="mt-4 text-gray-500">
            Manage courses & view student progress
          </p>
        )}

        {/* admin */}
        {user.role === "admin" && (
  <div className="mt-4">
    
  </div>
)}
      </main>
    </div>
  </Layout>
  );
}
