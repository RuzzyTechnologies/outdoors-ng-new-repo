"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Preloader() {
  const [hasEntered, setHasEntered] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    const particleCount = mobile ? 2 : 4

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
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <div
        className={`absolute inset-0 z-0 bg-[#0a0a0a] transition-opacity duration-300 ${
          isRevealing ? "opacity-0" : "opacity-100"
        }`}
      >
        {!isRevealing && (
          <div
            className="absolute inset-0 opacity-0 animate-spotlight-fade-in"
            style={{
              background: isMobile
                ? "radial-gradient(circle at 50% 50%, rgba(10,10,10,0.4) 0%, #0a0a0a 60%)"
                : "radial-gradient(circle at 50% 50%, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 40%, #0a0a0a 70%)",
            }}
          />
        )}
      </div>

      {!isRevealing && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] opacity-0 animate-spotlight-fade-in"
              style={{
                background: `radial-gradient(circle at center, 
                  rgba(255, 245, 200, 0.95) 0%, 
                  rgba(255, 235, 180, 0.75) 8%, 
                  rgba(255, 225, 160, 0.55) 15%, 
                  rgba(255, 215, 140, 0.4) 25%,
                  rgba(255, 200, 120, 0.25) 35%,
                  rgba(255, 180, 100, 0.12) 50%,
                  transparent 70%)`,
                filter: isMobile ? "blur(8px)" : "blur(15px)",
              }}
            />
          </div>

          {!isMobile && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                <div
                  className="absolute top-0 left-1/2 w-[150px] sm:w-[200px] md:w-[300px] h-3/4 opacity-0 animate-spotlight-fade-in"
                  style={{
                    background: `linear-gradient(180deg, 
                      rgba(255, 250, 220, 0.8) 0%,
                      rgba(255, 240, 200, 0.6) 8%, 
                      rgba(255, 230, 180, 0.45) 20%,
                      rgba(255, 220, 160, 0.3) 35%, 
                      rgba(255, 210, 140, 0.2) 50%, 
                      rgba(255, 190, 120, 0.1) 65%,
                      transparent 80%)`,
                    transform: "translateX(-50%)",
                    clipPath: "polygon(45% 0%, 55% 0%, 65% 100%, 35% 100%)",
                    animationDelay: "0.2s",
                    filter: "blur(8px)",
                  }}
                />
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[15%] w-[300px] sm:w-[400px] md:w-[600px] lg:w-[700px] h-[150px] sm:h-[200px] md:h-[300px]">
                <div
                  className="absolute inset-0 opacity-0 animate-spotlight-fade-in"
                  style={{
                    background: `radial-gradient(ellipse 90% 70% at center top, 
                      rgba(255, 240, 190, 0.6) 0%, 
                      rgba(255, 225, 170, 0.4) 25%, 
                      rgba(255, 210, 150, 0.25) 45%, 
                      rgba(255, 190, 130, 0.12) 65%,
                      transparent 85%)`,
                    animationDelay: "0.4s",
                    filter: "blur(12px)",
                  }}
                />
              </div>

              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] sm:w-[250px] md:w-[350px] h-3/5 opacity-0 animate-spotlight-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div
                  className="absolute top-0 left-1/2 w-[1.5px] sm:w-[2px] h-full bg-gradient-to-b from-amber-50/40 to-transparent"
                  style={{
                    transform: "translateX(-60px) rotate(-2deg)",
                    boxShadow: "0 0 6px rgba(255, 235, 160, 0.6)",
                  }}
                />
                <div
                  className="absolute top-0 left-1/2 w-[2px] sm:w-[3px] h-full bg-gradient-to-b from-amber-50/50 to-transparent"
                  style={{ transform: "translateX(0px)", boxShadow: "0 0 10px rgba(255, 240, 170, 0.7)" }}
                />
                <div
                  className="absolute top-0 left-1/2 w-[1.5px] sm:w-[2px] h-full bg-gradient-to-b from-amber-50/40 to-transparent"
                  style={{
                    transform: "translateX(60px) rotate(2deg)",
                    boxShadow: "0 0 6px rgba(255, 235, 160, 0.6)",
                  }}
                />
              </div>
            </>
          )}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[300px] md:w-[500px] h-[400px] sm:h-[500px] md:h-[700px] overflow-hidden">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-[1.5px] h-[1.5px] sm:w-[2px] sm:h-[2px] md:w-[3px] md:h-[3px] bg-amber-100/80 rounded-full animate-dust-float"
                style={{
                  left: `${40 + (particle.x % 20)}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${7 + particle.delay * 2}s`,
                  boxShadow: isMobile
                    ? "0 0 3px rgba(255, 240, 180, 0.6)"
                    : "0 0 6px rgba(255, 240, 180, 0.9), 0 0 12px rgba(255, 230, 150, 0.5)",
                  filter: isMobile ? "blur(0.3px)" : "blur(0.5px)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        className={`absolute inset-y-0 left-0 w-1/2 z-20 transition-all duration-[1800ms] ease-in-out overflow-hidden ${
          isRevealing ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="absolute -top-1 left-0 right-0 h-3 xs:h-4 sm:h-6 md:h-7 lg:h-8 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 shadow-lg z-10" />

        <div className="absolute top-2 xs:top-3 sm:top-4 md:top-5 lg:top-6 left-0 right-0 bottom-0">
          <Image
            src="/luxurious-deep-red-velvet-theater-stage-curtain-wi.jpg"
            alt="Theater curtain"
            fill
            className="object-cover object-right"
            priority
            sizes="50vw"
            style={
              isMobile
                ? {
                    boxShadow: "inset -40px 0 60px rgba(0,0,0,0.6)",
                  }
                : {
                    filter: "brightness(0.85) contrast(1.1)",
                    boxShadow: "inset -40px 0 60px rgba(0,0,0,0.6)",
                  }
            }
          />
          {isMobile ? (
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30 pointer-events-none" />
            </>
          )}
        </div>
      </div>

      <div
        className={`absolute inset-y-0 right-0 w-1/2 z-20 transition-all duration-[1800ms] ease-in-out overflow-hidden ${
          isRevealing ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="absolute -top-1 left-0 right-0 h-3 xs:h-4 sm:h-6 md:h-7 lg:h-8 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 shadow-lg z-10" />

        <div className="absolute top-2 xs:top-3 sm:top-4 md:top-5 lg:top-6 left-0 right-0 bottom-0">
          <Image
            src="/luxurious-deep-red-velvet-theater-stage-curtain-wi.jpg"
            alt="Theater curtain"
            fill
            className="object-cover object-left scale-x-[-1]"
            priority
            sizes="50vw"
            style={
              isMobile
                ? {
                    boxShadow: "inset 40px 0 60px rgba(0,0,0,0.6)",
                  }
                : {
                    filter: "brightness(0.85) contrast(1.1)",
                    boxShadow: "inset 40px 0 60px rgba(0,0,0,0.6)",
                  }
            }
          />
          {isMobile ? (
            <div className="absolute inset-0 bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30 pointer-events-none" />
            </>
          )}
        </div>
      </div>

      <div className="absolute inset-0 z-30 flex items-center justify-center perspective-container px-3 sm:px-4">
        <div
          className={`relative transition-all ${
            isRevealing
              ? "opacity-0 -translate-y-[200px] scale-50 duration-1000"
              : hasEntered
                ? "opacity-100 translate-y-0 scale-100 duration-[1200ms] ease-out"
                : "opacity-100 -translate-y-[100vh] scale-100 duration-0"
          }`}
        >
          {isMobile ? (
            <div className="absolute inset-0 -m-3">
              <div className="absolute inset-0 rounded-full border border-primary/15 animate-ping-slow" />
            </div>
          ) : (
            <div className="absolute inset-0 -m-4 md:-m-6 lg:-m-8">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping-slow" />
              <div
                className="absolute inset-0 rounded-full border border-primary/10 animate-ping-slow"
                style={{ animationDelay: "0.8s" }}
              />
            </div>
          )}

          <div
            className={`absolute inset-0 ${isMobile ? "-m-4 blur-xl" : "-m-6 sm:-m-8 md:-m-12 lg:-m-16 blur-2xl sm:blur-3xl"} bg-primary/20 animate-pulse-glow opacity-60 rounded-full`}
          />

          <Button
            onClick={handleClick}
            size="lg"
            className="relative w-40 h-40 xs:w-44 xs:h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full shadow-2xl group overflow-visible preserve-3d flex items-center justify-center bg-white hover:bg-white transition-all duration-700 border-2 sm:border-4 border-white/50 hover:border-primary/30"
            style={{
              boxShadow: isMobile
                ? "0 10px 40px rgba(255, 107, 53, 0.2), 0 5px 20px rgba(0,0,0,0.1)"
                : "0 20px 60px rgba(255, 107, 53, 0.25), 0 10px 30px rgba(0,0,0,0.15), inset 0 -2px 20px rgba(255, 107, 53, 0.1), inset 0 2px 20px rgba(255,255,255,0.8)",
            }}
          >
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: `conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.3), transparent)`,
                }}
              />
            </div>

            <div className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-700 animate-morph" />

            {!isMobile && (
              <div className="absolute inset-0 -m-10 sm:-m-16 md:-m-24 blur-2xl sm:blur-3xl bg-primary/20 animate-pulse-glow opacity-60 rounded-full" />
            )}

            <div className="absolute inset-0 rounded-full">
              {[...Array(isMobile ? 2 : 4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle"
                  style={{
                    top: `${50 + 40 * Math.cos((i * Math.PI * 2) / (isMobile ? 2 : 4))}%`,
                    left: `${50 + 40 * Math.sin((i * Math.PI * 2) / (isMobile ? 2 : 4))}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 px-4 sm:px-6 md:px-8 lg:px-10">
              <div className="relative">
                <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-primary animate-pulse-subtle" />
                </div>
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/60 rounded-full -translate-x-1/2" />
                </div>
              </div>

              <span className="relative text-primary font-bold text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg text-center leading-tight text-balance tracking-tight">
                Ready to have your
                <br />
                <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl inline-block group-hover:scale-105 transition-transform duration-500">
                  360 digital experience?
                </span>
              </span>

              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-4 sm:w-6 h-0.5 bg-primary/50 group-hover:w-6 sm:group-hover:w-8 md:group-hover:w-10 transition-all duration-500" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-primary/70 font-medium uppercase tracking-wider">
                  Click to Enter
                </span>
                <div className="w-4 sm:w-6 h-0.5 bg-primary/50 group-hover:w-6 sm:group-hover:w-8 md:group-hover:w-10 transition-all duration-500" />
              </div>
            </div>

            {!isMobile && (
              <>
                <div className="absolute -top-8 -left-8 md:-top-12 md:-left-12 w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full blur-2xl animate-float-slow" />
                <div
                  className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-14 h-14 md:w-20 md:h-20 bg-primary/15 rounded-full blur-3xl animate-float-slow"
                  style={{ animationDelay: "1s" }}
                />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
