// components/AnalyticsChart.tsx
'use client'

import { Platform } from '@/lib/types'

interface AnalyticsChartProps {
  data: { platform: Platform; spend: number; count: number }[]
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getPlatformColor = (platform: Platform) => {
    const colors = {
      FACEBOOK: 'bg-blue-500',
      YOUTUBE: 'bg-red-500',
      FEC: 'bg-green-500',
      OPENSECRETS: 'bg-purple-500',
      ADIMPACT: 'bg-orange-500',
      TV_AD_ARCHIVE: 'bg-indigo-500',
      ACLU_WATCH: 'bg-pink-500',
    }
    return colors[platform] || 'bg-gray-500'
  }

  const totalSpend = data.reduce((sum, item) => sum + item.spend, 0)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Spending by Platform
      </h3>
      
      <div className="space-y-4">
        {data.map((item) => {
          const percentage = totalSpend > 0 ? (item.spend / totalSpend) * 100 : 0
          
          return (
            <div key={item.platform} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getPlatformColor(item.platform)}`}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {item.platform.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatAmount(item.spend)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.count} ads
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getPlatformColor(item.platform)} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="text-xs text-gray-500 text-right">
                {percentage.toFixed(1)}% of total spend
              </div>
            </div>
          )
        })}
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No spending data available
        </div>
      )}
    </div>
  )
}