"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, MapPin, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAllBillboards, deleteBillboard, getAllCategories, type Billboard, type Category } from "@/lib/outdoors-api"
import { getToken } from "@/lib/auth-storage"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [billboards, setBillboards] = useState<Billboard[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const token = getToken()
    if (token) {
      setIsAuthenticated(true)
      loadCategories(token)
      loadBillboards(token)
    } else {
      router.push("/admin-dash1234/login")
    }
  }, [router])

  const loadCategories = async (token: string) => {
    try {
      const data = await getAllCategories(token)
      setCategories(data)
    } catch (error) {
      console.error("[v0] Error loading categories:", error)
    }
  }

  const loadBillboards = async (token: string, categoryId?: number) => {
    try {
      setIsLoading(true)
      const data = await getAllBillboards(token, categoryId)
      setBillboards(data)
    } catch (error) {
      console.error("[v0] Error loading billboards:", error)
      alert("Failed to load billboards. Please check your connection to the backend API.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryFilter = (value: string) => {
    setSelectedCategory(value)
    const token = getToken()
    if (token) {
      if (value === "all") {
        loadBillboards(token)
      } else {
        loadBillboards(token, parseInt(value))
      }
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this billboard?")) {
      return
    }

    try {
      const token = getToken()
      if (!token) {
        alert("Authentication required. Please login again.")
        router.push("/admin-dash1234/login")
        return
      }

      const success = await deleteBillboard(id, token)
      if (success) {
        alert("Billboard deleted successfully!")
        loadBillboards(token, selectedCategory === "all" ? undefined : parseInt(selectedCategory))
      } else {
        alert("Failed to delete billboard")
      }
    } catch (error) {
      console.error("[v0] Error deleting billboard:", error)
      alert(`Failed to delete billboard: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const getImageUrl = (billboard: Billboard) => {
    // Try different image fields
    if (billboard.image_url) {
      return billboard.image_url.startsWith('http')
        ? billboard.image_url
        : `/api/images/${billboard.image_url}`
    }
    if (billboard.default_image) return `/api/images/${billboard.default_image}`
    if (billboard.images && billboard.images.length > 0) return `/api/images/${billboard.images[0]}`
    // Default placeholder
    return `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(billboard.category_name || 'Billboard')}`
  }

  const getBillboardTitle = (billboard: Billboard) => {
    return billboard.name || billboard.title || 'Untitled Billboard'
  }

  const getBillboardLocation = (billboard: Billboard) => {
    const parts = []
    if (billboard.area_name) parts.push(billboard.area_name)
    if (billboard.state_name) parts.push(billboard.state_name)
    else if (billboard.address) parts.push(billboard.address)
    return parts.join(', ') || 'Location not specified'
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar isMobileOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Billboards</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your billboard inventory {billboards.length > 0 && `(${billboards.length} total)`}
                </p>
              </div>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/admin-dash1234/billboards/new">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Billboard
                </Link>
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg border">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Filter by category" />
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

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading billboards...</p>
              </div>
            ) : billboards.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="mx-auto max-w-md space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">No billboards yet</h3>
                  <p className="text-muted-foreground">
                    {selectedCategory === "all"
                      ? "Get started by adding your first billboard to the system."
                      : "No billboards found in this category. Try a different filter."}
                  </p>
                  {selectedCategory === "all" && (
                    <Button asChild size="lg">
                      <Link href="/admin-dash1234/billboards/new">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Your First Billboard
                      </Link>
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {billboards.map((billboard) => (
                  <Card key={billboard.product_id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-muted">
                      <Image
                        src={getImageUrl(billboard)}
                        alt={getBillboardTitle(billboard)}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {billboard.category_name && (
                        <Badge className="absolute top-2 left-2 bg-black/70">
                          {billboard.category_name}
                        </Badge>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2">{getBillboardTitle(billboard)}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="line-clamp-1">{getBillboardLocation(billboard)}</span>
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        {billboard.size && (
                          <Badge variant="secondary">{billboard.size}</Badge>
                        )}
                        {billboard.product_status && (
                          <Badge variant="outline">{billboard.product_status}</Badge>
                        )}
                        {billboard.price && billboard.price > 0 && (
                          <Badge variant="outline">₦{billboard.price.toLocaleString()}</Badge>
                        )}
                      </div>

                      {billboard.short_desc && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {billboard.short_desc}
                        </p>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link href={`/admin-dash1234/billboards/${billboard.product_id}/edit`}>
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDelete(billboard.product_id || 0)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
