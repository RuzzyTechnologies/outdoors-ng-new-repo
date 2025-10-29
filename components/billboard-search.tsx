"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function BillboardSearch() {
  const [billboardType, setBillboardType] = useState("")
  const [state, setState] = useState("")
  const [area, setArea] = useState("")

  const billboardTypes = [
    "Unipole",
    "Gantry",
    "LED Billboard",
    "Wall Drape",
    "Bridge Panel",
    "Rooftop",
    "Digital Screen",
    "Bus Shelter",
  ]

  const states = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Benin City"]

  return (
    <section id="search" className="py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">Find Your Space</p>
          <h2 className="text-6xl lg:text-7xl font-serif font-bold text-balance">
            Search <span className="italic text-primary">Locations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium billboard placements across Nigeria's major cities and highways
          </p>
        </div>

        <Card className="p-8 lg:p-12 border-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-3">
              <Label htmlFor="billboard-type" className="text-sm uppercase tracking-wider font-medium">
                Billboard Type
              </Label>
              <Select value={billboardType} onValueChange={setBillboardType}>
                <SelectTrigger id="billboard-type" className="h-14 rounded-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {billboardTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="state" className="text-sm uppercase tracking-wider font-medium">
                State
              </Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger id="state" className="h-14 rounded-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s} value={s.toLowerCase()}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="area" className="text-sm uppercase tracking-wider font-medium">
                Area
              </Label>
              <Input
                id="area"
                placeholder="Enter area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="h-14 rounded-full"
              />
            </div>
          </div>

          <Button className="w-full h-14 text-base rounded-full" size="lg">
            <Search className="mr-2 h-5 w-5" />
            Search Billboards
          </Button>
        </Card>

        {/* Billboard type showcase */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {billboardTypes.slice(0, 4).map((type, index) => (
            <div
              key={type}
              className="text-center p-8 rounded-2xl border-2 hover:border-primary transition-colors cursor-pointer group"
            >
              <p className="text-6xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors mb-4">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="font-semibold text-lg">{type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
