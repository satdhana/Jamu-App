"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  return (
    <svg viewBox="0 0 80 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="30" y="8" width="20" height="14" rx="4" fill="#D0C8B8" stroke="#B8B0A0" strokeWidth="1" />
      <rect x="27" y="20" width="26" height="5" rx="2.5" fill="#C0B8A8" stroke="#B0A898" strokeWidth="0.8" />
      <path d="M27 25 L24 48 L56 48 L53 25 Z" fill="white" stroke="#C8C0B0" strokeWidth="1.2" />
      <path d="M30 26 L28 46" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
      <rect x="14" y="47" width="52" height="118" rx="10" fill="white" stroke="#C8C0B0" strokeWidth="1.5" />
      <clipPath id={`lc-${color.replace('#', '')}`}>
        <rect x="15.5" y="48.5" width="49" height="115" rx="9" />
      </clipPath>
      <g clipPath={`url(#lc-${color.replace('#', '')})`}>
        <rect x="15" y="78" width="50" height="86" fill={color} fillOpacity="0.85" />
        <path d="M15 80 Q25 74 35 79 Q45 84 55 78 Q60 75 65 79 L65 78 L15 78 Z" fill={color} fillOpacity="0.9" />
        <rect x="19" y="85" width="8" height="60" rx="4" fill="white" fillOpacity="0.2" />
      </g>
      <rect x="14" y="47" width="52" height="118" rx="10" fill="none" stroke="#C8C0B0" strokeWidth="1.5" />
      <path d="M20 55 Q18 80 19 130" stroke="white" strokeWidth="3" strokeOpacity="0.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ── Komponen QR Scanner ──
function QRScanner({ onClose, onResult }: { onClose: () => void; onResult: (result: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);
  
  const [error, setError] = useState<string | null>(null);
  const [isLibLoaded, setIsLibLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State untuk UX sukses

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    cancelAnimationFrame(animFrameRef.current);
  }, []);

  useEffect(() => {
    // 1. Load Library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
    script.async = true;
    script.onload = () => setIsLibLoaded(true);
    document.head.appendChild(script);

    // 2. Start Camera
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.play();
        }
      } catch (e) {
        setError("Izin kamera ditolak. Pastikan menggunakan HTTPS.");
      }
    }
    startCamera();
    return () => stopCamera();
  }, [stopCamera]);

  const tick = useCallback(() => {
    if (isSuccess) return; // Stop scan jika sudah sukses

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const jsQR = (window as any).jsQR;

    if (video && video.readyState === video.HAVE_ENOUGH_DATA && canvas && jsQR) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          setIsSuccess(true); // Mulai animasi sukses
          
          // Delay 2 detik agar user lihat centang hijau, lalu pindah halaman
          setTimeout(() => {
            stopCamera();
            onResult(code.data);
          }, 2000);
          return;
        }
      }
    }
    animFrameRef.current = requestAnimationFrame(tick);
  }, [onResult, stopCamera, isSuccess]);

  useEffect(() => {
    if (isLibLoaded && !isSuccess) {
      animFrameRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isLibLoaded, tick, isSuccess]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-10">
        <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header UI */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-30">
        <h2 className="text-white text-xs font-black tracking-widest uppercase">Scanner Jamudex</h2>
        <button onClick={() => { stopCamera(); onClose(); }} className="text-white w-10 h-10 flex items-center justify-center bg-white/20 rounded-full">✕</button>
      </div>

      {/* Frame Scanner */}
      <div className="relative z-20 flex flex-col items-center">
        <div className={`relative w-64 h-64 border-2 transition-all duration-500 rounded-3xl ${isSuccess ? 'border-green-400 scale-110' : 'border-white/50'}`}>
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-2xl" />
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-2xl" />
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-2xl" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-2xl" />

          {!isSuccess && <div className="absolute left-4 right-4 h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] animate-laser" />}
          
          {isSuccess && (
            <div className="absolute inset-0 bg-green-400/20 flex flex-col items-center justify-center animate-pulse rounded-3xl">
              <span className="text-5xl">✅</span>
            </div>
          )}
        </div>
        <p className="mt-8 text-white text-[10px] font-bold tracking-widest bg-black/50 px-4 py-2 rounded-full uppercase">
          {isSuccess ? "Berhasil! Mengarahkan..." : "Arahkan ke QR Code"}
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <style jsx>{`
        @keyframes laserMove { 0% { top: 10%; } 50% { top: 90%; } 100% { top: 10%; } }
        .animate-laser { animation: laserMove 2s infinite ease-in-out; }
      `}</style>
    </div>
  );
}

