// app/api/ads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { DashboardStats } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching ads data...')
    
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

    console.log(`Found ${ads.length} ads`)

    // Calculate total spend
    const totalSpendResult = await prisma.politicalAd.aggregate({
      _sum: {
        amount: true,
      },
    })

    // Calculate OpenAI+a16z spend
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

    // Calculate Meta spend
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

    // Get platform breakdown
    const platformBreakdown = await prisma.politicalAd.groupBy({
      by: ['platform'],
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    })

    // Get Super PAC breakdown
    const superPACBreakdown = await prisma.politicalAd.groupBy({
      by: ['superPACId'],
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    })

    // Get Super PAC details for the breakdown
    const superPACBreakdownWithDetails = await Promise.all(
      superPACBreakdown.map(async (item) => {
        const superPAC = await prisma.superPAC.findUnique({
          where: { id: item.superPACId },
        })
        return {
          superPAC: superPAC?.name || 'Unknown',
          funder: superPAC?.funder || 'Unknown',
          spend: item._sum.amount || 0,
          count: item._count.id,
        }
      })
    )

    // Convert BigInt to Number for JSON serialization and parse metadata
    const serializedAds = ads.map((ad: any) => ({
      ...ad,
      impressions: ad.impressions ? Number(ad.impressions) : undefined,
      startDate: ad.startDate.toISOString(),
      endDate: ad.endDate ? ad.endDate.toISOString() : undefined,
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
      // Parse metadata string back to object for frontend
      metadata: ad.metadata ? JSON.parse(ad.metadata) : undefined,
    }))

    // Calculate platform distribution for cross-analysis
    const platformDistribution = platformBreakdown.reduce((acc: any, item) => {
      acc[item.platform] = {
        spendPercentage: totalSpendResult._sum.amount ? (item._sum.amount || 0) / totalSpendResult._sum.amount : 0,
        countPercentage: ads.length ? item._count.id / ads.length : 0
      }
      return acc
    }, {})

    // Create cross-platform Super PAC analysis
    const crossPlatformAnalysis = superPACBreakdownWithDetails.flatMap(pacItem => 
      platformBreakdown.map(platformItem => ({
        platform: platformItem.platform as any,
        superPAC: pacItem.superPAC,
        funder: pacItem.funder,
        spend: (pacItem.spend * (platformDistribution[platformItem.platform]?.spendPercentage || 0)),
        count: Math.round(pacItem.count * (platformDistribution[platformItem.platform]?.countPercentage || 0))
      })).filter(item => item.spend > 0 && item.count > 0)
    )

    const stats: DashboardStats = {
      totalSpend: totalSpendResult._sum.amount || 0,
      totalAds: ads.length,
      openAISpend: openAISpendResult._sum.amount || 0,
      metaSpend: metaSpendResult._sum.amount || 0,
      recentAds: serializedAds,
      platformBreakdown: platformBreakdown.map((item: any) => ({
        platform: item.platform,
        spend: item._sum.amount || 0,
        count: item._count.id,
      })),
      superPACBreakdown: superPACBreakdownWithDetails,
      crossPlatformAnalysis: crossPlatformAnalysis
    }

    console.log('Stats calculated successfully')
    console.log('- Total spend:', stats.totalSpend)
    console.log('- Total ads:', stats.totalAds)
    console.log('- Platforms:', platformBreakdown.length)
    console.log('- Super PACs:', superPACBreakdownWithDetails.length)
    
    return NextResponse.json({ 
      success: true,
      stats,
      ads: serializedAds 
    })
  } catch (error) {
    console.error('Failed to fetch ads:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch ads',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}