"use client";
import React from 'react';
import Link from 'next/link'; // Import Link wajib ada

export default function RecommendationResult() {
  return (
    <div className="min-h-screen bg-[#2A1B17] text-white flex flex-col">
      <header className="p-8 text-center pt-16">
        <p className="text-sm opacity-70 mb-2 font-light italic">
          According to the chart, these Jamu suits you well
        </p>
        <h1 className="text-3xl font-bold tracking-tighter">Jamu Name 1</h1>
      </header>

      <main className="flex-1 relative flex flex-col items-center justify-end pb-20 overflow-hidden">
        {/* Efek Botol-Botol di Belakang */}
        <div className="absolute bottom-20 flex gap-4 opacity-20 scale-90 grayscale">
          <div className="w-16 h-40 border border-white rounded-t-full"></div>
          <div className="w-16 h-40 border border-white rounded-t-full"></div>
          <div className="w-16 h-40 border border-white rounded-t-full"></div>
        </div>

        {/* Botol Utama - Sekarang bisa di-klik untuk ke halaman Final */}
        <Link href="/quiz/final" className="relative z-10 transition-transform active:scale-95">
          <div className="w-64 h-[450px] bg-white rounded-t-[100px] rounded-b-xl shadow-2xl flex flex-col p-8 text-gray-900 group">
             <h2 className="text-2xl font-black mb-6">Jamu Name 1</h2>
             
             <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Ingredients 1</p>
                  <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-black italic">80%</span>
                    <span className="text-xs text-gray-300 group-hover:text-emerald-500">〉</span>
                  </div>
                  <p className="text-[10px] text-gray-500">Ingredients Mass</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Ingredients 2</p>
                  <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-black italic">30%</span>
                    <span className="text-xs text-gray-300 group-hover:text-emerald-500">〉</span>
                  </div>
                  <p className="text-[10px] text-gray-500">Ingredients Mass</p>
                </div>

                <div className="pt-4 border-t border-dashed">
                  <p className="text-[10px] font-bold uppercase mb-2">Benefits:</p>
                  <ul className="text-[10px] space-y-1 list-disc pl-4 opacity-70 font-medium italic">
                    <li>Boost Immune System</li>
                    <li>Reduce Muscle Fatigue</li>
                    <li>Internal Body Warming</li>
                  </ul>
                </div>
             </div>
             {/* Hint agar user tahu ini bisa di-klik */}
             <p className="mt-4 text-[9px] text-center font-bold text-gray-300 animate-pulse">
               CLICK TO SEE DETAILS
             </p>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 px-6 w-full max-w-sm">
          <Link href="/quiz" className="flex-1 py-3 bg-white/10 border border-white/20 rounded text-[10px] font-bold uppercase text-center flex items-center justify-center">
            Choose Different
          </Link>
          <Link href="/quiz/final" className="flex-1 py-3 bg-white text-[#2A1B17] rounded text-[10px] font-bold uppercase text-center flex items-center justify-center shadow-lg">
            Create Jamu
          </Link>
        </div>
      </main>
    </div>
  );
}