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
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { addBillboard } from "@/lib/billboard-storage"

export default function NewBillboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin-dash1234/login")
    }
  }, [router])

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    size: "",
    availability: "Available Now",
    description: "",
    featured: false,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setPreviewImages([...previewImages, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const mainImage = previewImages[0] || "/placeholder.svg?height=400&width=600"

      const billboard = await addBillboard({
        ...formData,
        image_url: mainImage,
        status: "available",
      })

      if (billboard) {
        alert("Billboard added successfully!")
        router.push("/admin-dash1234")
      } else {
        alert("Failed to add billboard. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error adding billboard:", error)
      alert("Failed to add billboard. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm">
                        Billboard Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., BRT Billboard In Ikeja, Lagos"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm">
                        Location *
                      </Label>
                      <Input
                        id="location"
                        placeholder="e.g., Ikeja, Lagos"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-sm">
                        Billboard Type *
                      </Label>
                      <Input
                        id="type"
                        placeholder="e.g., BRT Billboard, LED Billboard"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size" className="text-sm">
                        Size *
                      </Label>
                      <Input
                        id="size"
                        placeholder="e.g., 48 Sheet, LED Screen"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability" className="text-sm">
                      Availability *
                    </Label>
                    <Input
                      id="availability"
                      placeholder="e.g., Available Now, Coming Soon"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      required
                      className="h-10 sm:h-11"
                    />
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

                  <div className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg">
                    <div>
                      <Label htmlFor="featured" className="cursor-pointer text-sm">
                        Featured Billboard
                      </Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Display this billboard as featured</p>
                    </div>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
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
