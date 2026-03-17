"use client";
import React from 'react';
import Link from 'next/link';

export default function FinalProductPage() {
  return (
    <div className="min-h-screen bg-[#2A1B17] p-4 flex flex-col items-center justify-center">
      
      {/* Container Utama Berbentuk Botol */}
      <div className="relative w-full max-w-[340px] h-[750px] bg-white shadow-2xl overflow-hidden
        /* Rahasia Bentuk Botol: Radius berbeda untuk atas dan bawah */
        rounded-t-[140px] rounded-b-[40px] flex flex-col">
        
        {/* Leher Botol (Aksen Tambahan di Paling Atas) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-100 rounded-b-lg border-x border-b border-gray-200"></div>

        {/* Header Content */}
        <div className="p-10 pt-20 text-center">
          <h1 className="text-4xl font-black text-[#2A1B17] leading-tight">Jamu <br/> Name 1</h1>
          <div className="mt-2 inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase rounded-full tracking-widest">
            Perfect Match
          </div>
        </div>

        {/* Stats Area (80% & 30%) */}
        <div className="flex-1 px-10 space-y-10">
          
          {/* Ingredient 1 */}
          <div className="relative group">
            <p className="text-[10px] uppercase font-black text-gray-300 tracking-tighter">Ingredients 1</p>
            <div className="flex justify-between items-end">
              <h2 className="text-7xl font-black italic text-[#2A1B17] tracking-tighter leading-none">80%</h2>
              <span className="text-3xl text-emerald-500 mb-1">〉</span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mt-1">Ingredients Mass</p>
          </div>

          {/* Ingredient 2 */}
          <div className="relative group">
            <p className="text-[10px] uppercase font-black text-gray-300 tracking-tighter">Ingredients 2</p>
            <div className="flex justify-between items-end">
              <h2 className="text-7xl font-black italic text-[#2A1B17] tracking-tighter leading-none">30%</h2>
              <span className="text-3xl text-orange-400 mb-1">〉</span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mt-1">Ingredients Mass</p>
          </div>

          {/* Benefits Section */}
          <div className="pt-8 border-t border-dashed border-gray-200">
            <p className="text-[11px] font-black uppercase text-[#2A1B17] mb-3">Health Benefits:</p>
            <ul className="space-y-2">
              {['Natural Detoxification', 'Immune System Booster', 'Mental Clarity'].map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-600 italic font-medium">
                  <span className="w-1.5 h-1.5 bg-[#2A1B17] rounded-full"></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons (Diletakkan di dasar botol) */}
        <div className="p-6 bg-gray-50/50 grid grid-cols-2 gap-3 border-t border-gray-100">
          <Link href="/quiz/recommendation" className="py-4 border border-gray-200 rounded-2xl text-[9px] font-bold uppercase text-gray-400 text-center hover:bg-white transition">
            Back
          </Link>
          <button className="py-4 bg-[#2A1B17] text-white rounded-2xl text-[9px] font-bold uppercase shadow-lg active:scale-95 transition">
            Create Jamu
          </button>
        </div>
      </div>

      {/* Label bawah botol (opsional untuk estetika) */}
      <p className="mt-6 text-[10px] text-white/30 uppercase tracking-[0.3em] font-light">Authentic Jamudex Recipe</p>
    </div>
  );
}