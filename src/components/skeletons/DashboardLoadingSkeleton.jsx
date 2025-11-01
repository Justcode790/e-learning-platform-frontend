import React from 'react'

export default function DashboardLoadingSkeleton() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-11 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
      <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-5 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 animate-pulse"
          >
            <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="flex justify-between mb-6">
              <div className="h-5 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
            <div className="h-11 w-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}