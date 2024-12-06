// app/components/landing/hero.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-[120px] pb-[110px] md:pt-[130px] lg:pt-[160px] bg-gradient-to-b from-white to-gray-50">
      {/* Background Grid */}
      <div className="absolute inset-0 -skew-y-6 transform bg-primary/5 -z-10">
        <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-30">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="h-full w-full border-r border-primary/10" />
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-opacity duration-700 animate-fade-in">
            Discover & Connect with
            <span className="text-primary"> AI-Powered Experts</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 transition-all duration-700 delay-100 animate-fade-in">
            Streamline your business growth with AI Compass. Connect with verified experts through our intelligent matching system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-200 animate-fade-in">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto text-white">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero