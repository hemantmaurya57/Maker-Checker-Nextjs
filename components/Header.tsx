import React from 'react';

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
  // Extract first letter of username for avatar
  const firstLetter = username.split(' ')[1][0];
  
  return (
    <header className="bg-blue-700 text-white p-2 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 mr-2 flex items-center justify-center">
          {/* This is a placeholder for the logo */}
        </div>
        <h1 className="text-xl font-bold">MAKER-CHECKER PORTAL</h1>
      </div>
      
      <div className="flex items-center">
        <span className="mr-2">Welcome, {username}</span>
        <div className="w-8 h-8 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center font-bold">
          {firstLetter}
        </div>
      </div>
    </header>
  );
}
