import React from 'react';

export default function TestBroadcast() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-gray-700">Test Broadcast</div>
      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors">
        Switch to Maker Role
      </button>
    </div>
  );
}