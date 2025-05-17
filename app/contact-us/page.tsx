import React from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import ContactUs from '@/components/main-component/contact-us';

export default function Home() {
  return (
    <div className="maker-checker-portal flex flex-col min-h-screen">
      <Header username="Hemant Maurya" />
      <div className="content-wrapper flex flex-1">
        <Navbar />
        <ContactUs />
      </div>
    </div>
  );
}