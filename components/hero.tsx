"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="relative overflow-hidden pt-24 pb-32 min-h-[90vh] flex items-center perspective-container">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      <div
        className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float-3d animate-blob-morph animate-glow-pulse"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translateY(${scrollY * 0.3}px)` }}
      />
      <div
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-float-3d animate-blob-morph"
        style={{
          animationDelay: "2s",
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px) translateY(${scrollY * 0.2}px)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float-3d animate-bounce-subtle"
        style={{
          animationDelay: "4s",
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) translateY(${scrollY * 0.4}px)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, oklch(0.45 0.15 145) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`mx-auto max-w-5xl text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center rounded-full glass-effect-strong px-6 py-2 text-sm mb-8 hover:scale-105 transition-all duration-300 animate-pulse-glow hover-magnetic group cursor-pointer hover-border-glow">
            <Sparkles className="h-4 w-4 text-primary mr-2 group-hover:rotate-12 transition-transform animate-glow-pulse" />
            <span className="text-primary font-bold">Award-Winning Agency</span>
            <span className="mx-3 text-muted-foreground">•</span>
            <TrendingUp className="h-4 w-4 text-accent mr-2 group-hover:scale-125 transition-transform" />
            <span className="text-muted-foreground font-medium">500+ Brands Trust Us</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-8 text-balance leading-[1.1]">
            Transform Your Brand with <span className="text-gradient block mt-2">Premium Outdoor Advertising</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed font-light">
            Strategic billboard placements across Lagos and Nigeria's major cities.
            <span className="text-foreground font-medium"> Find, book, and launch campaigns</span> that amplify your
            brand visibility and drive measurable results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
            <Button
              size="lg"
              className="w-full sm:w-auto group hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-110 text-lg px-8 py-6 font-semibold animate-pulse-glow hover-magnetic relative overflow-hidden"
              asChild
            >
              <Link href="/billboards">
                <span className="relative z-10">Explore Billboards</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform relative z-10" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto glass-effect-strong hover:scale-105 transition-all duration-300 hover:border-primary/50 text-lg px-8 py-6 font-semibold bg-transparent hover-border-glow card-shine"
              asChild
            >
              <Link href="#video">
                <Play className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform" />
                View Showcase
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 stagger-children">
            <div
              className="relative rounded-3xl overflow-hidden border-2 border-border shadow-2xl hover:shadow-primary/30 transition-all duration-700 group hover-lift-3d card-shine animate-slide-in-left"
              style={{ "--index": 0 } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 z-20" />

              <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 group-hover:scale-110" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-accent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 group-hover:scale-110" />

              <img
                src="/modern-led-billboard-at-night-in-lagos-nigeria-wit.jpg"
                alt="LED billboard advertising in Lagos"
                className="w-full h-auto transform group-hover:scale-110 transition-transform duration-1000"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                <p className="text-white font-bold text-lg">LED Digital Displays</p>
                <p className="text-white/80 text-sm">High-impact night visibility</p>
              </div>
            </div>

            <div
              className="relative rounded-3xl overflow-hidden border-2 border-border shadow-2xl hover:shadow-accent/30 transition-all duration-700 group hover-lift-3d card-shine animate-slide-in-right"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-transparent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 z-20" />

              <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-accent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 group-hover:scale-110" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 group-hover:scale-110" />

              <img
                src="/large-unipole-billboard-on-highway-in-nigeria-with.jpg"
                alt="Unipole billboard on highway"
                className="w-full h-auto transform group-hover:scale-110 transition-transform duration-1000"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                <p className="text-white font-bold text-lg">Highway Unipoles</p>
                <p className="text-white/80 text-sm">Maximum reach & visibility</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
