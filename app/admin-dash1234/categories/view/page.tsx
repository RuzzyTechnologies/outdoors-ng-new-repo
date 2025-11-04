"use client"

import { useState, useEffect } from "react"
import { getAllCategories, deleteCategory, type ProductCategory } from "@/lib/admin-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export default function ViewCategoriesPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([])

  useEffect(() => {
    setCategories(getAllCategories())
  }, [])

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      if (deleteCategory(id)) {
        setCategories(getAllCategories())
        alert("Category deleted successfully!")
      }
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Categories</h1>
        <p className="text-muted-foreground">View and manage all product categories</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No categories found. Add your first category to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
