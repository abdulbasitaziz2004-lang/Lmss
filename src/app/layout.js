import './globals.css'
import { Inter } from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'
import Navbar from '@/components/navbar'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  icons:{icon: "/icon.png"},
  title: 'DevAcademy - Master Web Development & UI/UX Design',
  description:
    "Learn from industry experts and build real-world projects. From beginner to professional, we've got you covered with cutting-edge curriculum.",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning > 
        <body className={inter.className}>
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
         <Navbar/>
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
