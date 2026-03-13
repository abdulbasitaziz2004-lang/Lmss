import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/lib/models/user";
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";

export async function PATCH(req, { params }) {
  const { userId } = await params;
  try {
    const { role } = await req.json();

    if (!["student", "instructor", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    await connect();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("PATCH /users/[userId] error:", err);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { userId } = await params;
  try {
    // Only admins can delete users
    const currentUser = await getCurrentDbUser();
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connect();

    // Find user in DB to get their clerkId
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete from Clerk using their Backend API
    const clerkRes = await fetch(
      `https://api.clerk.com/v1/users/${user.clerkId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    );

    if (!clerkRes.ok) {
      const clerkError = await clerkRes.json();
      console.error("Clerk delete failed:", clerkError);
      return NextResponse.json(
        { error: "Failed to delete from Clerk", detail: clerkError },
        { status: 500 }
      );
    }

    // Delete from MongoDB
    await User.findByIdAndDelete(userId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /users/[userId] error:", err);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}