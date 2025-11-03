import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Monitor, Zap, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LEDScreensPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        <Breadcrumbs />
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">LED Screen Advertising</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Captivate your audience with dynamic digital displays in high-traffic locations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Monitor, title: "High Resolution", desc: "Crystal clear 4K displays" },
                { icon: Zap, title: "Dynamic Content", desc: "Update ads in real-time" },
                { icon: Eye, title: "High Visibility", desc: "Bright displays day & night" },
                { icon: TrendingUp, title: "Better ROI", desc: "Higher engagement rates" },
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
