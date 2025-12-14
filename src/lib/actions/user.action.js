import User from "../models/user";
import { connect } from "../db";

export async function createUser(user) {
  try {
    await connect();
    const newUser = await User.create(user);
    return newUser.toObject();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
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
