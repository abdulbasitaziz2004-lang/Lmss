// components/Footer.jsx
import React from "react";
import Link from "next/link";
import { GraduationCap, Twitter, Linkedin, Facebook, Youtube } from "lucide-react";

const LINKS = {
  Courses:   ["Web Development", "UI/UX Design", "Frontend Development", "Backend Development", "Full Stack"],
  Resources: ["Blog", "Documentation", "Free Tutorials", "Community Forum", "Career Center"],
  Company:   ["About Us", "Pricing", "Contact", "Privacy Policy", "Terms of Service"],
};

const SOCIALS = [
  { icon: Twitter,  href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube,  href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[rgba(255,255,255,0.01)] border-t border-[rgba(255,255,255,0.05)] pt-16 pb-8 px-12 overflow-hidden max-md:px-6
      before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2
      before:w-[600px] before:h-[300px]
      before:bg-[radial-gradient(ellipse,rgba(59,130,246,0.05)_0%,transparent_70%)]
      before:pointer-events-none">

      <div className="max-w-[1300px] mx-auto relative z-10">

        {/* Top grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14 max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <img src="icon2.png" alt="logo" />
              </div>
              <span className="text-white font-black text-lg tracking-tight">DevAcademy</span>
            </div>
            <p className="text-[#71717a] leading-[1.8] text-sm mb-6 max-w-[260px]">
              Empowering the next generation of web developers and designers with world-class education.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[10px] flex items-center justify-center text-[#71717a] hover:text-white hover:bg-[rgba(59,130,246,0.15)] hover:border-[rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white font-bold text-sm mb-5 tracking-wide">{heading}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <Link href="#"
                      className="text-[#71717a] text-sm hover:text-[#60a5fa] transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
                {/* Bottom bar */}
          <div className="flex items-center justify-between pb-2 border-t border-[rgba(255,255,255,0.05)] text-[#4b5563] text-xs max-md:flex-col max-md:gap-3 max-md:text-center">
          <p>© {new Date().getFullYear()} DevAcademy. All rights reserved. Built with passion for developers.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#a1a1aa] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#a1a1aa] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#a1a1aa] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}