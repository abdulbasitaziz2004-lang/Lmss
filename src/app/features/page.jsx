import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-white dark:text-white dark:bg-[#0a0a0f] text-black overflow-x-hidden transition-all duration-300">

      {/* Hero Section */}
      <section className="pt-[140px] pb-20 px-12 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-1/2 before:translate-x-[-50%] before:w-[800px] before:h-[800px] before:bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] before:pointer-events-none max-md:pt-24 max-md:px-6">
        <div className="max-w-[900px] mx-auto relative z-1">
          <span className="inline-block py-2 px-5 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-[50px] text-[0.85rem] font-semibold text-[#a78bfa] mb-8 animate-[fadeInDown_0.8s]">
            ⚡ Platform Features
          </span>

          <h1 className="text-[4.5rem] mb-6 font-black leading-[1.1] bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent animate-[fadeInUp_1s] max-lg:text-5xl max-md:text-4xl">
            Everything You Need to Succeed
          </h1>

          <p className="text-xl text-[#a1a1aa] mb-12 leading-[1.8] animate-[fadeInUp_1.2s] max-md:text-base">
            Our platform is designed to help you learn faster, build better projects,
            and advance your career with confidence.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-linear-to-b from-transparent to-[rgba(59,130,246,0.03)] py-24 px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">

          {[
            {
              icon: "💼",
              title: "Real-World Projects",
              desc: "Work on production-ready projects that simulate real industry challenges."
            },
            {
              icon: "🎓",
              title: "Expert Instructors",
              desc: "Learn directly from experienced developers and designers from top companies."
            },
            {
              icon: "⚡",
              title: "Lifetime Access",
              desc: "Get unlimited lifetime access to all courses and future updates."
            },
            {
              icon: "📜",
              title: "Industry Certificates",
              desc: "Earn shareable certificates that showcase your skills to employers."
            },
            {
              icon: "🤝",
              title: "Active Community",
              desc: "Collaborate, ask questions, and grow with our developer community."
            },
            {
              icon: "🔄",
              title: "Constant Updates",
              desc: "Stay ahead with regularly updated content based on industry trends."
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-10 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(59,130,246,0.3)] hover:translate-y-[-5px]"
            >
              <div className="w-[60px] h-[60px] bg-linear-to-br from-[rgba(59,130,246,0.2)] to-[rgba(139,92,246,0.2)] rounded-[15px] flex items-center justify-center text-3xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-[1.3rem] font-bold mb-3 text-white">
                {feature.title}
              </h3>

              <p className="text-[#71717a] leading-[1.7]">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-24 px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-16 max-lg:grid-cols-1">

          <div>
            <h2 className="text-4xl font-extrabold mb-6 bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent">
              Built for Modern Learners
            </h2>

            <p className="text-[#a1a1aa] text-lg leading-[1.8] mb-8">
              We combine structured learning paths, hands-on practice,
              and career-focused guidance to help you move from beginner
              to professional.
            </p>

            <ul className="space-y-4 text-[#71717a]">
              <li>✔ Personalized learning paths</li>
              <li>✔ Hands-on coding exercises</li>
              <li>✔ Progress tracking dashboard</li>
              <li>✔ Resume & portfolio guidance</li>
            </ul>
          </div>

          <div className="p-10 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-3xl">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Career-Focused Learning
            </h3>

            <p className="text-[#71717a] leading-[1.8] mb-6">
              Our courses are designed with hiring standards in mind, helping
              you gain skills that employers actually look for.
            </p>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-3xl font-extrabold text-white">50K+</p>
                <p className="text-[#71717a]">Students</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">120+</p>
                <p className="text-[#71717a]">Courses</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">300+</p>
                <p className="text-[#71717a]">Projects</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">95%</p>
                <p className="text-[#71717a]">Satisfaction</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-12 text-center">
        <div className="max-w-[800px] mx-auto bg-linear-to-br from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.1)] p-16 rounded-[30px] border border-[rgba(255,255,255,0.1)] max-md:p-8">
          <h2 className="text-[2.8rem] font-extrabold mb-6 text-white max-md:text-3xl">
            Start Learning Today
          </h2>

          <p className="text-xl text-[#a1a1aa] mb-10">
            Join thousands of students building real-world skills and advancing
            their careers.
          </p>

          <a
            href="/courses"
            className="py-4 px-10 inline-block bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-[14px] shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.4)] transition-all duration-300"
          >
            Explore Courses
          </a>
        </div>
      </section>

    </div>
  );
}

export default page

