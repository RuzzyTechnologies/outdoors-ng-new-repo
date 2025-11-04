"use client"

import { useState, useEffect } from "react"
import { getAllProducts, type Product } from "@/lib/admin-storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export default function FeaturedProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const allProducts = getAllProducts()
    setProducts(allProducts.filter((p) => p.featured))
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Featured Products</h1>
        <p className="text-muted-foreground">View all featured products</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {product.name}
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">₦{product.price.toLocaleString()}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No featured products found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
