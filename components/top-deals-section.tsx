"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { getAllBillboards, type Billboard } from "@/lib/outdoors-api"

export function TopDealsSection() {
  const [deals, setDeals] = useState<Billboard[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDeals()
  }, [])

  const loadDeals = async () => {
    setIsLoading(true)
    try {
      const billboards = await getAllBillboards(null)
      // Get first 6 billboards as top deals
      setDeals(billboards.slice(0, 6))
    } catch (error) {
      console.error("Error loading deals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getImageUrl = (billboard: Billboard) => {
    if (billboard.image_url) {
      return billboard.image_url.startsWith('http')
        ? billboard.image_url
        : `/api/images/${billboard.image_url}`
    }
    if (billboard.default_image) {
      return `/api/images/${billboard.default_image}`
    }
    return `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(billboard.category_name || 'Billboard')}`
  }

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading top deals...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OUR TOP OUT-OF-HOME DEALS</h2>
            <p className="text-lg text-muted-foreground">A quick view of our best outdoors deals</p>
          </div>

          {deals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No billboards available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal) => (
                <Card key={deal.product_id} className="overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative h-64">
                    <Image
                      src={getImageUrl(deal)}
                      alt={deal.name || deal.title || "Billboard"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {deal.category_name && (
                        <Badge className="bg-primary text-primary-foreground">{deal.category_name}</Badge>
                      )}
                      {deal.status === "available" && (
                        <Badge className="bg-green-600 text-white">Available</Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4 line-clamp-2">{deal.name || deal.title || "Untitled Billboard"}</h3>
                    <Button className="w-full bg-transparent" variant="outline" asChild>
                      <Link href={`/billboards/${deal.product_id}`}>View Details</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/billboards">View All Billboards</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
