'use client'

// components/landing/hero.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, ArrowRight, Play } from "lucide-react"

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Decorative grid background */}
      <div className="absolute inset-0 bg-grid-primary/5 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      {/* Radial gradient for additional depth */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent" />

      <div className="relative pt-[120px] pb-[110px] md:pt-[130px] lg:pt-[160px] px-4">
        <div className="container mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center text-center">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-primary mb-6 animate-fade-in">
              <Bot size={16} />
              <span className="text-sm font-medium">Powered by GPT-4</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl transition-all duration-700 animate-fade-in">
              Transform Expert Discovery with
              <span className="text-primary relative">
                <span className="relative z-10"> AI-Powered Context</span>
                <svg 
                  className="absolute bottom-0 left-0 w-full h-3 text-primary/20" 
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
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 transition-all duration-700 delay-100 animate-fade-in">
              Streamline your consultation process with AI that understands your expertise. Generate qualified leads through intelligent conversations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-200 animate-fade-in">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto text-white font-medium px-8 py-6">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto font-medium px-8 py-6"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </div>
  )
}

export default Hero