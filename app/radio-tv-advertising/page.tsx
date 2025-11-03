import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Radio, Tv, Mic, Video, Users, BarChart } from "lucide-react"

export default function RadioTVAdvertisingPage() {
  const services = [
    {
      icon: Radio,
      title: "Radio Advertising",
      description: "Reach millions of listeners across Nigeria's top radio stations with targeted audio campaigns.",
    },
    {
      icon: Tv,
      title: "Television Advertising",
      description: "Broadcast your message on major TV networks and channels for maximum visibility.",
    },
    {
      icon: Mic,
      title: "Jingle Production",
      description: "Create memorable audio branding with professionally produced jingles and sound design.",
    },
    {
      icon: Video,
      title: "TV Commercial Production",
      description: "Full-service video production for compelling television commercials that drive results.",
    },
    {
      icon: Users,
      title: "Sponsorship Opportunities",
      description: "Sponsor popular radio and TV programs to build brand association and loyalty.",
    },
    {
      icon: BarChart,
      title: "Audience Analytics",
      description: "Data-driven insights on reach, frequency, and audience demographics for your campaigns.",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 sm:pt-20">
        <Breadcrumbs />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance">
                Radio & TV Advertising
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto">
                Amplify your brand's reach with broadcast advertising. Connect with millions of viewers and listeners
                across Nigeria through strategic radio and television campaigns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Start Broadcasting</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Broadcast Advertising Services
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive radio and TV advertising solutions for maximum impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <Card key={index} className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <service.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">
                Why Broadcast Advertising
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[
                  {
                    title: "Mass Reach",
                    description: "Connect with millions of viewers and listeners across Nigeria simultaneously.",
                  },
                  {
                    title: "Brand Credibility",
                    description: "Build trust and credibility through association with established media brands.",
                  },
                  {
                    title: "Targeted Timing",
                    description: "Reach your audience during prime time slots and popular programs.",
                  },
                  {
                    title: "Multi-Sensory Impact",
                    description: "Engage audiences with audio-visual storytelling that creates lasting impressions.",
                  },
                ].map((item, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Networks Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Our Broadcast Network</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12">
                We work with Nigeria's leading radio and television stations to deliver your message to the right
                audience at the right time. Our extensive network includes national and regional broadcasters across all
                major cities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Radio Stations</h3>
                  <p className="text-sm text-muted-foreground">Access to top FM and AM stations nationwide</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2">TV Networks</h3>
                  <p className="text-sm text-muted-foreground">Major national and regional television channels</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 sm:p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Go On Air?</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Let's create a broadcast advertising campaign that reaches millions and drives real results.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Get Started</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
