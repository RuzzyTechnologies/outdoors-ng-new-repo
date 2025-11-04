"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  return (
    <header className="h-16 border-b border-border bg-background sticky top-0 z-40 backdrop-blur-sm">
      <div className="h-full px-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Billboard Management</h1>
          <p className="text-sm text-muted-foreground">Manage your billboard inventory</p>
        </div>

        <div className="flex items-center gap-4">
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
