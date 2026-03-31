"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { jamuData } from '@/app/data/jamuData';

// ── Warna header & botol dinamis ──
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

// ── Komponen Botol SVG ──
function JamuBottle({ color, size = 80 }: { color: string; size?: number }) {
  const clipId = `clip-${color.replace('#', '')}`;
  return (
    <svg
      viewBox="0 0 80 180"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (180 / 80)}
    >
      {/* Tutup */}
      <rect x="30" y="8" width="20" height="14" rx="4" fill="#D0C8B8" stroke="#B8B0A0" strokeWidth="1" />
      <rect x="27" y="20" width="26" height="5" rx="2.5" fill="#C0B8A8" stroke="#B0A898" strokeWidth="0.8" />
      {/* Leher */}
      <path d="M27 25 L24 48 L56 48 L53 25 Z" fill="white" stroke="#C8C0B0" strokeWidth="1.2" />
      <path d="M30 26 L28 46" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
      {/* Badan */}
      <rect x="14" y="47" width="52" height="118" rx="10" fill="white" stroke="#C8C0B0" strokeWidth="1.5" />
      {/* Cairan */}
      <clipPath id={clipId}>
        <rect x="15.5" y="48.5" width="49" height="115" rx="9" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect x="15" y="78" width="50" height="86" fill={color} fillOpacity="0.85" />
        <path d="M15 80 Q25 74 35 79 Q45 84 55 78 Q60 75 65 79 L65 78 L15 78 Z" fill={color} fillOpacity="0.9" />
        <rect x="19" y="85" width="8" height="60" rx="4" fill="white" fillOpacity="0.2" />
      </g>
      {/* Outline atas cairan */}
      <rect x="14" y="47" width="52" height="118" rx="10" fill="none" stroke="#C8C0B0" strokeWidth="1.5" />
      {/* Highlight */}
      <path d="M20 55 Q18 80 19 130" stroke="white" strokeWidth="3" strokeOpacity="0.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function DetailPage() {
  const params = useParams();
  const [showRecipe, setShowRecipe] = useState(false);

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
      <header className="relative w-full flex flex-col items-center">
        <div
          className="relative w-full flex flex-col items-center"
          style={{
            backgroundColor: headerColor,
            borderBottomLeftRadius: '50% 40%',
            borderBottomRightRadius: '50% 40%',
            paddingTop: '3.5rem',
            paddingBottom: '5.5rem',
          }}
        >
          <Link href="/catalogue" className="absolute top-12 left-5 z-20 text-white text-2xl active:scale-90 transition-transform">
            ←
          </Link>

          <h1 className="text-4xl font-black text-center text-gray-900 tracking-tight px-6" style={{ letterSpacing: '-0.02em' }}>
            {item.name}
          </h1>

          {item.scientific && (
            <p className="text-[11px] text-gray-700/70 tracking-widest uppercase italic mt-2 mb-5 px-4 text-center">
              {item.scientific}
            </p>
          )}

          <div className="rounded-full overflow-hidden shadow-2xl" style={{ width: 220, height: 220, border: '5px solid rgba(255,255,255,0.35)' }}>
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 mt-6 space-y-8">

        {/* ── STATS PILLS ── */}
        <div className="grid grid-cols-4 gap-3 w-full">
          {item.stats && Object.entries(item.stats).map(([key, val], idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={key}
                className="flex items-center justify-center py-4 text-xs font-bold rounded-2xl shadow-sm capitalize text-center px-2"
                style={{ backgroundColor: isEven ? '#A8B878' : headerColor, color: isEven ? '#3B4A2A' : '#fff' }}
              >
                {key}: {val}
              </div>
            );
          })}
          {isIngredient && item.tastes?.map((taste, idx) => (
            <div
              key={`taste-${idx}`}
              className="flex items-center justify-center py-4 text-xs font-bold rounded-2xl shadow-sm text-center px-2"
              style={{ backgroundColor: headerColor, color: '#fff' }}
            >
              {taste}
            </div>
          ))}
        </div>

        {/* ── DESCRIPTION BOX ── */}
        <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E0D0' }}>
          <p className="text-sm text-gray-600 leading-relaxed">
            {isIngredient ? item.description : (item.philosophy || item.description)}
          </p>
        </div>

        {/* ── THIS CONTAINS: foto bulat (untuk Jamu) ── */}
        {!isIngredient && item.mainIngredients && item.mainIngredients.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-4">This Contains:</h2>
            <div className="grid grid-cols-4 gap-6">
              {item.mainIngredients.map((ing, idx) => {
                const ingData = jamuData.find(
                  (j) => j.category === "Ingredients" &&
                    j.name.toLowerCase().includes(ing.item.toLowerCase().split(' ')[0])
                );
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <span className="text-xs font-black text-gray-500 text-center leading-tight uppercase tracking-wide line-clamp-2 w-full">
                      {ing.item}
                    </span>
                    <div className="relative w-20 h-20">
                      <div className="w-full h-full rounded-full overflow-hidden shadow-md" style={{ backgroundColor: '#D0C8B8' }}>
                        {ingData?.img
                          ? <img src={ingData.img} alt={ing.item} className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-gray-300" />
                        }
                      </div>
                      <div className="absolute inset-0 flex items-end justify-center pb-1">
                        <span className="text-xl font-black text-white leading-none" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
                          {ing.percentage}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 text-center">{ing.amount}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── JAMU CAN BE MADE: Botol SVG (untuk Ingredients) ── */}
        {isIngredient && item.madeJamu && item.madeJamu.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Jamu can be made with this Ingredient:
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {item.madeJamu.map((jamuName, index) => {
                // Cari id jamu dari nama
                const jamuMatch = jamuData.find(
                  (j) => j.category !== "Ingredients" &&
                    j.name.toLowerCase().includes(jamuName.toLowerCase().split(' ')[0])
                );
                const bottleColor = jamuMatch ? (colorMap[jamuMatch.id] ?? DEFAULT_COLOR) : DEFAULT_COLOR;

                return (
                  <Link
                    key={index}
                    href={jamuMatch ? `/detail/${jamuMatch.id}` : '#'}
                    className="flex flex-col items-center gap-1 group active:scale-95 transition-transform"
                  >
                    {/* Nama jamu di atas */}
                    <span className="text-xs font-black text-gray-700 text-center leading-tight w-full line-clamp-2 mb-1">
                      {jamuName}
                    </span>

                    {/* Botol SVG */}
                    <div className="group-hover:-translate-y-1 transition-transform duration-300">
                      <JamuBottle color={bottleColor} size={52} />
                    </div>

                    {/* Nama jamu di bawah */}
                    <span
                      className="text-[9px] font-bold text-center mt-1"
                      style={{ color: bottleColor }}
                    >
                      {jamuMatch?.category ?? ''}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── CHARACTERISTICS & EXPECTED BODY EFFECTS ── */}
        <div className="grid grid-cols-2 gap-5">
          {item.stats && Object.keys(item.stats).length > 0 && (
            <section>
              <h2 className="text-base font-black text-gray-900 mb-3">Characteristics</h2>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.entries(item.stats).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="rounded-xl aspect-square flex flex-col items-center justify-center p-1 text-center shadow-sm"
                    style={{ backgroundColor: '#E8E2D8' }}
                  >
                    <span className="text-[8px] font-black text-gray-500 uppercase leading-tight">{key}</span>
                    <span className="text-[7px] font-bold text-gray-400 mt-0.5">{val}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {item.benefits && item.benefits.length > 0 && (
            <section>
              <h2 className="text-base font-black text-gray-900 mb-3">Expected Body Effects</h2>
              <div className="grid grid-cols-3 gap-1.5">
                {item.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl aspect-square flex items-center justify-center p-1.5 text-center shadow-sm"
                    style={{ backgroundColor: '#E8E2D8' }}
                  >
                    <span className="text-[8px] font-semibold text-gray-500 leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── EQUIPMENT & LEARN MORE ── */}
        <div className="grid grid-cols-2 gap-4 items-start">
          {item.equipment && item.equipment.length > 0 && (
            <section>
              <h2 className="text-base font-black text-gray-900 mb-3">Equipment</h2>
              <div className="space-y-2">
                {item.equipment.map((eq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-3 text-[11px] text-gray-600 shadow-sm flex items-center gap-2"
                    style={{ backgroundColor: '#E8E2D8' }}
                  >
                    <span style={{ color: '#A8B878' }}>◆</span>
                    {eq}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={!(item.equipment && item.equipment.length > 0) ? 'col-span-2' : ''}>
            <h2 className="text-base font-black text-gray-900 mb-3">Learn More</h2>
            <div className="space-y-3">
              {item.steps && item.steps.length > 0 && (
                <button
                  onClick={() => setShowRecipe(true)}
                  className="w-full py-4 rounded-2xl font-bold text-sm text-gray-700 shadow-sm active:scale-95 transition-all"
                  style={{ backgroundColor: '#E8E2D8', border: '1px solid #D4CCBE' }}
                >
                  See Recipe
                </button>
              )}
              <button
                className="w-full py-4 rounded-2xl font-bold text-sm text-gray-700 shadow-sm active:scale-95 transition-all"
                style={{ backgroundColor: '#E8E2D8', border: '1px solid #D4CCBE' }}
              >
                Watch Tutorial
              </button>
            </div>
          </section>
        </div>

        {/* ── START COURSE ── */}
        {!isIngredient && (
          <button
            className="w-full py-5 rounded-3xl font-black uppercase tracking-widest text-xs text-white shadow-2xl active:scale-95 transition-transform"
            style={{ backgroundColor: '#2A1B17' }}
          >
            Start This Course
          </button>
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