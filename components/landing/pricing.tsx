'use client'

// components/landing/pricing.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out AI-Compass",
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      "Basic AI context builder",
      "Up to 5 leads per month",
      "Standard form template",
      "Email support",
      "Basic analytics"
    ]
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "Best for growing consultants",
    icon: <Zap className="w-5 h-5" />,
    features: [
      "Advanced AI context builder",
      "Unlimited leads",
      "Custom form branding",
      "Priority support",
      "Advanced analytics",
      "Calendar integration",
      "Lead scoring",
      "Export capabilities"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For agencies and large teams",
    icon: <Shield className="w-5 h-5" />,
    features: [
      "Everything in Pro",
      "Custom AI training",
      "Multiple team members",
      "API access",
      "White-label solution",
      "Custom integrations",
      "Dedicated support",
      "Custom analytics"
    ]
  }
]

const Pricing = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-primary/5 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
      
      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-primary mb-6 animate-fade-in">
            <Zap size={16} />
            <span className="text-sm font-medium">Flexible Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in [animation-delay:200ms]">
            Simple, Transparent
            <span className="text-primary relative ml-2">
              Pricing
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in [animation-delay:400ms]">
            Start free and scale as you grow. No hidden fees or long-term commitments.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className="animate-fade-in"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <Card 
                className={`relative h-full flex flex-col bg-white transition-all duration-300 overflow-visible
                  ${hoveredCard === index ? 'shadow-xl' : 'hover:shadow-lg'}
                  ${plan.popular ? 'border-primary shadow-md' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-primary text-white text-sm rounded-full font-medium">
                    Most Popular
                  </div>
                )}

                {/* Card Header */}
                <div className="p-8 pb-0">
                  <div className="inline-flex p-2 rounded-lg mb-4 bg-primary/10 text-primary">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="p-8 pt-4 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-1 rounded-full p-1 bg-primary/10 text-primary">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="p-8 pt-0">
                  <Button 
                    variant={hoveredCard === index ? "default" : "outline"}
                    size="lg"
                    className={`w-full group relative overflow-hidden transition-all duration-300
                      ${hoveredCard === index ? 'text-white shadow-lg' : ''}`}
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-16 text-center animate-fade-in [animation-delay:800ms]">
          <p className="text-gray-600">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing