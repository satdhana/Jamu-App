"use client";
import React from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/appContext';

export default function Dashboard() {
  const { myCourses } = useApp();

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="p-6 pt-12 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">Halo, Dafa!</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kamis, 25 Maret 2026</p>
        </div>
        <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center border border-stone-200">👤</div>
      </header>

      <main className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100">
            <p className="text-[10px] font-black uppercase text-orange-400 mb-1">Energy</p>
            <p className="text-4xl font-black italic text-orange-700">85%</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100">
            <p className="text-[10px] font-black uppercase text-emerald-400 mb-1">Focus</p>
            <p className="text-4xl font-black italic text-emerald-700">72%</p>
          </div>
        </div>

        {/* Active Course Card */}
        <section className="space-y-4">
          <h2 className="text-lg font-black italic tracking-tighter">Ongoing Journey</h2>
          {myCourses.map((course: any) => (
            <Link href="/my-jamu" key={course.id}>
              <div className="bg-[#2A1B17] p-6 rounded-[2.5rem] text-white relative overflow-hidden active:scale-95 transition-transform">
                <p className="text-[10px] font-bold text-orange-400 uppercase mb-1">Day {course.day} of {course.totalDays}</p>
                <h3 className="text-2xl font-black italic">{course.name}</h3>
                <div className="mt-4 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: `${(course.day/course.totalDays)*100}%` }}></div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/reflections" className="p-6 bg-gray-50 rounded-[2rem] text-center border border-gray-100 font-bold text-xs uppercase">
            📝 Reflect
          </Link>
          <Link href="/catalogue" className="p-6 bg-gray-50 rounded-[2rem] text-center border border-gray-100 font-bold text-xs uppercase">
            🔍 Browse
          </Link>
        </div>
      </main>
    </div>
  );
}