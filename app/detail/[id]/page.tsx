"use client";
import React, { useState, useId } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { jamuData } from '@/app/data/jamuData';
import { useLanguage } from '@/app/context/languageContext';
import { translations } from '@/app/data/translations';

// ── Warna khas tiap jamu/ingredient ──
const colorMap: Record<string, string> = {
  "kunyit-asam": "#D4A843", "beras-kencur": "#C8A96E", "cabe-puyang": "#C0503A",
  "paitan": "#4A6B3A", "kunci-suruh": "#6B8F5A", "kudu-laos": "#8B6B3D",
  "uyup-uyup": "#7A9E7E", "sinom": "#B8A84A", "loloh-cemcem": "#5C8A5A",
  "loloh-piduh": "#4A7A6A", "loloh-don-kayu-manis": "#8A6B4A", "jamu-maag": "#7A8C5A",
  "jamu-immunity": "#C4872A", "jamu-anti-toxic": "#4A6B7A", "kunyit": "#D4982A",
  "temulawak": "#C8841A", "kencur": "#B8A060", "jahe": "#C07840", "lempuyang": "#8A7A3A",
  "sirih": "#4A7A4A", "kayu-manis": "#8B4A2A", "asam-jawa": "#A0602A",
};

const DEFAULT_COLOR = "#C8956B";
const TUTORIAL_VIDEO = "/videos/TEMULAWAK.mp4";

function JamuBottle({ color, size = 80, uid }: { color: string; size?: number; uid: string }) {
  const clipId = `clip-${uid}`;
  return (
    <svg viewBox="0 0 80 180" xmlns="http://www.w3.org/2000/svg" width={size} height={size * (180 / 80)}>
      <defs><clipPath id={clipId}><rect x="15.5" y="48.5" width="49" height="115" rx="9" /></clipPath></defs>
      <rect x="30" y="8" width="20" height="14" rx="4" fill="#D0C8B8" stroke="#B8B0A0" strokeWidth="1" />
      <rect x="27" y="20" width="26" height="5" rx="2.5" fill="#C0B8A8" stroke="#B0A898" strokeWidth="0.8" />
      <path d="M27 25 L24 48 L56 48 L53 25 Z" fill="white" stroke="#C8C0B0" strokeWidth="1.2" />
      <rect x="14" y="47" width="52" height="118" rx="10" fill="white" stroke="#C8C0B0" strokeWidth="1.5" />
      <g clipPath={`url(#${clipId})`}>
        <rect x="15" y="78" width="50" height="86" fill={color} fillOpacity="0.85" />
        <path d="M15 80 Q25 74 35 79 Q45 84 55 78 Q60 75 65 79 L65 78 L15 78 Z" fill={color} fillOpacity="0.9" />
      </g>
    </svg>
  );
}

