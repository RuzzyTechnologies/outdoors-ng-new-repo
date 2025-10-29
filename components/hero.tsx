"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center py-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Typography */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                Billboard Advertising
              </p>
              <h1 className="text-7xl lg:text-8xl font-serif font-bold leading-[0.95] text-balance">
                Make Your
                <span className="block text-primary italic">Brand</span>
                Unmissable
              </h1>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Premium outdoor advertising across Nigeria's most strategic locations. Reach millions with billboard
              placements that command attention.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-base px-8 h-14 rounded-full" asChild>
                <Link href="#search">
                  Explore Locations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-14 rounded-full bg-transparent" asChild>
                <Link href="#portfolio">View Portfolio</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t">
              <div>
                <p className="text-4xl font-bold text-foreground">2,000+</p>
                <p className="text-sm text-muted-foreground mt-1">Locations</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Brands</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">30+</p>
                <p className="text-sm text-muted-foreground mt-1">Billboard Types</p>
              </div>
            </div>
          </div>

          {/* Right column - Image grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="/modern-led-billboard-at-night-in-lagos-nigeria-wit.jpg"
                  alt="LED billboard at night"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/digital-led-billboard-screen-displaying-colorful-a.jpg"
                  alt="Digital billboard"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/large-unipole-billboard-on-highway-in-nigeria-with.jpg"
                  alt="Highway billboard"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="/large-gantry-billboard-structure-over-highway-with.jpg"
                  alt="Gantry billboard"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
