// app/dashboard/role-selector.tsx
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { updateUserRole } from "../actions/user"
import type { UserRole } from "@/types"

export default function RoleSelector({ 
  initialRole 
}: { 
  initialRole: UserRole | null 
}) {
  const [userRole, setUserRole] = useState<UserRole | null>(initialRole)
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelect = async (role: UserRole) => {
    setIsLoading(true)
    try {
      const updatedUser = await updateUserRole(role)
      setUserRole(updatedUser.role)
    } catch (error) {
      console.error('Error updating role:', error)
      // You could add a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button 
          onClick={() => handleRoleSelect('EXPERT')}
          variant={userRole === 'EXPERT' ? 'default' : 'outline'}
          disabled={isLoading}
        >
          Expert
        </Button>
        <Button 
          onClick={() => handleRoleSelect('SEEKER')}
          variant={userRole === 'SEEKER' ? 'default' : 'outline'}
          disabled={isLoading}
        >
          Seeker
        </Button>
      </div>

      {userRole && (
        <p className="text-sm text-gray-600 mt-4">
          Current role: {userRole.toLowerCase()}
        </p>
      )}
    </div>
  )
}