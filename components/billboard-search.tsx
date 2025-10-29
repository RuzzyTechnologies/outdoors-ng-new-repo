"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Zap, MapPin, Monitor, Building2, Radio, Layers, Tv } from "lucide-react"

export function BillboardSearch() {
  const [billboardType, setBillboardType] = useState("")
  const [state, setState] = useState("")
  const [area, setArea] = useState("")

  const billboardTypes = [
    { name: "Unipole", icon: Radio },
    { name: "Gantry", icon: Building2 },
    { name: "LED Billboard", icon: Monitor },
    { name: "Wall Drape", icon: Layers },
    { name: "Bridge Panel", icon: Building2 },
    { name: "Rooftop Billboard", icon: Building2 },
    { name: "Digital Screen", icon: Tv },
    { name: "Bus Shelter", icon: MapPin },
  ]

  const states = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Benin City"]

  return (
    <section className="py-32 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-float-3d animate-blob-morph animate-glow-pulse" />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-float-3d animate-blob-morph"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance leading-tight">
            Find Your Perfect <span className="text-gradient-static">Billboard</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Search from over <span className="text-primary font-bold">2,000+ premium locations</span> across Nigeria
          </p>
        </div>

        <Card className="max-w-5xl mx-auto p-8 sm:p-10 glass-effect-strong hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 border-2 hover:border-primary/40 animate-scale-in hover-border-glow card-shine">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-3">
              <Label htmlFor="billboard-type" className="text-foreground font-semibold text-base">
                Billboard Type
              </Label>
              <Select value={billboardType} onValueChange={setBillboardType}>
                <SelectTrigger
                  id="billboard-type"
                  className="hover:border-primary/50 transition-all h-12 text-base hover:shadow-lg hover:shadow-primary/10 hover-magnetic"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {billboardTypes.map((type) => (
                    <SelectItem
                      key={type.name}
                      value={type.name.toLowerCase()}
                      className="hover:bg-primary/10 cursor-pointer transition-all hover:translate-x-1"
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="state" className="text-foreground font-semibold text-base">
                State
              </Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger
                  id="state"
                  className="hover:border-primary/50 transition-all h-12 text-base hover:shadow-lg hover:shadow-primary/10 hover-magnetic"
                >
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem
                      key={s}
                      value={s.toLowerCase()}
                      className="hover:bg-primary/10 cursor-pointer transition-all hover:translate-x-1"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="area" className="text-foreground font-semibold text-base">
                Area
              </Label>
              <Input
                id="area"
                placeholder="Enter area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="hover:border-primary/50 transition-all focus:ring-2 focus:ring-primary/30 h-12 text-base hover:shadow-lg hover:shadow-primary/10 hover-magnetic"
              />
            </div>
          </div>

          <Button
            className="w-full group hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] text-lg py-7 font-bold animate-pulse-glow hover-magnetic card-shine relative overflow-hidden"
            size="lg"
          >
            <Search className="mr-3 h-5 w-5 group-hover:scale-125 transition-transform" />
            Search Billboards
            <Zap className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform animate-bounce-subtle" />
          </Button>
        </Card>

        <div className="mt-24 max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">Popular Billboard Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
            {billboardTypes.map((type, index) => (
              <Card
                key={type.name}
                className="p-6 text-center hover:border-primary transition-all duration-500 cursor-pointer group hover-lift-3d hover-glow relative overflow-hidden card-shine animate-scale-in"
                style={{ "--index": index, animationDelay: `${index * 75}ms` } as React.CSSProperties}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg animate-depth-pulse hover-magnetic">
                    <type.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {type.name}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto stagger-children">
          <div className="relative rounded-2xl overflow-hidden group hover-lift-3d cursor-pointer card-shine border-2 border-border hover:border-primary/50 transition-all duration-500">
            <img
              src="/digital-led-billboard-screen-displaying-colorful-a.jpg"
              alt="Digital LED Billboard"
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 group-hover:from-black/80 transition-all duration-500">
              <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                <h4 className="text-white font-bold text-xl mb-1">LED Billboards</h4>
                <p className="text-white/80 text-sm">Dynamic digital displays</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group hover-lift-3d cursor-pointer card-shine border-2 border-border hover:border-primary/50 transition-all duration-500">
            <img
              src="/large-gantry-billboard-structure-over-highway-with.jpg"
              alt="Gantry Billboard"
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 group-hover:from-black/80 transition-all duration-500">
              <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                <h4 className="text-white font-bold text-xl mb-1">Gantry Structures</h4>
                <p className="text-white/80 text-sm">High-traffic highway locations</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group hover-lift-3d cursor-pointer card-shine border-2 border-border hover:border-primary/50 transition-all duration-500">
            <img
              src="/tall-unipole-billboard-tower-with-advertising-in-u.jpg"
              alt="Unipole Billboard"
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 group-hover:from-black/80 transition-all duration-500">
              <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                <h4 className="text-white font-bold text-xl mb-1">Unipole Towers</h4>
                <p className="text-white/80 text-sm">Maximum visibility reach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
