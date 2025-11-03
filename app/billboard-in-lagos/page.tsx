import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin } from "lucide-react"

export default function BillboardInLagosPage() {
  const billboards = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Billboard Location ${i + 1} in Lagos`,
    type: ["Unipole", "Gantry", "LED Billboard", "48 Sheet"][i % 4],
    area: ["Ikeja", "Lekki", "Victoria Island", "Ikoyi"][i % 4],
    available: i % 3 !== 0,
  }))

  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumbs />
      <main className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Billboards in Lagos</h1>
                <p className="text-lg text-muted-foreground mt-2">1006 billboard locations available</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {billboards.map((billboard) => (
                <Card key={billboard.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48">
                    <Image
                      src={`/billboard-.jpg?height=200&width=300&query=billboard+${billboard.area}+Lagos`}
                      alt={billboard.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      {billboard.available ? (
                        <Badge className="bg-accent">Available</Badge>
                      ) : (
                        <Badge variant="secondary">Booked</Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{billboard.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">Type: {billboard.type}</p>
                    <p className="text-sm text-muted-foreground mb-4">Area: {billboard.area}</p>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
