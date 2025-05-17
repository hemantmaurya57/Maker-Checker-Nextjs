import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded border">
      <h4 className="text-lg font-medium mb-2">{title}</h4>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}