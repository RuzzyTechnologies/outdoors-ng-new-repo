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
          className="absolute -top-20 -left-20 w-[600px] h-[700px] bg-primary rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-90 blur-3xl animate-blob-morph"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[600px] bg-primary rounded-[40%_60%_70%_30%/40%_60%_40%_60%] opacity-80 blur-3xl animate-blob-morph"
          style={{
            transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Huge typography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h1 className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter">
                <span className="block">MAKE</span>
                <span className="block text-primary">LAGOS</span>
                <span className="block">NOTICE</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
              Premium billboard advertising across Nigeria's most valuable locations. Your brand, impossible to miss.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <Button
                size="lg"
                className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-black font-bold group"
                asChild
              >
                <Link href="#search">
                  Find Locations
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 text-lg rounded-full border-2 border-white/20 hover:border-primary hover:bg-primary/10 font-bold bg-transparent"
                asChild
              >
                <Link href="#work">View Portfolio</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-12 max-w-2xl">
              {[
                { value: "2,000+", label: "Locations" },
                { value: "500+", label: "Brands" },
                { value: "36", label: "States" },
              ].map((stat, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <p className="text-4xl md:text-5xl font-black text-primary">{stat.value}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[600px]">
            <div className="col-span-2 relative rounded-3xl overflow-hidden group">
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

            <div className="relative rounded-3xl overflow-hidden group">
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

            <div className="relative rounded-3xl overflow-hidden group">
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

        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-5 w-5 text-primary" />
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold">Featured Locations</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {["Lekki-Epe Expressway", "Third Mainland Bridge", "Ikorodu Road", "Eko Bridge", "VI Roundabout"].map(
              (location) => (
                <div
                  key={location}
                  className="px-6 py-3 rounded-full border border-white/10 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <p className="text-sm font-medium">{location}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
