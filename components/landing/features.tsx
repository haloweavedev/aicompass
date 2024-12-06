// app/components/landing/features.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, ChartBar, Bot } from "lucide-react"

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Both Sides
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're an expert or a business, AI Compass provides the tools you need to succeed
          </p>
        </div>

        <Tabs defaultValue="experts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-12">
            <TabsTrigger value="experts">For Experts</TabsTrigger>
            <TabsTrigger value="businesses">For Businesses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="experts" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Brain className="w-8 h-8 text-primary" />}
              title="AI Profile Builder"
              description="Build a comprehensive expert profile with our AI assistant guiding you through the process."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-primary" />}
              title="Lead Management"
              description="Track and manage incoming leads through an intuitive dashboard."
            />
            <FeatureCard 
              icon={<ChartBar className="w-8 h-8 text-primary" />}
              title="Analytics Dashboard"
              description="Get detailed insights about your profile performance and lead conversion."
            />
          </TabsContent>

          <TabsContent value="businesses" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Bot className="w-8 h-8 text-primary" />}
              title="AI-Powered Matching"
              description="Get matched with the perfect expert based on your specific needs and goals."
            />
            {/* Add more business-focused feature cards */}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="mb-2">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default Features