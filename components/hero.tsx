"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  return (
    <section className="min-h-screen relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-[300px] h-[350px] sm:w-[400px] sm:h-[500px] lg:w-[600px] lg:h-[700px] bg-primary rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-90 blur-3xl animate-blob-morph"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
        <div
          className="absolute top-1/3 right-0 w-[250px] h-[300px] sm:w-[350px] sm:h-[450px] lg:w-[500px] lg:h-[600px] bg-primary rounded-[40%_60%_70%_30%/40%_60%_40%_60%] opacity-80 blur-3xl animate-blob-morph"
          style={{
            transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-[clamp(2rem,6vw,4.5rem)] sm:text-[clamp(2.25rem,6.5vw,4.5rem)] md:text-[clamp(2.5rem,7vw,4.5rem)] lg:text-[clamp(2.75rem,7.5vw,4.5rem)] font-black leading-[0.95] tracking-tight">
                <span className="block">Top Billboard and</span>
                <span className="block text-primary">Outdoor Advertising</span>
                <span className="block">Company in Lagos Nigeria</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 mt-6">for Ambitious Brands</p>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Increase brand visibility and revenue with outdoor advertising in Nigeria
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Button
                size="lg"
                className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg rounded-full bg-primary hover:bg-primary/90 text-black font-bold group w-full sm:w-auto"
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
                className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg rounded-full border-2 border-white/20 hover:border-primary hover:bg-primary/10 font-bold bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link href="#work">View Portfolio</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-12 max-w-2xl">
              {[
                { value: "2,000+", label: "Locations" },
                { value: "500+", label: "Brands" },
                { value: "36", label: "States" },
              ].map((stat, index) => (
                <div key={index} className="border-l-4 border-primary pl-3 sm:pl-4">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-black text-primary">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 h-[400px] sm:h-[500px] md:h-[600px]">
            <div className="col-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden group">
              <Image
                src="/modern-led-billboard-at-night-in-lagos-nigeria-wit.jpg"
                alt="LED Billboard"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Zap className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">LED Displays</span>
                </div>
                <p className="text-white font-bold text-xl">Digital Impact</p>
              </div>
            </div>

            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group">
              <Image
                src="/large-unipole-billboard-on-highway-in-nigeria-with.jpg"
                alt="Unipole"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold">Highway</p>
              </div>
            </div>

            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group">
              <Image
                src="/digital-led-billboard-screen-displaying-colorful-a.jpg"
                alt="Digital"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold">Premium</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 border-t border-white/10">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 font-bold">
              Featured Locations
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            {["Lekki-Epe Expressway", "Third Mainland Bridge", "Ikorodu Road", "Eko Bridge", "VI Roundabout"].map(
              (location) => (
                <div
                  key={location}
                  className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full border border-white/10 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <p className="text-xs sm:text-sm font-medium">{location}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
