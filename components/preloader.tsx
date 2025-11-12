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

        {/* Golden ornate curtain rod */}
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

        {/* Curtain tassel details - hidden on mobile */}
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

        {/* Golden ornate curtain rod */}
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

        {/* Curtain tassel details - hidden on mobile */}
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
              ? "opacity-0 -translate-y-[200px] scale-50 rotate-12 duration-1000"
              : hasEntered
                ? "opacity-100 translate-y-0 animate-dangle scale-100 duration-[1200ms] ease-out"
                : "opacity-100 -translate-y-[100vh] scale-100 duration-0"
          }`}
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glowing aura around button */}
          <div className="absolute inset-0 blur-2xl md:blur-3xl bg-primary/30 animate-pulse-glow rounded-xl md:rounded-2xl scale-110" />

          <Button
            onClick={handleClick}
            size="lg"
            className="relative px-6 py-6 sm:px-8 sm:py-7 md:px-12 md:py-8 text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-xl md:rounded-2xl shadow-2xl group overflow-hidden preserve-3d w-full max-w-[90vw] sm:max-w-md md:max-w-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.24 35) 0%, oklch(0.65 0.22 35) 50%, oklch(0.70 0.23 35) 100%)",
              boxShadow:
                "0 25px 60px rgba(255, 107, 53, 0.4), 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Radial glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent" />
            </div>

            <div
              className="absolute inset-0 opacity-10 hidden sm:block"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Text with sophisticated styling */}
            <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 text-white drop-shadow-lg text-center leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-bounce-subtle flex-shrink-0" />
              <span className="text-balance">Ready to have your 360 digital experience?</span>
              <span
                className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-bounce-subtle flex-shrink-0"
                style={{ animationDelay: "0.2s" }}
              />
            </span>

            {/* Bottom highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </Button>

          <div className="hidden sm:block absolute -top-4 md:-top-8 -left-4 md:-left-8 w-10 md:w-16 h-10 md:h-16 bg-primary/20 rounded-full blur-lg md:blur-xl animate-float-3d" />
          <div
            className="hidden sm:block absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 w-12 md:w-20 h-12 md:h-20 bg-primary/15 rounded-full blur-xl md:blur-2xl animate-float-3d"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  )
}
