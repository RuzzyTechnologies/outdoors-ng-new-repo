import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto bg-primary text-primary-foreground p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Ready to Amplify Your Brand?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto text-pretty leading-relaxed">
            Join hundreds of successful brands using our outdoor advertising solutions. Start your campaign today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
