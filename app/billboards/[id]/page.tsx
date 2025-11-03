import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Eye, Share2 } from "lucide-react"

export default function BillboardDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="relative h-96 rounded-lg overflow-hidden mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-border hover:border-primary/50">
                <Image
                  src="/brt-billboard-lagos-nigeria.jpg"
                  alt="Billboard"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative h-28 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border-2 border-border hover:border-primary/50 cursor-pointer hover:-translate-y-1"
                  >
                    <Image
                      src="/brt-billboard-lagos-nigeria.jpg"
                      alt={`Billboard view ${i}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-primary shadow-md">Featured</Badge>
                <Badge variant="outline" className="transition-colors duration-300 ease-in-out">
                  BRT Billboard
                </Badge>
              </div>

              <h1 className="text-4xl font-bold mb-6">BRT Billboard In Ikeja, Lagos</h1>

              <div className="flex items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Ikeja, Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span>1,234 views</span>
                </div>
              </div>

              <div className="text-4xl font-bold text-primary mb-10">₦500,000/month</div>

              <Card className="p-8 mb-10 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border-2 hover:border-primary/30">
                <h3 className="font-bold text-xl mb-6">Billboard Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-semibold">BRT Billboard</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-semibold">48 Sheet</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-semibold">Ikeja, Lagos</span>
                  </div>
                  <div className="flex justify-between py-2 transition-colors duration-300 ease-in-out">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-semibold text-accent">Available Now</span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg"
                  asChild
                >
                  <Link href="/contact">Book Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg bg-transparent"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
