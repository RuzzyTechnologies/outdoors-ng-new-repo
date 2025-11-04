"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, ImageIcon, Plus, LogOut, MapPin, ChevronDown, ChevronRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    location: false,
    vas: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminAuth")
      router.push("/admin-dash1234/login")
    }
  }

  const isActive = (href: string) => pathname === href

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-card border-r border-border flex flex-col z-40">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-center mb-3">
          <div className="relative w-32 h-12">
            <Image src="/images/outdoors-logo.png" alt="Outdoors.ng Logo" fill className="object-contain" priority />
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center font-medium">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Dashboard */}
        <Link
          href="/admin-dash1234"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            isActive("/admin-dash1234")
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-muted text-foreground hover:text-foreground",
          )}
        >
          <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap">Dashboard</span>
        </Link>

        {/* Billboards Section */}
        <Link
          href="/admin-dash1234"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            isActive("/admin-dash1234")
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-muted text-foreground hover:text-foreground",
          )}
        >
          <ImageIcon className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap">All Billboards</span>
        </Link>

        <Link
          href="/admin-dash1234/billboards/new"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            isActive("/admin-dash1234/billboards/new")
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-muted text-foreground hover:text-foreground",
          )}
        >
          <Plus className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap">Add New Billboard</span>
        </Link>

        {/* Location Section */}
        <div className="space-y-1 pt-2">
          <button
            onClick={() => toggleSection("location")}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-muted text-foreground"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">Location</span>
            </div>
            {openSections.location ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            )}
          </button>
          {openSections.location && (
            <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <Link
                href="/admin-dash1234/locations/all"
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all text-sm font-normal",
                  isActive("/admin-dash1234/locations/all")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                All State
              </Link>
              <Link
                href="/admin-dash1234/locations/add-state"
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all text-sm font-normal",
                  isActive("/admin-dash1234/locations/add-state")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Add State
              </Link>
              <Link
                href="/admin-dash1234/locations/add-area"
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all text-sm font-normal",
                  isActive("/admin-dash1234/locations/add-area")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Add State Area
              </Link>
            </div>
          )}
        </div>

        {/* VAS Section */}
        <div className="space-y-1">
          <button
            onClick={() => toggleSection("vas")}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-muted text-foreground"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Activity className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">VAS</span>
            </div>
            {openSections.vas ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            )}
          </button>
          {openSections.vas && (
            <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <Link
                href="/admin-dash1234/vas/monitoring"
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all text-sm font-normal",
                  isActive("/admin-dash1234/vas/monitoring")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Monitoring
              </Link>
              <Link
                href="/admin-dash1234/vas/paid-monitoring"
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all text-sm font-normal",
                  isActive("/admin-dash1234/vas/paid-monitoring")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Paid Outdoor Monitoring
              </Link>
              <Link
                href="/admin-dash1234/vas/printing"
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all text-sm font-normal",
                  isActive("/admin-dash1234/vas/printing")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Orders on Printing
              </Link>
              <Link
                href="/admin-dash1234/vas/installation"
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all text-sm font-normal",
                  isActive("/admin-dash1234/vas/installation")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Orders on Installation
              </Link>
              <Link
                href="/admin-dash1234/vas/deployment"
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all text-sm font-normal",
                  isActive("/admin-dash1234/vas/deployment")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Orders on Deployment
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent text-sm" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  )
}

export default AdminSidebar
