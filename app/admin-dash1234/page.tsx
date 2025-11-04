"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Edit, Trash2, Search, Plus } from "lucide-react"
import { getAllBillboards, deleteBillboard, type Billboard } from "@/lib/billboard-storage"
import { cn } from "@/lib/utils"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [billboards, setBillboards] = useState<Billboard[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      setBillboards(getAllBillboards())
    } else {
      router.push("/admin-dash1234/login")
    }
  }, [router])

  const filteredBillboards = billboards.filter(
    (billboard) =>
      billboard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      billboard.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      billboard.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this billboard?")) {
      const success = deleteBillboard(id)
      if (success) {
        setBillboards(getAllBillboards())
        alert("Billboard deleted successfully!")
      } else {
        alert("Failed to delete billboard")
      }
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

        <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">All Billboards</h2>
              <p className="text-sm text-muted-foreground">Manage your billboard inventory</p>
            </div>
            <Button asChild className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200">
              <Link href="/admin-dash1234/billboards/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Billboard
              </Link>
            </Button>
          </div>

          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search billboards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 sm:h-12"
              />
            </div>
          </Card>

          <div className="grid gap-4 sm:gap-6">
            {filteredBillboards.map((billboard) => (
              <Card key={billboard.id} className="p-4 sm:p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="relative w-full md:w-48 h-32 sm:h-36 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={billboard.image || "/placeholder.svg"}
                      alt={billboard.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-2">
                        <h3 className="text-lg sm:text-xl font-bold">{billboard.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            {billboard.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {billboard.size}
                          </Badge>
                          {billboard.featured && <Badge className="bg-primary text-xs">Featured</Badge>}
                          <Badge
                            variant={billboard.availability === "Available Now" ? "default" : "secondary"}
                            className={cn("text-xs", billboard.availability === "Available Now" ? "bg-accent" : "")}
                          >
                            {billboard.availability}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none bg-transparent">
                          <Link href={`/admin-dash1234/billboards/${billboard.id}/edit`}>
                            <Edit className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(billboard.id)}
                          className="flex-1 sm:flex-none text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 sm:mr-1" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{billboard.location}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{billboard.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredBillboards.length === 0 && (
            <Card className="p-8 sm:p-12 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">No billboards found matching your search.</p>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
