"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, MapPin, Award } from "lucide-react"

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState([0, 0, 0, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const targets = [500, 2000, 36, 98]
      const duration = 2000
      const steps = 60
      const increment = targets.map((t) => t / steps)

      let currentStep = 0
      const timer = setInterval(() => {
        if (currentStep < steps) {
          setCounts((prev) => prev.map((_, i) => Math.min(Math.floor(increment[i] * currentStep), targets[i])))
          currentStep++
        } else {
          setCounts(targets)
          clearInterval(timer)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  const stats = [
    { value: counts[0], suffix: "+", label: "Active Clients", icon: Users },
    { value: counts[1], suffix: "+", label: "Billboard Locations", icon: MapPin },
    { value: counts[2], suffix: "", label: "States Covered", icon: TrendingUp },
    { value: counts[3], suffix: "%", label: "Client Satisfaction", icon: Award },
  ]

  return (
    <section
      id="stats-section"
      className="py-24 border-y-2 border-border bg-gradient-to-r from-card via-primary/5 to-card relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse animate-blob-morph animate-glow-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse animate-blob-morph"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 group cursor-default hover-float ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 hover-magnetic animate-glow-pulse">
                <stat.icon className="h-8 w-8 text-primary group-hover:scale-125 transition-transform" />
              </div>

              <div className="text-5xl sm:text-6xl font-black text-gradient-static mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
                {stat.suffix}
              </div>

              <div className="text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
