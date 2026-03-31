"use client";
import React from 'react';
import { useApp } from '@/app/context/appContext';
import Link from 'next/link';

export default function MyJamu() {
  const { myCourses } = useApp();

  return (
    <div className="min-h-screen bg-white p-6 pb-24">
      <h1 className="text-3xl font-black italic tracking-tighter mb-8 pt-6">My Jamu Course</h1>
      
      <div className="space-y-4">
        {myCourses.map((course: any) => (
          <div key={course.id} className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black">{course.name}</h3>
              <p className="text-[10px] font-bold text-emerald-600 uppercase">Day {course.day}/{course.totalDays} • {course.status}</p>
            </div>
            <div className="text-2xl opacity-20">〉</div>
          </div>
        ))}

        <Link href="/catalogue" className="block p-8 border-2 border-dashed border-stone-200 rounded-[2.5rem] text-center text-stone-400 font-bold text-sm">
          + Start New Course
        </Link>
      </div>
    </div>
  );
}