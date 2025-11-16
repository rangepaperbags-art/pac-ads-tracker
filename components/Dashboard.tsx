// components/Dashboard.tsx
'use client'

import { useState, useEffect } from 'react'
import { PoliticalAd, DashboardStats, Platform } from '@/lib/types'
import AdCard from './AdCard'
import DataSync from './DataSync'
import PlatformFilter from './PlatformFilter'
import PlatformAnalytics from './PlatformAnalytics'
import PlatformSpendingMatrix from './PlatformSpendingMatrix'
import AdsTab from './AdsTab'
import AnalyticsTab from './AnalyticsTab'
import DemoSummary from './DemoSummary'

// Simple stats cards component
function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Spend</h3>
        <p className="text-3xl font-bold text-blue-600">
          ${(stats.totalSpend / 1000000).toFixed(1)}M
        </p>
        <p className="text-sm text-gray-500 mt-1">{stats.totalAds} total ads</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">OpenAI+a16z Spend</h3>
        <p className="text-3xl font-bold text-purple-600">
          ${(stats.openAISpend / 1000000).toFixed(1)}M
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {Math.round((stats.openAISpend / stats.totalSpend) * 100)}% of total
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Meta Spend</h3>
        <p className="text-3xl font-bold text-orange-600">
          ${(stats.metaSpend / 1000000).toFixed(1)}M
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {Math.round((stats.metaSpend / stats.totalSpend) * 100)}% of total
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Platforms</h3>
        <p className="text-3xl font-bold text-green-600">
          {new Set(stats.recentAds.map(ad => ad.platform)).size}
        </p>
        <p className="text-sm text-gray-500 mt-1">Active platforms</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'matrix' | 'analytics' | 'ads'>('overview')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await fetch('/api/ads')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'API returned unsuccessful response')
      }
      
      if (!data.stats) {
        throw new Error('No stats data in response')
      }
      
      setStats(data.stats)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Filter ads based on selected platforms
  const getFilteredAds = () => {
    if (!stats) return []
    
    let filtered = stats.recentAds
    
    // Filter by selected platforms
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(ad => selectedPlatforms.includes(ad.platform))
    }
    
    return filtered
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 text-red-800 mb-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold">Error Loading Data</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available. Please check if the database is properly seeded.
      </div>
    )
  }

  const filteredAds = getFilteredAds()

  return (
    <div className="space-y-6">
      {/* Demo Summary Banner */}
      <DemoSummary />

      {/* Stats Overview */}
      <StatsCards stats={stats} />

      <DataSync onSyncComplete={fetchDashboardData} />

      {/* Platform Filter - Only show on Ads tab */}
      {activeTab === 'ads' && (
        <PlatformFilter
          selectedPlatforms={selectedPlatforms}
          onPlatformsChange={setSelectedPlatforms}
        />
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'overview' as const, name: 'Platform Analytics' },
              { id: 'matrix' as const, name: 'Spending Matrix' },
              { id: 'analytics' as const, name: 'Performance' },
              { id: 'ads' as const, name: 'Ad Library' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                {tab.id === 'ads' && filteredAds.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {filteredAds.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <PlatformAnalytics
              platformBreakdown={stats.platformBreakdown}
              superPACBreakdown={stats.superPACBreakdown || []}
              crossPlatformAnalysis={stats.crossPlatformAnalysis}
            />
          )}

          {activeTab === 'matrix' && (
            <PlatformSpendingMatrix />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab />
          )}

          {activeTab === 'ads' && (
            <AdsTab 
              filteredAds={filteredAds}
              selectedPlatforms={selectedPlatforms}
              stats={stats}
            />
          )}
        </div>
      </div>
    </div>
  )
}