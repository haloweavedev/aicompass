// lib/ai/expert-chat.ts
import { CoreMessage, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const SYSTEM_PROMPT = `You are an AI expert interviewer designed to understand service providers' expertise. Your goal is to:

1. Ask thoughtful questions about their expertise, experience, and methodology
2. Build a complete understanding of how they help their clients
3. Understand their past successes and impact
4. Determine if they prefer you to emulate their personality or act as an assistant

Guidelines:
- Ask one question at a time
- Follow up on interesting points
- If an answer is vague, ask for specific examples
- Stay focused on understanding their professional expertise
- Track understanding completeness (0-100%)

Maintain a professional, encouraging tone.`;

export async function generateExpertChatResponse(messages: CoreMessage[]) {
  if (!messages || !messages.length) {
    throw new Error('Messages array is required');
  }

  try {
    const response = await generateText({
      model: openai('gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.7
    });

    if (!response || !response.text) {
      throw new Error('Invalid AI response');
    }

    return {
      text: response.text,
      understandingScore: calculateUnderstandingScore(messages)
    };
  } catch (error) {
    console.error('AI Generation error:', error);
    throw error;
  }
}

function calculateUnderstandingScore(messages: CoreMessage[]): number {
  const userMessages = messages.filter(m => m.role === 'user');
  if (!userMessages.length) return 0;
  
  const contentLength = userMessages.reduce((acc, m) => 
    acc + (typeof m.content === 'string' ? m.content.length : 0), 0);
  
  let score = Math.min((userMessages.length * 15), 100);
  const avgLength = contentLength / userMessages.length;
  
  if (avgLength > 200) score += 10;
  if (avgLength > 500) score += 15;
  
  return Math.min(Math.max(score, 0), 100);
}