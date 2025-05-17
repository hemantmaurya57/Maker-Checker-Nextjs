import React from 'react';
import TestBroadcast from './TestBroadcast';
import SystemOverview from './SystemOverview';
import SystemFeatures from './SystemFeatures';

export default function MainContent() {
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <TestBroadcast />
      <SystemOverview />
      <SystemFeatures />
    </main>
  );
}