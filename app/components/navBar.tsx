"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: '🏠' },
    { name: 'Library', href: '/catalogue', icon: '📚' },
    { name: 'My Jamu', href: '/my-jamu', icon: '✨' },
    { name: 'Reflect', href: '/reflections', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-8 py-4 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          // Check if current path matches item href
          const isActive = pathname === item.href;

          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center group">
              <div className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110 opacity-100' : 'opacity-30 group-hover:opacity-50'}`}>
                {item.icon}
              </div>
              <span className={`text-[9px] font-black mt-1 uppercase tracking-tighter transition-colors ${isActive ? 'text-emerald-900' : 'text-gray-400'}`}>
                {item.name}
              </span>
              {/* Dot Indicator */}
              <div className={`w-1 h-1 rounded-full mt-1 transition-all ${isActive ? 'bg-emerald-900 scale-100' : 'bg-transparent scale-0'}`}></div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}