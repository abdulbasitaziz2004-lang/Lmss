import { connect } from "@/lib/db";
import Course from "@/lib/models/course";

export async function GET() {
  try {
    await connect();
    const courses = await Course.find().lean();
    return new Response(JSON.stringify({ courses }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/admin/courses error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch courses" }), { status: 500 });
  }
}
