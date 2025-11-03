"use client" // Convert to client component to manage modal state

import { useState } from "react" // Import useState for modal state
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { BookingModal } from "@/components/booking-modal" // Import BookingModal component
import Image from "next/image"
import { MapPin, Eye, Share2 } from "lucide-react"

export default function BillboardDetailPage({ params }: { params: { id: string } }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        <Breadcrumbs />
        <div className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <div>
                <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6 sm:mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-border hover:border-primary/50">
                  <Image
                    src="/brt-billboard-lagos-nigeria.jpg"
                    alt="Billboard"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="relative h-20 sm:h-24 md:h-28 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border-2 border-border hover:border-primary/50 cursor-pointer hover:-translate-y-1"
                    >
                      <Image
                        src="/brt-billboard-lagos-nigeria.jpg"
                        alt={`Billboard view ${i}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Badge className="bg-primary shadow-md text-xs sm:text-sm">Featured</Badge>
                  <Badge variant="outline" className="transition-colors duration-300 ease-in-out text-xs sm:text-sm">
                    BRT Billboard
                  </Badge>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                  BRT Billboard In Ikeja, Lagos
                </h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span>Ikeja, Lagos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span>1,234 views</span>
                  </div>
                </div>

                <div className="mb-8 sm:mb-10">
                  <h3 className="font-bold text-base sm:text-lg mb-3">Description</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Prime billboard location along the busy BRT corridor in Ikeja. High visibility with thousands of
                    daily commuters passing by. Perfect for brand awareness campaigns targeting Lagos residents. This
                    strategic position offers unparalleled exposure to a diverse audience throughout the day.
                  </p>
                </div>

                <Card className="p-6 sm:p-8 mb-8 sm:mb-10 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border-2 hover:border-primary/30">
                  <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">Billboard Details</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30 text-sm sm:text-base">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-semibold">BRT Billboard</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30 text-sm sm:text-base">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-semibold">48 Sheet</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30 text-sm sm:text-base">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-semibold">Ikeja, Lagos</span>
                    </div>
                    <div className="flex justify-between py-2 transition-colors duration-300 ease-in-out text-sm sm:text-base">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-semibold text-accent">Available Now</span>
                    </div>
                  </div>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    className="flex-1 transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg h-12 sm:h-14 text-base sm:text-lg"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    Book Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg bg-transparent sm:w-auto w-full sm:flex-none h-12 sm:h-14"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        billboardTitle="BRT Billboard In Ikeja, Lagos"
        billboardLocation="Ikeja, Lagos"
      />
    </div>
  )
}
