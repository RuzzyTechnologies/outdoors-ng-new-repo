import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Briefcase } from "lucide-react"

export default function CareersPage() {
  const jobs = [
    {
      title: "Sales Executive",
      location: "Lagos, Nigeria",
      type: "Full-time",
      department: "Sales",
    },
    {
      title: "Digital Marketing Manager",
      location: "Lagos, Nigeria",
      type: "Full-time",
      department: "Marketing",
    },
    {
      title: "Account Manager",
      location: "Abuja, Nigeria",
      type: "Full-time",
      department: "Client Services",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Help us transform outdoor advertising across Nigeria
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {jobs.map((job, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.department}</span>
                        </div>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
