import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: January 2025</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. What Are Cookies</h2>
            <p className="mb-4">
              Cookies are small text files stored on your device when you visit our website. They help us provide you
              with a better experience.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies to remember your preferences, analyze site traffic, and improve our services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Managing Cookies</h2>
            <p className="mb-4">
              You can control and manage cookies through your browser settings. Note that disabling cookies may affect
              site functionality.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Contact</h2>
            <p className="mb-4">Questions about our cookie policy? Contact us at info@outdoors.ng</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
