"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Layers, Navigation } from "lucide-react"

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
    <section id="search" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px]">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Search form */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                  <Search className="h-4 w-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">Location Finder</span>
                </div>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-black">
                  Find Your
                  <br />
                  <span className="text-primary">Perfect Spot</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-xl">
                  Search through 2,000+ premium billboard locations across Nigeria
                </p>
              </div>

              <Card className="p-8 border-2 border-gray-200 bg-gray-50/50">
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billboard-type" className="text-sm font-bold uppercase tracking-wider">
                        Billboard Type
                      </Label>
                      <Select value={billboardType} onValueChange={setBillboardType}>
                        <SelectTrigger id="billboard-type" className="h-14 border-2">
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

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-bold uppercase tracking-wider">
                        State
                      </Label>
                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger id="state" className="h-14 border-2">
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-sm font-bold uppercase tracking-wider">
                      Area / Location
                    </Label>
                    <Input
                      id="area"
                      placeholder="e.g., Lekki, Victoria Island"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="h-14 border-2"
                    />
                  </div>

                  <Button className="w-full h-14 text-base bg-black hover:bg-black/90 text-white font-bold" size="lg">
                    <Search className="mr-2 h-5 w-5" />
                    Search Locations
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { icon: MapPin, label: "2,000+ Locations", color: "bg-primary" },
              { icon: Layers, label: "30+ Types", color: "bg-black" },
              { icon: Navigation, label: "36 States", color: "bg-primary" },
              { icon: Search, label: "Smart Search", color: "bg-black" },
            ].map((item, index) => (
              <Card
                key={index}
                className={`${item.color} text-white p-8 border-0 hover:scale-105 transition-transform cursor-pointer ${
                  index === 0 ? "col-span-2" : ""
                }`}
              >
                <item.icon className="h-8 w-8 mb-4 opacity-80" />
                <p className="text-lg font-bold">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
