'use client'

// components/landing/features.tsx
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Brain, Users, ChartBar, Bot, MessageSquare, Calendar, Sparkles, ArrowRight } from "lucide-react"

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-primary/5 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
      
      <div className="container px-4 mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-primary mb-6 animate-fade">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Features that empower</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade [--delay:200ms]">
            AI-Powered Features for
            <span className="text-primary relative ml-2">
              Both Sides
              <svg 
                className="absolute bottom-0 left-0 w-full h-2 text-primary/20" 
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path 
                  d="M0 12.5c30-12 70-12 100 0" 
                  stroke="currentColor" 
                  strokeWidth="6" 
                  fill="none"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade [--delay:400ms]">
            Streamline your expert discovery and assessment process with our cutting-edge AI technology
          </p>
        </div>

        <Tabs defaultValue="experts" className="w-full">
          <TabsList className="grid w-full max-w-[400px] mx-auto mb-16 p-1 animate-fade [--delay:600ms]">
            <div className="grid grid-cols-2 gap-2 relative">
              <TabsTrigger 
                value="experts"
                className="rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              >
                For Experts
              </TabsTrigger>
              <TabsTrigger 
                value="businesses"
                className="rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              >
                For Businesses
              </TabsTrigger>
            </div>
          </TabsList>
          
          <div className="relative">
            <TabsContent value="experts">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Brain className="w-8 h-8" />,
                    title: "AI Context Builder",
                    description: "Our AI conducts in-depth interviews to fully understand your expertise, methodology, and unique value proposition."
                  },
                  {
                    icon: <MessageSquare className="w-8 h-8" />,
                    title: "Smart Form Generator",
                    description: "Generate customizable, embeddable forms that use AI to qualify leads and gather requirements efficiently."
                  },
                  {
                    icon: <ChartBar className="w-8 h-8" />,
                    title: "Lead Management",
                    description: "Track and analyze leads, with AI-powered insights on conversion rates and client fit scores."
                  }
                ].map((feature, index) => (
                  <FeatureCard 
                    key={index}
                    {...feature}
                    index={index}
                    isHovered={hoveredCard === index}
                    onHover={() => setHoveredCard(index)}
                    onLeave={() => setHoveredCard(null)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="businesses">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Bot className="w-8 h-8" />,
                    title: "AI-Guided Discovery",
                    description: "Our AI assistant helps define your needs and matches you with the perfect expert."
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Instant Action Plans",
                    description: "Receive AI-generated action plans based on expert methodologies before your first call."
                  },
                  {
                    icon: <Calendar className="w-8 h-8" />,
                    title: "Seamless Scheduling",
                    description: "Schedule meetings directly with experts through our integrated calendar system."
                  }
                ].map((feature, index) => (
                  <FeatureCard 
                    key={index + 3}
                    {...feature}
                    index={index + 3}
                    isHovered={hoveredCard === index + 3}
                    onHover={() => setHoveredCard(index + 3)}
                    onLeave={() => setHoveredCard(null)}
                  />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fade [--delay:800ms]">
          <a href="/features" 
             className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all group"
          >
            <span className="font-semibold">Explore all features</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

const FeatureCard = ({ icon, title, description, index, isHovered, onHover, onLeave }: FeatureCardProps) => {
  return (
    <div 
      className="animate-fade"
      style={{ ['--delay' as string]: `${(index + 8) * 100}ms` }}
    >
      <Card 
        className={`relative p-8 hover:shadow-xl transition-all duration-300 bg-white cursor-pointer
          ${isHovered ? 'bg-primary text-white' : ''}`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="relative z-10">
          <div className={`p-3 rounded-xl inline-flex mb-4 transition-colors
            ${isHovered ? 'bg-white/10' : 'bg-primary/10'}`}>
            <div className={`transition-colors
              ${isHovered ? 'text-white' : 'text-primary'}`}>
              {icon}
            </div>
          </div>

          <h3 className={`text-xl font-semibold mb-3 transition-colors
            ${isHovered ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>

          <p className={`transition-colors
            ${isHovered ? 'text-white/90' : 'text-gray-600'}`}>
            {description}
          </p>

          <div className={`mt-6 inline-flex items-center text-sm font-medium transition-all
            ${isHovered ? 'text-white gap-3' : 'text-primary gap-2'}`}>
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Features