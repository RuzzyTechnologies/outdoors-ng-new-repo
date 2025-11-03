import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export function TopDealsSection() {
  const deals = [
    {
      id: 1,
      title: "BRT Billboard In Ikeja, Lagos",
      image: "/brt-billboard-lagos-nigeria.jpg",
      featured: true,
      available: true,
    },
    {
      id: 2,
      title: "48 Sheet Billboard Along Ikotun-Idimu Road Ftf Ikotun",
      image: "/48-sheet-billboard-lagos-road.jpg",
      featured: true,
      available: true,
    },
    {
      id: 3,
      title: "Cube Led Billboard At Lekki Phase 1",
      image: "/led-cube-billboard-lekki-lagos.jpg",
      featured: true,
      available: true,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OUR TOP OUT-OF-HOME DEALS</h2>
            <p className="text-lg text-muted-foreground">A quick view of our best outdoors deals</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative h-64">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {deal.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                    {deal.available && <Badge className="bg-accent text-accent-foreground">Available</Badge>}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4 line-clamp-2">{deal.title}</h3>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href={`/billboards/${deal.id}`}>View Details</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/billboards">View All Billboards</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
