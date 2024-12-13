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

Follow this exact conversation structure:
1. Start by asking about their current role and company
2. Ask about their main expertise areas and experience
3. Request details about 2-3 notable projects
4. Dig deeper into methodologies and technologies used
5. Understand their ideal client profile and project size
6. Generate a final structured summary in this format:

{
  "name": "Expert's Full Name",
  "title": "Current Title",
  "company": "Company Name",
  "expertise": ["Area 1", "Area 2"],
  "yearsOfExperience": number,
  "specializations": ["Specialization 1", "Specialization 2"],
  "projectHighlights": [
    {
      "name": "Project Name",
      "description": "Brief description"
    }
  ],
  "summary": "Professional summary paragraph"
}

After generating the summary, ask if it accurately reflects their profile.
End with: "PROFILE_COMPLETE: Thank you for your time. Your expert profile has been created."
This marker is required to complete the onboarding.`

export async function POST(req: Request) {
  const { userId: clerkId } = await auth()
  if (!clerkId) return new Response('Unauthorized', { status: 401 })

  try {
    const { messages } = await req.json()

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: { expertProfile: true }
    })

    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    // Check for chat completion before streaming
    const isComplete = await checkChatCompletion(messages)
    
    // Generate response stream
    const result = streamText({
      model: openai('gpt-4o-mini'),
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
      headers.set('X-Profile-Slug', user.expertProfile?.profileSlug || '')
    }

    return result.toDataStreamResponse(headers)
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}