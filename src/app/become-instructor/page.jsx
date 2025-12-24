// app/become-instructor/page.jsx
"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function BecomeInstructor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    if (formData.resume) form.append("files[]", formData.resume);
    form.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Your application has been submitted!");
        setFormData({ name: "", email: "", resume: null, message: "" });
      } else {
        toast.error("Submission failed. Try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] dark:text-white text-black px-12 py-24 max-md:px-6">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-black mb-6 text-center bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent">
        Become an Instructor
      </h1>
      <p className="text-lg text-[#71717a] mb-12 text-center max-w-[700px] mx-auto">
        Join our team and share your knowledge with thousands of students worldwide. Fill out the form below and attach your resume.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-300">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about your experience..."
            className="p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-300">Upload Resume (PDF, DOCX)</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {formData.resume && (
            <p className="text-gray-400 mt-2">Selected: {formData.resume.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl w-full font-semibold transition-all duration-300"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
