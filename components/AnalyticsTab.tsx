// components/AnalyticsTab.tsx
'use client'

import { Platform, PlatformDetails } from '@/lib/types'

export default function AnalyticsTab() {
  // Mock analytics data
  const mockAnalytics = {
    overview: {
      totalSpend: 10500000,
      totalAds: 14,
      platformsActive: 7,
      dateRange: 'Jan 15 - Mar 1, 2024'
    },
    performance: {
      engagement: {
        totalImpressions: 28600000,
        avgCTR: 3.8,
        engagementRate: 4.2
      },
      spending: {
        dailyAvg: 175000,
        largestAd: 1800000,
        smallestAd: 280000
      }
    },
    trends: [
      { period: 'Jan 15-31', spend: 3500000, ads: 4, trend: 'up' },
      { period: 'Feb 1-14', spend: 4200000, ads: 6, trend: 'up' },
      { period: 'Feb 15-29', spend: 2800000, ads: 4, trend: 'down' }
    ],
    platformPerformance: [
      { platform: 'FACEBOOK', spend: 2520000, ads: 3, engagement: 4.5, costPerImpression: 0.09 },
      { platform: 'YOUTUBE', spend: 1700000, ads: 3, engagement: 3.8, costPerImpression: 0.12 },
      { platform: 'TV_AD_ARCHIVE', spend: 3050000, ads: 2, engagement: 6.2, costPerImpression: 0.49 },
      { platform: 'FEC', spend: 1200000, ads: 1, engagement: 2.1, costPerImpression: 1.00 },
      { platform: 'ADIMPACT', spend: 1130000, ads: 2, engagement: 4.8, costPerImpression: 0.63 },
      { platform: 'OPENSECRETS', spend: 580000, ads: 2, engagement: 3.2, costPerImpression: 0.45 },
      { platform: 'ACLU_WATCH', spend: 320000, ads: 1, engagement: 5.1, costPerImpression: 0.10 }
    ]
  }

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

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spend</p>
              <p className="text-2xl font-bold text-gray-900">{formatShortAmount(mockAnalytics.overview.totalSpend)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{mockAnalytics.overview.dateRange}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Ads</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.totalAds}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Across {mockAnalytics.overview.platformsActive} platforms</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.performance.engagement.engagementRate}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{mockAnalytics.performance.engagement.totalImpressions.toLocaleString()} impressions</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Daily Spend</p>
              <p className="text-2xl font-bold text-gray-900">{formatShortAmount(mockAnalytics.performance.spending.dailyAvg)}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Over campaign period</p>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance Metrics</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-900">Platform</th>
                <th className="text-right py-3 font-medium text-gray-900">Spend</th>
                <th className="text-right py-3 font-medium text-gray-900">Ads</th>
                <th className="text-right py-3 font-medium text-gray-900">Engagement</th>
                <th className="text-right py-3 font-medium text-gray-900">Cost/Impression</th>
                <th className="text-right py-3 font-medium text-gray-900">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {mockAnalytics.platformPerformance.map((platform) => (
                <tr key={platform.platform} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${PlatformDetails[platform.platform as Platform].color}`} />
                      <span className="font-medium text-gray-900">{PlatformDetails[platform.platform as Platform].name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right font-semibold text-gray-900">
                    {formatShortAmount(platform.spend)}
                  </td>
                  <td className="py-3 text-right text-gray-600">
                    {platform.ads}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="font-medium text-gray-900">{platform.engagement}%</span>
                      <div className={`w-2 h-2 rounded-full ${
                        platform.engagement > 4 ? 'bg-green-500' : 
                        platform.engagement > 3 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </td>
                  <td className="py-3 text-right text-gray-600">
                    ${platform.costPerImpression.toFixed(2)}
                  </td>
                  <td className="py-3 text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      platform.costPerImpression < 0.5 ? 'bg-green-100 text-green-800' :
                      platform.costPerImpression < 0.8 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {platform.costPerImpression < 0.5 ? 'High' :
                       platform.costPerImpression < 0.8 ? 'Medium' : 'Low'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trends and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trends */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Trends</h3>
          <div className="space-y-4">
            {mockAnalytics.trends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    trend.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">{trend.period}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{formatShortAmount(trend.spend)}</div>
                  <div className="text-xs text-gray-500">{trend.ads} ads</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-blue-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Top Performer</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">TV Ad Archive shows highest engagement at 6.2%</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-green-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Cost Efficient</span>
              </div>
              <p className="text-sm text-green-700 mt-1">Facebook delivers lowest cost per impression at $0.09</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-purple-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">High Potential</span>
              </div>
              <p className="text-sm text-purple-700 mt-1">ACLU Watch shows strong engagement with niche audiences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Note */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-purple-900">Analytics Demo Data</h4>
            <p className="text-sm text-purple-700 mt-1">
              This analytics dashboard shows performance metrics and trends based on mock campaign data. 
              In production, these metrics would update in real-time as new ad data is collected.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}