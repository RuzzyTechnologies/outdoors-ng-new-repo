import { Award, Target, Users, TrendingUp } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main heading */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Award-Winning Agency</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Outdoors is an <span className="text-primary">award-winning</span> advertising agency in Nigeria
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              We are an award-winning out-of-home advertising Agency in Nigeria. We specialize in the execution of
              outdoor advertising campaigns for our clients, including media buying, creative concept development, and
              strategic placement across Nigeria's most impactful locations.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            <div className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Strategic Placement</h3>
              <p className="text-muted-foreground leading-relaxed">
                We identify and secure premium billboard locations across Nigeria's major cities and highways for
                maximum brand exposure.
              </p>
            </div>

            <div className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Team</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our experienced team handles everything from creative concept development to campaign execution and
                performance tracking.
              </p>
            </div>

            <div className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Proven Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                We've helped 500+ brands increase their visibility and revenue through strategic outdoor advertising
                campaigns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
