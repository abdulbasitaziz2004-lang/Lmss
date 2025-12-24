import User from "../models/user";
import { connect } from "../db";
import Course from "@/models/course";

export async function createUser(user) {
  try {
    await connect();

    // Check if user already exists by clerkId OR email
    const existingUser = await User.findOne({
      $or: [{ clerkId: user.clerkId }, { email: user.email }],
    });

    if (existingUser) {
      return existingUser.toObject(); // Return existing user
    }

     // Ensure role is valid and set to "student" if missing
    if (!user.role || !["student", "instructor", "admin"].includes(user.role)) {
      user.role = "student";
    }
    
    // Create new user
    const newUser = await User.create(user);
    return newUser.toObject();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserWithCourses(clerkId) {
  await connect();
  const user = await User.findOne({ clerkId }).populate("enrolledCourses").lean();
  return user;
}

// import User from "../models/user";
// import { connect } from "../db";

// export async function createUser(user) {
//   try {
//     await connect();

//     if (!user.clerkId || !user.email || !user.username) {
//       throw new Error("Missing required user fields");
//     }

//     const newUser = await User.create(user);
//     return newUser;
//   } catch (error) {
//     console.error("❌ Error creating user:", error);
//     throw error;
//   }
// }
