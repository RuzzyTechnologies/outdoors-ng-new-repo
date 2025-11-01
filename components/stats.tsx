"use client"

import { useEffect, useState } from "react"

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState([0, 0, 0])

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
      const targets = [2000, 500, 36]
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
    { value: counts[0], suffix: "+", label: "LOCATIONS" },
    { value: counts[1], suffix: "+", label: "BRANDS" },
    { value: counts[2], suffix: "", label: "STATES" },
  ]

  return (
    <section id="stats-section" className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-16 xl:gap-24 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="border-l-4 border-primary pl-4 sm:pl-6">
                <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-primary mb-1 sm:mb-2 tracking-tight">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-xs sm:text-sm lg:text-base font-semibold text-muted-foreground tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
