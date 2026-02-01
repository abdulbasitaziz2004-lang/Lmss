import CoursesSection from "@/components/CoursesSection";
import { getCourses } from "@/lib/actions/course.action";

// app/page.js
export default async function Home({ searchParams }) {
const { courses, total } = await getCourses({  page: 1, limit: 6 });

  return (
    <div className="min-h-screen  bg-white dark:text-white dark:bg-[#0a0a0f] text-black  overflow-x-hidden transition-all duration-300">
      {/* Hero Section */}
      <section className="pt-[140px] pb-20 px-12 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-1/2 before:translate-x-[-50%] before:w-[800px] before:h-[800px] before:bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] before:pointer-events-none max-md:pt-24 max-md:px-6">
        <div className="max-w-[900px] mx-auto relative z-1">
          <div className="inline-block py-2 px-5 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-[50px] text-[0.85rem] font-semibold text-[#60a5fa] mb-8 animate-[fadeInDown_0.8s]">
            🚀 50,000+ Students Learning
          </div>
          <h1 className="text-[4.5rem] mb-6 font-black leading-[1.1] bg-linear-to-r  from-blue-50 via-blue-300 to-blue-700 dark:from-white dark:via-[#b9b9c6] dark:to-[#a1a1aa] bg-clip-text text-transparent animate-[fadeInUp_1s] max-lg:text-5xl max-md:text-4xl">
            Master Web Development & UI/UX Design
          </h1>
          <p className="text-xl text-[#a1a1aa] mb-12 leading-[1.8] animate-[fadeInUp_1.2s] max-md:text-base">
            Learn from industry experts and build real-world projects. From beginner to professional, we've got you covered with cutting-edge curriculum.
          </p>
          <div className="flex gap-6 justify-center animate-[fadeInUp_1.4s] max-md:flex-col">
            <a href="#courses" className="py-4 px-10 border-none rounded-[14px] cursor-pointer font-semibold text-base transition-all duration-300 no-underline inline-block bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.4)]">Explore Courses</a>
            <a href="#" className="py-4 px-10 border border-[rgba(255,255,255,0.1)] rounded-[14px] cursor-pointer font-semibold text-base transition-all duration-300 no-underline inline-block bg-transparent text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white hover:border-[rgba(255,255,255,0.2)]">View Learning Paths</a>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <CoursesSection courses={courses} />

      {/* Features Section */}
      <section className="bg-linear-to-b from-transparent to-[rgba(59,130,246,0.03)] py-24 px-12 relative" id="features">
        <div className="text-center mb-16">
          <span className="inline-block py-[0.4rem] px-4 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-[50px] text-[0.8rem] font-semibold text-[#a78bfa] mb-4 uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent max-md:text-3xl">Everything You Need to Succeed</h2>
          <p className="text-lg text-[#71717a] max-w-[600px] mx-auto">Industry-leading features designed for modern learners</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 max-w-[1400px] mx-auto">
          {[
            { icon: "💼", title: "Real-World Projects", desc: "Build production-ready applications and portfolios that impress employers" },
            { icon: "🎓", title: "Expert Instructors", desc: "Learn from senior developers and designers at top tech companies" },
            { icon: "⚡", title: "Lifetime Access", desc: "Learn at your own pace with unlimited access to all course materials" },
            { icon: "🤝", title: "Active Community", desc: "Join thousands of developers in our Discord and forum communities" },
            { icon: "📜", title: "Certificates", desc: "Earn recognized certificates to showcase your skills to employers" },
            { icon: "🔄", title: "Regular Updates", desc: "Stay current with free updates as technologies evolve" }
          ].map((feature, idx) => (
            <div key={idx} className="p-10 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(59,130,246,0.3)] hover:translate-y-[-5px]">
              <div className="w-[60px] h-[60px] bg-linear-to-br from-[rgba(59,130,246,0.2)] to-[rgba(139,92,246,0.2)] rounded-[15px] flex items-center justify-center text-3xl mb-6">{feature.icon}</div>
              <h3 className="text-[1.3rem] font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-[#71717a] leading-[1.7]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-12 text-center relative overflow-hidden">
        <div className="max-w-[800px] mx-auto relative z-1 bg-linear-to-br from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.1)] p-16 rounded-[30px] border border-[rgba(255,255,255,0.1)] max-md:p-8">
          <h2 className="text-[2.8rem] font-extrabold mb-6 text-white max-md:text-3xl">Ready to Transform Your Career?</h2>
          <p className="text-xl text-[#a1a1aa] mb-10">Join 50,000+ students learning web development and UI/UX design. Start your journey today.</p>
          <div className="flex gap-6 justify-center max-md:flex-col">
            <a href="#" className="py-4 px-10 border-none rounded-[14px] cursor-pointer font-semibold text-base transition-all duration-300 no-underline inline-block bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.4)]">Start Learning Now</a>
            <a href="#" className="py-4 px-10 border border-[rgba(255,255,255,0.1)] rounded-[14px] cursor-pointer font-semibold text-base transition-all duration-300 no-underline inline-block bg-transparent text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white hover:border-[rgba(255,255,255,0.2)]">View Pricing Plans</a>
          </div>
        </div>
      </section>
    </div>
  );
}