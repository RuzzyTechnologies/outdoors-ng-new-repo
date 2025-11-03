import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Search, Share2, Mail, Smartphone, BarChart, Globe } from "lucide-react"

export default function DigitalMarketingPage() {
  const services = [
    {
      icon: Search,
      title: "SEO & SEM",
      description: "Improve your online visibility with search engine optimization and marketing strategies.",
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Engage your audience across all major social media platforms with targeted campaigns.",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Build and nurture customer relationships with effective email marketing campaigns.",
    },
    {
      icon: Smartphone,
      title: "Mobile Marketing",
      description: "Reach customers on-the-go with mobile-optimized campaigns and strategies.",
    },
    {
      icon: BarChart,
      title: "Analytics & Reporting",
      description: "Track, measure, and optimize your digital marketing performance with detailed analytics.",
    },
    {
      icon: Globe,
      title: "Web Design & Development",
      description: "Create stunning, conversion-focused websites that drive business results.",
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
                Digital Marketing Solutions
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto">
                Amplify your brand's online presence with data-driven digital marketing strategies. From SEO to social
                media, we help you reach and engage your target audience effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Start Growing Online</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Link href="/about">Our Approach</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Digital Marketing Services</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive digital solutions to grow your business online
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
                Why Digital Marketing Matters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[
                  {
                    title: "Wider Reach",
                    description: "Connect with millions of potential customers online across Nigeria and beyond.",
                  },
                  {
                    title: "Targeted Advertising",
                    description: "Reach the right audience at the right time with precision targeting.",
                  },
                  {
                    title: "Measurable Results",
                    description: "Track every click, conversion, and ROI with detailed analytics.",
                  },
                  {
                    title: "Cost-Effective",
                    description: "Get more value for your marketing budget compared to traditional advertising.",
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
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 sm:p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Dominate Digital?</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Let's create a digital marketing strategy that drives real business growth.
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
