"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function PersonalityPage() {
  const traits = ["Introvert", "Extrovert", "Thinker", "Feeler"];
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-[#2A1B17] text-white p-8 flex flex-col justify-center">
      <h2 className="text-2xl font-light mb-10 text-center">What kind of a person <br/> <span className="font-bold">would you describe yourself?</span></h2>
      
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full">
        {traits.map((trait) => (
          <button 
            key={trait}
            onClick={() => setSelected(trait)}
            className={`h-32 rounded-3xl border text-lg font-medium transition-all ${selected === trait ? 'bg-[#FF4D4D] border-[#FF4D4D]' : 'border-white/20'}`}
          >
            {trait}
          </button>
        ))}
      </div>

      <Link href="/quiz/analysis" className="mt-12 self-end bg-white/10 p-4 rounded-full">
        <span className="text-2xl">→</span>
      </Link>
    </div>
  );
}