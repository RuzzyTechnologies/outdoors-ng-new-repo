import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function BillboardsPage() {
  const billboards = [
    {
      id: 1,
      title: "BRT Billboard In Ikeja, Lagos",
      location: "Ikeja, Lagos",
      type: "BRT Billboard",
      price: "₦500,000/month",
      image: "/brt-billboard-lagos-nigeria.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "48 Sheet Billboard Along Ikotun-Idimu Road",
      location: "Ikotun, Lagos",
      type: "48 Sheet",
      price: "₦350,000/month",
      image: "/48-sheet-billboard-lagos-road.jpg",
      featured: true,
    },
    {
      id: 3,
      title: "Cube Led Billboard At Lekki Phase 1",
      location: "Lekki, Lagos",
      type: "LED Billboard",
      price: "₦800,000/month",
      image: "/led-cube-billboard-lekki-lagos.jpg",
      featured: true,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse All Billboards</h1>
              <p className="text-xl text-muted-foreground">Discover premium billboard locations across Nigeria</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {billboards.map((billboard) => (
                <Card key={billboard.id} className="overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative h-64">
                    <Image
                      src={billboard.image || "/placeholder.svg"}
                      alt={billboard.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {billboard.featured && <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>}
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {billboard.type}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{billboard.title}</h3>
                    <p className="text-muted-foreground mb-4">{billboard.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{billboard.price}</span>
                      <Button asChild>
                        <Link href={`/billboards/${billboard.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
