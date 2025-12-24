import { connect } from "@/lib/db";
import User from "@/lib/models/user";
import Course from "@/lib/models/course";
import mongoose from "mongoose";
import { currentUser } from "@clerk/nextjs/server";



/* ======================
   POST — Enroll Student
====================== */
export const POST = async (req, { params : paramsPromise }) => {
  await connect();
const params = await paramsPromise;

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { courseId } = params;

  // ✅ Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return new Response("Invalid course ID", { status: 400 });
  }

  // ✅ Ensure course EXISTS (prevents null)
  const course = await Course.findById(courseId);
  if (!course) {
    return new Response("Course not found", { status: 404 });
  }

  const user = await User.findOne({ clerkId: clerkUser.id });
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (user.role !== "student") {
    return new Response("Only students can enroll", { status: 403 });
  }

  const courseObjectId = new mongoose.Types.ObjectId(courseId);

  // ✅ Correct ObjectId comparison
  const alreadyEnrolled = user.enrolledCourses.some((id) =>
    id.equals(courseObjectId)
  );

  if (!alreadyEnrolled) {
    user.enrolledCourses.push(courseObjectId);
    await user.save();
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

/* ======================
   DELETE — Unenroll
====================== */
export const DELETE = async (req, { params: paramsPromise }) => {
  await connect();
  const params = await paramsPromise;

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { courseId } = params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return new Response("Invalid course ID", { status: 400 });
  }

  const user = await User.findOne({ clerkId: clerkUser.id });
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const courseObjectId = new mongoose.Types.ObjectId(courseId);

  user.enrolledCourses = user.enrolledCourses.filter(
    (id) => !id.equals(courseObjectId)
  );

  await user.save();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

/* ======================
   PATCH — Mark Completed
====================== */
export const PATCH = async (req, { params : paramsPromise }) => {
  await connect();
const params= await paramsPromise;

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { courseId } = params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return new Response("Invalid course ID", { status: 400 });
  }

  const user = await User.findOne({ clerkId: clerkUser.id });
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const courseObjectId = new mongoose.Types.ObjectId(courseId);

  const alreadyCompleted = user.completedCourses.some((id) =>
    id.equals(courseObjectId)
  );

  if (!alreadyCompleted) {
    user.completedCourses.push(courseObjectId);
    await user.save();
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
