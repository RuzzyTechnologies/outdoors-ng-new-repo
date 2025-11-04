"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { addStateArea, getAllStates, type State } from "@/lib/admin-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function AddStateAreaPage() {
  const router = useRouter()
  const [states, setStates] = useState<State[]>([])
  const [formData, setFormData] = useState({
    stateId: 0,
    name: "",
    description: "",
  })

  useEffect(() => {
    setStates(getAllStates())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.stateId === 0) {
      alert("Please select a state")
      return
    }
    addStateArea(formData)
    alert("State area added successfully!")
    router.push("/admin-dash1234/locations/all")
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add State Area</h1>
        <p className="text-muted-foreground">Add a new area within a state</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Area Information</CardTitle>
          <CardDescription>Enter the details of the new state area</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, stateId: Number.parseInt(value) })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.id} value={state.id.toString()}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Area Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Ikeja"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the area"
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Add Area
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
