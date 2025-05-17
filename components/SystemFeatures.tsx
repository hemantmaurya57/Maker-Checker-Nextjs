import React from 'react';
import FeatureCard from './FeatureCard';

export default function SystemFeatures() {
  const features = [
    {
      title: 'Scalable Architecture',
      description: 'Scalable architecture capable of meeting the demands of high-volume transaction processing'
    },
    {
      title: 'PKI Based Security',
      description: 'Environment Authentication, confidentiality, non-repudiation, and integrity with a PKI based security environment'
    },
    {
      title: 'Easy Integration',
      description: 'Simplified integration with existing banking systems and workflows'
    }
  ];
  
  return (
    <div>
      <h3 className="text-xl font-medium mb-4">WHAT MAKER-CHECKER OFFERS</h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} />
        ))}
      </div>
    </div>
  );
}
