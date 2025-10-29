"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function CTA() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-3d" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-3d"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card
          className="max-w-5xl mx-auto bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground p-16 sm:p-20 text-center relative overflow-hidden border-0 shadow-2xl hover:shadow-primary/50 transition-all duration-700 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />

          <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-primary-foreground/30 rounded-tl-3xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-primary-foreground/30 rounded-br-3xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 animate-glow-pulse" />
              <Zap className="h-10 w-10 animate-bounce-subtle" />
              <Sparkles className="h-8 w-8 animate-glow-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance leading-tight">
              Ready to Amplify Your Brand?
            </h2>

            <p className="text-xl sm:text-2xl mb-12 opacity-95 max-w-3xl mx-auto text-pretty leading-relaxed font-light">
              Join <span className="font-bold">500+ successful brands</span> using our outdoor advertising solutions.
              <span className="block mt-2">Start your campaign today and see real results.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-xl px-12 py-8 font-bold hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl group/btn"
                asChild
              >
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-3 h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-xl px-12 py-8 font-bold hover:scale-110 transition-all duration-300"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
