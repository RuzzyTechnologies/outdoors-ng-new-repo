"use client"

import { Card } from "@/components/ui/card"
import { MapPin, BarChart3, Clock, Shield, Zap, Target } from "lucide-react"
import { useState } from "react"

export function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const features = [
    {
      icon: MapPin,
      title: "Strategic Locations",
      description:
        "Premium billboard placements in high-traffic areas across all 36 Nigerian states for maximum brand visibility and impact.",
      image: "/map-showing-billboard-locations-across-nigeria.jpg",
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description:
        "Comprehensive analytics and reporting to measure campaign performance and optimize your advertising ROI in real-time.",
      image: "/analytics-dashboard-showing-billboard-campaign-per.jpg",
    },
    {
      icon: Clock,
      title: "Fast Deployment",
      description:
        "Quick turnaround times from booking to campaign launch. Get your brand visible in days, not weeks with our streamlined process.",
      image: "/billboard-installation-and-deployment-process.jpg",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Regular maintenance and monitoring of all billboard installations to ensure your campaign runs flawlessly throughout its duration.",
      image: "/billboard-maintenance-and-quality-check.jpg",
    },
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden perspective-container">
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float-3d animate-blob-morph" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float-3d animate-blob-morph"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float-3d"
        style={{ animationDelay: "6s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <Target className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance leading-tight">
            Why Choose <span className="text-gradient-static">Outdoors.ng</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Award-winning outdoor advertising solutions backed by{" "}
            <span className="text-primary font-bold">expertise and innovation</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 cursor-pointer group hover-lift-3d glass-effect relative border-2 hover:border-primary/40"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />

              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              <div className="relative z-10 p-8">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg animate-depth-pulse">
                  <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
