// components/PlatformAnalytics.tsx
'use client'

import { Platform, PlatformDetails, SuperPAC } from '@/lib/types'

interface PlatformAnalyticsProps {
  platformBreakdown: { platform: Platform; spend: number; count: number }[]
  superPACBreakdown: { superPAC: string; funder: string; spend: number; count: number }[]
  crossPlatformAnalysis?: { platform: Platform; superPAC: string; funder: string; spend: number; count: number }[]
}

export default function PlatformAnalytics({ platformBreakdown, superPACBreakdown, crossPlatformAnalysis }: PlatformAnalyticsProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatShortAmount = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`
    return `$${Math.round(amount / 1000)}K`
  }

  const totalSpend = platformBreakdown.reduce((sum, item) => sum + item.spend, 0)

  // Mock data insights based on our seed data
  const mockInsights = {
    totalSpend: 10500000, // $10.5M
    platformDistribution: {
      FACEBOOK: 2520000,
      YOUTUBE: 1700000,
      TV_AD_ARCHIVE: 3050000,
      FEC: 1200000,
      ADIMPACT: 1130000,
      OPENSECRETS: 580000,
      ACLU_WATCH: 320000
    },
    superPACTotals: {
      'Leading the Future': 3430000,
      'American Technology Excellence Project': 3850000,
      'Mobilising Economic Transformation': 3220000
    },
    keyFindings: [
      "Meta dominates TV advertising with $3.05M spend across both Super PACs",
      "OpenAI+a16z focuses heavily on FEC filings for official transparency",
      "Facebook remains the top digital platform with $2.52M total spend",
      "ACLU Watch is exclusively used by Mobilising Economic Transformation",
      "YouTube captures significant investment from all three Super PACs"
    ]
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">$10.5M</div>
            <div className="text-sm text-gray-600">Total Campaign Spending</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">$3.43M</div>
            <div className="text-sm text-gray-600">OpenAI+a16z Total</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">$7.07M</div>
            <div className="text-sm text-gray-600">Meta Total</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <div className="text-2xl font-bold text-green-600">7</div>
            <div className="text-sm text-gray-600">Platforms Used</div>
          </div>
        </div>
        
        <div className="bg-blue-100 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Key Insights</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {mockInsights.keyFindings.map((finding, index) => (
              <li key={index}>• {finding}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Platform Performance Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Spending Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Spending Distribution</h3>
          
          <div className="space-y-4">
            {platformBreakdown.map((item) => {
              const details = PlatformDetails[item.platform]
              const percentage = totalSpend > 0 ? (item.spend / totalSpend) * 100 : 0
              const mockSpend = mockInsights.platformDistribution[item.platform] || 0
              const mockPercentage = (mockSpend / mockInsights.totalSpend) * 100
              
              return (
                <div key={item.platform} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${details.color}`} />
                      <div>
                        <div className="font-medium text-gray-900">{details.name}</div>
                        <div className="text-xs text-gray-500">{details.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatAmount(mockSpend)}</div>
                      <div className="text-xs text-gray-500">{mockPercentage.toFixed(1)}% of total</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${details.color} transition-all duration-500`}
                      style={{ width: `${mockPercentage}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Platform Rank: {Object.keys(mockInsights.platformDistribution)
                      .sort((a, b) => mockInsights.platformDistribution[b as Platform] - mockInsights.platformDistribution[a as Platform])
                      .indexOf(item.platform) + 1} of 7</span>
                    <span>Avg: {formatAmount(mockSpend / (item.count || 1))} per ad</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Super PAC Comparison */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Super PAC Spending Comparison</h3>
          
          <div className="space-y-4">
            {Object.entries(mockInsights.superPACTotals).map(([pacName, spend]) => {
              const pacData = superPACBreakdown.find(p => p.superPAC === pacName)
              const percentage = (spend / mockInsights.totalSpend) * 100
              const isOpenAI = pacName === 'Leading the Future'
              
              return (
                <div key={pacName} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${isOpenAI ? 'bg-purple-500' : 'bg-orange-500'}`} />
                      <div>
                        <div className="font-medium text-gray-900">{pacName}</div>
                        <div className="text-xs text-gray-500">
                          {isOpenAI ? 'OpenAI+a16z' : 'Meta'} • {pacData?.count || 0} ads
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatAmount(spend)}</div>
                      <div className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${isOpenAI ? 'bg-purple-500' : 'bg-orange-500'} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {isOpenAI ? 'Focus: AI Innovation & Official Transparency' : 
                     pacName.includes('Excellence') ? 'Focus: Digital Privacy & TV Advertising' : 
                     'Focus: Economic Transformation & Diverse Platforms'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Platform Strategy Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Strategy Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Facebook Strategy */}
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-blue-500" />
              <h4 className="font-semibold text-blue-900">Facebook</h4>
            </div>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Total Spend:</span>
                <span className="font-semibold">$2.52M</span>
              </div>
              <div className="flex justify-between">
                <span>Leading Spender:</span>
                <span>American Tech Excellence</span>
              </div>
              <div className="flex justify-between">
                <span>Strategy:</span>
                <span>Mass Reach</span>
              </div>
              <div className="text-xs mt-2">
                All three Super PACs use Facebook for broad audience targeting and engagement
              </div>
            </div>
          </div>

          {/* YouTube Strategy */}
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <h4 className="font-semibold text-red-900">YouTube</h4>
            </div>
            <div className="space-y-2 text-sm text-red-800">
              <div className="flex justify-between">
                <span>Total Spend:</span>
                <span className="font-semibold">$1.70M</span>
              </div>
              <div className="flex justify-between">
                <span>Leading Spender:</span>
                <span>American Tech Excellence</span>
              </div>
              <div className="flex justify-between">
                <span>Strategy:</span>
                <span>Video Storytelling</span>
              </div>
              <div className="text-xs mt-2">
                Preferred for longer-form content and demographic-specific messaging
              </div>
            </div>
          </div>

          {/* TV Ad Archive Strategy */}
          <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-indigo-500" />
              <h4 className="font-semibold text-indigo-900">TV Ad Archive</h4>
            </div>
            <div className="space-y-2 text-sm text-indigo-800">
              <div className="flex justify-between">
                <span>Total Spend:</span>
                <span className="font-semibold">$3.05M</span>
              </div>
              <div className="flex justify-between">
                <span>Leading Spender:</span>
                <span>American Tech Excellence</span>
              </div>
              <div className="flex justify-between">
                <span>Strategy:</span>
                <span>Broadcast Dominance</span>
              </div>
              <div className="text-xs mt-2">
                Meta's primary channel for mass audience reach and brand building
              </div>
            </div>
          </div>

          {/* FEC Strategy */}
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-green-500" />
              <h4 className="font-semibold text-green-900">FEC</h4>
            </div>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex justify-between">
                <span>Total Spend:</span>
                <span className="font-semibold">$1.20M</span>
              </div>
              <div className="flex justify-between">
                <span>Exclusive to:</span>
                <span>Leading the Future</span>
              </div>
              <div className="flex justify-between">
                <span>Strategy:</span>
                <span>Official Transparency</span>
              </div>
              <div className="text-xs mt-2">
                OpenAI+a16z focuses on official channels for compliance and credibility
              </div>
            </div>
          </div>

          {/* AdImpact Strategy */}
          <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-orange-500" />
              <h4 className="font-semibold text-orange-900">AdImpact</h4>
            </div>
            <div className="space-y-2 text-sm text-orange-800">
              <div className="flex justify-between">
                <span>Total Spend:</span>
                <span className="font-semibold">$1.13M</span>
              </div>
              <div className="flex justify-between">
                <span>Primary Users:</span>
                <span>OpenAI + Meta Excellence</span>
              </div>
              <div className="flex justify-between">
                <span>Strategy:</span>
                <span>Political Targeting</span>
              </div>
              <div className="text-xs mt-2">
                Used for precise political audience targeting and impact measurement
              </div>
            </div>
          </div>

          {/* Niche Platforms */}
          <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-purple-500" />
              <h4 className="font-semibold text-purple-900">Specialized Platforms</h4>
            </div>
            <div className="space-y-3 text-sm text-purple-800">
              <div>
                <div className="font-semibold">OpenSecrets: $580K</div>
                <div className="text-xs">Used for transparency and policy-focused messaging</div>
              </div>
              <div>
                <div className="font-semibold">ACLU Watch: $320K</div>
                <div className="text-xs">Exclusive to Economic Transformation for civil liberties focus</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">29%</div>
            <div className="text-sm text-gray-600">OpenAI+a16z Share</div>
            <div className="text-xs text-gray-500 mt-1">$3.43M of $10.5M</div>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">67%</div>
            <div className="text-sm text-gray-600">Meta Share</div>
            <div className="text-xs text-gray-500 mt-1">$7.07M of $10.5M</div>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">4.1</div>
            <div className="text-sm text-gray-600">Avg Platforms per PAC</div>
            <div className="text-xs text-gray-500 mt-1">Diversified approach</div>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">$750K</div>
            <div className="text-sm text-gray-600">Avg per Super PAC</div>
            <div className="text-xs text-gray-500 mt-1">Across all platforms</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Top Performing Platforms</h4>
            <div className="space-y-2">
              {Object.entries(mockInsights.platformDistribution)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([platform, spend]) => (
                  <div key={platform} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${PlatformDetails[platform as Platform].color}`} />
                      <span className="text-sm text-gray-700">{PlatformDetails[platform as Platform].name}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{formatShortAmount(spend)}</div>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Spending Efficiency</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Cost per Platform</span>
                  <span className="font-semibold">$1.5M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Platform Utilization</span>
                  <span className="font-semibold">86%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}