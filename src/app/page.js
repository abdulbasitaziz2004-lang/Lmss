// app/page.js
export default function Home() {
  return (
    <div className="min-h-screen  bg-white dark:text-white dark:bg-[#0a0a0f] text-black  overflow-x-hidden transition-all duration-300">
      
      {/* Hero Section */}
      <section className="pt-[140px] pb-20 px-12 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-1/2 before:translate-x-[-50%] before:w-[800px] before:h-[800px] before:bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] before:pointer-events-none max-md:pt-24 max-md:px-6">
        <div className="max-w-[900px] mx-auto relative z-1">
          <div className="inline-block py-2 px-5 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-[50px] text-[0.85rem] font-semibold text-[#60a5fa] mb-8 animate-[fadeInDown_0.8s]">
            🚀 50,000+ Students Learning
          </div>
          <h1 className="text-[4.5rem] mb-6 font-black leading-[1.1] bg-linear-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent animate-[fadeInUp_1s] max-lg:text-5xl max-md:text-4xl">
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
      <section className="max-w-[1400px] mx-auto py-20 px-12 max-md:py-12 max-md:px-6" id="courses">
        <div className="text-center mb-16">
          <span className="inline-block py-[0.4rem] px-4 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-[50px] text-[0.8rem] font-semibold text-[#a78bfa] mb-4 uppercase tracking-wider">Learn & Build</span>
          <h2 className="text-5xl font-extrabold mb-4 bg-linear-to-rrom-white to-[#a1a1aa] bg-clip-text text-transparent max-md:text-3xl">Web Development Courses</h2>
          <p className="text-lg text-[#71717a] max-w-[600px] mx-auto">Master the complete web development stack with hands-on projects and expert guidance</p>
        </div>

        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <div className="py-[0.7rem] px-6 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.5)] rounded-[10px] text-[#60a5fa] cursor-pointer transition-all duration-300 font-medium">All Courses</div>
          <div className="py-[0.7rem] px-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-[10px] text-[#a1a1aa] cursor-pointer transition-all duration-300 font-medium hover:bg-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.5)] hover:text-[#60a5fa]">Frontend</div>
          <div className="py-[0.7rem] px-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-[10px] text-[#a1a1aa] cursor-pointer transition-all duration-300 font-medium hover:bg-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.5)] hover:text-[#60a5fa]">Backend</div>
          <div className="py-[0.7rem] px-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-[10px] text-[#a1a1aa] cursor-pointer transition-all duration-300 font-medium hover:bg-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.5)] hover:text-[#60a5fa]">Full Stack</div>
          <div className="py-[0.7rem] px-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-[10px] text-[#a1a1aa] cursor-pointer transition-all duration-300 font-medium hover:bg-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.5)] hover:text-[#60a5fa]">UI/UX</div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8 max-lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {/* Course Card 1 */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-[0.4s] cursor-pointer relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-to-br before:from-[rgba(59,130,246,0.05)] before:to-[rgba(139,92,246,0.05)] before:opacity-0 before:transition-opacity before:duration-[0.4s] hover:-translate-y-2 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:before:opacity-100'">
            <div className="w-full h-[220px] bg-linear-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] before:animate-[pulse_8s_infinite]">
              <span className="text-6xl z-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">⚛️</span>
            </div>
            <div className="p-7 relative z-1">
              <span className="inline-block py-[0.3rem] px-3 bg-[rgba(59,130,246,0.15)] rounded-md text-xs font-semibold text-[#60a5fa] mb-4 uppercase tracking-wide">Frontend</span>
              <h3 className="text-[1.35rem] font-bold mb-3 text-white leading-[1.4]">Complete React Developer Bootcamp 2024</h3>
              <p className="text-[#71717a] text-[0.9rem] mb-5 flex items-center gap-2">👤 Sarah Mitchell • Senior Developer at Meta</p>
              <div className="flex gap-6 mb-6 pb-6 border-b border-[rgba(255,255,255,0.05)]">
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">📚 45 hours</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">🎯 220 lessons</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">👥 12.5k students</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[0.4rem] font-semibold text-[#fbbf24]">⭐ 4.9 (3.2k)</div>
                <div className="text-2xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">$79.99</div>
              </div>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-[0.4s] cursor-pointer relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-to-br before:from-[rgba(59,130,246,0.05)] before:to-[rgba(139,92,246,0.05)] before:opacity-0 before:transition-opacity before:duration-[0.4s] hover:-translate-y-2 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:before:opacity-100">
            <div className="w-full h-[220px] bg-linear-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] before:animate-[pulse_8s_infinite]">
              <span className="text-6xl z-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">💎</span>
            </div>
            <div className="p-7 relative z-1">
              <span className="inline-block py-[0.3rem] px-3 bg-[rgba(59,130,246,0.15)] rounded-md text-xs font-semibold text-[#60a5fa] mb-4 uppercase tracking-wide">UI/UX Design</span>
              <h3 className="text-[1.35rem] font-bold mb-3 text-white leading-[1.4]">UI/UX Design Masterclass: Figma to Production</h3>
              <p className="text-[#71717a] text-[0.9rem] mb-5 flex items-center gap-2">👤 Alex Chen • Lead Designer at Airbnb</p>
              <div className="flex gap-6 mb-6 pb-6 border-b border-[rgba(255,255,255,0.05)]">
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">📚 38 hours</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">🎯 165 lessons</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">👥 18.2k students</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[0.4rem] font-semibold text-[#fbbf24]">⭐ 4.8 (4.1k)</div>
                <div className="text-2xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">$89.99</div>
              </div>
            </div>
          </div>

          {/* Course Card 3 */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-[0.4s] cursor-pointer relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-to-br before:from-[rgba(59,130,246,0.05)] before:to-[rgba(139,92,246,0.05)] before:opacity-0 before:transition-opacity before:duration-[0.4s] hover:-translate-y-2 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:before:opacity-100">
            <div className="w-full h-[220px] bg-linear-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] before:animate-[pulse_8s_infinite]">
              <span className="text-6xl z-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">🎨</span>
            </div>
            <div className="p-7 relative z-1">
              <span className="inline-block py-[0.3rem] px-3 bg-[rgba(59,130,246,0.15)] rounded-md text-xs font-semibold text-[#60a5fa] mb-4 uppercase tracking-wide">Frontend</span>
              <h3 className="text-[1.35rem] font-bold mb-3 text-white leading-[1.4]">Advanced CSS & Sass: Modern Web Design</h3>
              <p className="text-[#71717a] text-[0.9rem] mb-5 flex items-center gap-2">👤 Jonas Schmedtmann • Web Developer & Designer</p>
              <div className="flex gap-6 mb-6 pb-6 border-b border-[rgba(255,255,255,0.05)]">
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">📚 28 hours</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">🎯 125 lessons</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">👥 25.8k students</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[0.4rem] font-semibold text-[#fbbf24]">⭐ 4.9 (5.6k)</div>
                <div className="text-2xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">$64.99</div>
              </div>
            </div>
          </div>

          {/* Course Card 4 */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-[0.4s] cursor-pointer relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-to-br before:from-[rgba(59,130,246,0.05)] before:to-[rgba(139,92,246,0.05)] before:opacity-0 before:transition-opacity before:duration-[0.4s] hover:-translate-y-2 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:before:opacity-100">
            <div className="w-full h-[220px] bg-linear-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] before:animate-[pulse_8s_infinite]">
              <span className="text-6xl z-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">🟢</span>
            </div>
            <div className="p-7 relative z-1">
              <span className="inline-block py-[0.3rem] px-3 bg-[rgba(59,130,246,0.15)] rounded-md text-xs font-semibold text-[#60a5fa] mb-4 uppercase tracking-wide">Backend</span>
              <h3 className="text-[1.35rem] font-bold mb-3 text-white leading-[1.4]">Node.js & Express: Build Scalable APIs</h3>
              <p className="text-[#71717a] text-[0.9rem] mb-5 flex items-center gap-2">👤 Michael Brooks • Backend Architect</p>
              <div className="flex gap-6 mb-6 pb-6 border-b border-[rgba(255,255,255,0.05)]">
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">📚 42 hours</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">🎯 185 lessons</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">👥 15.3k students</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[0.4rem] font-semibold text-[#fbbf24]">⭐ 4.7 (2.8k)</div>
                <div className="text-2xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">$74.99</div>
              </div>
            </div>
          </div>

          {/* Course Card 5 */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-[0.4s] cursor-pointer relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-to-br before:from-[rgba(59,130,246,0.05)] before:to-[rgba(139,92,246,0.05)] before:opacity-0 before:transition-opacity before:duration-[0.4s] hover:-translate-y-2 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:before:opacity-100">
            <div className="w-full h-[220px] bg-linear-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] before:animate-[pulse_8s_infinite]">
              <span className="text-6xl z-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">📱</span>
            </div>
            <div className="p-7 relative z-1">
              <span className="inline-block py-[0.3rem] px-3 bg-[rgba(59,130,246,0.15)] rounded-md text-xs font-semibold text-[#60a5fa] mb-4 uppercase tracking-wide">Frontend</span>
              <h3 className="text-[1.35rem] font-bold mb-3 text-white leading-[1.4]">Modern JavaScript: ES6+ Complete Guide</h3>
              <p className="text-[#71717a] text-[0.9rem] mb-5 flex items-center gap-2">👤 Emma Rodriguez • JavaScript Consultant</p>
              <div className="flex gap-6 mb-6 pb-6 border-b border-[rgba(255,255,255,0.05)]">
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">📚 35 hours</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">🎯 150 lessons</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">👥 22.1k students</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[0.4rem] font-semibold text-[#fbbf24]">⭐ 4.8 (4.5k)</div>
                <div className="text-2xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">$69.99</div>
              </div>
            </div>
          </div>


          {/* Course Card 6 */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-[0.4s] cursor-pointer relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-to-br before:from-[rgba(59,130,246,0.05)] before:to-[rgba(139,92,246,0.05)] before:opacity-0 before:transition-opacity before:duration-[0.4s] hover:-translate-y-2 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:before:opacity-100">
            <div className="w-full h-[220px] bg-linear-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] before:animate-[pulse_8s_infinite]">
              <span className="text-6xl z-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">🎭</span>
            </div>
            <div className="p-7 relative z-1">
              <span className="inline-block py-[0.3rem] px-3 bg-[rgba(59,130,246,0.15)] rounded-md text-xs font-semibold text-[#60a5fa] mb-4 uppercase tracking-wide">UI/UX Design</span>
              <h3 className="text-[1.35rem] font-bold mb-3 text-white leading-[1.4]">User Experience Design: From Research to Prototype</h3>
              <p className="text-[#71717a] text-[0.9rem] mb-5 flex items-center gap-2">👤 Lisa Park • UX Lead at Google</p>
              <div className="flex gap-6 mb-6 pb-6 border-b border-[rgba(255,255,255,0.05)]">
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">📚 32 hours</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">🎯 140 lessons</span>
                <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">👥 16.7k students</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[0.4rem] font-semibold text-[#fbbf24]">⭐ 4.9 (3.9k)</div>
                <div className="text-2xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">$84.99</div>
              </div>
            </div>
          </div>
          {/* Remaining 12 course cards with same structure - abbreviated for space */}
          {[
            { icon: "⚡", cat: "Full Stack", title: "MERN Stack: Build Full-Stack Applications", instructor: "David Kumar • Full Stack Engineer", hours: 58, lessons: 280, students: "19.4k", rating: "4.8 (5.2k)", price: "$94.99" },
            { icon: "🎯", cat: "Frontend", title: "Vue.js 3: The Complete Developer's Guide", instructor: "Rachel Green • Vue.js Core Team", hours: 40, lessons: 195, students: "14.8k", rating: "4.7 (3.1k)", price: "$72.99" },
            { icon: "🔷", cat: "Frontend", title: "TypeScript Mastery: Advanced Type System", instructor: "Tom Anderson • TypeScript Specialist", hours: 36, lessons: 160, students: "11.9k", rating: "4.9 (2.7k)", price: "$79.99" },
            { icon: "🎨", cat: "UI/UX Design", title: "Design Systems: Building Scalable Components", instructor: "Maya Johnson • Design System Lead", hours: 30, lessons: 135, students: "13.2k", rating: "4.8 (3.4k)", price: "$79.99" },
            { icon: "🌐", cat: "Frontend", title: "Next.js 14: Server-Side React Applications", instructor: "Chris Wilson • Next.js Expert", hours: 44, lessons: 200, students: "17.6k", rating: "4.9 (4.8k)", price: "$89.99" },
            { icon: "🎪", cat: "Frontend", title: "Tailwind CSS: Utility-First Design System", instructor: "Sophie Turner • CSS Architecture Expert", hours: 24, lessons: 110, students: "20.3k", rating: "4.8 (4.2k)", price: "$59.99" },
            { icon: "🔥", cat: "Backend", title: "GraphQL & Apollo: Modern API Development", instructor: "Jake Morrison • API Architect", hours: 38, lessons: 170, students: "12.8k", rating: "4.7 (2.9k)", price: "$82.99" },
            { icon: "✨", cat: "UI/UX Design", title: "Motion Design & Microinteractions", instructor: "Nina Patel • Animation Specialist", hours: 26, lessons: 115, students: "14.5k", rating: "4.9 (3.6k)", price: "$74.99" },
            { icon: "🚀", cat: "Full Stack", title: "Web Performance Optimization Masterclass", instructor: "Carlos Martinez • Performance Engineer", hours: 32, lessons: 145, students: "10.7k", rating: "4.8 (2.5k)", price: "$77.99" },
            { icon: "🎯", cat: "UI/UX Design", title: "Mobile-First Responsive Design Principles", instructor: "Amanda Lee • Mobile UX Designer", hours: 28, lessons: 130, students: "15.9k", rating: "4.8 (3.8k)", price: "$69.99" },
            { icon: "🛠️", cat: "Frontend", title: "Svelte & SvelteKit: Modern Web Framework", instructor: "Mark Stevens • Svelte Contributor", hours: 34, lessons: 155, students: "9.8k", rating: "4.9 (2.3k)", price: "$74.99" },
            { icon: "🎨", cat: "UI/UX Design", title: "Accessibility in Web Design (WCAG 2.1)", instructor: "Robert Chang • A11y Advocate", hours: 22, lessons: 100, students: "11.2k", rating: "4.9 (2.9k)", price: "$64.99" }
          ].map((course, idx) => (
            <div key={idx} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[20px] overflow-hidden transition-all duration-[0.4s] cursor-pointer relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-to-br before:from-[rgba(59,130,246,0.05)] before:to-[rgba(139,92,246,0.05)] before:opacity-0 before:transition-opacity before:duration-[0.4s] hover:-translate-y-2 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:before:opacity-100">
              <div className="w-full h-[220px] bg-linear-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] before:animate-[pulse_8s_infinite]">
                <span className="text-6xl z-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">{course.icon}</span>
              </div>
              <div className="p-7 relative z-1">
                <span className="inline-block py-[0.3rem] px-3 bg-[rgba(59,130,246,0.15)] rounded-md text-xs font-semibold text-[#60a5fa] mb-4 uppercase tracking-wide">{course.cat}</span>
                <h3 className="text-[1.35rem] font-bold mb-3 text-white leading-[1.4]">{course.title}</h3>
                <p className="text-[#71717a] text-[0.9rem] mb-5 flex items-center gap-2">👤 {course.instructor}</p>
                <div className="flex gap-6 mb-6 pb-6 border-b border-[rgba(255,255,255,0.05)]">
                  <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">📚 {course.hours} hours</span>
                  <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">🎯 {course.lessons} lessons</span>
                  <span className="flex items-center gap-[0.4rem] text-[0.85rem] text-[#a1a1aa]">👥 {course.students} students</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[0.4rem] font-semibold text-[#fbbf24]">⭐ {course.rating}</div>
                  <div className="text-2xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{course.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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

      {/* Footer */}
      <footer className="bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.05)] pt-16 pb-8 px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-12 max-lg:grid-cols-1 max-lg:gap-8">
          <div>
            <h3 className="mb-6 text-white font-bold text-lg">DevAcademy</h3>
            <p className="text-[#71717a] leading-[1.8] mb-6">Empowering the next generation of web developers and designers with world-class education.</p>
            <div className="flex gap-4">
              {['𝕏', '💼', '📘', '📺'].map((icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[10px] flex items-center justify-center transition-all duration-300 text-xl hover:bg-[rgba(59,130,246,0.2)] hover:border-[rgba(59,130,246,0.5)] hover:translate-y-[-3px]">{icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6 text-white font-bold text-lg">Courses</h3>
            <ul className="list-none">
              {['Web Development', 'UI/UX Design', 'Frontend Development', 'Backend Development', 'Full Stack'].map((item, idx) => (
                <li key={idx} className="mb-3"><a href="#" className="text-[#a1a1aa] no-underline transition-colors duration-300 text-[0.95rem] hover:text-[#60a5fa]">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-white font-bold text-lg">Resources</h3>
            <ul className="list-none">
              {['Blog', 'Documentation', 'Free Tutorials', 'Community Forum', 'Career Center'].map((item, idx) => (
                <li key={idx} className="mb-3"><a href="#" className="text-[#a1a1aa] no-underline transition-colors duration-300 text-[0.95rem] hover:text-[#60a5fa]">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-white font-bold text-lg">Company</h3>
            <ul className="list-none">
              {['About Us', 'Pricing', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item, idx) => (
                <li key={idx} className="mb-3"><a href="#" className="text-[#a1a1aa] no-underline transition-colors duration-300 text-[0.95rem] hover:text-[#60a5fa]">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-[rgba(255,255,255,0.05)] text-[#71717a] text-[0.9rem]">
          <p>© 2024 DevAcademy. All rights reserved. Built with passion for developers.</p>
        </div>
      </footer>
    </div>
  );
}