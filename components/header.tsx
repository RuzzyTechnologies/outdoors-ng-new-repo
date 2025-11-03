"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover-lift">
            <Image
              src="/images/outdoors-logo.png"
              alt="Outdoors.ng Logo"
              width={120}
              height={40}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link
              href="/"
              className={`text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/billboards"
              className={`text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift ${
                isActive("/billboards") || pathname.startsWith("/billboard-in-")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Locations
            </Link>
            <Link
              href="/about"
              className={`text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift ${
                isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/blog"
              className={`text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift ${
                isActive("/blog") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <ThemeToggle />
            <Button variant="ghost" className="rounded-full text-sm hover-lift" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="rounded-full text-sm hover-lift-3d preserve-3d" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 hover-magnetic rounded-lg transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 sm:py-6 space-y-3 sm:space-y-4 border-t animate-slide-up">
            <Link
              href="/"
              className={`block text-sm font-medium transition-colors py-2 hover-lift ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/billboards"
              className={`block text-sm font-medium transition-colors py-2 hover-lift ${
                isActive("/billboards") || pathname.startsWith("/billboard-in-")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Locations
            </Link>
            <Link
              href="/about"
              className={`block text-sm font-medium transition-colors py-2 hover-lift ${
                isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/blog"
              className={`block text-sm font-medium transition-colors py-2 hover-lift ${
                isActive("/blog") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`block text-sm font-medium transition-colors py-2 hover-lift ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Button variant="ghost" className="rounded-full hover-lift" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="rounded-full hover-lift-3d preserve-3d" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
