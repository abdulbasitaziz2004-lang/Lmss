"use client"
import React from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=" z-50 dark:bg-[#0a0a0f] bg-white text-[#e4e4e7] overflow-x-hidden pt-4 pb-3 border-b-2 border-gray-800 sticky top-0 ">
    <div className="max-w-[1400px] -mr-3 px-12 flex justify-around items-center">
          <div className="flex text-2xl font-extrabold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
            <Link href="/" className='flex items-center '><img src="/icon2.png" alt="hexagon" className='h-12 w-13 -mr-3'/>DevAcademy</Link> 
          </div>
          <nav>
            <ul className="flex gap-12 list-none max-lg:hidden">
              <li><Link href="/courses" className="text-[#a1a1aa] no-underline font-medium text-[0.95rem] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-linear-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full">Courses</Link></li>
              <li><Link href="/features" className="text-[#a1a1aa] no-underline font-medium text-[0.95rem] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-linear-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full">Features</Link></li>
              <li><Link href="/become-instructor" className="text-[#a1a1aa] no-underline font-medium text-[0.95rem] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-linear-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full">Become-Instructor</Link></li>
            </ul>
          </nav>
          <div className="flex -mr-3 gap-4 items-center">
  <SignedOut>
    <div className="flex gap-2">
      <SignInButton>
        <button className="mr-1 py-[0.7rem] px-[1.6rem] -ml-10 border border-[rgba(255,255,255,0.1)] rounded-xl cursor-pointer font-semibold text-[0.9rem] transition-all duration-300 bg-transparent text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white hover:border-[rgba(255,255,255,0.2)]">
          Sign In
        </button>
      </SignInButton>

      <SignUpButton>
        <button className="mr-1 py-[0.7rem] px-[1.6rem] border border-[rgba(255,255,255,0.1)] rounded-xl cursor-pointer font-semibold text-[0.9rem] transition-all duration-300 bg-transparent text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white hover:border-[rgba(255,255,255,0.2)]">
          Sign Up
        </button>
      </SignUpButton>
    </div>
  </SignedOut>

  <SignedIn>
  <div className="flex items-center gap-2">
    {/* Dashboard Button */}
    <Link
      href="/dashboard"
      className="py-2 px-4 border border-[rgba(255,255,255,0.1)] rounded-xl cursor-pointer font-semibold text-[0.9rem] bg-transparent text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
    >
      Dashboard
    </Link>

    {/* Profile / UserButton */}
    <UserButton
      appearance={{
        elements: {
          userButtonBox:
            "p-2 rounded-xl border border-[rgba(255,255,255,0.1)] bg-transparent hover:bg-[rgba(255,255,255,0.05)]",
        },
      }}
    />
  </div>
</SignedIn>
</div>
{/* dark mode button */}
<div className='-ml-20 -mr-15'>
<ThemeToggle></ThemeToggle>
</div>

        </div>
    </div>
  )
}

export default Navbar
