// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { Platform } from '@/lib/types'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed with mock data...')

  // Create Super PACs
  const openAISuperPAC = await prisma.superPAC.upsert({
    where: { name: 'Leading the Future' },
    update: {},
    create: {
      name: 'Leading the Future',
      funder: 'OpenAI+a16z',
      description: 'Super PAC funded by OpenAI and Andreessen Horowitz focusing on AI innovation and technology leadership'
    }
  })

  const metaSuperPAC1 = await prisma.superPAC.upsert({
    where: { name: 'American Technology Excellence Project' },
    update: {},
    create: {
      name: 'American Technology Excellence Project',
      funder: 'Meta',
      description: 'Meta-funded Super PAC advocating for technology policy and digital innovation'
    }
  })

  const metaSuperPAC2 = await prisma.superPAC.upsert({
    where: { name: 'Mobilising Economic Transformation Across America' },
    update: {},
    create: {
      name: 'Mobilising Economic Transformation Across America',
      funder: 'Meta',
      description: 'Meta-funded Super PAC focused on economic transformation through technology'
    }
  })

  console.log('✅ Created Super PACs')

  // Mock political ads data
  const mockAds = [
    // OpenAI+a16z - Leading the Future Ads
    {
      title: 'AI Innovation for American Leadership',
      description: 'Promoting AI development and American technological leadership in the global landscape',
      platform: Platform.FACEBOOK,
      superPACId: openAISuperPAC.id,
      amount: 750000,
      targetAudience: 'Tech professionals, entrepreneurs, voters 25-45',
      geographicTarget: 'National',
      startDate: new Date('2024-01-15'),
      impressions: BigInt(3500000),
      spend: 680000,
      adUrl: 'https://facebook.com/ads/ai-innovation-leadership',
      metadata: JSON.stringify({ 
        reach: 'national', 
        engagement: 'high',
        demographics: ['25-45', 'tech_professionals', 'college_educated'],
        ad_type: 'video',
        duration_seconds: 30
      })
    },
    {
      title: 'The Future is AI - Invest in American Talent',
      description: 'Supporting AI education and workforce development programs nationwide',
      platform: Platform.YOUTUBE,
      superPACId: openAISuperPAC.id,
      amount: 500000,
      targetAudience: 'Educators, students, young professionals 18-35',
      geographicTarget: 'Tech hubs (CA, NY, MA, TX)',
      startDate: new Date('2024-02-01'),
      impressions: BigInt(2800000),
      spend: 450000,
      adUrl: 'https://youtube.com/ads/future-ai-talent',
      metadata: JSON.stringify({ 
        views: 'high', 
        retention: 'medium',
        target_regions: ['California', 'New York', 'Massachusetts', 'Texas'],
        video_length: '2:15',
        ctr: '4.2%'
      })
    },
    {
      title: 'Protecting American AI Sovereignty',
      description: 'Advocating for policies that protect US AI research and development',
      platform: Platform.FEC,
      superPACId: openAISuperPAC.id,
      amount: 1200000,
      targetAudience: 'Policymakers, government officials, industry leaders',
      geographicTarget: 'Washington DC',
      startDate: new Date('2024-01-20'),
      spend: 1150000,
      adUrl: 'https://fec.gov/ads/ai-sovereignty',
      metadata: JSON.stringify({ 
        filing_type: 'independent_expenditure',
        committee_id: 'C00793258',
        purpose: 'issue_advocacy',
        legislation_mentioned: ['AI Innovation Act', 'Tech Competitiveness Bill']
      })
    },
    {
      title: 'OpenAI: Building the Next Generation of AI',
      description: 'Showcasing OpenAI research and development achievements',
      platform: Platform.OPENSECRETS,
      superPACId: openAISuperPAC.id,
      amount: 300000,
      targetAudience: 'Policy analysts, researchers, academic community',
      geographicTarget: 'National',
      startDate: new Date('2024-02-10'),
      spend: 285000,
      adUrl: 'https://opensecrets.org/ads/openai-next-gen',
      metadata: JSON.stringify({ 
        data_source: 'FEC filings',
        transparency_score: '95%',
        related_committees: ['Leading the Future PAC']
      })
    },

    // Meta - American Technology Excellence Project Ads
    {
      title: 'Digital Privacy is a Fundamental Right',
      description: 'Advocating for strong digital privacy protections and user rights',
      platform: Platform.FACEBOOK,
      superPACId: metaSuperPAC1.id,
      amount: 950000,
      targetAudience: 'General population 18+, privacy advocates',
      geographicTarget: 'Swing states',
      startDate: new Date('2024-01-25'),
      impressions: BigInt(4200000),
      spend: 890000,
      adUrl: 'https://facebook.com/ads/digital-privacy-rights',
      metadata: JSON.stringify({ 
        reach: 'targeted',
        engagement: 'very_high',
        demographics: ['18-65', 'all_education_levels'],
        issues: ['privacy', 'digital_rights', 'consumer_protection']
      })
    },
    {
      title: 'Connecting Communities Through Technology',
      description: 'Highlighting how Meta platforms connect people and build communities',
      platform: Platform.YOUTUBE,
      superPACId: metaSuperPAC1.id,
      amount: 650000,
      targetAudience: 'General population, small businesses, community leaders',
      geographicTarget: 'National',
      startDate: new Date('2024-02-05'),
      impressions: BigInt(3100000),
      spend: 590000,
      adUrl: 'https://youtube.com/ads/connecting-communities',
      metadata: JSON.stringify({ 
        video_type: 'testimonial',
        length: '1:45',
        featured_stories: 3,
        ctr: '3.8%'
      })
    },
    {
      title: 'Supporting Small Business Digital Transformation',
      description: 'Advocating for policies that help small businesses adopt digital tools',
      platform: Platform.ADIMPACT,
      superPACId: metaSuperPAC1.id,
      amount: 450000,
      targetAudience: 'Small business owners, entrepreneurs, local chambers',
      geographicTarget: 'Midwest, Southeast',
      startDate: new Date('2024-02-15'),
      impressions: BigInt(1800000),
      spend: 420000,
      adUrl: 'https://adimpact.com/ads/small-business-digital',
      metadata: JSON.stringify({ 
        market_impact: 'high',
        competitive_race: 'yes',
        target_districts: ['OH-01', 'MI-08', 'PA-07', 'NC-09']
      })
    },
    {
      title: 'The Future of Digital Innovation',
      description: 'Promoting policies that foster innovation and technological advancement',
      platform: Platform.TV_AD_ARCHIVE,
      superPACId: metaSuperPAC1.id,
      amount: 1800000,
      targetAudience: 'General public, evening news viewers',
      geographicTarget: 'National cable + key markets',
      startDate: new Date('2024-01-30'),
      impressions: BigInt(8500000),
      spend: 1750000,
      adUrl: 'https://archive.org/tv-ads/digital-innovation-future',
      metadata: JSON.stringify({ 
        broadcast_networks: ['CNN', 'MSNBC', 'Fox News'],
        air_time: 'prime_time',
        production_quality: 'high',
        estimated_viewers: '8.5M'
      })
    },

    // Meta - Mobilising Economic Transformation Ads
    {
      title: 'Economic Growth Through Digital Infrastructure',
      description: 'Investing in nationwide digital infrastructure development and broadband access',
      platform: Platform.FACEBOOK,
      superPACId: metaSuperPAC2.id,
      amount: 820000,
      targetAudience: 'Rural communities, infrastructure advocates, local officials',
      geographicTarget: 'Rural America',
      startDate: new Date('2024-02-08'),
      impressions: BigInt(2900000),
      spend: 760000,
      adUrl: 'https://facebook.com/ads/digital-infrastructure-growth',
      metadata: JSON.stringify({ 
        target_demographics: ['rural', 'small_town'],
        key_issues: ['broadband', 'infrastructure', 'economic_development'],
        engagement_rate: '5.1%'
      })
    },
    {
      title: 'Creating Tech Jobs in Every Community',
      description: 'Supporting programs that bring tech education and jobs to underserved areas',
      platform: Platform.YOUTUBE,
      superPACId: metaSuperPAC2.id,
      amount: 550000,
      targetAudience: 'Young adults, career changers, community college students',
      geographicTarget: 'Urban centers, rust belt',
      startDate: new Date('2024-02-12'),
      impressions: BigInt(2400000),
      spend: 510000,
      adUrl: 'https://youtube.com/ads/tech-jobs-community',
      metadata: JSON.stringify({ 
        success_stories: 5,
        program_partners: ['Local colleges', 'Tech training orgs'],
        call_to_action: 'Learn about tech careers'
      })
    },
    {
      title: 'Digital Skills for the 21st Century Economy',
      description: 'Advocating for digital literacy and skills training programs',
      platform: Platform.ACLU_WATCH,
      superPACId: metaSuperPAC2.id,
      amount: 320000,
      targetAudience: 'Educators, policymakers, workforce development boards',
      geographicTarget: 'National',
      startDate: new Date('2024-02-18'),
      spend: 300000,
      adUrl: 'https://aclu.org/ads/digital-skills-economy',
      metadata: JSON.stringify({ 
        civil_liberties_focus: 'educational_equity',
        monitoring_category: 'education_advocacy',
        transparency_rating: 'excellent'
      })
    },
    {
      title: 'Building an Inclusive Digital Economy',
      description: 'Promoting diversity and inclusion in the technology sector',
      platform: Platform.OPENSECRETS,
      superPACId: metaSuperPAC2.id,
      amount: 280000,
      targetAudience: 'Diversity advocates, HR professionals, corporate leaders',
      geographicTarget: 'National',
      startDate: new Date('2024-02-20'),
      spend: 265000,
      adUrl: 'https://opensecrets.org/ads/inclusive-digital-economy',
      metadata: JSON.stringify({ 
        data_coverage: 'comprehensive',
        related_issues: ['workplace_diversity', 'tech_equity'],
        source_validation: 'verified'
      })
    },
    {
      title: 'The American Tech Renaissance',
      description: 'Celebrating American technology innovation and global leadership',
      platform: Platform.TV_AD_ARCHIVE,
      superPACId: metaSuperPAC2.id,
      amount: 1250000,
      targetAudience: 'General public, patriotic audiences',
      geographicTarget: 'National broadcast',
      startDate: new Date('2024-02-25'),
      impressions: BigInt(6200000),
      spend: 1200000,
      adUrl: 'https://archive.org/tv-ads/tech-renaissance',
      metadata: JSON.stringify({ 
        networks: ['ABC', 'CBS', 'NBC'],
        time_slots: ['evening_news', 'primetime'],
        production_cost: 'high',
        celebrity_endorsement: 'yes'
      })
    },
    {
      title: 'Protecting Our Digital Future',
      description: 'Ensuring American leadership in emerging technologies',
      platform: Platform.ADIMPACT,
      superPACId: openAISuperPAC.id,
      amount: 680000,
      targetAudience: 'Tech investors, policymakers, industry analysts',
      geographicTarget: 'Coastal tech centers',
      startDate: new Date('2024-03-01'),
      impressions: BigInt(2500000),
      spend: 640000,
      adUrl: 'https://adimpact.com/ads/protecting-digital-future',
      metadata: JSON.stringify({ 
        market_analysis: 'comprehensive',
        swing_voter_targeting: 'effective',
        key_messages: ['innovation', 'security', 'leadership']
      })
    }
  ]

  // Create all mock ads
  for (const adData of mockAds) {
    await prisma.politicalAd.create({
      data: adData
    })
  }

  console.log(`✅ Created ${mockAds.length} mock political ads`)

  // Create some sync logs to show activity
  const syncPlatforms = [
    Platform.FACEBOOK,
    Platform.YOUTUBE,
    Platform.FEC,
    Platform.OPENSECRETS,
    Platform.ADIMPACT,
    Platform.TV_AD_ARCHIVE,
    Platform.ACLU_WATCH
  ]

  for (const platform of syncPlatforms) {
    await prisma.adSyncLog.create({
      data: {
        platform,
        status: 'COMPLETED',
        recordsFetched: Math.floor(Math.random() * 50) + 10,
        startedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
        completedAt: new Date(),
      }
    })
  }

  console.log('✅ Created sync log entries')

  // Display summary
  const totalSpend = mockAds.reduce((sum, ad) => sum + ad.amount, 0)
  const openAISpend = mockAds
    .filter(ad => ad.superPACId === openAISuperPAC.id)
    .reduce((sum, ad) => sum + ad.amount, 0)
  const metaSpend = mockAds
    .filter(ad => ad.superPACId !== openAISuperPAC.id)
    .reduce((sum, ad) => sum + ad.amount, 0)

  console.log('\n📊 MOCK DATA SUMMARY:')
  console.log('===================')
  console.log(`Total Super PACs: 3`)
  console.log(`Total Political Ads: ${mockAds.length}`)
  console.log(`Total Spending: $${(totalSpend / 1000000).toFixed(2)}M`)
  console.log(`OpenAI+a16z Spending: $${(openAISpend / 1000000).toFixed(2)}M`)
  console.log(`Meta Spending: $${(metaSpend / 1000000).toFixed(2)}M`)
  console.log('\n🏢 Super PAC Breakdown:')
  console.log(`- Leading the Future (OpenAI+a16z): $${(openAISpend / 1000000).toFixed(2)}M`)
  console.log(`- American Technology Excellence Project (Meta): $${(
    mockAds.filter(ad => ad.superPACId === metaSuperPAC1.id).reduce((sum, ad) => sum + ad.amount, 0) / 1000000
  ).toFixed(2)}M`)
  console.log(`- Mobilising Economic Transformation (Meta): $${(
    mockAds.filter(ad => ad.superPACId === metaSuperPAC2.id).reduce((sum, ad) => sum + ad.amount, 0) / 1000000
  ).toFixed(2)}M`)
  
  console.log('\n📱 Platform Distribution:')
  const platformStats = mockAds.reduce((acc, ad) => {
    acc[ad.platform] = (acc[ad.platform] || 0) + ad.amount
    return acc
  }, {} as Record<string, number>)
  
  Object.entries(platformStats).forEach(([platform, spend]) => {
    console.log(`- ${platform}: $${(spend / 1000000).toFixed(2)}M`)
  })

  console.log('\n🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })