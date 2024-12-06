// app/api/expert-chat/route.ts
import { generateExpertChatResponse } from '@/lib/ai/expert-chat';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    // 1. Auth Check
    const user = await currentUser();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Request
    const { messages } = await req.json();
    
    if (!Array.isArray(messages) || !messages.length) {
      return Response.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // 3. Generate AI Response
    try {
      const { text, understandingScore } = await generateExpertChatResponse(messages);
      const newMessage = { role: 'assistant' as const, content: text };

      // 4. Update Database
      try {
        await prisma.user.upsert({
          where: { clerkId: user.id },
          create: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            expertProfile: {
              create: {
                aiPersona: { messages: [...messages, newMessage] },
                understandingScore,
              }
            }
          },
          update: {
            expertProfile: {
              upsert: {
                create: {
                  aiPersona: { messages: [...messages, newMessage] },
                  understandingScore,
                },
                update: {
                  aiPersona: { messages: [...messages, newMessage] },
                  understandingScore,
                }
              }
            }
          }
        });
      } catch (dbError) {
        console.error('Database operation failed:', dbError);
        // Continue even if DB fails
      }

      // 5. Return Response
      return Response.json({
        messages: [newMessage],
        understandingScore
      });

    } catch (aiError) {
      console.error('AI generation failed:', aiError);
      return Response.json(
        { error: 'Failed to generate AI response' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Request processing failed:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}