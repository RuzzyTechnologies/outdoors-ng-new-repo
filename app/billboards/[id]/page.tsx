"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { BookingModal } from "@/components/booking-modal"
import Image from "next/image"
import { MapPin, Maximize, Share2 } from "lucide-react"
import { getBillboardById, type Billboard } from "@/lib/outdoors-api"

export default function BillboardDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [billboard, setBillboard] = useState<Billboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadBillboard()
  }, [params.id])

  const loadBillboard = async () => {
    setIsLoading(true)
    try {
      const data = await getBillboardById(parseInt(params.id), null)
      if (data) {
        setBillboard(data)
      } else {
        router.push("/billboards")
      }
    } catch (error) {
      console.error("Error loading billboard:", error)
      router.push("/billboards")
    } finally {
      setIsLoading(false)
    }
  }

  const getImageUrl = (imageName?: string) => {
    if (!imageName) {
      return `https://placehold.co/800x600/e2e8f0/64748b?text=${encodeURIComponent(billboard?.category_name || 'Billboard')}`
    }
    return imageName.startsWith('http') ? imageName : `/api/images/${imageName}`
  }

  const getImages = () => {
    if (!billboard) return []
    if (billboard.images && billboard.images.length > 0) {
      return billboard.images
    }
    if (billboard.image_url || billboard.default_image) {
      return [billboard.image_url || billboard.default_image || '']
    }
    return []
  }

  const getLocation = () => {
    if (!billboard) return ""
    const parts = []
    if (billboard.area_name) parts.push(billboard.area_name)
    if (billboard.state_name) parts.push(billboard.state_name)
    return parts.join(", ") || billboard.address || "Nigeria"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 sm:pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading billboard details...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!billboard) {
    return null
  }

  const images = getImages()
  const currentImage = images[selectedImage] || images[0]

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
                    src={getImageUrl(currentImage)}
                    alt={billboard.name || billboard.title || "Billboard"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                    unoptimized
                  />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {images.slice(0, 3).map((image, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative h-20 sm:h-24 md:h-28 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border-2 cursor-pointer hover:-translate-y-1 ${
                          selectedImage === i ? 'border-primary' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Image
                          src={getImageUrl(image)}
                          alt={`Billboard view ${i + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Badge variant="outline" className="transition-colors duration-300 ease-in-out text-xs sm:text-sm">
                    {billboard.category_name || "Billboard"}
                  </Badge>
                  {billboard.status === "available" && (
                    <Badge className="bg-green-600 shadow-md text-xs sm:text-sm">Available</Badge>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                  {billboard.name || billboard.title || "Untitled Billboard"}
                </h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span>{getLocation()}</span>
                  </div>
                  {billboard.size && (
                    <div className="flex items-center gap-2">
                      <Maximize className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>{billboard.size}</span>
                    </div>
                  )}
                </div>

                {billboard.price && billboard.price > 0 && (
                  <div className="mb-6 sm:mb-8">
                    <div className="text-3xl sm:text-4xl font-bold text-primary">
                      ₦{billboard.price.toLocaleString()}
                      <span className="text-base sm:text-lg text-muted-foreground font-normal ml-2">per period</span>
                    </div>
                  </div>
                )}

                <div className="mb-8 sm:mb-10">
                  <h3 className="font-bold text-base sm:text-lg mb-3">Description</h3>
                  <div
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: billboard.long_desc || billboard.short_desc || billboard.description || "No description available."
                    }}
                  />
                </div>

                <Card className="p-6 sm:p-8 mb-8 sm:mb-10 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border-2 hover:border-primary/30">
                  <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">Billboard Details</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30 text-sm sm:text-base">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-semibold">{billboard.category_name || "Billboard"}</span>
                    </div>
                    {billboard.size && (
                      <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30 text-sm sm:text-base">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="font-semibold">{billboard.size}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30 text-sm sm:text-base">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-semibold">{getLocation()}</span>
                    </div>
                    {billboard.address && (
                      <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30 text-sm sm:text-base">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="font-semibold text-right">{billboard.address}</span>
                      </div>
                    )}
                    {billboard.gps_location && (
                      <div className="flex justify-between py-2 border-b border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/30 text-sm sm:text-base">
                        <span className="text-muted-foreground">GPS:</span>
                        <span className="font-semibold text-right">{billboard.gps_location}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 transition-colors duration-300 ease-in-out text-sm sm:text-base">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-semibold text-green-600">Available Now</span>
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
        billboardTitle={billboard.name || billboard.title || ""}
        billboardLocation={getLocation()}
      />
    </div>
  )
}
