  import { currentUser } from "@clerk/nextjs/server";
  import { connect } from "@/lib/db";
  import User from "@/lib/models/user";

  export async function getCurrentDbUser() {
    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    await connect();
    return User.findOne({ clerkId : clerkUser.id }).lean();
  }