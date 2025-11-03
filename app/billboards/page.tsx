import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
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
      <main className="flex-1 pt-16 sm:pt-20">
        <Breadcrumbs />
        <section className="py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Browse All Billboards</h1>
              <p className="text-xl text-muted-foreground">Discover premium billboard locations across Nigeria</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {billboards.map((billboard) => (
                <Card
                  key={billboard.id}
                  className="overflow-hidden border-2 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group hover:border-primary/50 hover:-translate-y-2"
                >
                  <div className="relative h-64">
                    <Image
                      src={billboard.image || "/placeholder.svg"}
                      alt={billboard.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                    {billboard.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary shadow-md">Featured</Badge>
                    )}
                  </div>
                  <div className="p-8">
                    <Badge variant="outline" className="mb-4 transition-colors duration-300 ease-in-out">
                      {billboard.type}
                    </Badge>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 ease-in-out">
                      {billboard.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{billboard.location}</p>
                    <div className="flex flex-col items-start gap-4">
                      <span className="text-2xl font-bold text-primary leading-none">{billboard.price}</span>
                      <Button asChild className="transition-all duration-300 ease-in-out hover:scale-105 w-full">
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
