"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Preloader() {
  const [hasEntered, setHasEntered] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    const particleCount = mobile ? 8 : 15

    const particleArray = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(particleArray)

    setTimeout(() => {
      setHasEntered(true)
    }, 100)
  }, [])

  const handleClick = () => {
    setIsRevealing(true)
    setTimeout(() => {
      setIsComplete(true)
    }, 1800)
  }

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-transparent">
      {!isRevealing && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-neutral-800 to-stone-900">
            <div
              className="absolute inset-0 opacity-[0.15] hidden sm:block"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent" />

            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-amber-300/30 via-orange-200/15 to-transparent blur-md" />
            <div className="hidden md:block absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-amber-200/20 via-orange-300/10 to-transparent blur-sm" />
            <div className="hidden md:block absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-amber-200/20 via-orange-300/10 to-transparent blur-sm" />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-parallax-float blur-[1px]"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Left curtain */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 transition-all duration-[1800ms] ease-in-out ${
          isRevealing ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          background: "linear-gradient(90deg, #8B0000 0%, #A52A2A 40%, #8B0000 70%, #6B0000 100%)",
          boxShadow: "inset -60px 0 100px rgba(0,0,0,0.7), 30px 0 80px rgba(0,0,0,0.6)",
        }}
      >
        <div className="absolute inset-0 opacity-40 hidden sm:block">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)`,
            }}
          />
        </div>

        <div className="absolute -top-2 left-0 right-0 h-8 md:h-12 bg-gradient-to-b from-yellow-600 via-amber-500 to-yellow-700 shadow-2xl border-y-2 border-yellow-400/50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent" />
        </div>

        <div className="absolute top-6 md:top-10 left-0 right-0 bottom-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${i * 10}%`,
                width: "12%",
                background:
                  i % 2 === 0
                    ? "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)"
                    : "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
              }}
            />
          ))}
        </div>

        <div className="absolute top-12 md:top-20 left-2 md:left-4 hidden md:block">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 md:w-1 h-20 md:h-32 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"
              style={{ left: `${i * 8}px`, top: `${i * 40}px` }}
            />
          ))}
        </div>
      </div>

      {/* Right curtain */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 transition-all duration-[1800ms] ease-in-out ${
          isRevealing ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          background: "linear-gradient(270deg, #8B0000 0%, #A52A2A 40%, #8B0000 70%, #6B0000 100%)",
          boxShadow: "inset 60px 0 100px rgba(0,0,0,0.7), -30px 0 80px rgba(0,0,0,0.6)",
        }}
      >
        <div className="absolute inset-0 opacity-40 hidden sm:block">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)`,
            }}
          />
        </div>

        <div className="absolute -top-2 left-0 right-0 h-8 md:h-12 bg-gradient-to-b from-yellow-600 via-amber-500 to-yellow-700 shadow-2xl border-y-2 border-yellow-400/50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent" />
        </div>

        <div className="absolute top-6 md:top-10 left-0 right-0 bottom-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${i * 10}%`,
                width: "12%",
                background:
                  i % 2 === 0
                    ? "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)"
                    : "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
              }}
            />
          ))}
        </div>

        <div className="absolute top-12 md:top-20 right-2 md:right-4 hidden md:block">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 md:w-1 h-20 md:h-32 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"
              style={{ right: `${i * 8}px`, top: `${i * 40}px` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 perspective-container px-4">
        <div
          className={`relative transition-all ${
            isRevealing
              ? "opacity-0 -translate-y-[200px] scale-50 duration-1000"
              : hasEntered
                ? "opacity-100 translate-y-0 scale-100 duration-[1200ms] ease-out"
                : "opacity-100 -translate-y-[100vh] scale-100 duration-0"
          }`}
        >
          <div className="absolute inset-0 -m-4 sm:-m-6 md:-m-8">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping-slow" />
            <div
              className="absolute inset-0 rounded-full border-2 border-primary/15 animate-ping-slow"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute inset-0 rounded-full border border-primary/10 animate-ping-slow"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="absolute inset-0 -m-8 sm:-m-12 md:-m-16 blur-3xl bg-primary/20 animate-pulse-glow opacity-60 rounded-full" />

          <Button
            onClick={handleClick}
            size="lg"
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full shadow-2xl group overflow-visible preserve-3d flex items-center justify-center bg-white hover:bg-white transition-all duration-700 border-4 border-white/50 hover:border-primary/30"
            style={{
              boxShadow:
                "0 30px 80px rgba(255, 107, 53, 0.25), 0 15px 40px rgba(0,0,0,0.15), inset 0 -2px 20px rgba(255, 107, 53, 0.1), inset 0 2px 20px rgba(255,255,255,0.8)",
            }}
          >
            {/* Rotating gradient border effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: `conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.3), transparent)`,
                }}
              />
            </div>

            <div className="absolute inset-6 sm:inset-8 md:inset-10 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-700 animate-morph" />

            {/* Ambient light burst */}
            <div className="absolute inset-0 -m-16 md:-m-24 blur-3xl bg-primary/20 animate-pulse-glow opacity-60 rounded-full" />

            {/* Sparkle particles on hover */}
            <div className="absolute inset-0 rounded-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle"
                  style={{
                    top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                    left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 px-6 sm:px-8 md:px-10">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-primary animate-pulse-subtle" />
                </div>
                {/* Orbiting dots */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/60 rounded-full -translate-x-1/2" />
                </div>
              </div>

              <span className="relative text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl text-center leading-tight text-balance tracking-tight">
                Ready to have your
                <br />
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl inline-block group-hover:scale-105 transition-transform duration-500">
                  360 digital experience?
                </span>
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-6 h-0.5 bg-primary/50 group-hover:w-8 sm:group-hover:w-10 transition-all duration-500" />
                <span className="text-[10px] sm:text-xs md:text-sm text-primary/70 font-medium uppercase tracking-wider">
                  Click to Enter
                </span>
                <div className="w-6 h-0.5 bg-primary/50 group-hover:w-8 sm:group-hover:w-10 transition-all duration-500" />
              </div>
            </div>

            <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:via-primary/60 transition-colors duration-500" />

            {/* Hover scale ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/0 group-hover:border-primary/20 group-hover:scale-110 transition-all duration-700" />
          </Button>

          <div className="hidden md:block absolute -top-12 -left-12 w-16 h-16 bg-primary/10 rounded-full blur-2xl animate-float-slow" />
          <div
            className="hidden md:block absolute -bottom-12 -right-12 w-20 h-20 bg-primary/15 rounded-full blur-3xl animate-float-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="hidden lg:block absolute top-1/2 -right-16 w-16 h-16 bg-primary/8 rounded-full blur-xl animate-float-slow"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>
    </div>
  )
}
