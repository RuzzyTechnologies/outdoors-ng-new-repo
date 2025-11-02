import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BillboardSearch } from "@/components/billboard-search"
import { ClientShowcase } from "@/components/client-showcase"
import { VideoSection } from "@/components/video-section"
import { AboutSection } from "@/components/about-section"
import { Stats } from "@/components/stats"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BillboardSearch />
        <ClientShowcase />
        <VideoSection />
        <AboutSection />
        <Stats />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
