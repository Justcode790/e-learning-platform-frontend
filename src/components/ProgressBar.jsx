export default function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)))
  return (
    <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded">
      <div className="h-3 bg-blue-600 rounded" style={{ width: `${pct}%` }} />
    </div>
  )
}

import React from 'react';

export default function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
      <div
        className="bg-blue-600 h-2 rounded"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}


