import { Card } from "@/components/ui/card"
import { MapPin, BarChart3, Clock, Shield, Zap } from "lucide-react"
import Image from "next/image"

export function Features() {
  const features = [
    {
      icon: MapPin,
      title: "Strategic Locations",
      description: "Premium placements in high-traffic areas across all 36 Nigerian states.",
      image: "/map-showing-billboard-locations-across-nigeria.jpg",
    },
    {
      icon: BarChart3,
      title: "Data-Driven",
      description: "Comprehensive analytics to measure and optimize your campaign ROI.",
      image: "/analytics-dashboard-showing-billboard-campaign-per.jpg",
    },
    {
      icon: Clock,
      title: "Fast Deployment",
      description: "Quick turnaround from booking to launch. Days, not weeks.",
      image: "/billboard-installation-and-deployment-process.jpg",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Regular maintenance and monitoring for flawless campaigns.",
      image: "/billboard-maintenance-and-quality-check.jpg",
    },
  ]

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px]">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Why Choose Us</span>
              </div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9]">
                Built For
                <br />
                <span className="text-primary">Impact</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-md">
                Award-winning outdoor advertising that delivers measurable results for ambitious brands.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 w-12 rounded-full bg-primary/20 border-2 border-black" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold">500+ Brands Trust Us</p>
                  <p className="text-xs text-gray-500">Including Fortune 500 companies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all group ${
                  index % 2 === 0 ? "lg:ml-12" : "lg:mr-12"
                }`}
              >
                <div className="grid md:grid-cols-2 gap-6 p-8">
                  <div className="space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  <div className="relative h-48 md:h-full rounded-xl overflow-hidden">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
