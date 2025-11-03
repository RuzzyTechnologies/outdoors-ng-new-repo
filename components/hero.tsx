"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/modern-led-billboard-at-night-in-lagos-nigeria-wit.jpg",
      alt: "Billboard advertising in Lagos Nigeria",
    },
    {
      image: "/large-unipole-billboard-on-highway-in-nigeria-with.jpg",
      alt: "Outdoor advertising billboards",
    },
    {
      image: "/digital-led-billboard-screen-displaying-colorful-a.jpg",
      alt: "Digital billboard displays",
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all touch-manipulation"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all touch-manipulation"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all touch-manipulation ${
              index === currentSlide ? "bg-primary w-8" : "bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-[300px] h-[350px] sm:w-[400px] sm:h-[500px] lg:w-[600px] lg:h-[700px] bg-primary rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-30 blur-3xl animate-blob-morph"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
        <div
          className="absolute top-1/3 right-0 w-[250px] h-[300px] sm:w-[350px] sm:h-[450px] lg:w-[500px] lg:h-[600px] bg-accent rounded-[40%_60%_70%_30%/40%_60%_40%_60%] opacity-20 blur-3xl animate-blob-morph"
          style={{
            transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-[clamp(1.75rem,5.5vw,4.5rem)] sm:text-[clamp(2rem,6vw,4.5rem)] md:text-[clamp(2.25rem,6.5vw,4.5rem)] lg:text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.95] tracking-tight">
                <span className="block">Top Billboard and</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Outdoor Advertising
                </span>
                <span className="block">Company in Lagos Nigeria</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-300 mt-4 sm:mt-6">
                for Ambitious Brands
              </p>
            </div>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Increase brand visibility and revenue with outdoor advertising in Nigeria
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Button
                size="lg"
                className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg rounded-full bg-accent hover:bg-accent/90 text-white font-bold group w-full sm:w-auto"
                asChild
              >
                <Link href="#search">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg rounded-full border-2 border-white/20 hover:border-accent hover:bg-accent/10 font-bold bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link href="#work">View Portfolio</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 md:pt-12 max-w-2xl">
              {[
                { value: "2,000+", label: "Locations", color: "primary" },
                { value: "500+", label: "Brands", color: "accent" },
                { value: "36", label: "States", color: "primary" },
              ].map((stat, index) => (
                <div key={index} className={`border-l-4 border-${stat.color} pl-3 sm:pl-4`}>
                  <p className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
