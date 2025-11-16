// components/AdsTab.tsx
'use client'

import { PoliticalAd, Platform, PlatformDetails } from '@/lib/types'
import AdCard from './AdCard'

interface AdsTabProps {
  filteredAds: PoliticalAd[]
  selectedPlatforms: Platform[]
  stats: any
}

export default function AdsTab({ filteredAds, selectedPlatforms, stats }: AdsTabProps) {
  // Mock ads data for demonstration
  const mockAds: PoliticalAd[] = [
    {
      id: 'mock-1',
      title: 'AI Innovation for American Leadership',
      description: 'Promoting AI development and American technological leadership in the global landscape',
      platform: 'FACEBOOK' as Platform,
      platformAdId: 'fb_12345',
      superPACId: 'pac-1',
      amount: 750000,
      targetAudience: 'Tech professionals, entrepreneurs, voters 25-45',
      geographicTarget: 'National',
      startDate: new Date('2024-01-15').toISOString(),
      impressions: 3500000,
      spend: 680000,
      adUrl: 'https://facebook.com/ads/ai-innovation-leadership',
      metadata: { 
        reach: 'national', 
        engagement: 'high',
        demographics: ['25-45', 'tech_professionals', 'college_educated'],
        ad_type: 'video'
      },
      superPAC: {
        id: 'pac-1',
        name: 'Leading the Future',
        funder: 'OpenAI+a16z',
        description: 'Super PAC funded by OpenAI and Andreessen Horowitz',
        politicalAds: []
      }
    },
    {
      id: 'mock-2',
      title: 'Digital Privacy is a Fundamental Right',
      description: 'Advocating for strong digital privacy protections and user rights',
      platform: 'YOUTUBE' as Platform,
      platformAdId: 'yt_67890',
      superPACId: 'pac-2',
      amount: 650000,
      targetAudience: 'General population 18+, privacy advocates',
      geographicTarget: 'Swing states',
      startDate: new Date('2024-02-01').toISOString(),
      impressions: 3100000,
      spend: 590000,
      adUrl: 'https://youtube.com/ads/digital-privacy-rights',
      metadata: { 
        video_type: 'testimonial',
        length: '1:45',
        featured_stories: 3
      },
      superPAC: {
        id: 'pac-2',
        name: 'American Technology Excellence Project',
        funder: 'Meta',
        description: 'Meta-funded Super PAC focusing on technology policy',
        politicalAds: []
      }
    },
    {
      id: 'mock-3',
      title: 'Building Digital Infrastructure for All',
      description: 'Investing in nationwide digital infrastructure development and broadband access',
      platform: 'TV_AD_ARCHIVE' as Platform,
      platformAdId: 'tv_54321',
      superPACId: 'pac-3',
      amount: 1250000,
      targetAudience: 'Rural communities, infrastructure advocates',
      geographicTarget: 'National broadcast',
      startDate: new Date('2024-02-10').toISOString(),
      impressions: 6200000,
      spend: 1200000,
      adUrl: 'https://archive.org/tv-ads/digital-infrastructure',
      metadata: { 
        networks: ['ABC', 'CBS', 'NBC'],
        time_slots: ['evening_news', 'primetime'],
        production_cost: 'high'
      },
      superPAC: {
        id: 'pac-3',
        name: 'Mobilising Economic Transformation Across America',
        funder: 'Meta',
        description: 'Meta-funded Super PAC focusing on economic transformation',
        politicalAds: []
      }
    },
    {
      id: 'mock-4',
      title: 'Protecting American AI Sovereignty',
      description: 'Advocating for policies that protect US AI research and development',
      platform: 'FEC' as Platform,
      platformAdId: 'fec_98765',
      superPACId: 'pac-1',
      amount: 1200000,
      targetAudience: 'Policymakers, government officials, industry leaders',
      geographicTarget: 'Washington DC',
      startDate: new Date('2024-01-20').toISOString(),
      spend: 1150000,
      adUrl: 'https://fec.gov/ads/ai-sovereignty',
      metadata: { 
        filing_type: 'independent_expenditure',
        committee_id: 'C00793258',
        purpose: 'issue_advocacy'
      },
      superPAC: {
        id: 'pac-1',
        name: 'Leading the Future',
        funder: 'OpenAI+a16z',
        description: 'Super PAC funded by OpenAI and Andreessen Horowitz',
        politicalAds: []
      }
    },
    {
      id: 'mock-5',
      title: 'Creating Tech Jobs in Every Community',
      description: 'Supporting programs that bring tech education and jobs to underserved areas',
      platform: 'ACLU_WATCH' as Platform,
      platformAdId: 'aclu_24680',
      superPACId: 'pac-3',
      amount: 320000,
      targetAudience: 'Young adults, career changers, community college students',
      geographicTarget: 'Urban centers, rust belt',
      startDate: new Date('2024-02-18').toISOString(),
      spend: 300000,
      adUrl: 'https://aclu.org/ads/tech-jobs-community',
      metadata: { 
        civil_liberties_focus: 'educational_equity',
        monitoring_category: 'education_advocacy'
      },
      superPAC: {
        id: 'pac-3',
        name: 'Mobilising Economic Transformation Across America',
        funder: 'Meta',
        description: 'Meta-funded Super PAC focusing on economic transformation',
        politicalAds: []
      }
    }
  ]

  const displayAds = filteredAds.length > 0 ? filteredAds : mockAds

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Political Ads
            {selectedPlatforms.length > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Filtered by {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''})
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Real-time tracking of Super PAC advertisements across all platforms
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500">
            Showing {displayAds.length} ads
          </div>
          <div className="text-xs text-gray-400">
            {mockAds.length} mock examples available
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-sm text-blue-600">Total Ads</div>
          <div className="text-lg font-semibold text-blue-700">{mockAds.length}</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="text-sm text-purple-600">OpenAI+a16z</div>
          <div className="text-lg font-semibold text-purple-700">2 ads</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="text-sm text-orange-600">Meta</div>
          <div className="text-lg font-semibold text-orange-700">3 ads</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-sm text-green-600">Platforms</div>
          <div className="text-lg font-semibold text-green-700">5</div>
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Ad Distribution by Platform</h4>
        <div className="flex flex-wrap gap-4">
          {Object.values(Platform).map(platform => {
            const platformAds = mockAds.filter(ad => ad.platform === platform)
            if (platformAds.length === 0) return null
            
            return (
              <div key={platform} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${PlatformDetails[platform].color}`} />
                <span className="text-sm text-gray-700">{PlatformDetails[platform].name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {platformAds.length}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {displayAds.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2">No ads match your current filters</p>
          <p className="text-sm text-gray-400">Try selecting different platforms or clearing filters</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
          
          {/* Demo Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Demo Mode Active</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Showing mock advertisement data for demonstration purposes. In production, this would display real-time ads from connected platforms.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}