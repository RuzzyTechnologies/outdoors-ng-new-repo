import { Card } from "@/components/ui/card"
import { MapPin, BarChart3, Clock, Shield, Award } from "lucide-react"
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
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px]">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/20 text-primary">
                <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Award-Winning Agency</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95]">
                Outdoors is an
                <br />
                <span className="text-primary">Award-Winning</span>
                <br />
                Advertising Agency
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-md">
                We are an award-winning out-of-home advertising agency in Nigeria. We specialize in the execution of
                outdoor advertising campaigns for our clients, including media buying and creative concept development.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/20 border-2 border-black"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold">500+ Brands Trust Us</p>
                  <p className="text-xs text-gray-500">Including Fortune 500 companies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all group ${
                  index % 2 === 0 ? "lg:ml-8 xl:ml-12" : "lg:mr-8 xl:mr-12"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  <div className="relative h-48 sm:h-56 md:h-full rounded-xl overflow-hidden">
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
