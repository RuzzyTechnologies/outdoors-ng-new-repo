import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Award, Target, Users, TrendingUp, MapPin, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 sm:pt-20">
        <Breadcrumbs />
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-black to-gray-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">About Us</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-balance">
                Award-Winning <span className="text-primary">Outdoor Advertising</span> Agency in Nigeria
              </h1>
              <p className="text-lg md:text-xl text-gray-400 text-balance leading-relaxed">
                We provide an exclusive resource on the internet for billboards in choice locations in Nigeria. We
                research, present and negotiate the best media options, locations, and rates.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">Welcome to Outdoors.ng</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We provide an exclusive resource on the internet for billboards in choice locations in Nigeria. We
                  research, present and negotiate the best media options, locations, and rates. We also handle every
                  aspect and oversee the entire campaign from start to finish, at no cost to our clients.
                </p>
                <p>
                  Our diverse portfolio of digital and static displays spread across major cities in Nigeria are
                  primarily located in the most iconic and high-traffic locations giving your brand the edge and reaches
                  millions of commuters daily.
                </p>
                <p>
                  With the scope and depth of our presence in the largest cities in Nigeria, advertisers are provided
                  with the ability to engage with both mass and targeted audiences at many touchpoints throughout the
                  day.
                </p>
                <p>
                  If you need to rent or buy a billboard, we're the exclusive online resource to make it happen. We
                  specialize in all forms of outdoor media such as Unipole, Gantry, LED Billboard, Wall Drape, Lamp
                  Post, Roof Top, Trivision/Ultrawave, Portrait, Backlit/Landscape, Bridge Panel, Mega Billboard, Long
                  Banner, Mobile Billboard, Bus Exterior, Convenience Store Posters or Pump-Top ads…… and so much more!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Why Choose Outdoors.ng</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We combine expertise, technology, and strategic thinking to deliver outstanding results
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Strategic Placement</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Premium billboard locations across Nigeria's major cities and highways for maximum brand exposure.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Expert Team</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Experienced professionals handling everything from creative development to campaign execution.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Proven Results</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    500+ brands have increased their visibility and revenue through our strategic campaigns.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Nationwide Coverage</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    2,000+ billboard locations across all 36 states in Nigeria for comprehensive reach.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Fast Deployment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Quick turnaround times from concept to live campaign with efficient project management.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Award-Winning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Recognized excellence in outdoor advertising with multiple industry awards and accolades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2">2,000+</div>
                  <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-accent mb-2">500+</div>
                  <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2">36</div>
                  <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">States</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-accent mb-2">98%</div>
                  <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
