import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Palette, MessageSquare, Sparkles, Video, ImageIcon, FileText } from "lucide-react"

export default function CreativeCommunicationPage() {
  const services = [
    {
      icon: Palette,
      title: "Brand Identity Design",
      description: "Create distinctive brand identities that resonate with your target audience and stand out.",
    },
    {
      icon: MessageSquare,
      title: "Copywriting & Messaging",
      description: "Craft compelling messages that communicate your brand story effectively.",
    },
    {
      icon: Sparkles,
      title: "Creative Conceptualization",
      description: "Develop innovative creative concepts that capture attention and drive engagement.",
    },
    {
      icon: Video,
      title: "Video Production",
      description: "Professional video content creation for campaigns, social media, and brand storytelling.",
    },
    {
      icon: ImageIcon,
      title: "Graphics Design",
      description: "Eye-catching visual designs for billboards, digital ads, and print materials.",
    },
    {
      icon: FileText,
      title: "Content Creation",
      description: "Engaging content across all platforms that connects with your audience.",
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
                Creative Communication Services
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto">
                Transform your brand message into compelling visual stories. Our creative team brings your vision to
                life with innovative designs and strategic communication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Start Your Project</Link>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Creative Services</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                End-to-end creative solutions for all your communication needs
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

        {/* Approach Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">
                Our Creative Approach
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[
                  {
                    title: "Research & Discovery",
                    description: "Deep dive into your brand, audience, and market to inform creative direction.",
                  },
                  {
                    title: "Concept Development",
                    description: "Brainstorm and develop multiple creative concepts aligned with your goals.",
                  },
                  {
                    title: "Design & Production",
                    description: "Bring concepts to life with professional design and production quality.",
                  },
                  {
                    title: "Testing & Refinement",
                    description: "Iterate and refine based on feedback to ensure maximum impact.",
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Let's Create Something Amazing</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Partner with our creative team to develop communication that truly connects with your audience.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
