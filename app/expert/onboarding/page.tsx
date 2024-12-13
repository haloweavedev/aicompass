// app/expert/onboarding/page.tsx
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ExpertChat } from "./chat"
import { prisma } from "@/lib/prisma"

export default async function ExpertOnboarding() {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) redirect('/sign-in')
    
    // Check if expert has completed onboarding
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: { expertProfile: true }
    })
    
    // Only redirect if onboarding is complete
    if (user?.expertProfile?.onboardingCompleted) {
      redirect(`/expert/${user.expertProfile.profileSlug}`)
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <ExpertChat />
      </div>
    )
  } catch (error) {
    console.error('Error in expert onboarding:', error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <h2 className="text-2xl font-semibold text-red-600">
            Connection Error
          </h2>
          <p className="mt-2 text-gray-600">
            Unable to connect to the database. Please try again later.
          </p>
        </div>
      </div>
    )
  }
}