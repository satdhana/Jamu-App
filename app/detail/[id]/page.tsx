"use client";
import React, { useState, useId } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { jamuData } from '@/app/data/jamuData';

// ── Warna khas tiap jamu/ingredient ──
const colorMap: Record<string, string> = {
  "kunyit-asam":           "#D4A843",
  "beras-kencur":          "#C8A96E",
  "cabe-puyang":           "#C0503A",
  "paitan":                "#4A6B3A",
  "kunci-suruh":           "#6B8F5A",
  "kudu-laos":             "#8B6B3D",
  "uyup-uyup":             "#7A9E7E",
  "sinom":                 "#B8A84A",
  "loloh-cemcem":          "#5C8A5A",
  "loloh-piduh":           "#4A7A6A",
  "loloh-don-kayu-manis":  "#8A6B4A",
  "jamu-maag":             "#7A8C5A",
  "jamu-immunity":         "#C4872A",
  "jamu-anti-toxic":       "#4A6B7A",
  "kunyit":                "#D4982A",
  "temulawak":             "#C8841A",
  "kencur":                "#B8A060",
  "jahe":                  "#C07840",
  "lempuyang":             "#8A7A3A",
  "sirih":                 "#4A7A4A",
  "kayu-manis":            "#8B4A2A",
  "asam-jawa":             "#A0602A",
};

const DEFAULT_COLOR = "#C8956B";

// ✅ File harus ada di: public/videos/TEMULAWAK.mp4
const TUTORIAL_VIDEO = "/videos/TEMULAWAK.mp4";

