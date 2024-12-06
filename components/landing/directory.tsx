// app/components/landing/directory.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const experts = [
  {
    id: 1,
    name: "AI Strategy",
    description: "Expert consultants in AI implementation and strategy",
    experts: 24,
    image: "/experts/ai-strategy.jpg"
  },
  // Add more categories
]

const Directory = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse Expert Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find experts across various domains ready to help transform your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((category) => (
            <Link key={category.id} href={`/experts/${category.id}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardHeader className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">{category.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <p className="text-sm text-primary">{category.experts} Experts Available</p>
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