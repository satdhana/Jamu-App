"use client";
import Link from 'next/link';

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-[#2A1B17] text-white p-10 flex flex-col justify-center">
      <h2 className="text-xl font-light mb-12">Here's What It Says <br/> <span className="font-bold text-3xl italic">about you:</span></h2>
      
      <div className="space-y-12">
        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Theory 1</p>
          <h3 className="text-6xl font-black italic">80%</h3>
          <p className="text-sm opacity-70 mt-2 leading-relaxed italic font-light">
            Detail Description of Theory 1: You tend to have high energy but need calming ingredients for balance.
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Theory 2</p>
          <h3 className="text-6xl font-black italic">80%</h3>
          <p className="text-sm opacity-70 mt-2 leading-relaxed italic font-light">
            Detail Description of Theory 2: Based on your activity, immune support is your primary requirement.
          </p>
        </div>
      </div>

      <Link href="/quiz/recommendation" className="mt-16 self-end text-3xl">▷</Link>
    </div>
  );
}