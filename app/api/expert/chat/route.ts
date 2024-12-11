// app/api/expert/chat/route.ts
import { auth } from '@clerk/nextjs/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';

const INITIAL_SYSTEM_PROMPT = `You are an AI expert profiler for AI Compass...`;

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return new Response('Unauthorized', { status: 401 });

  const { messages } = await req.json();

  // First get the User from our database using clerkId
  const user = await prisma.user.findUnique({
    where: { clerkId }
  });

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      { role: 'system', content: INITIAL_SYSTEM_PROMPT },
      ...messages,
    ],
  });

  // Save messages to profile using the correct userId
  if (messages.length > 1) {
    await prisma.expertProfile.upsert({
      where: { userId: user.id }, // Use user.id instead of clerkId
      create: {
        userId: user.id,
        conversation: messages,
        summary: '',
      },
      update: {
        conversation: messages,
      },
    });
  }

  return result.toDataStreamResponse();
}