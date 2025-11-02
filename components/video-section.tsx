"use client"

import { Play } from "lucide-react"
import { useState } from "react"

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">See Our Work in Action</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Watch how we transform brands through strategic outdoor advertising across Nigeria
            </p>
          </div>

          {/* Video container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-black">
            <div className="aspect-video relative">
              {!isPlaying ? (
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <Play className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/billboard-advertising-nigeria-outdoor-campaign.jpg"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/5J5NCRLLOpY?autoplay=1"
                  title="Outdoors Nigeria - Billboard Advertising"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* Stats below video */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2,000+</div>
              <div className="text-sm text-muted-foreground">Billboard Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Brands Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">36</div>
              <div className="text-sm text-muted-foreground">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
