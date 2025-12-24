"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    instructor: "",
    description: "",
    hours: "",
    lessons: "",
    students: "",
    rating: "",
    price: "",
    icon: "", // only icon
  });

  /* ================= FETCH ================= */
  const fetchCourses = async () => {
    const res = await fetch("/api/admin/courses");
    const data = await res.json();
    if (res.ok) setCourses(data.courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "category" && value
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : value,
      ...(name === "title" && !editingId
        ? { slug: slugify(value) }
        : {}),
    }));
  };

  /* ================= CLOUDINARY ICON UPLOAD ================= */
  const handleIconUpload = (result) => {
    if (result?.info?.secure_url && result.event === "success") {
      setForm((prev) => ({ ...prev, icon: result.info.secure_url }));
      toast.success("Icon uploaded!");
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

if (form.rating < 0 || form.rating > 5) {
    toast.error("Rating must be between 0 and 5");
    return;
  }

  if (form.price < 0) {
    toast.error("Price cannot be negative");
    return;
  }

    setLoading(true);

    const url = editingId
      ? `/api/admin/courses/${editingId}`
      : "/api/courses";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(editingId ? "Course updated!" : "Course created!");
      resetForm();
      fetchCourses();
    } else {
      toast.error(data.error || "Something went wrong");
    }

    setLoading(false);
  };

  /* ================= EDIT / RESET ================= */
  const editCourse = (course) => {
    setEditingId(course._id);
    setForm({
      title: course.title,
      slug: course.slug,
      category: course.category,
      instructor: course.instructor,
      description: course.description || "",
      hours: course.hours || "",
      lessons: course.lessons || "",
      students: course.students || "",
      rating: course.rating || "",
      price: course.price || "",
      icon: course.icon || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      slug: "",
      category: "",
      instructor: "",
      description: "",
      hours: "",
      lessons: "",
      students: "",
      rating: "",
      price: "",
      icon: "",
    });
  };

  /* ================= DELETE ================= */
  const deleteCourse = async (id) => {
    if (!confirm("Delete this course?")) return;

    setLoading(true);
    const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Course deleted");
      setCourses(courses.filter((c) => c._id !== id));
    } else {
      toast.error("Delete failed");
    }
    setLoading(false);
  };

  /* ================= JSX ================= */
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold mb-6">
        {editingId ? "Edit Course" : "Create Course"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-gray-800  p-6 rounded-lg space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Title *" name="title" value={form.title} onChange={handleChange} required />
          <Input label="Slug *" name="slug" value={form.slug} onChange={handleChange} required />
          <Input label="Category *" name="category" value={form.category} onChange={handleChange} required />
          <Input label="Instructor *" name="instructor" value={form.instructor} onChange={handleChange} required />

          <div className="md:col-span-2">
            <label className="text-gray-300 mb-1 block">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-2 rounded bg-gray-900 text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <Input label="Hours" name="hours" type="number" value={form.hours} onChange={handleChange} />
          <Input label="Lessons" name="lessons" type="number" value={form.lessons} onChange={handleChange} />
          <Input label="Students" name="students" value={form.students} onChange={handleChange} />
          <Input label="Rating"
          min={1}       // minimum value
  max={5}       // maximum value
  step={0.1}    // optional: allows decimals like 4.5
          name="rating" value={form.rating} onChange={handleChange} />
          <Input label="Price"
           min={0}       // prevents negative values
          step={0.01}   // optional: allows cents like 19.99
          name="price" type="number" value={form.price} onChange={handleChange} />

          {/* Icon Upload */}
          <div className="md:col-span-2">
            <label className="text-gray-300 mb-1 block">Course Icon *</label>
            <CldUploadWidget
              uploadPreset="courses"
              onSuccess={handleIconUpload}
            >
              {({ open }) => (
                <button type="button" onClick={open} className="bg-blue-600 px-4 py-2 rounded text-white">
                  Upload Icon
                </button>
              )}
            </CldUploadWidget>
            {form.icon && <img src={form.icon} className="w-20 h-20 mt-3 rounded border" />}
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-green-600 px-6 py-2 rounded text-white">
            {editingId ? "Update Course" : "Create Course"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-600 px-6 py-2 rounded text-white">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Course List */}
      <div className="mt-10 space-y-4">
        {courses.map((course) => (
          <div key={course._id} className="flex justify-between items-center bg-gray-800 p-4 rounded">
            <div className="flex items-center gap-4">
              <img src={course.icon} className="h-10 rounded" />
              <div>
                <p className="font-semibold">{course.title}</p>
                <p className="text-sm text-gray-400">{course.category}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => editCourse(course)} className="bg-blue-600 px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => deleteCourse(course._id)} className="bg-red-600 px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-300 mb-1">{label}</label>
      <input {...props} className="p-2 rounded bg-gray-900 text-white focus:ring-2 focus:ring-purple-500" />
    </div>
  );
}
