
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Change Request Form', href: '/change-request-form' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Maker-Checker', href: '/maker-checker' },
  ];

  return (
    <nav className="w-64 bg-white border-r">
      {navItems.map(item => {
        const isActive = pathname === item.href;
        return (
          <Link href={item.href} key={item.name}>
            <div
              className={`p-4 cursor-pointer ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {item.name}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
