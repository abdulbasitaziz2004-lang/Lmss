import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    instructor: { type: String, required: true },
    hours: Number,
    lessons: Number,
    students: String,
    rating: String,
    price: Number,
    icon: String,
    introVideo: { type: String, default: "" },
    chapters: { type: [chapterSchema], default: [] },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);