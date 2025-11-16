// components/AdCard.tsx
import { PoliticalAd } from '@/lib/types'

interface AdCardProps {
  ad: PoliticalAd
}

export default function AdCard({ ad }: AdCardProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getPlatformColor = (platform: string) => {
    const colors = {
      FACEBOOK: 'bg-blue-100 text-blue-800',
      YOUTUBE: 'bg-red-100 text-red-800',
      FEC: 'bg-green-100 text-green-800',
      OPENSECRETS: 'bg-purple-100 text-purple-800',
      ADIMPACT: 'bg-orange-100 text-orange-800',
      TV_AD_ARCHIVE: 'bg-indigo-100 text-indigo-800',
      ACLU_WATCH: 'bg-pink-100 text-pink-800',
    }
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Parse metadata if it's a string
  const metadata = typeof ad.metadata === 'string' 
    ? (() => { try { return JSON.parse(ad.metadata) } catch { return undefined } })()
    : ad.metadata

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
          {ad.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(ad.platform)}`}>
          {ad.platform.replace('_', ' ')}
        </span>
      </div>
      
      {ad.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {ad.description}
        </p>
      )}
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Super PAC:</span>
          <span className="font-medium">{ad.superPAC.name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500">Amount:</span>
          <span className="font-bold text-green-600">{formatAmount(ad.amount)}</span>
        </div>
        
        {ad.impressions && (
          <div className="flex justify-between">
            <span className="text-gray-500">Impressions:</span>
            <span className="font-medium">
              {new Intl.NumberFormat().format(ad.impressions)}
            </span>
          </div>
        )}
        
        {ad.geographicTarget && (
          <div className="flex justify-between">
            <span className="text-gray-500">Target:</span>
            <span className="font-medium">{ad.geographicTarget}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-500">Start Date:</span>
          <span className="font-medium">
            {new Date(ad.startDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      {/* Display metadata if available */}
      {metadata && Object.keys(metadata).length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
              Additional Details
            </summary>
            <div className="mt-2 text-xs text-gray-600">
              <pre>{JSON.stringify(metadata, null, 2)}</pre>
            </div>
          </details>
        </div>
      )}
      
      {ad.adUrl && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <a
            href={ad.adUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Ad →
          </a>
        </div>
      )}
    </div>
  )
}