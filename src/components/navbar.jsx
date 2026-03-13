"use client";

import React, { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { easeInOut, motion } from "framer-motion";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const links = [
    { name: "Courses", href: "/courses" },
    { name: "Features", href: "/features" },
    { name: "Become Instructor", href: "/become-instructor" },
  ];

  return (
    <>
      <div className="z-50 dark:bg-[#0a0a0f] bg-white overflow-x-hidden pt-4 pb-3 border-b-2 border-gray-800 sticky top-0">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <div className="flex lg:text-2xl font-extrabold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight sm:text-[10px] md:text-[20px]">
            <Link href="/" className="flex items-center">
              <img src="/icon2.png" alt="hexagon" className="h-12 w-13 -mr-3" />
              DevAcademy
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:block">
            <ul className="flex gap-12">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#a1a1aa] font-medium text-[0.95rem] hover:text-white transition relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-linear-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Clerk Auth */}
            <SignedOut>
              <div className="hidden lg:flex gap-2">
                <SignInButton>
                  <button className="py-[0.6rem] px-[1.4rem] border border-[rgba(255,255,255,0.1)] rounded-xl font-semibold text-[0.9rem] text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="py-[0.6rem] px-[1.4rem] border border-[rgba(255,255,255,0.1)] rounded-xl font-semibold text-[0.9rem] text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="py-2 px-4 border border-[rgba(255,255,255,0.1)] rounded-xl font-semibold text-[0.9rem] text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition"
                >
                  Dashboard
                </Link>

                <UserButton />
              </div>
            </SignedIn>

            {/* Theme Toggle */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
  onClick={() => setOpenMenu(!openMenu)}
  className="lg:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
>
  <span
    className={`block h-0.5 w-6 bg-white transition-all duration-400 ease-in-out ${
      openMenu ? "rotate-45 translate-y-2.5" : ""
    }`}
  ></span>

  <span
    className={`block h-0.5 w-6 bg-white transition-all duration-400 ease-in-out ${
      openMenu ? "opacity-0" : ""
    }`}
  ></span>

  <span
    className={`block h-0.5 w-6 bg-white transition-all duration-400 ease-in-out ${
      openMenu ? "-rotate-45 -translate-y-1.5" : ""
    }`}
  ></span>
</button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {openMenu && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpenMenu(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 left-0 h-full sm:w-[260px] md:w-[290px] bg-[#0a0a0f] border-r border-gray-800 z-50 p-6"
          >
           

            {/* Links */}
            <ul className="flex flex-col gap-8 mt-12 text-lg">
              {links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpenMenu(false)}
                    className="text-[#a1a1aa] hover:text-white"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Auth */}
            <div  className="mt-12 flex flex-col gap-4">

              <SignedOut>
                <SignInButton>
                  <motion.button initial={{opacity:0,y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.30}} className="w-full py-2 border border-gray-700 rounded-lg text-[#a1a1aa] hover:text-white">
                    Sign In
                  </motion.button>
                </SignInButton>

                <SignUpButton>
                  <motion.button initial={{opacity:0,y:23}} animate={{opacity:1, y:0}} transition={{delay: 0.36}} className="w-full py-2 border border-gray-700 rounded-lg text-[#a1a1aa] hover:text-white">
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.45,easeInOut}} className="py-2 border border-gray-700 rounded-lg text-center text-[#a1a1aa] hover:text-white">
                <Link
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                </motion.span>

                <div className="flex justify-center p-0.5 rounded-2xl">
                  <UserButton />
                </div>
              </SignedIn>

              <motion.div initial={{opacity:0,y:25}} animate={{opacity:1, y:0}} transition={{delay: 0.39}} className="flex justify-center pt-4">
                <ThemeToggle />
              </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Navbar;