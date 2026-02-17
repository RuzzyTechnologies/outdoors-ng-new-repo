import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export default function TeamPage() {
  const boardMembers = [
    {
      name: "Sir Emmanuel Ikuzaboh",
      title: "Chairman",
      image: "/images/team/chairman.jpg",
      linkedIn: "https://linkedin.com/in/emmanuel-ikuzaboh",
      bio: "Visionary leader guiding strategic direction and governance",
    },
    {
      name: "H.E. Joe Keshi",
      title: "Vice Chairman",
      image: "/images/team/vice-chairman.jpg",
      linkedIn: "https://linkedin.com/in/joe-keshi",
      bio: "Deputy leadership and strategic oversight",
    },
    {
      name: "Michael Emeleme",
      title: "Group CEO",
      image: "/images/team/group-ceo.jpg",
      linkedIn: "https://linkedin.com/in/michael-emeleme",
      bio: "Executive leadership driving operational excellence",
    },
    {
      name: "Salvation Alibor",
      title: "Director",
      image: "/images/team/director-1.jpg",
      linkedIn: "https://linkedin.com/in/salvation-alibor",
      bio: "Board director providing strategic guidance and oversight",
    },
    {
      name: "Dr. Josephine Chimen",
      title: "Director",
      image: "/images/team/director-2.jpg",
      linkedIn: "https://linkedin.com/in/josephine-chimen",
      bio: "Pharmaceutical and healthcare expertise on board",
    },
    {
      name: "Dr. Innocent Ekeseme",
      title: "Director",
      image: "/images/team/director-3.jpg",
      linkedIn: "https://linkedin.com/in/innocent-ekeseme",
      bio: "Seasoned director bringing industry expertise",
    },
    {
      name: "Emmanuella Uyaelume, Esq",
      title: "Secretary",
      image: "/images/team/director-4.jpg",
      linkedIn: "https://linkedin.com/in/emmanuella-uyaelume",
      bio: "Legal and compliance expertise on board",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-32 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Meet the talented professionals driving innovation and excellence in outdoor advertising across Nigeria
              </p>
            </div>
          </div>
        </section>

        {/* Board Members Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Board of Directors</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experienced leaders committed to delivering outstanding results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.map((member, i) => (
                <Card
                  key={i}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <div className="relative h-64 bg-muted overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary">
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary font-semibold mb-3">{member.title}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

                    <div className="flex gap-3">
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all duration-300"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="hidden sm:inline">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Culture</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                At Outdoors.ng, we believe in fostering a culture of innovation, collaboration, and excellence. Our
                team is driven by a shared vision to transform outdoor advertising and deliver unparalleled value to
                our clients.
              </p>
              <p>
                We invest in our people, promoting continuous learning and professional growth. Every team member
                contributes to our success, and we celebrate achievements together while supporting each other through
                challenges.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
