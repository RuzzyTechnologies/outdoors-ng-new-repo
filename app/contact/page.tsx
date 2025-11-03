import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 sm:pt-20">
        <Breadcrumbs />
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-black to-gray-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 text-balance leading-tight">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 text-balance leading-relaxed px-4">
                Ready to elevate your brand with outdoor advertising? Contact us today to discuss your campaign.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Contact Information</h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Reach out to us through any of the following channels. We're here to help you succeed.
                  </p>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold mb-1 text-sm sm:text-base">Email</h3>
                      <p className="text-sm sm:text-base text-muted-foreground break-words">info@outdoors.ng</p>
                      <p className="text-sm sm:text-base text-muted-foreground break-words">support@outdoors.ng</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold mb-1 text-sm sm:text-base">Phone</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">+234 (0) 123 456 7890</p>
                      <p className="text-sm sm:text-base text-muted-foreground">+234 (0) 987 654 3210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold mb-1 text-sm sm:text-base">Office</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 sm:pt-8">
                  <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Business Hours</h3>
                  <div className="space-y-2 text-sm sm:text-base text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Send us a Message</h3>
                <form className="space-y-5 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base">
                      Full Name
                    </Label>
                    <Input id="name" placeholder="John Doe" className="h-11 sm:h-12 text-base" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email Address
                    </Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="h-11 sm:h-12 text-base" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base">
                      Phone Number
                    </Label>
                    <Input id="phone" type="tel" placeholder="+234 123 456 7890" className="h-11 sm:h-12 text-base" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm sm:text-base">
                      Subject
                    </Label>
                    <Input id="subject" placeholder="Campaign Inquiry" className="h-11 sm:h-12 text-base" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm sm:text-base">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your advertising needs..."
                      className="min-h-[120px] sm:min-h-[150px] text-base"
                    />
                  </div>

                  <Button className="w-full h-11 sm:h-12 text-base" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