export default function DetailPage() {
  const params = useParams();
  const { lang, toggleLang } = useLanguage(); // Gunakan Global State
  const [showRecipe, setShowRecipe] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const baseId = useId();

  const item = jamuData.find((j) => j.id === params.id);
  if (!item) return notFound();

  // Integrasi Kamus untuk Nama & Deskripsi
  const itemTranslation = (translations[lang] as any)[item.id];
  const tName = itemTranslation?.name || item.name;
  const tDesc = itemTranslation?.desc || (item.philosophy || item.description);

  const isIngredient = item.category === "Ingredients";
  const headerColor = colorMap[item.id] ?? DEFAULT_COLOR;

  return (
    <div className="min-h-screen flex flex-col pb-32" style={{ backgroundColor: '#F5F0E8', fontFamily: "'Georgia', serif" }}>
      
      {/* ── TOGGLE BAHASA FLOATING ── */}
      <button 
        onClick={toggleLang}
        className="fixed bottom-28 right-6 z-50 w-12 h-12 bg-white shadow-xl rounded-full border-2 border-[#5A6B3A] flex items-center justify-center font-black text-xs text-[#5A6B3A] active:scale-90 transition-all"
      >
        {lang === 'en' ? 'ID' : 'EN'}
      </button>

      {/* ── HEADER ── */}
      <header className="relative w-full flex flex-col items-center">
        <div
          className="relative w-full flex flex-col items-center transition-all duration-500"
          style={{
            backgroundColor: headerColor,
            borderBottomLeftRadius: '50% 20%', 
            borderBottomRightRadius: '50% 20%',
            paddingTop: 'clamp(3rem, 10vw, 5rem)',
            paddingBottom: 'clamp(4rem, 12vw, 7rem)',
          }}
        >
          <Link href="/catalogue" className="absolute top-8 left-5 md:top-12 md:left-10 z-20 text-white text-2xl md:text-4xl active:scale-90 transition-transform">
            ←
          </Link>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-gray-900 tracking-tight px-6 max-w-4xl" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            {tName}
          </h1>

          {item.scientific && (
            <p className="text-sm md:text-lg lg:text-xl text-gray-900/80 tracking-widest uppercase italic mt-2 mb-6 px-4 text-center">
              {item.scientific}
            </p>
          )}

          {isIngredient ? (
            <div className="rounded-full overflow-hidden shadow-2xl border-[4px] md:border-[6px] border-white/30 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-all duration-500">
              <img src={item.img} alt={tName} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="transition-transform duration-500 scale-90 md:scale-110 lg:scale-125" style={{ filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.2))' }}>
              <JamuBottle color={headerColor} size={110} uid={`${baseId}-header`} />
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 md:px-10 mt-6 space-y-10">

        {/* ── STATS PILLS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {item.stats && Object.entries(item.stats).map(([key, val], idx) => (
            <div key={key} className="flex flex-col items-center justify-center py-4 md:py-6 rounded-3xl shadow-sm capitalize text-center px-4 transition-all hover:translate-y-[-4px]"
              style={{ backgroundColor: idx % 2 === 0 ? '#A8B878' : headerColor, color: idx % 2 === 0 ? '#3B4A2A' : '#fff' }}>
              <span className="text-[10px] md:text-xs uppercase opacity-80 mb-1 tracking-widest">{key}</span>
              <span className="text-lg md:text-2xl font-black">{val}</span>
            </div>
          ))}
        </div>

        {/* ── DESCRIPTION BOX ── */}
        <div className="rounded-3xl p-6 md:p-10 shadow-sm bg-white border border-[#E8E0D0]">
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 leading-relaxed md:leading-loose text-center md:text-left">
            {tDesc}
          </p>
        </div>

        {/* ── THIS CONTAINS (For Jamu) ── */}
        {!isIngredient && item.mainIngredients && item.mainIngredients.length > 0 && (
          <section>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-6">
              {lang === 'en' ? 'This Contains:' : 'Mengandung:'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
              {item.mainIngredients.map((ing, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 group text-center">
                  <span className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest line-clamp-2 h-10">{ing.item}</span>
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <div className="w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white transition-transform group-hover:scale-110">
                      <img src={jamuData.find(j => j.name.toLowerCase().includes(ing.item.toLowerCase().split(' ')[0]))?.img || ''} alt={ing.item} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 flex items-end justify-center pb-2">
                      <span className="text-lg md:text-2xl font-black text-white drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{ing.percentage}</span>
                    </div>
                  </div>
                  <span className="text-xs md:text-base text-gray-400 font-bold">{ing.amount}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── JAMU CAN BE MADE (For Ingredient) ── */}
        {isIngredient && item.madeJamu && item.madeJamu.length > 0 && (
          <section>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-6">
              {lang === 'en' ? 'Jamu can be made with this:' : 'Dapat dibuat menjadi:'}
            </h2>
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

        {/* ── CHARACTERISTICS & EFFECTS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <section>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5">
              {lang === 'en' ? 'Characteristics' : 'Karakteristik'}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {item.stats && Object.entries(item.stats).map(([key, val], idx) => (
                <div key={idx} className="rounded-2xl aspect-square flex flex-col items-center justify-center p-3 text-center shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: '#E8F0D1' }}>
                  <span className="text-[10px] md:text-xs font-black text-[#5A6B3A] uppercase tracking-tighter opacity-80">{key}</span>
                  <span className="text-xs md:text-sm font-bold text-[#3B4A2A] mt-1">{val}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5">
              {lang === 'en' ? 'Body Effects' : 'Efek Tubuh'}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {item.benefits?.map((benefit, idx) => (
                <div key={idx} className="rounded-2xl aspect-square flex items-center justify-center p-3 text-center shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: `${headerColor}15`, border: `1px solid ${headerColor}30` }} >
                  <span className="text-[10px] md:text-xs font-black leading-tight" style={{ color: headerColor }}>{benefit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── LEARN MORE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <section className="col-span-1 md:col-span-2 space-y-5">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5">
              {lang === 'en' ? 'Learn More' : 'Pelajari Lebih Lanjut'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={() => setShowRecipe(true)} className="py-4 md:py-6 rounded-2xl font-bold text-sm md:text-xl bg-[#E8E2D8] border border-[#D4CCBE] text-gray-700 active:scale-95 shadow-sm">
                {lang === 'en' ? 'See Recipe' : 'Lihat Resep'}
              </button>
              <button onClick={() => setShowVideo(true)} className="py-4 md:py-6 rounded-2xl font-bold text-sm md:text-xl bg-[#E8E2D8] border border-[#D4CCBE] text-gray-700 active:scale-95 shadow-sm">
                {lang === 'en' ? 'Watch Tutorial' : 'Tonton Tutorial'}
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* ── MODALS ── */}
      {showRecipe && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRecipe(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] p-8">
            <h2 className="text-2xl font-black italic mb-5 uppercase tracking-tight">
              {lang === 'en' ? 'Preparation Steps' : 'Langkah Persiapan'}
            </h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {item.steps?.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-black" style={{ backgroundColor: '#F5F0E8', color: headerColor }}>{i + 1}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowRecipe(false)} className="w-full mt-6 py-3 font-black uppercase text-xs tracking-widest text-gray-400">
              {lang === 'en' ? 'Close' : 'Tutup'}
            </button>
          </div>
        </div>
      )}

      {showVideo && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowVideo(false)} />
          <div className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black">
            <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: headerColor }}>
              <h3 className="text-white font-black text-xs uppercase tracking-widest truncate pr-3">{tName} — Tutorial</h3>
              <button onClick={() => setShowVideo(false)} className="flex-shrink-0 w-7 h-7 bg-white/20 text-white rounded-full flex items-center justify-center text-xs">✕</button>
            </div>
            <video src={TUTORIAL_VIDEO} controls autoPlay playsInline className="w-full block" style={{ maxHeight: '70vh' }}>Browser error.</video>
          </div>
        </div>
      )}

      <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
        <Link href="/catalogue" className="w-14 h-14 bg-white text-gray-400 text-xl flex items-center justify-center rounded-full shadow-2xl border border-gray-100 active:rotate-90 transition-all">✕</Link>
      </footer>
    </div>
  );
}