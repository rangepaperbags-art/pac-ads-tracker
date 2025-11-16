// components/DataSync.tsx
'use client'

import { useState } from 'react'

interface DataSyncProps {
  onSyncComplete?: () => void
}

export default function DataSync({ onSyncComplete }: DataSyncProps) {
  const [isSyncing, setIsSyncing] = useState<boolean>(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSync = async (): Promise<void> => {
    setIsSyncing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/ads/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform: 'TEST' }),
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        setLastSync(new Date())
        setError(null)
        onSyncComplete?.()
      } else {
        throw new Error(data.error || 'Sync failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sync failed'
      setError(errorMessage)
      console.error('Sync error:', err)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Data Sync</h3>
          <p className="text-sm text-gray-500">
            {lastSync 
              ? `Last sync: ${lastSync.toLocaleString()}`
              : 'Ready to sync'
            }
          </p>
        </div>
        
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}