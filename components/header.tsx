"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary" />
            <span className="text-2xl font-serif font-bold">Outdoors</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm uppercase tracking-wider font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/billboards"
              className="text-sm uppercase tracking-wider font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Locations
            </Link>
            <Link
              href="/about"
              className="text-sm uppercase tracking-wider font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm uppercase tracking-wider font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" className="rounded-full" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="rounded-full" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-4 border-t">
            <Link
              href="/"
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Home
            </Link>
            <Link
              href="/billboards"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              Locations
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Button variant="ghost" className="rounded-full" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="rounded-full" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
