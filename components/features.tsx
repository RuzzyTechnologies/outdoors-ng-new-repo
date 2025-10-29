"use client"

import { Card } from "@/components/ui/card"
import { MapPin, BarChart3, Clock, Shield } from "lucide-react"

export function Features() {
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
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
            Why Choose <span className="text-primary">Outdoors.ng</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Award-winning outdoor advertising solutions backed by{" "}
            <span className="text-primary font-semibold">expertise and innovation</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border bg-card shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
