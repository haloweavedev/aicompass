// app/dashboard/page.tsx
import { UserButton } from "@clerk/nextjs"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          Dashboard
        </div>
      </div>
    </div>
  )
}