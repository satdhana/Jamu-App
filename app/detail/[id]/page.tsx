"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function DetailPage() {
  const params = useParams();
  const id = params.id;

  // Data ini nantinya bisa kamu pindahkan ke database/file terpisah
  const data = {
    name: "Jahe Merah",
    scientific: "Zingiber officinale var. rubrum",
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
    stats: { ingredients: "80%", taste: "30%" },
    benefits: ["Menghangatkan tubuh", "Meredakan mual", "Meningkatkan imun"],
    description: "Jahe merah memiliki rasa yang lebih pedas dibandingkan jahe biasa. Sering digunakan sebagai bahan utama jamu untuk pemulihan stamina.",
    location: "Banyak ditemukan di dataran rendah hingga pegunungan di Asia Tenggara.",
    trivia: [
      "Jahe merah hanya dipanen saat sudah tua.",
      "Kandungan minyak asirinya lebih tinggi dari jahe gajah.",
      "Warna merah berasal dari anthocyanin pada kulitnya."
    ]
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header & Back Button */}
      <header className="p-6 flex items-center gap-4 border-b">
        <Link href="/catalogue" className="text-2xl">←</Link>
        <div>
          <h1 className="text-xl font-bold">{data.name}</h1>
          <p className="text-xs text-gray-400 italic">{data.scientific}</p>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Top Section: Image & Stats */}
        <div className="flex gap-6 items-start">
          <div className="w-1/2 aspect-square rounded-3xl overflow-hidden shadow-lg border">
            <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="w-1/2 space-y-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Ingredients 1</p>
              <p className="text-4xl font-black text-emerald-700">{data.stats.ingredients}</p>
              <p className="text-[10px] text-gray-500 font-medium italic">Ingredients Mass</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Taste</p>
              <p className="text-4xl font-black text-orange-600">{data.stats.taste}</p>
              <p className="text-[10px] text-gray-500 font-medium italic">Taste Intensity</p>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <section>
          <h2 className="text-sm font-bold mb-3 border-l-4 border-emerald-500 pl-2">Benefits:</h2>
          <ul className="space-y-1">
            {data.benefits.map((b, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span>•</span> {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Description Box */}
        <p className="text-sm leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          {data.description}
        </p>

        {/* Location & Trivia */}
        <div className="grid grid-cols-1 gap-8">
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-tighter">Located Around</h2>
            <div className="h-40 bg-gray-200 rounded-3xl overflow-hidden relative">
              {/* Placeholder untuk Map atau Gambar Lokasi */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 italic text-xs">
                Map View / Habitat Image
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">{data.location}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-tighter text-orange-800">Fun Facts / Trivia</h2>
            <div className="space-y-2">
              {data.trivia.map((t, i) => (
                <div key={i} className="p-3 bg-orange-50 border-l-2 border-orange-200 text-xs text-orange-900 rounded-r-lg italic">
                  "{t}"
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Persona Video Placeholder (Sesuai Sketsa) */}
        <section className="pt-4 border-t">
          <div className="aspect-[9/16] w-full max-w-[200px] mx-auto bg-stone-100 rounded-3xl border-2 border-dashed border-stone-300 flex items-center justify-center text-center p-4">
            <p className="text-[10px] text-stone-400 font-bold uppercase">
              Ingredients Persona<br/>Video Format
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}