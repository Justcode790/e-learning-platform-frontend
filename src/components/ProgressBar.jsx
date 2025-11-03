import React from 'react';

export default function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
      <div
        className="bg-blue-600 h-2 rounded transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
