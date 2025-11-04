"use client"

import { useState, useEffect } from "react"
import {
  getAllProducts,
  getAllCategories,
  deleteProduct,
  type Product,
  type ProductCategory,
} from "@/lib/admin-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Star } from "lucide-react"

export default function ViewProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])

  useEffect(() => {
    setProducts(getAllProducts())
    setCategories(getAllCategories())
  }, [])

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown"
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      if (deleteProduct(id)) {
        setProducts(getAllProducts())
        alert("Product deleted successfully!")
      }
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">View and manage all products</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {product.name}
                    {product.featured && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                  </CardTitle>
                  <CardDescription>{getCategoryName(product.categoryId)}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">₦{product.price.toLocaleString()}</Badge>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No products found. Add your first product to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
