// app/expert/onboarding/chat-completion.ts
import { type Message } from 'ai'
import { prisma } from '@/lib/prisma'

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
  // Minimum 6 message exchanges required (3 from each side)
  if (messages.length < 6) return false
  
  // Check if last message is from assistant and contains completion marker
  const lastMessage = messages[messages.length - 1]
  return lastMessage.role === 'assistant' && 
         lastMessage.content.includes('summary accurately reflect')
}

export async function calculateUnderstandingScore(messages: Message[]): Promise<number> {
  // Basic scoring based on message count and content length
  const userMessages = messages.filter(m => m.role === 'user')
  const avgResponseLength = userMessages.reduce((sum, msg) => 
    sum + msg.content.length, 0) / userMessages.length
  
  // Score components:
  // 1. Number of exchanges (max 40 points)
  const exchangeScore = Math.min(userMessages.length * 10, 40)
  
  // 2. Average response length (max 30 points)
  const lengthScore = Math.min(avgResponseLength / 50 * 30, 30)
  
  // 3. Content quality (max 30 points) - basic implementation
  const qualityScore = userMessages.some(msg => 
    msg.content.includes('experience') || 
    msg.content.includes('project') || 
    msg.content.includes('expertise')
  ) ? 30 : 0
  
  return Math.round(exchangeScore + lengthScore + qualityScore)
}

export async function generateProfileData(messages: Message[]): Promise<ExpertProfileData | null> {
  // Extract the summary message (usually the second-to-last assistant message)
  const summaryMessage = messages
    .filter(m => m.role === 'assistant')
    .slice(-2)[0]

  if (!summaryMessage) return null

  // Basic extraction - in production, use OpenAI function calling for structured data
  const nameParts = summaryMessage.content.match(/\*\*(.*?)\*\*/)?.[1]?.split('|')
  
  return {
    name: nameParts?.[0]?.trim() ?? 'Unknown',
    title: nameParts?.[1]?.trim() ?? 'Unknown',
    company: '',
    expertise: [],
    description: summaryMessage.content,
    yearsOfExperience: 0,
    specializations: [],
    projectHighlights: []
  }
}

export async function updateExpertProfile(
  userId: string, 
  messages: Message[]
): Promise<void> {
  const understandingScore = await calculateUnderstandingScore(messages)
  const profileData = await generateProfileData(messages)
  const isComplete = await checkChatCompletion(messages)

  await prisma.expertProfile.update({
    where: { userId },
    data: {
      conversation: messages,
      profileData,
      understandingScore,
      onboardingCompleted: isComplete,
      summary: profileData?.description ?? ''
    }
  })
}