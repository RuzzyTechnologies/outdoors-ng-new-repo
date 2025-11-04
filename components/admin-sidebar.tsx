"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, ImageIcon, Plus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin-dash1234",
      icon: LayoutDashboard,
    },
    {
      title: "All Billboards",
      href: "/admin-dash1234",
      icon: ImageIcon,
    },
    {
      title: "Add New Billboard",
      href: "/admin-dash1234/billboards/new",
      icon: Plus,
    },
  ]

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminAuth")
      router.push("/admin-dash1234/login")
    }
  }

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-center mb-3">
          <div className="relative w-32 h-12">
            <Image src="/images/outdoors-logo.png" alt="Outdoors.ng Logo" fill className="object-contain" priority />
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  )
}
