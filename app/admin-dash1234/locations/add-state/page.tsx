"use client"

import type React from "react"

import { useState } from "react"
import { addState } from "@/lib/admin-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function AddStatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addState(formData)
    alert("State added successfully!")
    router.push("/admin-dash1234/locations/all")
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New State</h1>
        <p className="text-muted-foreground">Add a new state/location to the system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>State Information</CardTitle>
          <CardDescription>Enter the details of the new state</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">State Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Lagos"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">State Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g., LAG"
                maxLength={3}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Add State
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
