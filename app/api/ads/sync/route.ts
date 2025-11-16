// app/api/ads/sync/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { platform } = await request.json()

    // Create sync log entry
    const syncLog = await prisma.adSyncLog.create({
      data: {
        platform: platform || 'ALL',
        status: 'RUNNING',
        recordsFetched: 0,
        startedAt: new Date(),
      },
    })

    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update sync log with completion
    await prisma.adSyncLog.update({
      where: { id: syncLog.id },
      data: {
        status: 'COMPLETED',
        recordsFetched: Math.floor(Math.random() * 50) + 10,
        completedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Sync completed for ${platform}`,
      syncId: syncLog.id,
    })

  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Sync failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}