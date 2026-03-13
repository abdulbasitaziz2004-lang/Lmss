"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash2, ChevronDown, Play, Pencil, X, Check, GripVertical } from "lucide-react";
import { getEmbedUrl } from "@/components/YoutubeEmbed";

const slugify = (text) =>
  text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/* ── notify admin (only fires for instructors, silent fail) ── */
async function notifyAdmin(userRole, action, courseTitle, courseSlug) {
  if (userRole !== "instructor") return;
  try {
    await fetch("/api/notify-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, courseTitle, courseSlug }),
    });
  } catch (err) {
    console.warn("Admin notification failed silently:", err);
  }
}

/* ── Collapsible section ── */
function Section({ title, badge, accent = "purple", children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const colors = {
    purple: "border-purple-500/30 bg-purple-500/5",
    blue:   "border-blue-500/30   bg-blue-500/5",
    green:  "border-green-500/30  bg-green-500/5",
  };
  return (
    <div className={`rounded-xl border ${colors[accent]} overflow-hidden`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">{title}</span>
          {badge !== undefined && (
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{badge}</span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`transition-all duration-300 ${open ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-5 pb-5 pt-1">{children}</div>
      </div>
    </div>
  );
}

/* ── Video preview ── */
function VideoPreview({ url }) {
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return (
    <div className="flex items-center justify-center h-32 bg-gray-900 rounded-lg border border-dashed border-gray-700 text-gray-500 text-sm">
      Enter a valid YouTube URL above to preview
    </div>
  );
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden mt-3 shadow-lg">
      <iframe src={embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
    </div>
  );
}

const EMPTY_FORM = {
  title: "", slug: "", category: "", instructor: "",
  description: "", hours: "", chapters: "", students: "",
  rating: "", price: "", icon: "", introVideo: "",
  chapterList: [],
};

/* ── accept userRole prop ── */
export default function AdminCourses({ userRole = "instructor" }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [openChapterPreview, setOpenChapterPreview] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchCourses = async () => {
    const res = await fetch("/api/admin/courses");
    const data = await res.json();
    if (res.ok) setCourses(data.courses);
  };

  useEffect(() => { fetchCourses(); }, []);

  const syncChapterList = (count, currentList) => {
    const n = parseInt(count) || 0;
    if (n === currentList.length) return currentList;
    if (n > currentList.length)
      return [...currentList, ...Array(n - currentList.length).fill(null).map(() => ({ title: "", videoUrl: "" }))];
    return currentList.slice(0, n);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => {
    // capitalize first letter of title and category
    const formatted =
      (name === "title" || name === "category") && value
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    const updated = {
      ...prev,
      [name]: formatted,
      // slug always syncs with title (even when editing)
      ...(name === "title" ? { slug: slugify(value) } : {}),
    };

    // sync chapter rows when count changes
    if (name === "chapters") {
      updated.chapterList = syncChapterList(value, prev.chapterList);
    }

    return updated;
  });
};

  const addChapter = () =>
    setForm(p => {
      const newList = [...p.chapterList, { title: "", videoUrl: "" }];
      return { ...p, chapterList: newList, chapters: String(newList.length) };
    });

  const updateChapter = (i, field, value) =>
    setForm(p => { const c = [...p.chapterList]; c[i] = { ...c[i], [field]: value }; return { ...p, chapterList: c }; });

  const removeChapter = (i) =>
    setForm(p => {
      const newList = p.chapterList.filter((_, j) => j !== i);
      return { ...p, chapterList: newList, chapters: String(newList.length) };
    });

  const handleIconUpload = (result) => {
    if (result?.info?.secure_url && result.event === "success") {
      setForm(p => ({ ...p, icon: result.info.secure_url }));
      toast.success("Icon uploaded!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating < 0 || form.rating > 5) { toast.error("Rating must be between 0 and 5"); return; }
    if (form.price < 0) { toast.error("Price cannot be negative"); return; }
    setLoading(true);

    const payload = { ...form, chapters: form.chapterList, lessons: form.chapters };
    delete payload.chapterList;

    const url = editingId ? `/api/admin/courses/${editingId}` : "/api/courses";
    const res = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(editingId ? "Course updated!" : "Course created!");
      await notifyAdmin(userRole, editingId ? "edit" : "create", form.title, form.slug);
      resetForm();
      fetchCourses();
    } else {
      toast.error(data.error || "Something went wrong");
    }
    setLoading(false);
  };

  const editCourse = (course) => {
    setEditingId(course._id);
    const chapterList = course.chapters || [];
    setForm({
      title: course.title, slug: course.slug, category: course.category,
      instructor: course.instructor, description: course.description || "",
      hours: course.hours || "", chapters: String(chapterList.length),
      students: course.students || "", rating: course.rating || "",
      price: course.price || "", icon: course.icon || "",
      introVideo: course.introVideo || "", chapterList,
    });
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => { setEditingId(null); setForm(EMPTY_FORM); };

  const deleteCourse = async (id) => {
    if (!confirm("Delete this course?")) return;
    setLoading(true);
    const course = courses.find(c => c._id === id);
    const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Course deleted");
      setCourses(courses.filter(c => c._id !== id));
      await notifyAdmin(userRole, "delete", course?.title || "Unknown", course?.slug || "");
    } else {
      toast.error("Delete failed");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster position="top-right" />

      <div className="mb-8">
        <p className="text-xs text-purple-400 font-medium tracking-widest uppercase mb-1">
          {userRole === "admin" ? "Admin Panel" : "Instructor Panel"}
        </p>
        <h1 className="text-3xl font-black text-white">{editingId ? "Edit Course" : "Create Course"}</h1>
        {userRole === "instructor" && (
          <p className="text-xs text-amber-500/70 mt-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Changes you make will notify the admin
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-12">

        <Section title="Basic Information" accent="purple" defaultOpen={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Field label="Title *" name="title" value={form.title} onChange={handleChange} required />
            <Field label="Slug *" name="slug" value={form.slug} onChange={handleChange} required />
            <Field label="Category *" name="category" value={form.category} onChange={handleChange} required />
            <Field label="Instructor *" name="instructor" value={form.instructor} onChange={handleChange} required />
            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm mb-1.5 block">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none transition-colors" />
            </div>
          </div>
        </Section>

        <Section title="Stats & Pricing" accent="blue">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <Field label="Hours" name="hours" type="number" value={form.hours} onChange={handleChange} />
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-sm">Chapters</label>
              <input name="chapters" type="number" min={0} value={form.chapters} onChange={handleChange}
                placeholder="e.g. 5"
                className="p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600" />
              {form.chapters > 0 && (
                <p className="text-xs text-purple-400 mt-0.5">↓ {form.chapters} row{form.chapters > 1 ? "s" : ""} synced below</p>
              )}
            </div>
            <Field label="Students" name="students" value={form.students} onChange={handleChange} />
            <Field label="Rating (1–5)" name="rating" type="number" min={1} max={5} step={0.1} value={form.rating} onChange={handleChange} />
            <Field label="Price ($)" name="price" type="number" min={0} step={0.01} value={form.price} onChange={handleChange} />
          </div>
        </Section>

        <Section title="Course Icon" accent="green">
          <div className="mt-2 flex items-center gap-5">
            <CldUploadWidget uploadPreset="course_icons" onSuccess={handleIconUpload}>
              {({ open }) => (
                <button type="button" onClick={open}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white text-sm transition-colors">
                  Upload Icon
                </button>
              )}
            </CldUploadWidget>
            {form.icon
              ? <img src={form.icon} className="w-16 h-16 rounded-xl border border-gray-700 object-contain bg-gray-900" />
              : <p className="text-gray-500 text-sm">No icon uploaded yet</p>}
          </div>
        </Section>

        <Section title="Intro Video" badge="Public Preview" accent="purple">
          <div className="mt-2 space-y-2">
            <Field label="YouTube URL" name="introVideo" value={form.introVideo} onChange={handleChange} placeholder="https://youtu.be/..." />
            <VideoPreview url={form.introVideo} />
          </div>
        </Section>

        <Section title="Chapters" badge={`${form.chapterList.length} added`} accent="blue">
          <div className="mt-3 space-y-3">
            {form.chapterList.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                Set a chapter count above, or click "Add Chapter" to start manually.
              </p>
            )}
            {form.chapterList.map((chapter, i) => (
              <ChapterRow key={i} index={i} chapter={chapter}
                onChange={(field, val) => updateChapter(i, field, val)}
                onRemove={() => removeChapter(i)} />
            ))}
            <button type="button" onClick={addChapter}
              className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-600 hover:border-purple-500 text-gray-400 hover:text-purple-400 py-3 rounded-lg text-sm transition-all">
              <Plus className="w-4 h-4" /> Add Chapter
            </button>
          </div>
        </Section>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:opacity-50 px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition-all shadow-lg shadow-purple-900/30">
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
              : <><Check className="w-4 h-4" /> {editingId ? "Update Course" : "Create Course"}</>}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-2.5 rounded-xl text-white text-sm transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
      </form>

      {/* ── COURSE LIST ── */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          All Courses <span className="text-gray-500 font-normal text-base">({courses.length})</span>
        </h2>
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course._id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                {course.icon
                  ? <img src={course.icon} className="w-12 h-12 rounded-lg object-contain bg-gray-800 shrink-0" />
                  : <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-xl shrink-0">🎓</div>}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{course.title}</p>
                  <p className="text-sm text-gray-400">{course.category} · {course.chapters?.length || 0} chapters</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setExpandedCourse(expandedCourse === course._id ? null : course._id)}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg transition-colors">
                    <Play className="w-3 h-3" /> Preview
                    <ChevronDown className={`w-3 h-3 transition-transform ${expandedCourse === course._id ? "rotate-180" : ""}`} />
                  </button>
                  <button onClick={() => editCourse(course)}
                    className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 px-2.5 py-1.5 rounded-lg text-white transition-colors">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => deleteCourse(course._id)}
                    className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-500 px-2.5 py-1.5 rounded-lg text-white transition-colors">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>

              <div className={`transition-all duration-300 ${expandedCourse === course._id ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                <div className="px-4 pb-4 border-t border-gray-800 pt-4 space-y-4">
                  {course.introVideo ? (
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Intro Preview</p>
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                        <iframe src={getEmbedUrl(course.introVideo)} className="absolute inset-0 w-full h-full"
                          allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                      </div>
                    </div>
                  ) : <p className="text-gray-500 text-sm">No intro video set.</p>}

                  {course.chapters?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Chapters</p>
                      <div className="space-y-1.5">
                        {course.chapters.map((ch, i) => {
                          const previewKey = `${course._id}-${i}`;
                          const isOpen = openChapterPreview === previewKey;
                          return (
                            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                              <div className="flex items-center gap-3 p-2.5">
                                <span className="text-xs text-gray-500 w-5 shrink-0">{i + 1}.</span>
                                <span className="text-sm text-white flex-1 truncate">{ch.title || <span className="text-gray-600 italic">Untitled</span>}</span>
                                {ch.videoUrl && (
                                  <button onClick={() => setOpenChapterPreview(isOpen ? null : previewKey)}
                                    className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 bg-gray-700 px-2 py-1.5 rounded-lg transition-colors">
                                    <Play className="w-3 h-3" /> Preview
                                    <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                  </button>
                                )}
                              </div>
                              <div className={`transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                                {ch.videoUrl && <div className="p-3 border-t border-gray-700"><VideoPreview url={ch.videoUrl} /></div>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-gray-900 border border-gray-800 rounded-xl">
              No courses yet. Create your first one above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Chapter row with video preview dropdown ── */
function ChapterRow({ index, chapter, onChange, onRemove }) {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div className="flex gap-3 items-center p-3">
        <GripVertical className="w-4 h-4 text-gray-600 shrink-0" />
        <span className="text-gray-500 text-sm w-5 shrink-0">{index + 1}.</span>
        <input placeholder="Chapter title" value={chapter.title} onChange={(e) => onChange("title", e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors" />
        <input placeholder="YouTube URL" value={chapter.videoUrl} onChange={(e) => onChange("videoUrl", e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors" />
        <button type="button" onClick={() => setShowPreview(v => !v)} disabled={!chapter.videoUrl}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed bg-gray-800 px-2 py-1.5 rounded-lg transition-colors shrink-0">
          <Play className="w-3 h-3" />
          <ChevronDown className={`w-3 h-3 transition-transform ${showPreview ? "rotate-180" : ""}`} />
        </button>
        <button type="button" onClick={onRemove} className="text-red-400 hover:text-red-300 shrink-0 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className={`transition-all duration-300 ${showPreview && chapter.videoUrl ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-3 pb-3 border-t border-gray-700 pt-3"><VideoPreview url={chapter.videoUrl} /></div>
      </div>
    </div>
  );
}

/* ── Reusable field ── */
function Field({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-400 text-sm">{label}</label>
      <input {...props} className="p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600" />
    </div>
  );
}