// ── Komponen Botol SVG ──
function JamuBottle({ color, size = 80, uid }: { color: string; size?: number; uid: string }) {
  const clipId = `clip-${uid}`;
  return (
    <svg
      viewBox="0 0 80 180"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (180 / 80)}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="15.5" y="48.5" width="49" height="115" rx="9" />
        </clipPath>
      </defs>
      <rect x="30" y="8" width="20" height="14" rx="4" fill="#D0C8B8" stroke="#B8B0A0" strokeWidth="1" />
      <rect x="27" y="20" width="26" height="5" rx="2.5" fill="#C0B8A8" stroke="#B0A898" strokeWidth="0.8" />
      <path d="M27 25 L24 48 L56 48 L53 25 Z" fill="white" stroke="#C8C0B0" strokeWidth="1.2" />
      <path d="M30 26 L28 46" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
      <rect x="14" y="47" width="52" height="118" rx="10" fill="white" stroke="#C8C0B0" strokeWidth="1.5" />
      <g clipPath={`url(#${clipId})`}>
        <rect x="15" y="78" width="50" height="86" fill={color} fillOpacity="0.85" />
        <path d="M15 80 Q25 74 35 79 Q45 84 55 78 Q60 75 65 79 L65 78 L15 78 Z" fill={color} fillOpacity="0.9" />
        <rect x="19" y="85" width="8" height="60" rx="4" fill="white" fillOpacity="0.2" />
      </g>
      <rect x="14" y="47" width="52" height="118" rx="10" fill="none" stroke="#C8C0B0" strokeWidth="1.5" />
      <path d="M20 55 Q18 80 19 130" stroke="white" strokeWidth="3" strokeOpacity="0.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function DetailPage() {
  const params = useParams();
  const [showRecipe, setShowRecipe] = useState(false);
  const [showVideo, setShowVideo] = useState(false); // ← TAMBAHAN
  const baseId = useId();

  const item = jamuData.find((j) => j.id === params.id);
  if (!item) return notFound();

  const isIngredient = item.category === "Ingredients";
  const headerColor = colorMap[item.id] ?? DEFAULT_COLOR;

  return (
    <div
      className="min-h-screen flex flex-col pb-32"
      style={{ backgroundColor: '#F5F0E8', fontFamily: "'Georgia', serif" }}
    >

      {/* ── HEADER ── */}
      {/* ── HEADER ── */}
<header className="relative w-full flex flex-col items-center">
  <div
    className="relative w-full flex flex-col items-center transition-all duration-500"
    style={{
      backgroundColor: headerColor,
      // Menggunakan radius yang lebih halus untuk layar lebar agar tidak terlalu "curvy"
      borderBottomLeftRadius: '50% 20%', 
      borderBottomRightRadius: '50% 20%',
      // Padding dinamis menggunakan clamp (Min, Preferred, Max)
      paddingTop: 'clamp(3rem, 10vw, 5rem)',
      paddingBottom: 'clamp(4rem, 12vw, 7rem)',
    }}
  >
    {/* Tombol Back: Ukuran lebih besar di tablet/laptop */}
    <Link
      href="/catalogue"
      className="absolute top-8 left-5 md:top-12 md:left-10 z-20 text-white text-2xl md:text-4xl active:scale-90 transition-transform"
    >
      ←
    </Link>

    {/* Nama Jamu: Responsif dari text-3xl hingga 6xl */}
    <h1
      className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-gray-900 tracking-tight px-6 max-w-4xl"
      style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
    >
      {item.name}
    </h1>

    {/* Nama Ilmiah: Responsif dari text-sm hingga text-xl */}
    {item.scientific && (
      <p className="text-sm md:text-lg lg:text-xl text-gray-900/80 tracking-widest uppercase italic mt-2 mb-6 px-4 text-center">
        {item.scientific}
      </p>
    )}

    {/* Visual: Gambar atau Botol */}
    {isIngredient ? (
      <div
        className="rounded-full overflow-hidden shadow-2xl border-[4px] md:border-[6px] border-white/30 
                   w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-all duration-500"
      >
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
      </div>
    ) : (
      <div 
        className="transition-transform duration-500 scale-90 md:scale-110 lg:scale-125"
        style={{ filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.2))' }}
      >
        <JamuBottle color={headerColor} size={110} uid={`${baseId}-header`} />
      </div>
    )}
  </div>
</header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 md:px-10 mt-6 space-y-10">

  {/* ── STATS PILLS: Responsif 2 kolom di HP, 4 di Laptop ── */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
    {item.stats && Object.entries(item.stats).map(([key, val], idx) => {
      const isEven = idx % 2 === 0;
      return (
        <div
          key={key}
          className="flex flex-col items-center justify-center py-4 md:py-6 rounded-3xl shadow-sm capitalize text-center px-4 transition-all hover:translate-y-[-4px]"
          style={{ 
            backgroundColor: isEven ? '#A8B878' : headerColor, 
            color: isEven ? '#3B4A2A' : '#fff' 
          }}
        >
          <span className="text-[10px] md:text-xs uppercase opacity-80 mb-1 tracking-widest">{key}</span>
          <span className="text-lg md:text-2xl font-black">{val}</span>
        </div>
      );
    })}
    {isIngredient && item.tastes?.map((taste, idx) => (
      <div
        key={`taste-${idx}`}
        className="flex items-center justify-center py-4 md:py-6 text-lg md:text-2xl font-black rounded-3xl shadow-sm text-center px-4"
        style={{ backgroundColor: headerColor, color: '#fff' }}
      >
        {taste}
      </div>
    ))}
  </div>

  {/* ── DESCRIPTION BOX: Teks lebih mengalir & proporsional ── */}
  <div className="rounded-3xl p-6 md:p-10 shadow-sm bg-white border border-[#E8E0D0]">
    <p className="text-base md:text-xl lg:text-2xl text-gray-600 leading-relaxed md:leading-loose text-center md:text-left">
      {isIngredient ? item.description : (item.philosophy || item.description)}
    </p>
  </div>

  {/* ── THIS CONTAINS: Grid Adaptif ── */}
  {!isIngredient && item.mainIngredients && item.mainIngredients.length > 0 && (
    <section>
      <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-6">This Contains:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
        {item.mainIngredients.map((ing, idx) => {
          const ingData = jamuData.find(
            (j) => j.category === "Ingredients" &&
              j.name.toLowerCase().includes(ing.item.toLowerCase().split(' ')[0])
          );
          return (
            <div key={idx} className="flex flex-col items-center gap-3 group">
              <span className="text-xs md:text-sm font-black text-gray-400 text-center leading-tight uppercase tracking-widest line-clamp-2 h-10">
                {ing.item}
              </span>
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white transition-transform group-hover:scale-110">
                  {ingData?.img
                    ? <img src={ingData.img} alt={ing.item} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-gray-200" />
                  }
                </div>
                <div className="absolute inset-0 flex items-end justify-center pb-2">
                  <span className="text-lg md:text-2xl font-black text-white drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    {ing.percentage}
                  </span>
                </div>
              </div>
              <span className="text-xs md:text-base text-gray-400 font-bold">{ing.amount}</span>
            </div>
          );
        })}
      </div>
    </section>
  )}

  {/* ── JAMU CAN BE MADE: Khusus Ingredient ── */}
  {isIngredient && item.madeJamu && item.madeJamu.length > 0 && (
    <section>
      <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-6">Jamu can be made with this:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {item.madeJamu.map((jamuName, index) => {
          const jamuMatch = jamuData.find((j) => j.category !== "Ingredients" && j.name.toLowerCase().includes(jamuName.toLowerCase().split(' ')[0]));
          const bottleColor = jamuMatch ? (colorMap[jamuMatch.id] ?? DEFAULT_COLOR) : DEFAULT_COLOR;
          return (
            <Link key={index} href={jamuMatch ? `/detail/${jamuMatch.id}` : '#'} className="flex flex-col items-center gap-2 group transition-transform active:scale-95">
              <span className="text-xs md:text-sm font-black text-gray-700 text-center leading-tight uppercase tracking-widest line-clamp-2 h-10 mb-2">{jamuName}</span>
              <div className="group-hover:translate-y-[-8px] transition-transform duration-300">
                <JamuBottle color={bottleColor} size={60} uid={`${baseId}-made-${index}`} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  )}

  {/* ── CHARACTERISTICS & EFFECTS: Stack di HP, Berdampingan di Laptop ── */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
    {item.stats && (
      <section>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5">Characteristics</h2>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(item.stats).map(([key, val], idx) => (
            <div key={idx} className="rounded-2xl aspect-square flex flex-col items-center justify-center p-3 text-center bg-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-tighter">{key}</span>
              <span className="text-xs md:text-sm font-bold text-gray-400 mt-1">{val}</span>
            </div>
          ))}
        </div>
      </section>
    )}

    {item.benefits && (
      <section>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5">Body Effects</h2>
        <div className="grid grid-cols-3 gap-3">
          {item.benefits.map((benefit, idx) => (
            <div key={idx} className="rounded-2xl aspect-square flex items-center justify-center p-3 text-center bg-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] md:text-xs font-semibold text-gray-600 leading-tight">{benefit}</span>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>

  {/* ── EQUIPMENT & LEARN MORE ── */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    {item.equipment && item.equipment.length > 0 && (
      <section>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5">Equipment Needed</h2>
        <div className="grid grid-cols-1 gap-3">
          {item.equipment.map((eq, idx) => (
            <div key={idx} className="rounded-2xl p-4 md:p-5 text-sm md:text-lg text-gray-600 bg-[#E8E2D8] flex items-center gap-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#A8B878]" /> {eq}
            </div>
          ))}
        </div>
      </section>
    )}

    <section className="space-y-5">
      <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5">Learn More</h2>
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
        <button onClick={() => setShowRecipe(true)} className="flex-1 py-4 md:py-6 rounded-2xl font-bold text-sm md:text-xl bg-[#E8E2D8] border border-[#D4CCBE] text-gray-700 hover:bg-[#D4CCBE] shadow-sm transition-all active:scale-95">
          See Recipe
        </button>
        <button onClick={() => setShowVideo(true)} className="flex-1 py-4 md:py-6 rounded-2xl font-bold text-sm md:text-xl bg-[#E8E2D8] border border-[#D4CCBE] text-gray-700 hover:bg-[#D4CCBE] shadow-sm transition-all active:scale-95">
          Watch Tutorial
        </button>
      </div>
    </section>
  </div>

  {/* ── START COURSE BUTTON ── */}
  {!isIngredient && (
    <div className="pt-10">
      <button className="w-full py-6 md:py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs md:text-sm text-white bg-[#2A1B17] shadow-2xl hover:bg-[#3D2B26] transition-all active:scale-[0.98]">
        Start This Course
      </button>
    </div>
  )}
</main>

      {/* ── MODAL RECIPE ── */}
      {showRecipe && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRecipe(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] p-8">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            <h2 className="text-2xl font-black italic mb-5 uppercase tracking-tight">Preparation Steps</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {item.steps?.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span
                    className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{ backgroundColor: '#F5F0E8', color: headerColor }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowRecipe(false)} className="w-full mt-6 py-3 font-black uppercase text-xs tracking-widest text-gray-400">
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── TAMBAHAN: MODAL VIDEO ── */}
      {showVideo && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Backdrop — klik untuk tutup */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowVideo(false)} />

          <div className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ backgroundColor: headerColor }}
            >
              <h3 className="text-white font-black text-xs uppercase tracking-widest truncate pr-3">
                {item.name} — Tutorial
              </h3>
              <button
                onClick={() => setShowVideo(false)}
                className="flex-shrink-0 w-7 h-7 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-xs transition-all"
              >
                ✕
              </button>
            </div>

            {/* Video player */}
            <video
              src={TUTORIAL_VIDEO}
              controls
              autoPlay
              playsInline
              className="w-full bg-black block"
              style={{ maxHeight: '70vh' }}
            >
              Browser kamu tidak mendukung pemutaran video.
            </video>
          </div>
        </div>
      )}

      {/* ── FLOATING CLOSE ── */}
      <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
        <Link
          href="/catalogue"
          className="w-14 h-14 bg-white text-gray-400 text-xl flex items-center justify-center rounded-full shadow-2xl border border-gray-100 active:rotate-90 transition-all"
        >
          ✕
        </Link>
      </footer>
    </div>
  );
}