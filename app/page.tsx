// app/page.tsx
import Dashboard from '@/components/Dashboard'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Political Spending Transparency
          </h1>
          <p className="mt-2 text-gray-600">
            Tracking Super PAC ads funded by OpenAI+a16z and Meta across multiple platforms
          </p>
        </div>
        <Dashboard />
      </div>
    </div>
  )
}