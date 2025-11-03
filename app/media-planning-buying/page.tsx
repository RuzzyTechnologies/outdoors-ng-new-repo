import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Target, DollarSign, Calendar, MapPin, Users, TrendingUp } from "lucide-react"

export default function MediaPlanningBuyingPage() {
  const services = [
    {
      icon: Target,
      title: "Strategic Media Planning",
      description: "Develop comprehensive media strategies that align with your marketing objectives and budget.",
    },
    {
      icon: DollarSign,
      title: "Media Buying & Negotiation",
      description: "Secure the best rates and placements through our extensive network and negotiation expertise.",
    },
    {
      icon: Calendar,
      title: "Campaign Scheduling",
      description: "Optimize timing and frequency to maximize reach and impact of your advertising campaigns.",
    },
    {
      icon: MapPin,
      title: "Location Selection",
      description: "Choose strategic locations that deliver maximum visibility to your target audience.",
    },
    {
      icon: Users,
      title: "Audience Analysis",
      description: "Deep audience insights to ensure your message reaches the right people at the right time.",
    },
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Continuous monitoring and optimization to improve campaign performance and ROI.",
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
                Media Planning & Buying
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto">
                Maximize your advertising investment with strategic media planning and expert buying services. We
                research, negotiate, and secure the best media options for your brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Plan Your Campaign</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Link href="/billboards">View Available Media</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Media Services</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                End-to-end media planning and buying solutions for maximum impact
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

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">
                Our Planning Process
              </h2>
              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    step: "1",
                    title: "Research & Analysis",
                    description: "Comprehensive market research and audience analysis to inform strategy.",
                  },
                  {
                    step: "2",
                    title: "Strategy Development",
                    description: "Create a customized media plan aligned with your goals and budget.",
                  },
                  {
                    step: "3",
                    title: "Media Buying",
                    description: "Negotiate and secure the best rates and placements for your campaign.",
                  },
                  {
                    step: "4",
                    title: "Execution & Monitoring",
                    description: "Launch campaign and continuously monitor performance for optimization.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg sm:text-xl">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Why Work With Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[
                  {
                    title: "Extensive Network",
                    description:
                      "Access to premium media inventory across Nigeria through our established relationships.",
                  },
                  {
                    title: "Best Rates",
                    description: "Leverage our buying power to secure competitive rates and added value.",
                  },
                  {
                    title: "Expert Negotiation",
                    description: "Experienced team that knows how to get the best deals for your budget.",
                  },
                  {
                    title: "No Hidden Costs",
                    description: "Transparent pricing with no surprises - you only pay for the media.",
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

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 sm:p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Let's Plan Your Next Campaign</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Get expert media planning and buying services that maximize your advertising ROI.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
