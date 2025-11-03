import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bus, Train, Car, Users } from "lucide-react"
import Link from "next/link"

export default function TransitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Transit Advertising</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Reach commuters on the move with bus, taxi, and vehicle advertising
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Bus, title: "Bus Advertising", desc: "BRT & public buses" },
                { icon: Train, title: "Rail Transit", desc: "Metro & train stations" },
                { icon: Car, title: "Taxi Branding", desc: "Ride-share vehicles" },
                { icon: Users, title: "High Frequency", desc: "Multiple daily exposures" },
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
