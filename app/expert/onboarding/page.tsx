// app/expert/onboarding/page.tsx
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ExpertChat } from "./chat"
import { getCurrentUserRole } from "@/app/actions/user"

export default async function ExpertOnboarding() {
  try {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')
    
    const role = await getCurrentUserRole()
    
    // Only redirect if we're sure they're not an expert
    if (role && role !== 'EXPERT') {
      redirect('/dashboard')
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <ExpertChat />
      </div>
    )
  } catch (error) {
    console.error('Error in expert onboarding:', error)
    // Show error state instead of crashing
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