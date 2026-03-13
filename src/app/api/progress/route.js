// app/api/progress/route.js
import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import User from "@/lib/models/user";
import Course from "@/lib/models/course";

export async function POST(req) {
  try {
    const user = await getCurrentDbUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { chapterId, watchPercent, completed, courseId } = await req.json();
    if (!chapterId) return NextResponse.json({ error: "chapterId required" }, { status: 400 });

    await connect();

    const updateFields = {};
    if (watchPercent !== undefined) {
      updateFields[`chapterProgress.${chapterId}.watchPercent`] = watchPercent;
    }
    if (completed !== undefined) {
      updateFields[`chapterProgress.${chapterId}.completed`] = completed;
    }

    await User.findByIdAndUpdate(user._id, { $set: updateFields });

    // If marking complete — check if all chapters done → add to completedCourses
    if (completed === true && courseId) {
      const course = await Course.findById(courseId).lean();
      if (course?.chapters?.length > 0) {
        const freshUser = await User.findById(user._id).lean();
        const progress = freshUser.chapterProgress || {};

        const allDone = course.chapters.every((ch) => {
          const p = progress[ch._id.toString()];
          return p?.completed === true;
        });

        if (allDone) {
          await User.findByIdAndUpdate(user._id, {
            $addToSet: { completedCourses: courseId },
          });
          return NextResponse.json({ success: true, courseCompleted: true });
        }
      }
    }

    // If marking incomplete — remove course from completedCourses
    if (completed === false && courseId) {
      await User.findByIdAndUpdate(user._id, {
        $pull: { completedCourses: courseId },
      });
      return NextResponse.json({ success: true, courseCompleted: false, courseUncompleted: true });
    }

    return NextResponse.json({ success: true, courseCompleted: false });
  } catch (err) {
    console.error("POST /api/progress error:", err);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}