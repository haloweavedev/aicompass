// app/page.tsx
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import Directory from "@/components/landing/directory"
import Pricing from "@/components/landing/pricing"

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Directory />
      <Pricing />
    </main>
  )
}