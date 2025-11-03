"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-primary/10 transition-all duration-300"
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-full text-primary hover:bg-primary/10 hover:text-primary transition-all duration-500 ease-in-out hover-magnetic relative overflow-hidden group"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-700 ease-in-out dark:-rotate-90 dark:scale-0 absolute" />
      <Moon className="h-5 w-5 rotate-90 scale-0 transition-all duration-700 ease-in-out dark:rotate-0 dark:scale-100 absolute" />
      <span className="sr-only">Toggle theme</span>
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out blur-xl" />
    </Button>
  )
}
