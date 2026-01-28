"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { truncateText } from "@/lib/utils"
import { getAllBillboards, getAllCategories, type Billboard, type Category } from "@/lib/outdoors-api"

export default function BillboardsPage() {
  const [billboards, setBillboards] = useState<Billboard[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [selectedCategory])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [billboardsData, categoriesData] = await Promise.all([
        getAllBillboards(null, selectedCategory === "all" ? undefined : parseInt(selectedCategory)),
        getAllCategories(null)
      ])
      setBillboards(billboardsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading billboards:", error)
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

  const getLocation = (billboard: Billboard) => {
    const parts = []
    if (billboard.area_name) parts.push(billboard.area_name)
    if (billboard.state_name) parts.push(billboard.state_name)
    return parts.join(", ") || billboard.address || "Nigeria"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        <Breadcrumbs />
        <section className="py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Browse All Billboards</h1>
              <p className="text-xl text-muted-foreground">Discover premium billboard locations across Nigeria</p>
            </div>

            <div className="max-w-7xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {billboards.length} billboards
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Filter by Type:</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.category_id} value={cat.category_id.toString()}>
                          {cat.name} {cat.product_count ? `(${cat.product_count})` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading billboards...</p>
                </div>
              </div>
            ) : billboards.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No billboards found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {billboards.map((billboard) => (
                  <Card
                    key={billboard.product_id}
                    className="overflow-hidden border-2 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group hover:border-primary/50 hover:-translate-y-2"
                  >
                    <div className="relative h-64">
                      <Image
                        src={getImageUrl(billboard)}
                        alt={billboard.name || billboard.title || "Billboard"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        unoptimized
                      />
                    </div>
                    <div className="p-8">
                      <Badge variant="outline" className="mb-4 transition-colors duration-300 ease-in-out">
                        {billboard.category_name || "Billboard"}
                      </Badge>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 ease-in-out">
                        {billboard.name || billboard.title || "Untitled Billboard"}
                      </h3>
                      <p className="text-muted-foreground mb-6">{getLocation(billboard)}</p>
                      <div className="flex flex-col items-start gap-4">
                        {billboard.long_desc && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {truncateText(billboard.long_desc.replace(/<[^>]*>/g, ''), 20)}
                          </p>
                        )}
                        {billboard.size && (
                          <p className="text-sm font-medium text-primary">Size: {billboard.size}</p>
                        )}
                        <Button asChild className="transition-all duration-300 ease-in-out hover:scale-105 w-full">
                          <Link href={`/billboards/${billboard.product_id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
