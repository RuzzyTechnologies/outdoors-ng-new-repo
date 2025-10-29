"use client"

import { Card } from "@/components/ui/card"
import { Play, Star } from "lucide-react"

export function ClientShowcase() {
  const clients = [
    {
      name: "ICM Capital",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ICM-U6eSaDNmn06Z8idBjFeVV1mwPZLRlO.png",
    },
    {
      name: "FedEx",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FedEx-SMKXvP9s86BmQh4L1ltJL9oJPYvmfc.png",
    },
    {
      name: "Fastestcakes",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fastestcakes-5ytOehC2VSqIhJO88ef6XmzIAUr9My.png",
    },
    {
      name: "QuickQart",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quickqart-j9s983nU8QLJPQZcHfyCq3z0p9llW6.png",
    },
    {
      name: "LetsChat",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Letschat-QJZVcMfVehRcrM5jnVe61MBETVCCpt.png",
    },
    {
      name: "Sairtek",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sairtek-60LA1r9x0hZkbHQPxMzsr8zbeZIr5e.png",
    },
    {
      name: "Oracle",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oracle-ESalOblSzITV3DrUXbdbkJyx7gnEzI.png",
    },
  ]

  const duplicatedClients = [...clients, ...clients, ...clients]

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-3d" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-3d"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-accent fill-accent" />
            <Star className="h-6 w-6 text-accent fill-accent" />
            <Star className="h-6 w-6 text-accent fill-accent" />
            <Star className="h-6 w-6 text-accent fill-accent" />
            <Star className="h-6 w-6 text-accent fill-accent" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance leading-tight">
            Trusted by <span className="text-gradient-static">Leading Brands</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Join <span className="text-primary font-bold">500+ ambitious brands</span> that have amplified their
            visibility with our premium outdoor advertising solutions
          </p>
        </div>

        <div className="relative mb-24 overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          {/* Animation now loops perfectly - when first set finishes, second set is in position */}
          <div className="flex gap-8 animate-scroll-infinite hover:pause-animation">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 w-64 h-40 glass-effect rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer group hover-lift-3d hover-glow relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 z-10" />

                <img
                  src={client.logo || "/placeholder.svg"}
                  alt={`${client.name} logo`}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <div className="relative rounded-2xl overflow-hidden group hover-lift-3d cursor-pointer">
            <img
              src="/successful-billboard-advertising-campaign-for-majo.jpg"
              alt="Billboard Campaign Success"
              className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8">
              <div>
                <h4 className="text-white font-bold text-2xl mb-2">Campaign Excellence</h4>
                <p className="text-white/90 text-base">Delivering measurable results for top brands</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group hover-lift-3d cursor-pointer">
            <img
              src="/multiple-billboards-showcasing-brand-advertising-a.jpg"
              alt="Multi-Location Campaign"
              className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8">
              <div>
                <h4 className="text-white font-bold text-2xl mb-2">Strategic Placement</h4>
                <p className="text-white/90 text-base">Premium locations across Nigeria</p>
              </div>
            </div>
          </div>
        </div>

        <div id="video" className="max-w-5xl mx-auto animate-scale-in">
          <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 group border-2 hover:border-primary/40 relative">
            <div className="aspect-video bg-gradient-to-br from-muted via-muted/80 to-muted/50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary rounded-full blur-3xl animate-pulse animate-blob-morph" />
                <div
                  className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl animate-pulse animate-blob-morph"
                  style={{ animationDelay: "1.5s" }}
                />
                <div
                  className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/50 rounded-full blur-2xl animate-pulse"
                  style={{ animationDelay: "3s" }}
                />
              </div>

              <div className="text-center relative z-10">
                <div className="h-24 w-24 rounded-full glass-effect-strong flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-all duration-500 cursor-pointer animate-pulse-glow shadow-2xl">
                  <Play
                    className="h-12 w-12 text-primary group-hover:scale-110 transition-transform ml-1"
                    fill="currentColor"
                  />
                </div>
                <p className="text-lg font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  Watch Our Campaign Showcase
                </p>
                <p className="text-sm text-muted-foreground mt-2">See how we transform brands</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
