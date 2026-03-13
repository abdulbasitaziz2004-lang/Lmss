// app/become-instructor/page.jsx
"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Upload, Send, FileText, X, Sparkles, BookOpen, Users, Star } from "lucide-react";

const PERKS = [
  { icon: "💰", title: "Earn Revenue",       desc: "Get paid every time a student enrolls in your course" },
  { icon: "🌍", title: "Global Reach",       desc: "Teach students from 100+ countries around the world" },
  { icon: "🛠️", title: "Full Support",       desc: "Dedicated onboarding and content creation assistance" },
  { icon: "📈", title: "Grow Your Brand",    desc: "Build your personal brand as a recognized expert" },
];

export default function BecomeInstructor() {
  const [formData, setFormData] = useState({ name: "", email: "", resume: null, message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData(p => ({ ...p, resume: files[0] }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const clearResume = () => setFormData(p => ({ ...p, resume: null }));

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
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: form });
      const data = await res.json();
      if (data.success) {
        toast.success("Application submitted! We'll be in touch soon.");
        setFormData({ name: "", email: "", resume: null, message: "" });
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] dark:text-white text-black overflow-x-hidden transition-all duration-300">
      <Toaster position="top-right" />

      {/* ── Hero ── */}
      <section className="pt-[140px] pb-20 px-12 text-center relative overflow-hidden max-md:pt-24 max-md:px-6
        before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2
        before:w-[800px] before:h-[800px]
        before:bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)]
        before:pointer-events-none">
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-5 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-[50px] text-[0.85rem] font-semibold text-[#a78bfa] mb-8 animate-[fadeInDown_0.8s]">
            <Sparkles className="w-3.5 h-3.5" /> Join 500+ Expert Instructors
          </div>
          <h1 className="text-[4rem] mb-6 font-black leading-[1.1] bg-linear-to-r from-blue-50 via-blue-300 to-blue-700 dark:from-white dark:via-[#b9b9c6] dark:to-[#a1a1aa] bg-clip-text text-transparent animate-[fadeInUp_1s] max-lg:text-5xl max-md:text-4xl">
            Share Your Knowledge,<br />Shape the Future
          </h1>
          <p className="text-xl text-[#a1a1aa] mb-12 leading-[1.8] animate-[fadeInUp_1.2s] max-md:text-base max-w-[600px] mx-auto">
            Join our growing community of instructors and help thousands of students master web development and design.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 flex-wrap animate-[fadeInUp_1.4s]">
            {[
              { icon: Users,    value: "50K+",  label: "Students" },
              { icon: BookOpen, value: "200+",  label: "Courses" },
              { icon: Star,     value: "4.8",   label: "Avg Rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5 px-5 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl">
                <Icon className="w-4 h-4 text-[#60a5fa]" />
                <span className="text-white font-black">{value}</span>
                <span className="text-[#71717a] text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="px-12 pb-20 max-md:px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {PERKS.map((p, i) => (
            <div key={i}
              className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(139,92,246,0.3)] hover:-translate-y-1">
              <div className="w-12 h-12 bg-[rgba(139,92,246,0.15)] rounded-[12px] flex items-center justify-center text-2xl mb-4">{p.icon}</div>
              <h3 className="text-white font-bold text-sm mb-1.5">{p.title}</h3>
              <p className="text-[#71717a] text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Form ── */}
      <section className="px-12 pb-32 max-md:px-6">
        <div className="max-w-[700px] mx-auto">

          <div className="text-center mb-10">
            <span className="inline-block py-[0.4rem] px-4 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-[50px] text-[0.8rem] font-semibold text-[#60a5fa] mb-4 uppercase tracking-wider">Apply Now</span>
            <h2 className="text-4xl font-extrabold bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent max-md:text-3xl">
              Start Your Application
            </h2>
            <p className="text-[#71717a] mt-3">We review all applications within 2–3 business days.</p>
          </div>

          <form onSubmit={handleSubmit}
            className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 space-y-5 shadow-[0_0_60px_rgba(139,92,246,0.05)] max-md:p-6">

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full Name *">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                  placeholder="John Doe"
                  className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#4b5563] focus:outline-none focus:border-[rgba(139,92,246,0.5)] focus:bg-[rgba(139,92,246,0.05)] transition-all text-sm" />
              </Field>
              <Field label="Email Address *">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                  placeholder="john@example.com"
                  className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#4b5563] focus:outline-none focus:border-[rgba(139,92,246,0.5)] focus:bg-[rgba(139,92,246,0.05)] transition-all text-sm" />
              </Field>
            </div>

            {/* Message */}
            <Field label="Tell Us About Yourself">
              <textarea name="message" value={formData.message} onChange={handleChange} rows={5}
                placeholder="Share your expertise, teaching experience, and what topics you'd like to cover…"
                className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#4b5563] focus:outline-none focus:border-[rgba(139,92,246,0.5)] focus:bg-[rgba(139,92,246,0.05)] transition-all text-sm resize-none" />
            </Field>

            {/* Resume upload */}
            <Field label="Resume / CV">
              {formData.resume ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.25)]">
                  <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm text-gray-300 flex-1 truncate">{formData.resume.name}</span>
                  <button type="button" onClick={clearResume} className="text-gray-500 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl border border-dashed border-[rgba(255,255,255,0.12)] hover:border-[rgba(139,92,246,0.4)] hover:bg-[rgba(139,92,246,0.04)] cursor-pointer transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center group-hover:bg-[rgba(139,92,246,0.2)] transition-colors">
                    <Upload className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-300 font-medium">Click to upload your resume</p>
                    <p className="text-xs text-[#4b5563] mt-0.5">PDF, DOC, DOCX supported</p>
                  </div>
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} className="hidden" />
                </label>
              )}
            </Field>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-white bg-linear-to-r from-blue-500 to-purple-500 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.4)] disabled:opacity-60 disabled:translate-y-0 transition-all duration-300">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
              ) : (
                <><Send className="w-4 h-4" /> Submit Application</>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-[#a1a1aa] font-medium">{label}</label>
      {children}
    </div>
  );
}