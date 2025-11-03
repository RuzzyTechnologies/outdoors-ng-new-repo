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
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="relative h-96 rounded-lg overflow-hidden mb-6">
                <Image src="/brt-billboard-lagos-nigeria.jpg" alt="Billboard" fill className="object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src="/brt-billboard-lagos-nigeria.jpg"
                      alt={`Billboard view ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary">Featured</Badge>
                <Badge variant="outline">BRT Billboard</Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4">BRT Billboard In Ikeja, Lagos</h1>

              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Ikeja, Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span>1,234 views</span>
                </div>
              </div>

              <div className="text-4xl font-bold text-primary mb-8">₦500,000/month</div>

              <Card className="p-6 mb-8">
                <h3 className="font-bold text-xl mb-4">Billboard Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-semibold">BRT Billboard</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-semibold">48 Sheet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-semibold">Ikeja, Lagos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-semibold text-accent">Available Now</span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" asChild>
                  <Link href="/contact">Book Now</Link>
                </Button>
                <Button size="lg" variant="outline">
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
