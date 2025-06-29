import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(videos, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching videos' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const runtime = 'nodejs'; //  This forces Vercel to use Node.js Serverless Functions as it is using Edge Functions by default and gives build error.
