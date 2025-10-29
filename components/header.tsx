"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-lg bg-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/50 animate-glow-pulse" />
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Outdoors.ng
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-all duration-200 relative group py-2"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
            <Link
              href="/billboards"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group py-2"
            >
              Find Billboards
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group py-2"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group py-2"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group py-2"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild className="hover:bg-primary/10 transition-all duration-200 hover-magnetic">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 hover-magnetic card-shine relative overflow-hidden"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10 hover-magnetic"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border animate-in slide-in-from-top duration-300">
            <Link
              href="/"
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2 hover:translate-x-2 transition-transform"
            >
              Home
            </Link>
            <Link
              href="/billboards"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-all py-2 hover:translate-x-2"
            >
              Find Billboards
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-all py-2 hover:translate-x-2"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-all py-2 hover:translate-x-2"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-all py-2 hover:translate-x-2"
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" asChild className="w-full hover:bg-primary/10">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full hover:shadow-lg hover:shadow-primary/30">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
