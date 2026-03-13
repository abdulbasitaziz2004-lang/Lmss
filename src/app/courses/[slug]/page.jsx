// app/courses/[slug]/page.jsx
import EnrollButton from "@/components/EnrollButton";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import { getCourses, getCourseById } from "@/lib/actions/course.action";
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import LockedChapters from "@/components/LockedChapters";
import { Lock } from "lucide-react";

export default async function CoursePage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { slug } = params;

  const { courses } = await getCourses({ limit: 1000 });
  const courseMeta = courses.find((c) => c.slug === slug);

  if (!courseMeta)
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-gray-400">
        Course not found
      </div>
    );

  const course = await getCourseById(courseMeta._id);
  const user = await getCurrentDbUser();
  const isEnrolled = user?.enrolledCourses?.some(
    (id) => id.toString() === course._id.toString()
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] dark:text-white text-black px-12 py-24 max-md:px-6">
      {/* Course Header */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-10">
        <div className="shrink-0">
          {course.icon?.startsWith("https") ? (
            <img
              src={course.icon}
              alt="Course icon"
              width={120}
              height={120}
              className="rounded-xl object-contain shadow-lg"
            />
          ) : (
            <span className="text-[6rem]">{course.icon || "🎓"}</span>
          )}
        </div>
        <div>
          <h1 className="text-5xl font-black mb-4 bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent max-md:text-4xl">
            {course.title}
          </h1>
          <p className="text-[#a1a1aa] mb-2">Category: {course.category}</p>
          <p className="text-[#a1a1aa] mb-2">Instructor: {course.instructor}</p>
          <p className="text-[#a1a1aa] mb-2">Hours: {course.hours}</p>
          <p className="text-[#a1a1aa] mb-2">Lessons: {course.lessons}</p>
          <p className="text-[#a1a1aa] mb-2">Students: {course.students}</p>
          <p className="text-[#a1a1aa] mb-2">Rating: {course.rating}</p>
          <p className="text-[#a1a1aa] mb-4">
            Price: <span className="font-bold text-white">${course.price}</span>
          </p>
          <EnrollButton courseId={course._id.toString()} isEnrolled={isEnrolled} />
        </div>
      </div>

      {/* Intro Video — visible to everyone */}
      {course.introVideo && (
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Course Preview</h2>
          <YoutubeEmbed url={course.introVideo} title={`${course.title} - Intro`} />
        </div>
      )}

      {/* Course Description */}
      {course.description && (
        <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 mb-10 shadow-md">
          <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent">
            About this Course
          </h2>
          <p className="text-[#a1a1aa] leading-relaxed">{course.description}</p>
        </div>
      )}

      {/* Chapters List */}
      <LockedChapters
  chapters={course.chapters.map(ch => ({ title: ch.title }))}
  isEnrolled={isEnrolled}
/>

      {/* Course Details Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl text-center">
          <p className="text-[#a1a1aa]">Duration</p>
          <p className="font-bold text-white">{course.hours} Hours</p>
        </div>
        <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl text-center">
          <p className="text-[#a1a1aa]">Lessons</p>
          <p className="font-bold text-white">{course.lessons}</p>
        </div>
        <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl text-center">
          <p className="text-[#a1a1aa]">Students</p>
          <p className="font-bold text-white">{course.students}</p>
        </div>
        <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl text-center">
          <p className="text-[#a1a1aa]">Instructor</p>
          <p className="font-bold text-white">{course.instructor}</p>
        </div>
        <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl text-center">
          <p className="text-[#a1a1aa]">Category</p>
          <p className="font-bold text-white">{course.category}</p>
        </div>
        <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl text-center">
          <p className="text-[#a1a1aa]">Rating</p>
          <p className="font-bold text-white">{course.rating}</p>
        </div>
      </div>

      {/* Enroll CTA */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent">
          Ready to Start Learning?
        </h2>
        <EnrollButton courseId={course._id.toString()} isEnrolled={isEnrolled} />
      </div>
    </div>
  );
}