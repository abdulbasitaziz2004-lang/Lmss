import { connect } from "@/lib/db";
import Course from "@/lib/models/course";
import cloudinary from "@/lib/cloudinary";

export async function PATCH(req, { params }) {
  const { courseId } = await params;  // Fixed: Added 'await' to unwrap the Promise

  try {
    const updates = await req.json();

    // If iconBase64 is provided, upload to Cloudinary
    if (updates.iconBase64) {
      const result = await cloudinary.uploader.upload(updates.iconBase64, {
        folder: "course-icons",
      });
      updates.icon = result.secure_url;
      delete updates.iconBase64; // remove base64 from updates
    }

    await connect();

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return new Response(JSON.stringify({ error: "Course not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, course: updatedCourse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("PATCH /api/admin/courses/[courseId] error:", err);
    return new Response(JSON.stringify({ error: "Failed to update course" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { courseId } = await params;  // Fixed: Added 'await' to unwrap the Promise

  try {
    await connect();
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return new Response(JSON.stringify({ error: "Course not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("DELETE /api/admin/courses/[courseId] error:", err);
    return new Response(JSON.stringify({ error: "Failed to delete course" }), { status: 500 });
  }
}