// ── Halaman Utama ──
export default function CataloguePage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scanFeedback, setScanFeedback] = useState<string | null>(null);

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

  // Handler hasil scan QR
  const handleQRResult = (result: string) => {
  setShowScanner(false);

  // 1. Ambil teks hasil scan dan bersihkan spasi
  let rawData = result.trim();

  // 2. Logika Bedah URL
  // Jika isi QR adalah: https://jamudex.vercel.app/detail/kunyit-asam
  if (rawData.includes('/')) {
    const segments = rawData.split('/').filter(Boolean); // Membagi berdasarkan "/"
    rawData = segments[segments.length - 1]; // Mengambil segmen terakhir: "kunyit-asam"
  }

  // 3. Normalisasi ID (huruf kecil semua)
  const finalId = rawData.toLowerCase();

  // 4. Cari di jamuData
  const found = jamuData.find(j => 
    j.id === finalId || 
    j.name.toLowerCase().replace(/\s+/g, '-') === finalId
  );

  if (found) {
    // Arahkan ke halaman detail menggunakan ID yang ditemukan
    router.push(`/detail/${found.id}`);
  } else {
    // Jika masih gagal (misal typo di URL), beri feedback
    setScanFeedback(`Jamu dengan ID "${finalId}" tidak ditemukan.`);
    setTimeout(() => setScanFeedback(null), 3000);
  }
};

  return (
    <div className="min-h-screen text-gray-900 flex flex-col pb-24" style={{ backgroundColor: '#F5F0E8', fontFamily: "'Georgia', serif" }}>

      {/* ── QR SCANNER OVERLAY ── */}
      {showScanner && (
        <QRScanner
          onClose={() => setShowScanner(false)}
          onResult={handleQRResult}
        />
      )}

      {/* ── FEEDBACK SCAN ── */}
      {scanFeedback && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] bg-red-500 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-lg">
          {scanFeedback}
        </div>
      )}

      {/* ── HEADER & SEARCH ── */}
      <header className="p-6 sticky top-0 z-20" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="relative mb-4 flex gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
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

          {/* ── TOMBOL SCAN QR ── */}
          <button
  onClick={() => setShowScanner(true)}
  className="w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-sm transition-all active:scale-95"
  style={{ backgroundColor: '#5A6B3A' }}
  title="Scan QR Code"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Frame Pojok (Viewfinder) */}
    <path d="M7 3H5C3.89543 3 3 3.89543 3 5V7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 3H19C20.1046 3 21 3.89543 21 5V7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 21H5C3.89543 21 3 20.1046 3 19V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 21H19C20.1046 21 21 20.1046 21 19V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    
    {/* QR Dots Sederhana */}
    <rect x="7" y="7" width="3" height="3" fill="white"/>
    <rect x="14" y="7" width="3" height="3" fill="white"/>
    <rect x="7" y="14" width="3" height="3" fill="white"/>
    <rect x="14" y="14" width="3" height="3" fill="white"/>

    {/* Garis Scan Laser */}
    <line x1="2" y1="12" x2="22" y2="12" stroke="#A8D18D" strokeWidth="2" strokeLinecap="round" className="animate-pulse"/>
  </svg>
</button>
        </div>

        {/* Filter Capsule Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === filter ? 'text-white shadow-md' : 'text-gray-500'
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
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-sm leading-tight">{item.name}</h3>
                      <p className="text-[13px] text-gray-700 italic">{item.scientific}</p>
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
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide -mx-6 px-6 items-end">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => {
                  const bottleColor = bottleColorMap[item.id] ?? DEFAULT_BOTTLE_COLOR;
                  return (
                    <Link href={`/detail/${item.id}`} key={item.id} className="flex-shrink-0 group">
                      <div className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                        <div className="w-20 h-44 group-hover:-translate-y-2 transition-transform duration-300">
                          <JamuBottle color={bottleColor} />
                        </div>
                        <h4 className="text-[13px] font-black text-center w-20 leading-tight uppercase tracking-wide text-gray-700 group-hover:text-gray-900">
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
            <div className="h-2 rounded-full mt-1" style={{ backgroundColor: '#D0C8B8' }} />
          </div>
        </section>
      </main>
    </div>
  );
}