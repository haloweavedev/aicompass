// app/api/expert/chat/route.ts
import { auth } from '@clerk/nextjs/server'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { prisma } from '@/lib/prisma'
import { 
  checkChatCompletion, 
  updateExpertProfile 
} from '@/app/expert/onboarding/chat-completion'

const INITIAL_SYSTEM_PROMPT = `You are an AI expert profiler for AI Compass. Your goal is to understand the expert's background, expertise, and unique value proposition through a natural conversation.

Follow these guidelines:
1. Ask focused questions about their expertise, experience, and notable projects
2. Dig deeper into specific examples and methodologies
3. After gathering sufficient information, provide a structured summary
4. Ask if the summary accurately reflects their expertise
5. End the conversation only when you have a comprehensive understanding

Keep the conversation engaging but purposeful. Use the information to create a detailed expert profile.`

export async function POST(req: Request) {
  const { userId: clerkId } = await auth()
  if (!clerkId) return new Response('Unauthorized', { status: 401 })

  try {
    const { messages } = await req.json()

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    // Check for chat completion before streaming
    const isComplete = await checkChatCompletion(messages)
    
    // Generate response stream
    const result = streamText({
      model: openai('gpt-4'),
      messages: [
        { role: 'system', content: INITIAL_SYSTEM_PROMPT },
        ...messages,
      ],
    })

    // Update profile with new messages
    await updateExpertProfile(user.id, messages)

    // If chat is complete, add completion status to response headers
    const headers = new Headers()
    if (isComplete) {
      headers.set('X-Chat-Complete', 'true')
    }

    return result.toDataStreamResponse(headers)
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}