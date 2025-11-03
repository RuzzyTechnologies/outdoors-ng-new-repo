import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { BarChart3, Eye, MapPin, Camera, FileText, TrendingUp } from "lucide-react"

export default function CampaignMonitoringPage() {
  const features = [
    {
      icon: Eye,
      title: "Real-Time Tracking",
      description: "Monitor your campaigns in real-time with live updates and performance metrics.",
    },
    {
      icon: Camera,
      title: "Photo Verification",
      description: "Receive photographic proof of your billboard installations and ongoing displays.",
    },
    {
      icon: MapPin,
      title: "Location Monitoring",
      description: "GPS-verified locations ensure your ads are displayed exactly where promised.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed analytics and insights on campaign reach, impressions, and engagement.",
    },
    {
      icon: FileText,
      title: "Comprehensive Reports",
      description: "Regular detailed reports on campaign performance and ROI metrics.",
    },
    {
      icon: TrendingUp,
      title: "Optimization Insights",
      description: "Data-driven recommendations to optimize your campaign performance.",
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
                Campaign Monitoring & Tracking
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto">
                Track and monitor your outdoor advertising campaigns with precision. Get real-time updates, photo
                verification, and comprehensive analytics to ensure maximum ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Request Monitoring</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Link href="/billboards">View Billboards</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Monitoring Features</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete transparency and accountability for your advertising investment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">How It Works</h2>
              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    step: "1",
                    title: "Campaign Launch",
                    description: "Your campaign goes live at the scheduled date and time.",
                  },
                  {
                    step: "2",
                    title: "Photo Verification",
                    description: "Receive installation photos within 24-48 hours of launch.",
                  },
                  {
                    step: "3",
                    title: "Ongoing Monitoring",
                    description: "Regular site visits and photo updates throughout the campaign.",
                  },
                  {
                    step: "4",
                    title: "Performance Reports",
                    description: "Weekly or monthly reports with analytics and insights.",
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

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 sm:p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Track Your Campaign with Confidence</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Get complete visibility into your outdoor advertising campaigns with our monitoring services.
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
