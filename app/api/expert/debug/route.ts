// app/api/expert/debug/route.ts
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return new Response('Unauthorized', { status: 401 });

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        expertProfile: true
      }
    });

    if (!user || !user.expertProfile) {
      return new Response('No expert profile found', { status: 404 });
    }

    // Write to a debug file
    const debugData = {
      userId: user.id,
      clerkId: user.clerkId,
      profile: user.expertProfile,
      timestamp: new Date().toISOString()
    };

    await fs.writeFile(
      path.join(process.cwd(), 'debug_expert_profile.json'),
      JSON.stringify(debugData, null, 2)
    );

    return Response.json(debugData);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}