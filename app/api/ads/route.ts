// app/api/ads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { DashboardStats } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Fetching ads data...')

    // Check if database is available
    try {
      await prisma.$queryRaw`SELECT 1`
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Database not available',
          stats: getFallbackStats()
        },
        { status: 500 }
      )
    }

    // Get all ads with superPAC relations
    const ads = await prisma.politicalAd.findMany({
      include: {
        superPAC: true,
      },
      orderBy: {
        startDate: 'desc',
      },
      take: 50,
    })

    console.log(`📊 Found ${ads.length} ads`)

    // Calculate aggregates with error handling
    let totalSpend = 0
    let openAISpend = 0
    let metaSpend = 0

    try {
      const totalSpendResult = await prisma.politicalAd.aggregate({
        _sum: {
          amount: true,
        },
      })
      totalSpend = totalSpendResult._sum.amount || 0

      const openAISpendResult = await prisma.politicalAd.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          superPAC: {
            funder: 'OpenAI+a16z',
          },
        },
      })
      openAISpend = openAISpendResult._sum.amount || 0

      const metaSpendResult = await prisma.politicalAd.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          superPAC: {
            funder: 'Meta',
          },
        },
      })
      metaSpend = metaSpendResult._sum.amount || 0
    } catch (aggregateError) {
      console.error('❌ Error calculating aggregates:', aggregateError)
      // Use fallback calculations
      totalSpend = ads.reduce((sum, ad) => sum + ad.amount, 0)
      openAISpend = ads
        .filter(ad => ad.superPAC.funder === 'OpenAI+a16z')
        .reduce((sum, ad) => sum + ad.amount, 0)
      metaSpend = ads
        .filter(ad => ad.superPAC.funder === 'Meta')
        .reduce((sum, ad) => sum + ad.amount, 0)
    }

    // Get platform breakdown
    let platformBreakdown = []
    try {
      const platformResult = await prisma.politicalAd.groupBy({
        by: ['platform'],
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      })
      platformBreakdown = platformResult.map(item => ({
        platform: item.platform,
        spend: item._sum.amount || 0,
        count: item._count.id,
      }))
    } catch (platformError) {
      console.error('❌ Error calculating platform breakdown:', platformError)
      // Calculate platform breakdown manually
      const platformMap = new Map()
      ads.forEach(ad => {
        const existing = platformMap.get(ad.platform) || { spend: 0, count: 0 }
        platformMap.set(ad.platform, {
          spend: existing.spend + ad.amount,
          count: existing.count + 1,
        })
      })
      platformBreakdown = Array.from(platformMap.entries()).map(([platform, data]) => ({
        platform,
        spend: data.spend,
        count: data.count,
      }))
    }

    // Get Super PAC breakdown
    let superPACBreakdown = []
    try {
      const superPACResult = await prisma.politicalAd.groupBy({
        by: ['superPACId'],
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      })

      // Get Super PAC details
      superPACBreakdown = await Promise.all(
        superPACResult.map(async (item) => {
          try {
            const superPAC = await prisma.superPAC.findUnique({
              where: { id: item.superPACId },
            })
            return {
              superPAC: superPAC?.name || 'Unknown',
              funder: superPAC?.funder || 'Unknown',
              spend: item._sum.amount || 0,
              count: item._count.id,
            }
          } catch (pacError) {
            console.error('❌ Error fetching Super PAC:', pacError)
            return {
              superPAC: 'Unknown',
              funder: 'Unknown',
              spend: item._sum.amount || 0,
              count: item._count.id,
            }
          }
        })
      )
    } catch (superPACError) {
      console.error('❌ Error calculating Super PAC breakdown:', superPACError)
      // Calculate Super PAC breakdown manually
      const pacMap = new Map()
      ads.forEach(ad => {
        const key = ad.superPACId
        const existing = pacMap.get(key) || { 
          superPAC: ad.superPAC.name, 
          funder: ad.superPAC.funder, 
          spend: 0, 
          count: 0 
        }
        pacMap.set(key, {
          ...existing,
          spend: existing.spend + ad.amount,
          count: existing.count + 1,
        })
      })
      superPACBreakdown = Array.from(pacMap.values())
    }

    // Convert BigInt to Number for JSON serialization and parse metadata
    const serializedAds = ads.map((ad: any) => ({
      ...ad,
      impressions: ad.impressions ? Number(ad.impressions) : undefined,
      startDate: ad.startDate.toISOString(),
      endDate: ad.endDate ? ad.endDate.toISOString() : undefined,
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
      // Parse metadata string back to object for frontend
      metadata: ad.metadata ? safeJsonParse(ad.metadata) : undefined,
    }))

    const stats: DashboardStats = {
      totalSpend,
      totalAds: ads.length,
      openAISpend,
      metaSpend,
      recentAds: serializedAds,
      platformBreakdown,
      superPACBreakdown,
    }

    console.log('✅ Stats calculated successfully')
    
    return NextResponse.json({ 
      success: true,
      stats,
      ads: serializedAds 
    })

  } catch (error) {
    console.error('❌ Failed to fetch ads:', error)
    // Return fallback data for build time
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch ads',
        stats: getFallbackStats(),
        ads: []
      },
      { status: 500 }
    )
  }
}

// Helper function for safe JSON parsing
function safeJsonParse(str: string): any {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}

// Fallback stats for when database is not available
function getFallbackStats(): DashboardStats {
  console.log('🔄 Using fallback stats')
  return {
    totalSpend: 10500000,
    totalAds: 14,
    openAISpend: 3430000,
    metaSpend: 7070000,
    recentAds: [],
    platformBreakdown: [
      { platform: 'FACEBOOK', spend: 2520000, count: 3 },
      { platform: 'YOUTUBE', spend: 1700000, count: 3 },
      { platform: 'TV_AD_ARCHIVE', spend: 3050000, count: 2 },
      { platform: 'FEC', spend: 1200000, count: 1 },
      { platform: 'ADIMPACT', spend: 1130000, count: 2 },
      { platform: 'OPENSECRETS', spend: 580000, count: 2 },
      { platform: 'ACLU_WATCH', spend: 320000, count: 1 },
    ],
    superPACBreakdown: [
      { superPAC: 'Leading the Future', funder: 'OpenAI+a16z', spend: 3430000, count: 4 },
      { superPAC: 'American Technology Excellence Project', funder: 'Meta', spend: 3850000, count: 4 },
      { superPAC: 'Mobilising Economic Transformation Across America', funder: 'Meta', spend: 3220000, count: 6 },
    ],
  }
}