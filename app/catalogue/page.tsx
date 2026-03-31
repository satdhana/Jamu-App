"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { jamuData } from '@/app/data/jamuData';

// ── Warna cairan botol berdasarkan id jamu ──
const bottleColorMap: Record<string, string> = {
  "kunyit-asam":          "#D4A843",
  "beras-kencur":         "#C8A96E",
  "cabe-puyang":          "#C0503A",
  "paitan":               "#4A6B3A",
  "kunci-suruh":          "#6B8F5A",
  "kudu-laos":            "#8B6B3D",
  "uyup-uyup":            "#7A9E7E",
  "sinom":                "#B8A84A",
  "loloh-cemcem":         "#5C8A5A",
  "loloh-piduh":          "#4A7A6A",
  "loloh-don-kayu-manis": "#8A6B4A",
  "jamu-maag":            "#7A8C5A",
  "jamu-immunity":        "#C4872A",
  "jamu-anti-toxic":      "#4A6B7A",
};
const DEFAULT_BOTTLE_COLOR = "#C8956B";

// ── Komponen Botol SVG ──
function JamuBottle({ color = DEFAULT_BOTTLE_COLOR }: { color: string }) {
  const liquidColor = color;
  const liquidColorDark = color + "CC"; // sedikit transparan untuk efek

  return (
    <svg
      viewBox="0 0 80 180"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* ── TUTUP BOTOL ── */}
      <rect x="30" y="8" width="20" height="14" rx="4" fill="#D0C8B8" stroke="#B8B0A0" strokeWidth="1" />
      {/* Cincin leher tutup */}
      <rect x="27" y="20" width="26" height="5" rx="2.5" fill="#C0B8A8" stroke="#B0A898" strokeWidth="0.8" />

      {/* ── LEHER BOTOL ── */}
      <path
        d="M27 25 L24 48 L56 48 L53 25 Z"
        fill="white"
        stroke="#C8C0B0"
        strokeWidth="1.2"
      />
      {/* Highlight leher */}
      <path d="M30 26 L28 46" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />

      {/* ── BADAN BOTOL ── */}
      <rect x="14" y="47" width="52" height="118" rx="10" fill="white" stroke="#C8C0B0" strokeWidth="1.5" />

      {/* ── CAIRAN dalam botol ── */}
      <clipPath id={`liquid-clip-${color.replace('#', '')}`}>
        <rect x="15.5" y="48.5" width="49" height="115" rx="9" />
      </clipPath>
      <g clipPath={`url(#liquid-clip-${color.replace('#', '')})`}>
        {/* Area cairan - isi dari bawah ~75% */}
        <rect
          x="15"
          y="78"
          width="50"
          height="86"
          fill={liquidColor}
          fillOpacity="0.85"
        />
        {/* Gelombang permukaan cairan */}
        <path
          d="M15 80 Q25 74 35 79 Q45 84 55 78 Q60 75 65 79 L65 78 L15 78 Z"
          fill={liquidColor}
          fillOpacity="0.9"
        />
        {/* Highlight cairan (refleksi cahaya) */}
        <rect x="19" y="85" width="8" height="60" rx="4" fill="white" fillOpacity="0.2" />
      </g>

      {/* ── GARIS BADAN BOTOL (outline atas cairan) ── */}
      <rect x="14" y="47" width="52" height="118" rx="10" fill="none" stroke="#C8C0B0" strokeWidth="1.5" />

      {/* ── HIGHLIGHT BOTOL (refleksi kiri) ── */}
      <path
        d="M20 55 Q18 80 19 130"
        stroke="white"
        strokeWidth="3"
        strokeOpacity="0.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function CataloguePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["All", "Sweet", "Sour", "Spicy", "Bitter"];

  const matchesSearch = (item: any) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.scientific.toLowerCase().includes(query) ||
      (item.benefits && item.benefits.some((b: string) => b.toLowerCase().includes(query)))
    );
  };

  const filteredIngredients = jamuData.filter(item => {
    if (item.category !== "Ingredients") return false;
    if (searchQuery && !matchesSearch(item)) return false;
    if (activeFilter === "All") return true;
    const filterKey = activeFilter.toLowerCase();
    return item.stats && (item.stats as any)[filterKey];
  });

  const filteredInventory = jamuData.filter(item => {
    if (item.category === "Ingredients") return false;
    if (searchQuery && !matchesSearch(item)) return false;
    if (activeFilter === "All") return true;
    const filterKey = activeFilter.toLowerCase();
    return item.stats && (item.stats as any)[filterKey];
  });

  return (
    <div className="min-h-screen text-gray-900 flex flex-col pb-24" style={{ backgroundColor: '#F5F0E8', fontFamily: "'Georgia', serif" }}>

      {/* ── HEADER & SEARCH ── */}
      <header className="p-6 sticky top-0 z-20" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search Jamudex..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-10 rounded-2xl focus:outline-none transition text-sm"
            style={{ backgroundColor: '#EDE8DE', border: '1px solid #D8D0C0' }}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-lg">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Capsule Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? 'text-white shadow-md'
                  : 'text-gray-500'
              }`}
              style={{
                backgroundColor: activeFilter === filter ? '#5A6B3A' : '#EDE8DE',
                border: activeFilter === filter ? 'none' : '1px solid #D0C8B8',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-6 space-y-10">

        {/* ── JAMU INGREDIENTS ── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-5">Jamu Ingredients</h2>
          <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide -mx-6 px-6">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((item) => (
                <Link href={`/detail/${item.id}`} key={item.id} className="flex-shrink-0 group">
                  <div className="w-36 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                    <div className="w-36 h-36 rounded-full overflow-hidden shadow-md" style={{ backgroundColor: '#D8D0C0' }}>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-sm leading-tight">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 italic">{item.scientific}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No ingredients found.</p>
            )}
          </div>
        </section>

        {/* ── JAMU INVENTORY (BOTOL SVG) ── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-5">Jamu Inventory</h2>

          {/* Rak / shelf area */}
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide -mx-6 px-6 items-end">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => {
                  const bottleColor = bottleColorMap[item.id] ?? DEFAULT_BOTTLE_COLOR;
                  return (
                    <Link href={`/detail/${item.id}`} key={item.id} className="flex-shrink-0 group">
                      <div className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                        {/* Botol SVG */}
                        <div
                          className="w-20 h-44 group-hover:-translate-y-2 transition-transform duration-300"
                        >
                          <JamuBottle color={bottleColor} />
                        </div>
                        {/* Nama */}
                        <h4 className="text-[10px] font-black text-center w-20 leading-tight uppercase tracking-wide text-gray-700 group-hover:text-gray-900">
                          {item.name}
                        </h4>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-xs text-gray-400 italic">No jamu found.</p>
              )}
            </div>

            {/* Garis rak */}
            <div className="h-2 rounded-full mt-1 mx-0" style={{ backgroundColor: '#D0C8B8' }} />
          </div>
        </section>
      </main>
    </div>
  );
}