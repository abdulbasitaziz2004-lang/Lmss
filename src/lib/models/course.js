import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true }, // Frontend, Backend, etc
    instructor: { type: String, required: true },
    hours: Number,
    lessons: Number,
    students: String,
    rating: String,
    price: Number,
    icon: String, // ⚛️ 🎨 etc
    description: {
  type: String,
  required: true,
},
  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);
