import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: {
      type: Number, // %
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enrollment ||
  mongoose.model("Enrollment", EnrollmentSchema);
