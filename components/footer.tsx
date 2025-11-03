"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <footer className="bg-gradient-to-b from-card to-muted/30 border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          <div>
            <Link href="/" className="flex items-center mb-5 sm:mb-6 group cursor-pointer">
              <Image
                src="/images/outdoors-logo.png"
                alt="Outdoors.ng Logo"
                width={180}
                height={60}
                className="h-12 sm:h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
              Award-winning outdoor advertising company transforming brand visibility across Nigeria.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer break-all">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>info@outdoors.ng</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>+234 XXX XXX XXXX</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-5 sm:mb-6 text-base sm:text-lg">Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/billboards"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Find Billboards</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/led-screens"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">LED Screens</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/wall-drapes"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Wall Drapes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/transit"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Transit Advertising</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-5 sm:mb-6 text-base sm:text-lg">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Careers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-5 sm:mb-6 text-base sm:text-lg">Connect With Us</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
              Follow us on social media for the latest updates and campaigns.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Link
                href="#"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                onMouseEnter={() => setHoveredSocial("facebook")}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                onMouseEnter={() => setHoveredSocial("twitter")}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                onMouseEnter={() => setHoveredSocial("instagram")}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                onMouseEnter={() => setHoveredSocial("linkedin")}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-sm sm:text-base text-muted-foreground text-center md:text-left">
            © 2025 <span className="font-semibold text-foreground">Outdoors.ng</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <Link
              href="/privacy"
              className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
