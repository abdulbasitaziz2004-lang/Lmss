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

  const plainCourses = courses.map((course) => ({
    ...course,
    _id: course._id.toString(),
    createdAt: course.createdAt?.toISOString(),
    updatedAt: course.updatedAt?.toISOString(),
    // Serialize every chapter's _id too
    chapters: (course.chapters || []).map((ch) => ({
      _id: ch._id.toString(),
      title: ch.title,
      videoUrl: ch.videoUrl,
    })),
  }));

  const total = await Course.countDocuments(query);

  return { courses: plainCourses, total, page, limit };
}

export async function getCourseById(id) {
  await connect();

  const course = await Course.findById(id).lean();
  if (!course) return null;

  return {
    ...course,
    _id: course._id.toString(),
    createdAt: course.createdAt?.toISOString(),
    updatedAt: course.updatedAt?.toISOString(),
    // Serialize every chapter's _id too
    chapters: (course.chapters || []).map((ch) => ({
      _id: ch._id.toString(),
      title: ch.title,
      videoUrl: ch.videoUrl,
    })),
  };
}

export async function getCoursesByIds(ids = []) {
  await connect();

  const courses = await Course.find({ _id: { $in: ids } }).lean();

  return courses.map((course) => ({
    ...course,
    _id: course._id.toString(),
    createdAt: course.createdAt?.toISOString(),
    updatedAt: course.updatedAt?.toISOString(),
    // Serialize every chapter's _id too
    chapters: (course.chapters || []).map((ch) => ({
      _id: ch._id.toString(),
      title: ch.title,
      videoUrl: ch.videoUrl,
    })),
  }));
}