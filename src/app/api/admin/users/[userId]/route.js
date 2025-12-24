import { connect } from "@/lib/db";
import User from "@/lib/models/user";

export async function PATCH(req, { params }) {

  const { userId } = await params;
  try {
    const { role } = await req.json();

    // Validate role
    if (!["student", "instructor", "admin"].includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connect();

    // Update the user's role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, user: updatedUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("PATCH /users/[userId] error:", err);
    return new Response(JSON.stringify({ error: "Failed to update role" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
