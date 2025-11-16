// components/DemoSummary.tsx
'use client'

export default function DemoSummary() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-100 p-2 rounded-lg">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Demo Data Overview</h3>
          <p className="text-sm text-gray-600">This dashboard shows mock data for client presentation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="bg-white rounded-lg p-3 border border-blue-100">
          <div className="font-semibold text-gray-900">$10.5M</div>
          <div className="text-gray-600">Total Spending</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-purple-100">
          <div className="font-semibold text-purple-700">$3.43M</div>
          <div className="text-gray-600">OpenAI+a16z</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-orange-100">
          <div className="font-semibold text-orange-700">$7.07M</div>
          <div className="text-gray-600">Meta</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-green-100">
          <div className="font-semibold text-gray-900">14 Ads</div>
          <div className="text-gray-600">Across 7 Platforms</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-100 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This is demonstration data showing how the platform tracks Super PAC spending across multiple advertising platforms in real-time. Check the "Spending Matrix" tab for detailed breakdowns.
        </p>
      </div>
    </div>
  )
}