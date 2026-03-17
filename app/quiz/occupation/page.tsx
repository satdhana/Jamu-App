"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function OccupationPage() {
  const options = ["Student", "Corporate", "Athlete", "Creative", "Healthcare", "Freelance"];
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-[#2A1B17] text-white p-8 flex flex-col justify-center">
      <h2 className="text-2xl font-light mb-10 text-center">What do you do for a <br/> <span className="font-bold">Living?</span></h2>
      
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full">
        {options.map((opt) => (
          <button 
            key={opt}
            onClick={() => setSelected(opt)}
            className={`h-24 rounded-xl border transition-all ${selected === opt ? 'bg-white text-[#2A1B17] border-white' : 'border-white/20 hover:border-white/50'}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <Link href="/quiz/personality" className="mt-12 self-end bg-white/10 p-4 rounded-full">
        <span className="text-2xl">→</span>
      </Link>
    </div>
  );
}