"use client"
import { Star } from "lucide-react"

export function ClientShowcase() {
  const clients = [
    { name: "Puma", logo: "https://www.outdoors.ng/assets/images/logos/puma.png" },
    { name: "Oracle", logo: "https://www.outdoors.ng/application/views/images/clients/oracle.png" },
    { name: "FedEx", logo: "https://www.outdoors.ng/application/views/images/clients/Fedex_logo.webp" },
    { name: "Jumia", logo: "https://www.outdoors.ng/application/views/images/clients/jumia_logo.png" },
    { name: "Paystack", logo: "https://www.outdoors.ng/application/views/images/clients/paystack_logo.png" },
    { name: "Dell", logo: "https://www.outdoors.ng/assets/images/logos/dell.png" },
    { name: "Boomplay", logo: "https://www.outdoors.ng/assets/images/logos/boomplay.png" },
    { name: "May & Baker", logo: "https://www.outdoors.ng/assets/images/logos/may_and_baker.png" },
    { name: "Universal Music", logo: "https://www.outdoors.ng/application/views/images/clients/universal_music.png" },
    { name: "Sony Music", logo: "https://www.outdoors.ng/assets/images/logos/sony_music.png" },
    { name: "LetsChat", logo: "https://www.outdoors.ng/application/views/images/clients/LetsChat_Logo.png" },
    { name: "QuickQart", logo: "https://www.outdoors.ng/application/views/images/clients/quickqart.png" },
    { name: "Sato", logo: "https://www.outdoors.ng/application/views/images/clients/sato-logo.webp" },
    { name: "Romano Perfume", logo: "https://www.outdoors.ng/application/views/images/clients/romano_perfume.webp" },
    { name: "Genesis Global", logo: "https://www.outdoors.ng/application/views/images/clients/Genesis_Global.webp" },
    { name: "Cinder Build", logo: "https://www.outdoors.ng/application/views/images/clients/Cinder_build_logo.webp" },
    {
      name: "Christ Apostolic Church",
      logo: "https://www.outdoors.ng/application/views/images/clients/Christ_Apostolic_Church_logo.webp",
    },
    { name: "TP Global FX", logo: "https://www.outdoors.ng/application/views/images/clients/Tp_Global_fx_Logo.webp" },
    { name: "Tomi Drinks", logo: "https://www.outdoors.ng/application/views/images/clients/tomi_drinks_logo.webp" },
    {
      name: "Hench Education",
      logo: "https://www.outdoors.ng/application/views/images/clients/Hench_Education_logo.webp",
    },
    {
      name: "Hazibian International",
      logo: "https://www.outdoors.ng/application/views/images/clients/Hazibian_International.webp",
    },
    { name: "ICM Capital", logo: "https://www.outdoors.ng/application/views/images/clients/icm_capital.png" },
    { name: "Anchor", logo: "https://www.outdoors.ng/application/views/images/clients/anchor.png" },
    { name: "Pat3cia", logo: "https://www.outdoors.ng/application/views/images/clients/pat3cia_logo.png" },
    { name: "LOC", logo: "https://www.outdoors.ng/application/views/images/clients/loc.png" },
    { name: "MAN", logo: "https://www.outdoors.ng/application/views/images/clients/man.png" },
    { name: "Sairtek", logo: "https://www.outdoors.ng/application/views/images/clients/sairtek_logo.png" },
    { name: "Syscomptech", logo: "https://www.outdoors.ng/application/views/images/clients/syscomptech.png" },
    { name: "Capital Field", logo: "https://www.outdoors.ng/assets/images/logos/capital_field.png" },
    { name: "Quidax", logo: "https://www.outdoors.ng/application/views/images/clients/quidax-logo.webp" },
    { name: "Greenlife", logo: "https://www.outdoors.ng/assets/images/logos/greenlife.png" },
    { name: "Hill Radio", logo: "https://www.outdoors.ng/assets/images/logos/hill_radio.png" },
    { name: "Jadek Farms", logo: "https://www.outdoors.ng/assets/images/logos/jadek_farms.png" },
    { name: "My Dokita", logo: "https://www.outdoors.ng/assets/images/logos/my_dokita.png" },
    { name: "SGRL", logo: "https://www.outdoors.ng/assets/images/logos/sgrl.png" },
  ]

  const duplicatedClients = [...clients, ...clients, ...clients]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-3d" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-3d"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-accent fill-accent" />
            <Star className="h-6 w-6 text-accent fill-accent" />
            <Star className="h-6 w-6 text-accent fill-accent" />
            <Star className="h-6 w-6 text-accent fill-accent" />
            <Star className="h-6 w-6 text-accent fill-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 sm:mb-6 text-balance leading-tight uppercase">
            Our Clients
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
            If these brands can trust us, so can you
          </p>
        </div>

        <div className="relative mb-16 sm:mb-20 lg:mb-24 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 sm:gap-6 lg:gap-8 animate-scroll-infinite hover:pause-animation">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40 glass-effect rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer group hover-lift-3d hover-glow relative"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden group hover-lift-3d cursor-pointer">
            <img
              src="/successful-billboard-advertising-campaign-for-majo.jpg"
              alt="Billboard Campaign Success"
              className="w-full h-64 sm:h-72 lg:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4 sm:p-6 lg:p-8">
              <div>
                <h4 className="text-white font-bold text-xl sm:text-2xl mb-1 sm:mb-2">Campaign Excellence</h4>
                <p className="text-white/90 text-sm sm:text-base">Delivering measurable results for top brands</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group hover-lift-3d cursor-pointer">
            <img
              src="/multiple-billboards-showcasing-brand-advertising-a.jpg"
              alt="Multi-Location Campaign"
              className="w-full h-64 sm:h-72 lg:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4 sm:p-6 lg:p-8">
              <div>
                <h4 className="text-white font-bold text-xl sm:text-2xl mb-1 sm:mb-2">Strategic Placement</h4>
                <p className="text-white/90 text-sm sm:text-base">Premium locations across Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
