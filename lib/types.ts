// lib/types.ts
// Platform definitions with display names and descriptions
export const Platform = {
  FACEBOOK: 'FACEBOOK',
  YOUTUBE: 'YOUTUBE', 
  FEC: 'FEC',
  OPENSECRETS: 'OPENSECRETS',
  ADIMPACT: 'ADIMPACT',
  TV_AD_ARCHIVE: 'TV_AD_ARCHIVE',
  ACLU_WATCH: 'ACLU_WATCH',
} as const

export type Platform = typeof Platform[keyof typeof Platform]

export const PlatformDetails: Record<Platform, { name: string; description: string; color: string }> = {
  [Platform.FACEBOOK]: {
    name: 'Facebook',
    description: 'Meta Ad Library - Political and Issue Ads',
    color: 'bg-blue-500'
  },
  [Platform.YOUTUBE]: {
    name: 'YouTube',
    description: 'Google Transparency Report - Political Ads',
    color: 'bg-red-500'
  },
  [Platform.FEC]: {
    name: 'FEC',
    description: 'Federal Election Commission - Official Records',
    color: 'bg-green-500'
  },
  [Platform.OPENSECRETS]: {
    name: 'OpenSecrets',
    description: 'Center for Responsive Politics - Campaign Finance',
    color: 'bg-purple-500'
  },
  [Platform.ADIMPACT]: {
    name: 'AdImpact',
    description: 'Political Ad Tracking and Analytics',
    color: 'bg-orange-500'
  },
  [Platform.TV_AD_ARCHIVE]: {
    name: 'TV Ad Archive',
    description: 'Internet Archive - Television Political Ads',
    color: 'bg-indigo-500'
  },
  [Platform.ACLU_WATCH]: {
    name: 'ACLU Political Ad Watch',
    description: 'ACLU - Political Advertising Monitoring',
    color: 'bg-pink-500'
  },
}

export const SyncStatus = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const

export type SyncStatus = typeof SyncStatus[keyof typeof SyncStatus]

export interface PoliticalAd {
  id: string
  title: string
  description?: string
  platform: Platform
  platformAdId?: string
  superPACId: string
  amount: number
  targetAudience?: string
  geographicTarget?: string
  startDate: string
  endDate?: string
  impressions?: number
  spend?: number
  adUrl?: string
  thumbnailUrl?: string
  metadata?: any
  superPAC: SuperPAC
}

export interface SuperPAC {
  id: string
  name: string
  funder: 'OpenAI+a16z' | 'Meta'
  description?: string
  politicalAds: PoliticalAd[]
}

export interface SyncResult {
  success: boolean
  recordsProcessed: number
  newAds: number
  updatedAds: number
  error?: string
}

export interface DashboardStats {
  totalSpend: number
  totalAds: number
  openAISpend: number
  metaSpend: number
  recentAds: PoliticalAd[]
  platformBreakdown: { platform: Platform; spend: number; count: number }[]
  superPACBreakdown: { superPAC: string; funder: string; spend: number; count: number }[]
  crossPlatformAnalysis?: { platform: Platform; superPAC: string; funder: string; spend: number; count: number }[]
}

// Helper function to parse metadata
export function parseMetadata(metadata?: string): any {
  if (!metadata) return undefined
  try {
    return JSON.parse(metadata)
  } catch {
    return undefined
  }
}

// Helper function to stringify metadata
export function stringifyMetadata(metadata?: any): string | undefined {
  if (!metadata) return undefined
  try {
    return JSON.stringify(metadata)
  } catch {
    return undefined
  }
}