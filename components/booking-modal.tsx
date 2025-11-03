"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  billboardTitle: string
  billboardLocation: string
}

export function BookingModal({ isOpen, onClose, billboardTitle, billboardLocation }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    startDate: "",
    endDate: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Booking submitted:", formData)
    // You can add API call here to submit the booking
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        style={{
          animation: "fadeIn 0.3s ease-in-out",
        }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        style={{
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <div
          className="bg-background rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto border-2 border-border"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: "scaleIn 0.3s ease-in-out",
          }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold">Book Billboard</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {billboardTitle} - {billboardLocation}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-muted transition-colors duration-200 ease-in-out"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+234 800 000 0000"
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company Ltd"
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Campaign Start Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">
                  Campaign End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your campaign, target audience, or any special requirements..."
                rows={4}
                className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 transition-all duration-200 ease-in-out hover:scale-105 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 transition-all duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-lg"
              >
                Submit Booking Request
              </Button>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}
