"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <footer className="bg-gradient-to-b from-card to-muted/30 border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg" />
              <span className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                Outdoors.ng
              </span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Award-winning outdoor advertising company transforming brand visibility across Nigeria.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>info@outdoors.ng</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>+234 XXX XXX XXXX</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/billboards"
                  className="text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Find Billboards</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/led-screens"
                  className="text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">LED Screens</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/wall-drapes"
                  className="text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Wall Drapes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/transit"
                  className="text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Transit Advertising</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Careers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base text-muted-foreground hover:text-primary transition-all hover:translate-x-2 inline-block group"
                >
                  <span className="group-hover:underline">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">Connect With Us</h3>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              Follow us on social media for the latest updates and campaigns.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="h-12 w-12 rounded-xl bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                onMouseEnter={() => setHoveredSocial("facebook")}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-12 w-12 rounded-xl bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                onMouseEnter={() => setHoveredSocial("twitter")}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-12 w-12 rounded-xl bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                onMouseEnter={() => setHoveredSocial("instagram")}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-12 w-12 rounded-xl bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                onMouseEnter={() => setHoveredSocial("linkedin")}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-base text-muted-foreground">
            © 2025 <span className="font-semibold text-foreground">Outdoors.ng</span>. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-base text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-base text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-base text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
