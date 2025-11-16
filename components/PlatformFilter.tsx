// components/PlatformFilter.tsx
'use client'

import { Platform, PlatformDetails } from '@/lib/types'

interface PlatformFilterProps {
  selectedPlatforms: Platform[]
  onPlatformsChange: (platforms: Platform[]) => void
}

export default function PlatformFilter({ selectedPlatforms, onPlatformsChange }: PlatformFilterProps) {
  const allPlatforms = Object.values(Platform)

  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformsChange(selectedPlatforms.filter(p => p !== platform))
    } else {
      onPlatformsChange([...selectedPlatforms, platform])
    }
  }

  const selectAllPlatforms = () => {
    onPlatformsChange(allPlatforms)
  }

  const clearAllPlatforms = () => {
    onPlatformsChange([])
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter by Platform</h3>
        <div className="flex space-x-2">
          <button
            onClick={selectAllPlatforms}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
          >
            All
          </button>
          <button
            onClick={clearAllPlatforms}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {allPlatforms.map((platform) => {
          const details = PlatformDetails[platform]
          const isSelected = selectedPlatforms.includes(platform)
          
          return (
            <button
              key={platform}
              onClick={() => togglePlatform(platform)}
              className={`p-3 border rounded-lg text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <div className={`w-3 h-3 rounded-full ${details.color}`} />
                <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                  {details.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">
                {details.description}
              </p>
              <div className={`mt-2 text-xs ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                {isSelected ? 'Selected' : 'Click to select'}
              </div>
            </button>
          )
        })}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            Showing ads from {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}:{' '}
            {selectedPlatforms.map(p => PlatformDetails[p].name).join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}