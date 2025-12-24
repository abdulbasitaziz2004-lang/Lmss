import { connect } from "@/lib/db";
import Course from "@/lib/models/course";
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";

/* =======================
   GET — Public (everyone)
======================= */
export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    const query =
      category && category !== "All Courses" ? { category } : {};

    const courses = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Course.countDocuments(query);

    return new Response(
      JSON.stringify({
        data: courses,
        page,
        totalPages: Math.ceil(total / limit),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

/* =======================
   POST — Instructor/Admin
======================= */
export async function POST(req) {
  try {
    await connect();

    const user = await getCurrentDbUser();
    if (!user || !["instructor", "admin"].includes(user.role)) {
      return new Response("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const courses = Array.isArray(body) ? body : [body];

    const newCourses = await Course.insertMany(courses);

    return new Response(JSON.stringify(newCourses), { status: 201 });
  } catch (error) {
    console.error("POST /api/courses error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

/* =======================
   PUT — Instructor/Admin
======================= */
export async function PUT(req) {
  try {
    await connect();

    const user = await getCurrentDbUser();
    if (!user || !["instructor", "admin"].includes(user.role)) {
      return new Response("Forbidden", { status: 403 });
    }

    const { id, ...updateData } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Course ID is required" }),
        { status: 400 }
      );
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedCourse) {
      return new Response(
        JSON.stringify({ error: "Course not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(updatedCourse), { status: 200 });
  } catch (error) {
    console.error("PUT /api/courses error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

/* =======================
   DELETE — Instructor/Admin
======================= */
export async function DELETE(req) {
  try {
    await connect();

    const user = await getCurrentDbUser();
    if (!user || !["instructor", "admin"].includes(user.role)) {
      return new Response("Forbidden", { status: 403 });
    }

    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Course ID is required" }),
        { status: 400 }
      );
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return new Response(
        JSON.stringify({ error: "Course not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Course deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/courses error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
