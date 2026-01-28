"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createBillboard, getAllCategories, getAllStates, type Category, type State } from "@/lib/outdoors-api"
import { getToken } from "@/lib/auth-storage"

export default function NewBillboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [states, setStates] = useState<State[]>([])

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    category_id: "",
    state: "",
    state_area: "",
    size: "",
    price: "",
    gps_location: "",
    description: "",
  })

  useEffect(() => {
    const token = getToken()
    if (token) {
      setIsAuthenticated(true)
      loadData(token)
    } else {
      router.push("/admin-dash1234/login")
    }
  }, [router])

  const loadData = async (token: string) => {
    try {
      const [categoriesData, statesData] = await Promise.all([
        getAllCategories(token),
        getAllStates(true, token)
      ])

      setCategories(categoriesData)
      setStates(statesData)
    } catch (error) {
      console.error("[v0] Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const token = getToken()
    if (!token) {
      alert("Authentication required. Please login again.")
      return
    }

    // Show loading state
    setIsSubmitting(true)

    try {
      const uploadedImages: string[] = []

      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          uploadedImages.push(result.filename)
          console.log(`Uploaded: ${result.filename}`)
        } else {
          const error = await response.json()
          console.error('Upload failed:', error)
          alert(`Failed to upload ${file.name}: ${error.error}`)
        }
      }

      // Update preview images with uploaded filenames
      setPreviewImages([...previewImages, ...uploadedImages.map(img => `/api/images/${img}`)])

    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload images. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = getToken()
      if (!token) {
        alert("Authentication required. Please login again.")
        router.push("/admin-dash1234/login")
        return
      }

      // Extract just the filename from preview images (remove /api/images/ prefix)
      const imageFilenames = previewImages.map(img => {
        if (img.startsWith('/api/images/')) {
          return img.replace('/api/images/', '')
        }
        if (img.startsWith('/images/')) {
          return img.replace('/images/', '')
        }
        if (img.startsWith('http')) {
          return img.split('/').pop() || ''
        }
        return img
      }).filter(Boolean)

      const mainImage = imageFilenames[0] || "placeholder.jpg"

      const billboard = await createBillboard({
        title: formData.title,
        name: formData.title,
        address: formData.address,
        location: formData.address,
        category_id: parseInt(formData.category_id) || 1,
        state: formData.state,
        state_area: formData.state_area,
        size: formData.size,
        price: parseFloat(formData.price) || 0,
        gps_location: formData.gps_location,
        description: formData.description,
        image_url: mainImage,
        images: imageFilenames,
        status: "available",
      }, token)

      if (billboard) {
        alert("Billboard added successfully!")
        router.push("/admin-dash1234")
      } else {
        alert("Failed to add billboard. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error adding billboard:", error)
      alert(`Failed to add billboard: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated || isLoading) {
    return null
  }

  const selectedState = states.find(s => s.state_id.toString() === formData.state)

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar isMobileOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <Button variant="outline" size="icon" asChild className="flex-shrink-0 bg-transparent">
                <Link href="/admin-dash1234">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Add New Billboard</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Fill in the details to add a new billboard</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">Basic Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm">
                      Billboard Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., LED Billboard at Ikeja Junction"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm">
                        Billboard Type *
                      </Label>
                      <Select
                        value={formData.category_id}
                        onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                      >
                        <SelectTrigger className="h-10 sm:h-11">
                          <SelectValue placeholder="Select billboard type" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.category_id} value={cat.category_id.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size" className="text-sm">
                        Size *
                      </Label>
                      <Input
                        id="size"
                        placeholder="e.g., 48 Sheet, 3m x 6m"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm">
                        State *
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value, state_area: "" })}
                      >
                        <SelectTrigger className="h-10 sm:h-11">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.state_id} value={state.state_id.toString()}>
                              {state.state_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area" className="text-sm">
                        Area
                      </Label>
                      <Select
                        value={formData.state_area}
                        onValueChange={(value) => setFormData({ ...formData, state_area: value })}
                        disabled={!formData.state}
                      >
                        <SelectTrigger className="h-10 sm:h-11">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedState?.areas?.map((area) => (
                            <SelectItem key={area.state_area_id} value={area.state_area_id.toString()}>
                              {area.area_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm">
                      Full Address *
                    </Label>
                    <Input
                      id="address"
                      placeholder="e.g., Along Ikeja FTF Oshodi by Local Government"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gps" className="text-sm">
                        GPS Location
                      </Label>
                      <Input
                        id="gps"
                        placeholder="e.g., 6.5592816,3.3258991,17"
                        value={formData.gps_location}
                        onChange={(e) => setFormData({ ...formData, gps_location: e.target.value })}
                        className="h-10 sm:h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm">
                        Price (₦)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the billboard location, visibility, target audience, and key features..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      className="resize-none text-sm"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 space-y-4">
                <h3 className="text-base sm:text-lg font-semibold">Billboard Images</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Upload images of the billboard (recommended: at least 3 images)
                </p>

                <div className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center hover:border-primary/50 transition-colors duration-200">
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label htmlFor="images" className="cursor-pointer">
                    <Upload className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Click to upload images</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB each</p>
                  </Label>
                </div>

                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {previewImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-24 sm:h-32 rounded-lg overflow-hidden border-2 border-border">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button type="submit" size="lg" className="flex-1 h-11 sm:h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Adding Billboard..." : "Add Billboard"}
                </Button>
                <Button type="button" variant="outline" size="lg" className="h-11 sm:h-12 bg-transparent" asChild>
                  <Link href="/admin-dash1234">Cancel</Link>
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
