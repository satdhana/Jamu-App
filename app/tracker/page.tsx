"use client";
import React from 'react';

export default function JamuTracker() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24 md:pt-20">
      {/* Header Section */}
      <header className="p-6 flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Good Morning,</p>
          <h1 className="text-3xl font-black italic tracking-tighter">Dafa Satdhana</h1>
        </div>
        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-emerald-200">
          👤
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Weekly Calendar Section */}
        <section className="flex justify-between bg-gray-50 p-4 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className={`flex flex-col items-center min-w-[40px] p-2 rounded-2xl transition-colors ${i === 2 ? 'bg-emerald-800 text-white shadow-lg' : ''}`}>
              <span className="text-[10px] font-bold uppercase opacity-60">{day}</span>
              <span className="text-sm font-black mt-1">{23 + i}</span>
            </div>
          ))}
        </section>

        {/* Grid Stats Section (Energi, Hidrasi, dll) */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100 relative overflow-hidden group">
            <h3 className="text-[10px] font-black uppercase text-orange-400 mb-1">Energy Level</h3>
            <p className="text-4xl font-black italic text-orange-700 leading-none">85%</p>
            <div className="absolute -right-2 -bottom-2 text-6xl opacity-10">⚡</div>
          </div>
          
          <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase text-emerald-400 mb-1">Hydration</h3>
            <p className="text-4xl font-black italic text-emerald-700 leading-none">60%</p>
            <div className="absolute -right-2 -bottom-2 text-6xl opacity-10">💧</div>
          </div>
        </section>

        {/* Active Jamu Section (Video/Visual Area) */}
        <section className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h2 className="text-xl font-black italic tracking-tighter">Current Course</h2>
            <span className="text-[10px] font-bold text-emerald-600 uppercase">Day 4 of 7</span>
          </div>

          <div className="relative aspect-video w-full bg-stone-100 rounded-[2.5rem] border-2 border-dashed border-stone-300 flex flex-col items-center justify-center p-6 text-center">
            {/* Area untuk Visualisasi Jamu yang diminum */}
            <div className="text-4xl mb-2">🌿</div>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Live Brew Progress Visualization
            </p>
            <div className="mt-4 w-48 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="w-[60%] h-full bg-emerald-500"></div>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <button className="w-full py-5 bg-[#2A1B17] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
          Log Today's Jamu
        </button>
      </main>
    </div>
  );
}