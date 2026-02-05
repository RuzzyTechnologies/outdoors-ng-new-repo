import { Card } from "@/components/ui/card"
import Link from "next/link"
import { MapPin } from "lucide-react"

export function FindBillboardsSection() {
  const locations = [
    { name: "Lagos", count: 1006, stateId: 1 },
    { name: "Kano", count: 102, stateId: 36 },
    { name: "Benin", count: 126, stateId: 4 },
    { name: "Abuja", count: 324, stateId: 3 },
    { name: "Rivers", count: 239, stateId: 9 },
    { name: "Cross Rivers", count: 65, stateId: 6 },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">FIND BILLBOARDS IN NIGERIA</h2>
            <p className="text-lg text-muted-foreground">See our top pick of Billboards visited by most guests</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Link key={location.stateId} href={`/billboards?state=${location.stateId}`}>
                <Card className="p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">{location.count} billboards</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
