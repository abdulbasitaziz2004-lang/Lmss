// app/features/page.jsx
import React from "react";
import Link from "next/link";

const FEATURES = [
  { icon: "💼", title: "Real-World Projects",    desc: "Work on production-ready projects that simulate real industry challenges." },
  { icon: "🎓", title: "Expert Instructors",     desc: "Learn directly from experienced developers and designers from top companies." },
  { icon: "⚡", title: "Lifetime Access",        desc: "Get unlimited lifetime access to all courses and future updates." },
  { icon: "📜", title: "Industry Certificates",  desc: "Earn shareable certificates that showcase your skills to employers." },
  { icon: "🤝", title: "Active Community",       desc: "Collaborate, ask questions, and grow with our developer community." },
  { icon: "🔄", title: "Constant Updates",       desc: "Stay ahead with regularly updated content based on industry trends." },
];

const STATS = [
  { value: "50K+", label: "Students" },
  { value: "120+", label: "Courses" },
  { value: "300+", label: "Projects" },
  { value: "95%",  label: "Satisfaction" },
];

const CHECKLIST = [
  "Personalized learning paths",
  "Hands-on coding exercises",
  "Progress tracking dashboard",
  "Resume & portfolio guidance",
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] dark:text-white text-black overflow-x-hidden transition-all duration-300">

      {/* ── Hero ── */}
      <section className="pt-[140px] pb-20 px-12 text-center relative overflow-hidden max-md:pt-24 max-md:px-6
        before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2
        before:w-[800px] before:h-[800px]
        before:bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)]
        before:pointer-events-none">
        <div className="max-w-[900px] mx-auto relative z-10">
          <span className="inline-block py-2 px-5 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-[50px] text-[0.85rem] font-semibold text-[#a78bfa] mb-8 animate-[fadeInDown_0.8s]">
            ⚡ Platform Features
          </span>
          <h1 className="text-[4.5rem] mb-6 font-black leading-[1.1] bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent animate-[fadeInUp_1s] max-lg:text-5xl max-md:text-4xl">
            Everything You Need<br />to Succeed
          </h1>
          <p className="text-xl text-[#a1a1aa] mb-12 leading-[1.8] animate-[fadeInUp_1.2s] max-md:text-base max-w-[650px] mx-auto">
            Our platform is designed to help you learn faster, build better projects, and advance your career with confidence.
          </p>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="pb-24 px-12 max-md:px-6">
        <div className="max-w-[1300px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {FEATURES.map((f, i) => (
            <div key={i}
              className="p-8 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(59,130,246,0.3)] hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]">
              <div className="w-14 h-14 bg-linear-to-br from-[rgba(59,130,246,0.2)] to-[rgba(139,92,246,0.2)] rounded-[14px] flex items-center justify-center text-3xl mb-5">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2.5 text-white">{f.title}</h3>
              <p className="text-[#71717a] leading-[1.7] text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Split section ── */}
      <section className="py-24 px-12 max-md:px-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1">
          <div>
            <span className="inline-block py-[0.4rem] px-4 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-[50px] text-[0.8rem] font-semibold text-[#a78bfa] mb-6 uppercase tracking-wider">
              Why It Works
            </span>
            <h2 className="text-4xl font-extrabold mb-6 bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent leading-tight">
              Built for Modern Learners
            </h2>
            <p className="text-[#a1a1aa] text-lg leading-[1.8] mb-8">
              We combine structured learning paths, hands-on practice, and career-focused guidance to help you move from beginner to professional.
            </p>
            <ul className="space-y-3">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#71717a]">
                  <span className="w-5 h-5 rounded-full bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.3)] flex items-center justify-center text-[10px] text-blue-400 shrink-0">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-3xl max-md:p-6">
            <h3 className="text-2xl font-bold mb-2 text-white">Career-Focused Learning</h3>
            <p className="text-[#71717a] leading-[1.8] mb-8 text-sm">
              Our courses are designed with hiring standards in mind, helping you gain skills that employers actually look for.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }) => (
                <div key={label}
                  className="text-center p-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl hover:border-[rgba(59,130,246,0.2)] transition-colors">
                  <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
                  <p className="text-[#71717a] text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-12 text-center max-md:px-6">
        <div className="max-w-[800px] mx-auto bg-linear-to-br from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.1)] p-16 rounded-[30px] border border-[rgba(255,255,255,0.1)] max-md:p-8">
          <h2 className="text-[2.8rem] font-extrabold mb-6 text-white max-md:text-3xl">Start Learning Today</h2>
          <p className="text-xl text-[#a1a1aa] mb-10">
            Join thousands of students building real-world skills and advancing their careers.
          </p>
          <Link href="/courses"
            className="py-4 px-10 inline-block bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-[14px] shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.4)] transition-all duration-300">
            Explore Courses
          </Link>
        </div>
      </section>
    </div>
  );
}