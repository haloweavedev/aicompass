// app/actions/user.ts
'use server'

import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import type { UserRole } from "@/types"

export async function updateUserRole(role: UserRole) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error("Unauthorized: No user found")
  }

  const user = await currentUser()
  if (!user) {
    throw new Error("Unauthorized: Could not fetch user details")
  }

  try {
    return await prisma.user.upsert({
      where: { clerkId: userId },
      create: {
        clerkId: userId,
        role: role as UserRole
      },
      update: {
        role: role as UserRole
      }
    })
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to update user role')
  }
}

export async function getCurrentUserRole() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })
    return user?.role || null
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch user role')
  }
}