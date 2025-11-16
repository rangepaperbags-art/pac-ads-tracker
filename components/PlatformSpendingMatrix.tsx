// components/PlatformSpendingMatrix.tsx
'use client'

import { Platform, PlatformDetails } from '@/lib/types'

interface SpendingData {
  superPAC: string
  funder: string
  platforms: {
    [key in Platform]?: number
  }
  total: number
}

export default function PlatformSpendingMatrix() {
  // Mock spending data for clear visualization
  const spendingData: SpendingData[] = [
    {
      superPAC: 'Leading the Future',
      funder: 'OpenAI+a16z',
      platforms: {
        FACEBOOK: 750000,
        YOUTUBE: 500000,
        FEC: 1200000,
        OPENSECRETS: 300000,
        ADIMPACT: 680000,
        TV_AD_ARCHIVE: 0, // No spending on TV
        ACLU_WATCH: 0     // No spending on ACLU
      },
      total: 3430000
    },
    {
      superPAC: 'American Technology Excellence Project',
      funder: 'Meta',
      platforms: {
        FACEBOOK: 950000,
        YOUTUBE: 650000,
        FEC: 0,
        OPENSECRETS: 0,
        ADIMPACT: 450000,
        TV_AD_ARCHIVE: 1800000,
        ACLU_WATCH: 0
      },
      total: 3850000
    },
    {
      superPAC: 'Mobilising Economic Transformation',
      funder: 'Meta',
      platforms: {
        FACEBOOK: 820000,
        YOUTUBE: 550000,
        FEC: 0,
        OPENSECRETS: 280000,
        ADIMPACT: 0,
        TV_AD_ARCHIVE: 1250000,
        ACLU_WATCH: 320000
      },
      total: 3220000
    }
  ]

  const allPlatforms = Object.values(Platform)
  const formatAmount = (amount: number) => {
    if (amount === 0) return '-'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatShortAmount = (amount: number) => {
    if (amount === 0) return '-'
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
    return `$${(amount / 1000).toFixed(0)}K`
  }

  // Calculate totals for each platform
  const platformTotals = allPlatforms.reduce((acc, platform) => {
    acc[platform] = spendingData.reduce((sum, pac) => sum + (pac.platforms[platform] || 0), 0)
    return acc
  }, {} as Record<Platform, number>)

  const grandTotal = spendingData.reduce((sum, pac) => sum + pac.total, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {spendingData.map((pac) => (
          <div key={pac.superPAC} className={`bg-white rounded-lg border p-4 ${
            pac.funder === 'OpenAI+a16z' ? 'border-purple-200' : 'border-orange-200'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 text-sm">{pac.superPAC}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                pac.funder === 'OpenAI+a16z' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {pac.funder}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${(pac.total / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Object.values(pac.platforms).filter(amount => amount > 0).length} platforms
            </div>
          </div>
        ))}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4">
          <h3 className="font-semibold text-gray-900 text-sm">Total Spending</h3>
          <div className="text-2xl font-bold text-blue-600">
            ${(grandTotal / 1000000).toFixed(2)}M
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Across all platforms
          </div>
        </div>
      </div>

      {/* Spending Matrix Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Platform Spending Matrix</h3>
          <p className="text-sm text-gray-600 mt-1">
            Detailed breakdown of Super PAC spending across all advertising platforms
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Super PAC</th>
                {allPlatforms.map(platform => (
                  <th key={platform} className="text-center py-4 px-4 font-semibold text-gray-900">
                    <div className="flex flex-col items-center space-y-1">
                      <div className={`w-4 h-4 rounded-full ${PlatformDetails[platform].color}`} />
                      <span className="text-xs">{PlatformDetails[platform].name}</span>
                    </div>
                  </th>
                ))}
                <th className="text-right py-4 px-6 font-semibold text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {spendingData.map((pac, index) => (
                <tr key={pac.superPAC} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{pac.superPAC}</div>
                      <div className={`text-xs ${
                        pac.funder === 'OpenAI+a16z' ? 'text-purple-600' : 'text-orange-600'
                      }`}>
                        {pac.funder}
                      </div>
                    </div>
                  </td>
                  {allPlatforms.map(platform => {
                    const amount = pac.platforms[platform] || 0
                    const percentage = pac.total > 0 ? (amount / pac.total) * 100 : 0
                    
                    return (
                      <td key={platform} className="py-4 px-4 text-center">
                        {amount > 0 ? (
                          <div className="flex flex-col items-center space-y-1">
                            <div className="font-semibold text-gray-900">
                              {formatShortAmount(amount)}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${PlatformDetails[platform].color} transition-all duration-300`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-500">
                              {percentage > 0 ? `${percentage.toFixed(0)}%` : ''}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    )
                  })}
                  <td className="py-4 px-6 text-right">
                    <div className="font-bold text-gray-900">{formatAmount(pac.total)}</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((pac.total / grandTotal) * 100)}% of total
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Platform Totals Row */}
              <tr className="bg-gray-50 border-t border-gray-200">
                <td className="py-4 px-6 font-semibold text-gray-900">Platform Totals</td>
                {allPlatforms.map(platform => (
                  <td key={platform} className="py-4 px-4 text-center font-semibold text-gray-900">
                    {formatShortAmount(platformTotals[platform])}
                  </td>
                ))}
                <td className="py-4 px-6 text-right font-bold text-blue-600">
                  {formatAmount(grandTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-blue-100 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-900 text-sm mb-2">OpenAI+a16z Strategy</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Heavy FEC focus (35% of budget)</li>
              <li>• Strong Facebook & YouTube presence</li>
              <li>• Uses AdImpact for targeting</li>
              <li>• No traditional TV advertising</li>
            </ul>
          </div>
          
          <div className="border border-orange-100 rounded-lg p-4 bg-orange-50">
            <h4 className="font-semibold text-orange-900 text-sm mb-2">Meta Strategy - Excellence Project</h4>
            <ul className="text-xs text-orange-800 space-y-1">
              <li>• Dominant TV advertising (47% of budget)</li>
              <li>• Strong social media presence</li>
              <li>• Uses AdImpact for political targeting</li>
              <li>• No FEC/OpenSecrets focus</li>
            </ul>
          </div>
          
          <div className="border border-green-100 rounded-lg p-4 bg-green-50">
            <h4 className="font-semibold text-green-900 text-sm mb-2">Meta Strategy - Economic Transformation</h4>
            <ul className="text-xs text-green-800 space-y-1">
              <li>• Balanced TV & digital mix</li>
              <li>• Only PAC using ACLU Watch</li>
              <li>• OpenSecrets for transparency</li>
              <li>• Strong Facebook & YouTube investment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Platform Preference Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Preference Analysis</h3>
        <div className="space-y-4">
          {allPlatforms.map(platform => {
            const total = platformTotals[platform]
            const platformSpending = spendingData.map(pac => ({
              pac: pac.superPAC,
              amount: pac.platforms[platform] || 0,
              percentage: total > 0 ? ((pac.platforms[platform] || 0) / total) * 100 : 0,
              funder: pac.funder
            })).filter(item => item.amount > 0)
            
            if (platformSpending.length === 0) return null
            
            return (
              <div key={platform} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${PlatformDetails[platform].color}`} />
                    <div>
                      <div className="font-medium text-gray-900">{PlatformDetails[platform].name}</div>
                      <div className="text-xs text-gray-500">{PlatformDetails[platform].description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{formatAmount(total)}</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((total / grandTotal) * 100)}% of total spending
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {platformSpending.map((item, index) => (
                    <div key={item.pac} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          item.funder === 'OpenAI+a16z' ? 'bg-purple-500' : 'bg-orange-500'
                        }`} />
                        <span className="text-sm text-gray-700">{item.pac}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.funder === 'OpenAI+a16z' ? 'bg-purple-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {formatShortAmount(item.amount)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.percentage.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}