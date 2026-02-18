"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
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

  const isServicesActive = () => {
    return (
      pathname.startsWith("/led-screens") ||
      pathname.startsWith("/wall-drapes") ||
      pathname.startsWith("/transit") ||
      pathname.startsWith("/advertising-agency") ||
      pathname.startsWith("/campaign-monitoring") ||
      pathname.startsWith("/creative-communication") ||
      pathname.startsWith("/digital-marketing") ||
      pathname.startsWith("/media-planning-buying") ||
      pathname.startsWith("/radio-tv-advertising")
    )
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-xl border-b shadow-lg" : "bg-transparent"
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
                isActive("/billboards") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Billboards
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift outline-none ${
                  isServicesActive() ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                Services
                <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem asChild>
                  <Link href="/advertising-agency" className="cursor-pointer w-full">
                    Advertising Agency
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/campaign-monitoring" className="cursor-pointer w-full">
                    Campaign Monitoring
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/creative-communication" className="cursor-pointer w-full">
                    Creative Communication
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/digital-marketing" className="cursor-pointer w-full">
                    Digital Marketing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/led-screens" className="cursor-pointer w-full">
                    LED Screens
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/media-planning-buying" className="cursor-pointer w-full">
                    Media Planning & Buying
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/radio-tv-advertising" className="cursor-pointer w-full">
                    Radio & TV Advertising
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/transit" className="cursor-pointer w-full">
                    Transit Advertising
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wall-drapes" className="cursor-pointer w-full">
                    Wall Drapes
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/about"
              className={`text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift ${
                isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/team"
              className={`text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift ${
                isActive("/team") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Team
            </Link>
            <Link
              href="/careers"
              className={`text-xs lg:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover-lift ${
                isActive("/careers") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Careers
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
                isActive("/billboards") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Billboards
            </Link>
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`flex items-center justify-between w-full text-sm font-medium transition-colors py-2 hover-lift ${
                  isServicesActive() ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ease-out ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 space-y-2 mt-2 animate-slide-up">
                  <Link
                    href="/advertising-agency"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/advertising-agency") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Advertising Agency
                  </Link>
                  <Link
                    href="/campaign-monitoring"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/campaign-monitoring") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Campaign Monitoring
                  </Link>
                  <Link
                    href="/creative-communication"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/creative-communication") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Creative Communication
                  </Link>
                  <Link
                    href="/digital-marketing"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/digital-marketing") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Digital Marketing
                  </Link>
                  <Link
                    href="/led-screens"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/led-screens") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    LED Screens
                  </Link>
                  <Link
                    href="/media-planning-buying"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/media-planning-buying") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Media Planning & Buying
                  </Link>
                  <Link
                    href="/radio-tv-advertising"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/radio-tv-advertising") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Radio & TV Advertising
                  </Link>
                  <Link
                    href="/transit"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/transit") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Transit Advertising
                  </Link>
                  <Link
                    href="/wall-drapes"
                    className={`block text-sm transition-all duration-200 py-2 hover-lift ${
                      isActive("/wall-drapes") ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Wall Drapes
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className={`block text-sm font-medium transition-colors py-2 hover-lift ${
                isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/team"
              className={`block text-sm font-medium transition-colors py-2 hover-lift ${
                isActive("/team") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Team
            </Link>
            <Link
              href="/careers"
              className={`block text-sm font-medium transition-colors py-2 hover-lift ${
                isActive("/careers") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Careers
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

export default Header
