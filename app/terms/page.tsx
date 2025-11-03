import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: January 2025</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Outdoors.ng services, you accept and agree to be bound by these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Services</h2>
            <p className="mb-4">
              You agree to use our services only for lawful purposes and in accordance with these Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Booking and Payment</h2>
            <p className="mb-4">
              All billboard bookings are subject to availability. Payment terms will be provided upon booking
              confirmation.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Contact</h2>
            <p className="mb-4">For questions about these Terms, contact us at info@outdoors.ng</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
