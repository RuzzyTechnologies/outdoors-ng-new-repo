"use client"

import { Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface AdminHeaderProps {
  onMenuClick?: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-background sticky top-0 z-30 backdrop-blur-sm">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-lg sm:text-xl font-bold">Billboard Management</h1>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Manage your billboard inventory</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
