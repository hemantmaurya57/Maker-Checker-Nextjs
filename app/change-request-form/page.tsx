import React from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import ChangeRequestForm from '@/components/main-component/ChangeRequestForm';

export default function Home() {
  return (
    <div className="maker-checker-portal flex flex-col min-h-screen">
      <Header username="Hemant Maurya" />
      <div className="content-wrapper flex flex-1">
        <Navbar />
        <ChangeRequestForm />
      </div>
    </div>
  );
}