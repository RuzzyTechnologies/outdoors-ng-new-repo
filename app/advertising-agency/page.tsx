import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, Target, Users, TrendingUp, Award, Lightbulb } from "lucide-react"

export default function AdvertisingAgencyPage() {
  const services = [
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Develop comprehensive advertising strategies aligned with your business goals and target audience.",
    },
    {
      icon: Lightbulb,
      title: "Creative Development",
      description: "Create compelling campaigns that capture attention and drive engagement across all channels.",
    },
    {
      icon: Users,
      title: "Brand Building",
      description: "Build and strengthen your brand identity with consistent messaging and visual storytelling.",
    },
    {
      icon: TrendingUp,
      title: "Campaign Management",
      description: "End-to-end campaign execution from concept to completion with measurable results.",
    },
    {
      icon: Award,
      title: "Award-Winning Team",
      description: "Work with Nigeria's best outdoor advertising agency, recognized globally for excellence.",
    },
  ]

  const benefits = [
    "Full-service advertising solutions",
    "Experienced team of creative professionals",
    "Data-driven campaign strategies",
    "Multi-channel advertising expertise",
    "Proven track record with major brands",
    "Transparent reporting and analytics",
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
                Award-Winning Advertising Agency
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto">
                We are an award-winning advertising agency in Nigeria, specializing in creating impactful campaigns that
                drive results. From strategy to execution, we deliver excellence at every stage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Start Your Campaign</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Link href="/billboards">View Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Agency Services</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive advertising solutions tailored to your brand's unique needs
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
                Why Choose Our Agency
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 sm:p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Let's create an advertising campaign that delivers real results for your business.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Get Started Today</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
