// app/expert/onboarding/chat-completion.ts
import { type Message } from 'ai'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'

interface ExpertProfileData {
  name: string
  title: string
  company: string
  expertise: string[]
  description: string
  yearsOfExperience: number
  specializations: string[]
  projectHighlights: {
    name: string
    description: string
  }[]
}

export async function checkChatCompletion(messages: Message[]) {
  if (messages.length < 6) return false
  
  const lastMessages = messages.slice(-2) // Get last two messages
  
  // Check for profile JSON in second-to-last message
  const hasProfileJson = lastMessages[0]?.content.includes('"name":')
  
  // Check for completion marker in last message
  const hasCompletionMarker = lastMessages[1]?.content.includes('PROFILE_COMPLETE')
  
  return hasProfileJson && hasCompletionMarker
}

export async function generateProfileSlug(name: string) {
  const baseSlug = slugify(name, { lower: true, strict: true })
  let slug = baseSlug
  let counter = 1

  // Keep checking until we find an unused slug
  while (await prisma.expertProfile.findUnique({ where: { profileSlug: slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

export async function extractProfileData(messages: Message[]): Promise<ExpertProfileData | null> {
  // Find the message containing the JSON profile
  const profileMessage = messages.find(m => 
    m.role === 'assistant' && m.content.includes('"name":')
  )

  if (!profileMessage) return null

  try {
    // Extract JSON from the message
    const jsonMatch = profileMessage.content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    const profileData = JSON.parse(jsonMatch[0])
    return profileData
  } catch (error) {
    console.error('Error parsing profile JSON:', error)
    return null
  }
}

export async function updateExpertProfile(
  userId: string, 
  messages: Message[]
): Promise<void> {
  const isComplete = await checkChatCompletion(messages)
  const profileData = await extractProfileData(messages)
  
  // Calculate understanding score based on profile completeness
  const understandingScore = profileData ? Math.min(
    Object.values(profileData).filter(Boolean).length * 10,
    100
  ) : 0

  // Generate slug from name if profile is complete
  const profileSlug = profileData?.name 
    ? await generateProfileSlug(profileData.name)
    : null

  await prisma.expertProfile.update({
    where: { userId },
    data: {
      conversation: messages,
      profileData,
      understandingScore,
      onboardingCompleted: isComplete,
      summary: profileData?.description ?? '',
      profileSlug,
      displayName: profileData?.name,
      title: profileData?.title,
      company: profileData?.company,
      isPublished: isComplete
    }
  })
}