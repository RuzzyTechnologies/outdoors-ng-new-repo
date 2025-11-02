"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Layers, Navigation, Sparkles } from "lucide-react"

export function BillboardSearch() {
  const [billboardType, setBillboardType] = useState("")
  const [state, setState] = useState("")
  const [area, setArea] = useState("")

  const billboardTypes = [
    "All",
    "Unipole",
    "Gantry",
    "LED Billboard",
    "Wall Drape",
    "Lamp Post",
    "Roof Top",
    "Trivision/Ultrawave",
    "Portrait",
    "Backlit/Landscape",
    "Bridge Panel",
    "Mega Billboard",
    "Long Banner",
    "Sign Board",
    "Mobile Bill Board",
    "Large Format",
    "Glass Panel",
    "48 Sheet",
    "BRT",
    "Bulletin Board",
    "Arc Flag",
    "Ultra wave billboard",
    "Frontlit Billboard",
    "Building Wrap",
    "Car park roof Gantry",
    "Car Display",
    "Airport digital signage",
    "Tower Branding",
    "Led Lamp post billboard",
    "Portrait Led billboard",
    "Revolving Portrait Billboard",
    "Unipole LED Billboard",
    "96 Sheet Billboard",
    "Static Light Box Lamp Post Billboard",
  ]

  const states = [
    "Abia",
    "Abuja",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross Rivers",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Ilorin",
    "Imo",
    "Jigawa",
    "Jos",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nassarawa",
    "Niger",
    "Ogun",
    "Ojuelegba",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Port Harcourt",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ]

  return (
    <section
      id="search"
      className="py-20 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(69,168,73,0.03)_0%,rgba(255,107,0,0.02)_50%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1400px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-widest text-accent">Location Finder</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] text-white">
                Search through
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-gradient">
                  2,000+
                </span>
                <br />
                Billboards in Nigeria
              </h2>

              <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
                Find the perfect billboard location across <span className="text-accent font-bold">36 states</span> in
                Nigeria. Search by type, location, and availability.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: "2,000+ Locations", desc: "Premium spots", color: "primary" },
                { icon: Layers, label: "30+ Types", desc: "All formats", color: "accent" },
                { icon: Navigation, label: "36 States", desc: "Nationwide", color: "primary" },
                { icon: Search, label: "Smart Search", desc: "Find instantly", color: "accent" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-${item.color}/30 transition-all duration-300`}
                >
                  <item.icon className={`h-6 w-6 text-${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <p className="text-sm font-bold text-white mb-0.5">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-transparent rounded-3xl blur-3xl" />

            <Card className="relative p-8 sm:p-10 md:p-12 border-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-2xl shadow-black/50 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="relative z-10 space-y-6 sm:space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Find Billboards</h3>
                  <p className="text-sm text-gray-400">Select your preferences to discover available locations</p>
                </div>

                <div className="space-y-5">
                  {/* Billboard Type */}
                  <div className="space-y-3 group">
                    <Label
                      htmlFor="billboard-type"
                      className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2 group-focus-within:text-primary transition-colors"
                    >
                      <Layers className="h-4 w-4 text-primary" />
                      Which do you need?
                    </Label>
                    <Select value={billboardType} onValueChange={setBillboardType}>
                      <SelectTrigger
                        id="billboard-type"
                        className="h-14 border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 focus:border-primary focus:bg-white/10 transition-all text-white backdrop-blur-sm rounded-xl"
                      >
                        <SelectValue placeholder="Select billboard type" className="text-gray-400" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10 backdrop-blur-xl max-h-[300px]">
                        {billboardTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type.toLowerCase().replace(/\s+/g, "-")}
                            className="text-white hover:bg-primary/20 focus:bg-primary/20"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* State */}
                  <div className="space-y-3 group">
                    <Label
                      htmlFor="state"
                      className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2 group-focus-within:text-primary transition-colors"
                    >
                      <Navigation className="h-4 w-4 text-primary" />
                      Select State
                    </Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger
                        id="state"
                        className="h-14 border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 focus:border-primary focus:bg-white/10 transition-all text-white backdrop-blur-sm rounded-xl"
                      >
                        <SelectValue placeholder="Select state" className="text-gray-400" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10 backdrop-blur-xl max-h-[300px]">
                        {states.map((s) => (
                          <SelectItem
                            key={s}
                            value={s.toLowerCase().replace(/\s+/g, "-")}
                            className="text-white hover:bg-primary/20 focus:bg-primary/20"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area */}
                  <div className="space-y-3 group">
                    <Label
                      htmlFor="area"
                      className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2 group-focus-within:text-primary transition-colors"
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      Select State Area
                    </Label>
                    <Select value={area} onValueChange={setArea}>
                      <SelectTrigger
                        id="area"
                        className="h-14 border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 focus:border-primary focus:bg-white/10 transition-all text-white backdrop-blur-sm rounded-xl"
                      >
                        <SelectValue placeholder="All" className="text-gray-400" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10 backdrop-blur-xl">
                        <SelectItem value="all" className="text-white hover:bg-primary/20 focus:bg-primary/20">
                          All
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className="w-full h-14 text-base bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-bold shadow-lg shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] rounded-xl mt-8 group"
                    size="lg"
                  >
                    <Search className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    Find Billboards
                  </Button>
                </div>

                <p className="text-xs text-center text-gray-500 pt-4">
                  Trusted by <span className="text-accent font-bold">500+</span> brands across Nigeria
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
