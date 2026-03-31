"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ReflectionsPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const moods = [
    { id: 1, emoji: '🧘', label: 'Calm' },
    { id: 2, emoji: '⚡', label: 'Energetic' },
    { id: 3, emoji: '🍃', label: 'Fresh' },
    { id: 4, emoji: '😴', label: 'Tired' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col pb-32">
      
      {/* 1. Header Section sesuai Desain */}
      <header className="p-8 pt-16">
        <h1 className="text-4xl font-black italic tracking-tighter leading-tight">
          Daily <br /> Reflection
        </h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-4">
          How do you feel after <br /> today's brew?
        </p>
      </header>

      <main className="px-8 space-y-12">
        
        {/* 2. Mood Selector (Elemen Melingkar) */}
        <section className="flex justify-between items-center px-2">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className="flex flex-col items-center group"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 border ${
                selectedMood === mood.id 
                ? 'bg-emerald-800 border-emerald-800 shadow-xl scale-110' 
                : 'bg-gray-50 border-gray-100 opacity-60'
              }`}>
                {mood.emoji}
              </div>
              <span className={`text-[9px] font-black uppercase mt-3 tracking-widest transition-colors ${
                selectedMood === mood.id ? 'text-emerald-900' : 'text-gray-300'
              }`}>
                {mood.label}
              </span>
            </button>
          ))}
        </section>

        {/* 3. Reflection Note Card */}
        <section className="space-y-4">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">
            Personal Notes
          </label>
          <div className="bg-gray-50 rounded-[3rem] p-8 border border-gray-100 shadow-inner">
            <textarea 
              placeholder="Write how your body feels after drinking Jamu today..."
              className="w-full h-48 bg-transparent text-sm italic font-medium text-gray-600 outline-none resize-none placeholder:opacity-30"
            />
          </div>
        </section>

        {/* 4. Save Button */}
        <button 
          className="w-full py-6 bg-[#2A1B17] text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl active:scale-95 transition-transform"
        >
          Save Reflection
        </button>

      </main>

      {/* Info tambahan di bawah button jika diperlukan */}
      <p className="text-center text-[9px] font-bold text-gray-300 uppercase mt-8 tracking-widest">
        Step 3 of 3 • Journey Completed
      </p>
    </div>
  );
}