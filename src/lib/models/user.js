import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    photo: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    completedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    // chapterProgress["chapterId"] = { watchPercent: 0-100, completed: bool }
    chapterProgress: {
      type: Map,
      of: new Schema(
        {
          watchPercent: { type: Number, default: 0 },
          completed: { type: Boolean, default: false },
        },
        { _id: false }
      ),
      default: {},
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;