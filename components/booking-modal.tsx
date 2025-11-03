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
    console.log("Booking submitted:", formData)
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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-none"
        style={{
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <div
          className="bg-background rounded-lg sm:rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto pointer-events-auto border-2 border-border"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: "scaleIn 0.3s ease-in-out",
          }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-start sm:items-center justify-between z-10 gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold truncate">Book Billboard</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                {billboardTitle} - {billboardLocation}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-muted transition-colors duration-200 ease-in-out flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary h-11 sm:h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">
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
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary h-11 sm:h-12 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base">
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
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary h-11 sm:h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm sm:text-base">
                  Company Name
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company Ltd"
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary h-11 sm:h-12 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm sm:text-base">
                  Campaign Start Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary h-11 sm:h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm sm:text-base">
                  Campaign End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary h-11 sm:h-12 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm sm:text-base">
                Additional Information
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your campaign, target audience, or any special requirements..."
                rows={4}
                className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary resize-none text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 transition-all duration-200 ease-in-out hover:scale-105 bg-transparent h-11 sm:h-12 text-base order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 transition-all duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-lg h-11 sm:h-12 text-base order-1 sm:order-2"
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
