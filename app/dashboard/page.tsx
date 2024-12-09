// app/dashboard/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"
import { Card } from "@/components/ui/card"
import { getCurrentUserRole } from "../actions/user"
import { redirect } from 'next/navigation'
import RoleSelector from "./role-selector"

export default async function Dashboard() {
  const { userId } = await auth()
  
  if (!userId) {
    return redirect('/sign-in')
  }

  const user = await currentUser()
  const userRole = await getCurrentUserRole()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome, {user?.firstName || 'User'}
              </p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Select your role</h2>
            <RoleSelector initialRole={userRole} />
          </Card>
        </div>
      </div>
    </div>
  )
}