// app/dashboard/my-courses/page.jsx
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import { getCoursesByIds } from "@/lib/actions/course.action";
import MyCoursesClient from "@/components/MyCoursesClient";

export default async function MyCoursesPage() {
  const user = await getCurrentDbUser();
  if (!user) return <div className="p-8">Not authenticated</div>;

  const progressMap = user.chapterProgress
    ? Object.fromEntries(
        Object.entries(user.chapterProgress).map(([k, v]) => [
          k,
          { watchPercent: v.watchPercent || 0, completed: v.completed || false },
        ])
      )
    : {};

  const enrolledCourses =
    user.enrolledCourses?.length > 0
      ? await getCoursesByIds(user.enrolledCourses)
      : [];

  const completedCourses =
    user.completedCourses?.length > 0
      ? await getCoursesByIds(user.completedCourses)
      : [];

  return (
    <MyCoursesClient
      enrolledCourses={enrolledCourses.map((course) => ({
        _id: course._id.toString(),
        title: course.title,
        instructor: course.instructor,
        icon: course.icon || null,
        slug: course.slug,
        chapters: course.chapters?.map((ch) => ({
          _id: ch._id.toString(),
          title: ch.title,
          videoUrl: ch.videoUrl,
        })) || [],
      }))}
      initialCompletedIds={completedCourses.map((c) => c._id.toString())}
      progressMap={progressMap}
    />
  );
}