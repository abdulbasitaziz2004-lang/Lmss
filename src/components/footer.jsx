import React from 'react'

const Footer = () => {
  return (
    <div>
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
                <li key={idx} className="mb-3"><a href="#" className=" text-[#a1a1aa] no-underline transition-colors duration-300 text-[0.95rem]   hover:text-[#60a5fa]">{item}</a></li>
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
  )
}

export default Footer
