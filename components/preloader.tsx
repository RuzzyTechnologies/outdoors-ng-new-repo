"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Preloader() {
  const [isRevealing, setIsRevealing] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Trigger entrance animation after mount
    setTimeout(() => {
      setHasEntered(true)
    }, 100)
  }, [])

  const handleClick = () => {
    setIsRevealing(true)
  }

  if (!isMounted) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000 ${
        isRevealing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDelay: isRevealing ? "2s" : "0s" }}
    >
      {/* Dark theatrical background with spotlight */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isRevealing ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Main spotlight focused on button */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 400px at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 20%, transparent 70%)`,
            opacity: isRevealing ? 0 : 1,
          }}
        />

        {/* Floating dust particles in light */}
        {!isRevealing && (
          <>
            <div className="absolute left-[48%] top-[20%] h-1 w-1 animate-parallax-float rounded-full bg-white/40 blur-[1px]" />
            <div
              className="absolute left-[52%] top-[30%] h-1 w-1 animate-parallax-float rounded-full bg-white/30 blur-[1px]"
              style={{ animationDelay: "1s" }}
            />
          </>
        )}
      </div>

      {/* Red velvet curtains */}
      <div className="absolute inset-0 z-20 flex">
        {/* Left curtain */}
        <div
          className={`relative h-full w-1/2 transition-transform duration-[2000ms] ease-in-out ${
            isRevealing ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-b from-amber-700 to-amber-800 sm:h-6 md:h-8" />
          <Image
            src="/luxurious-deep-red-velvet-theater-stage-curtain-wi.jpg"
            alt="Theater curtain left"
            fill
            className="object-cover object-right brightness-90 contrast-110"
            priority
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
        </div>

        {/* Right curtain */}
        <div
          className={`relative h-full w-1/2 transition-transform duration-[2000ms] ease-in-out ${
            isRevealing ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-b from-amber-700 to-amber-800 sm:h-6 md:h-8" />
          <Image
            src="/luxurious-deep-red-velvet-theater-stage-curtain-wi.jpg"
            alt="Theater curtain right"
            fill
            className="object-cover object-left brightness-90 contrast-110"
            priority
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
        </div>
      </div>

      {/* Circular button */}
      <button
        onClick={handleClick}
        className={`group relative z-30 flex h-48 w-48 flex-col items-center justify-center rounded-full bg-white p-6 shadow-2xl transition-all duration-1200 hover:scale-105 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 ${
          hasEntered ? "translate-y-0 opacity-100" : "-translate-y-[200%] opacity-0"
        } ${isRevealing ? "translate-y-[-200%] opacity-0" : ""}`}
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Rotating gradient border */}
        <div className="absolute inset-0 -z-10 animate-rotate-slow rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur-xl" />

        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-rotate-slow">
          <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
          <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
        </div>

        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:h-14 sm:w-14">
          <svg className="h-6 w-6 text-primary sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" opacity="0.2" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-balance text-center">
          <p className="text-sm font-bold text-primary sm:text-base md:text-lg lg:text-xl">
            Ready to have your
            <br />
            360 digital experience?
          </p>
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
        </div>

        {/* Sparkles */}
        <div className="absolute left-[20%] top-[20%] h-1 w-1 animate-pulse rounded-full bg-primary opacity-60" />
        <div
          className="absolute right-[20%] top-[30%] h-1 w-1 animate-pulse rounded-full bg-primary opacity-60"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-[25%] left-[25%] h-1 w-1 animate-pulse rounded-full bg-primary opacity-60"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[30%] right-[25%] h-1 w-1 animate-pulse rounded-full bg-primary opacity-60"
          style={{ animationDelay: "1.5s" }}
        />
      </button>
    </div>
  )
}
