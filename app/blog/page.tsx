import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of Outdoor Advertising in Nigeria",
      excerpt: "Explore the latest trends and innovations shaping the outdoor advertising landscape in Nigeria.",
      date: "March 15, 2024",
      author: "Outdoors Team",
      image: "/modern-led-billboard-at-night-in-lagos-nigeria-wit.jpg",
      slug: "future-of-outdoor-advertising",
    },
    {
      title: "How to Choose the Right Billboard Location",
      excerpt: "Strategic insights on selecting the most effective billboard locations for your brand.",
      date: "March 10, 2024",
      author: "Outdoors Team",
      image: "/large-unipole-billboard-on-highway-in-nigeria-with.jpg",
      slug: "choosing-billboard-location",
    },
    {
      title: "Digital vs Traditional Billboards: Which is Right for You?",
      excerpt: "A comprehensive comparison of digital and traditional billboard advertising options.",
      date: "March 5, 2024",
      author: "Outdoors Team",
      image: "/digital-led-billboard-screen-displaying-colorful-a.jpg",
      slug: "digital-vs-traditional-billboards",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Breadcrumbs />
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-black to-gray-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-balance">
                Insights & <span className="text-primary">Updates</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 text-balance leading-relaxed">
                Stay informed with the latest trends, tips, and news in outdoor advertising.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Card
                    key={post.slug}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 hover:border-primary/40"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
