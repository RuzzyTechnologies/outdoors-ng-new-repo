import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Admin Dashboard - Outdoors.ng",
  description: "Billboard management dashboard for Outdoors.ng",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
