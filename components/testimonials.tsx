"use client"

import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useState } from "react"

export function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Marketing Director, Tech Startup",
      company: "TechVision Nigeria",
      image: "/professional-african-business-person-headshot.jpg",
      quote:
        "Outdoors.ng transformed our brand visibility in Lagos. Within weeks of launching our billboard campaign, we saw a 300% increase in brand recognition. Their strategic placement and professional service are unmatched.",
      rating: 5,
    },
    {
      name: "Chioma Okafor",
      role: "Brand Manager",
      company: "Fashion Empire",
      image: "/professional-african-woman-business-executive-head.jpg",
      quote:
        "The team at Outdoors.ng understood our vision perfectly. They helped us select the best locations for our fashion brand campaign, and the results exceeded our expectations. Highly recommended!",
      rating: 5,
    },
    {
      name: "Ibrahim Musa",
      role: "CEO",
      company: "Retail Solutions Ltd",
      image: "/professional-african-male-ceo-headshot.jpg",
      quote:
        "Working with Outdoors.ng was seamless from start to finish. Their data-driven approach and premium billboard locations helped us reach our target audience effectively. Outstanding service!",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float-3d" />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-float-3d"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 sm:mb-6 text-balance leading-tight">
            What Our <span className="text-gradient-static">Clients Say</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
            Real results from <span className="text-primary font-bold">real brands</span> across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 sm:p-8 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 cursor-pointer group hover-lift-3d glass-effect relative overflow-hidden border-2 hover:border-primary/40"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />

              <div className="relative z-10">
                <Quote className="h-10 w-10 sm:h-12 sm:w-12 text-primary/20 mb-4 sm:mb-6" />

                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-accent fill-accent" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6 sm:mb-8 italic">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary/20 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs sm:text-sm text-primary font-semibold">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
