"use client";
import React from 'react';
import Link from 'next/link';

export default function QuizBirthdate() {
  return (
    <div className="min-h-screen bg-[#2A1B17] text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-10">
        <h2 className="text-2xl font-light tracking-tight text-center">
          When is your <br/> <span className="font-bold">birthdate?</span>
        </h2>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="DD/MM/YYYY" 
            className="flex-1 bg-white text-gray-900 p-4 rounded-sm focus:outline-none"
          />
          <Link href="/quiz/occupation" className="bg-[#FF4D4D] p-4 flex items-center justify-center rounded-sm">
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}