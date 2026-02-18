import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Briefcase, Target, Users, TrendingUp } from "lucide-react"

export default function CareersPage() {
  const jobs = [
    {
      title: "Sales Executive",
      location: "Lagos, Nigeria",
      type: "Full-time",
      department: "Sales",
      description: "Drive sales growth for billboard placements across major cities. Experience in B2B sales preferred.",
    },
    {
      title: "Digital Marketing Manager",
      location: "Lagos, Nigeria",
      type: "Full-time",
      department: "Marketing",
      description: "Lead digital marketing campaigns and manage online brand presence. SEO and SEM expertise required.",
    },
    {
      title: "Account Manager",
      location: "Abuja, Nigeria",
      type: "Full-time",
      department: "Client Services",
      description: "Manage client relationships and ensure campaign satisfaction. Strong communication skills essential.",
    },
    {
      title: "Creative Designer",
      location: "Lagos, Nigeria",
      type: "Full-time",
      department: "Creative",
      description: "Design compelling billboard and digital advertising content. Proficiency in Adobe Creative Suite required.",
    },
    {
      title: "Business Development Officer",
      location: "Remote",
      type: "Full-time",
      department: "Business Development",
      description: "Identify new business opportunities and establish strategic partnerships. Excellent networking skills needed.",
    },
    {
      title: "Operations Analyst",
      location: "Lagos, Nigeria",
      type: "Full-time",
      department: "Operations",
      description: "Support operations team with data analysis and process improvement. Excel and analytical skills required.",
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Continuous learning opportunities and career advancement pathways",
    },
    {
      icon: Users,
      title: "Collaborative Team",
      description: "Work with talented professionals in a supportive environment",
    },
    {
      icon: Target,
      title: "Competitive Compensation",
      description: "Attractive salary packages and performance bonuses",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-transparent">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Help us transform outdoor advertising across Nigeria. We're looking for talented individuals who are
                passionate about innovation and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Join Outdoors.ng</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon
                return (
                  <Card key={i} className="p-8 text-center hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Open Positions</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Explore our current job openings and find the perfect opportunity to grow your career with us.
            </p>

            <div className="space-y-6 max-w-4xl mx-auto">
              {jobs.map((job, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-all hover:border-primary/50">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                    <Button className="w-full md:w-auto">Apply Now</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Info Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Application Process</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We review all applications carefully and reach out to qualified candidates for interviews. Our
                recruitment process is designed to find the best fit for both the role and our company culture.
              </p>
              <p>
                Have questions about working at Outdoors.ng? Feel free to reach out to us at{" "}
                <span className="text-primary font-semibold">careers@outdoors.ng</span> or visit our contact page for
                more information.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
