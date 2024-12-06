// components/landing/directory.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const experts = [
  {
    id: 1,
    name: "Business Strategy",
    description: "Expert consultants in business scaling and optimization",
    experts: 42,
    image: "/experts/business-strategy.jpg"  // You'll need to add these images
  },
  {
    id: 2,
    name: "Digital Transformation",
    description: "AI and digital transformation specialists",
    experts: 35,
    image: "/experts/digital-transform.jpg"
  },
  {
    id: 3,
    name: "Marketing Analytics",
    description: "Data-driven marketing strategy experts",
    experts: 28,
    image: "/experts/marketing.jpg"
  },
  {
    id: 4,
    name: "Process Optimization",
    description: "Efficiency and workflow optimization consultants",
    experts: 31,
    image: "/experts/process-opt.jpg"
  }
]

const Directory = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Expert Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified experts who leverage AI to transform your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {experts.map((category) => (
            <Link key={category.id} href={`/experts/${category.id}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardHeader className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2 text-xl">{category.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <p className="text-sm font-medium text-primary">{category.experts} Verified Experts</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Directory