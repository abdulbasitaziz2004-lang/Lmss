import { connect } from "@/lib/db";
import User from "@/lib/models/user";

export async function GET() {
  try {
    await connect();
    const users = await User.find().lean();
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /users error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
