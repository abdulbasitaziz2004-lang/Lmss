// lib/actions/course.action.js
import Course from "../models/course";
import { connect } from "../db";

export async function getCourses({ category = null, page = 1, limit = 20 } = {}) {
  await connect();

  const query =
    category && category !== "All Courses"
      ? { category: new RegExp(`^${category}$`, "i") }
      : {};

  const skip = (page - 1) * limit;

  const courses = await Course.find(query)
    .sort({ title: 1 })
    .skip(skip)
    .limit(limit)
    .lean();

  // convert ObjectId to string and dates to ISO
  const plainCourses = courses.map((course) => ({
    ...course,
    _id: course._id.toString(),
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
  }));

  const total = await Course.countDocuments(query);

  return { courses: plainCourses, total, page, limit };
}

// ✅ New helper to fetch a single course by id and show url as slug
export async function getCourseById(id) {
  await connect();

  const course = await Course.findById(id).lean();
  if (!course) return null;

  return {
    ...course,
    _id: course._id.toString(),
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
  };
}
// course for dashboard
export async function getCoursesByIds(ids = []) {
  await connect();

  const courses = await Course.find({ _id: { $in: ids } }).lean();
  return courses.map((course) => ({
    ...course,
    _id: course._id.toString(),
  }));
}