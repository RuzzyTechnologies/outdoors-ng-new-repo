import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, Maximize, Users, DollarSign } from "lucide-react"
import Link from "next/link"

export default function WallDrapesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Wall Drape Advertising</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Make a massive impact with large-format building wraps in prime locations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Building2, title: "Prime Buildings", desc: "High-traffic locations" },
                { icon: Maximize, title: "Massive Scale", desc: "Impossible to miss" },
                { icon: Users, title: "Wide Reach", desc: "Thousands of daily views" },
                { icon: DollarSign, title: "Cost Effective", desc: "Great value per impression" },
              ].map((feature, i) => (
                <Card key={i} className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
