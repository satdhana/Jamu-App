"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jamuData } from '@/app/data/jamuData';
import { translations } from '@/app/data/translations';

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
function QRScanner({ onClose, onResult, lang }: { onClose: () => void; onResult: (result: string) => void; lang: 'en' | 'id' }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);

  const t = translations[lang];
  
  const [error, setError] = useState<string | null>(null);
  const [isLibLoaded, setIsLibLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // ── Tambahkan State Facing Mode ──
  // 'environment' = kamera belakang, 'user' = kamera depan
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Fungsi untuk mengganti kamera
  const toggleCamera = () => {
    stopCamera(); // Matikan kamera lama
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  useEffect(() => {
    // 1. Load Library (Hanya sekali)
    if (!(window as any).jsQR) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      script.async = true;
      script.onload = () => setIsLibLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLibLoaded(true);
    }
  }, []);

  useEffect(() => {
    // 2. Start Camera (Dipicu ulang setiap facingMode berubah)
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.play();
        }
      } catch (e) {
        setError("Kamera tidak dapat diakses. Pastikan izin diberikan.");
      }
    }

    startCamera();
    return () => stopCamera();
  }, [facingMode, stopCamera]); // Tambahkan facingMode sebagai dependency

  const tick = useCallback(() => {
  if (isSuccess) return;

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const jsQR = (window as any).jsQR;

  if (video && video.readyState === video.HAVE_ENOUGH_DATA && canvas && jsQR) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // --- LOGIKA PERBAIKAN DI SINI ---
      ctx.save(); // Simpan state canvas
      
      if (facingMode === 'user') {
        // Jika kamera depan, balikkan canvas secara horizontal sebelum menggambar
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore(); // Kembalikan ke state normal
      // --------------------------------

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code && code.data) {
        setIsSuccess(true);
        setTimeout(() => {
          stopCamera();
          onResult(code.data);
        }, 2000);
        return;
      }
    }
  }
  animFrameRef.current = requestAnimationFrame(tick);
}, [onResult, stopCamera, isSuccess, facingMode]); // Pastikan facingMode ada di dependency

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
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover" 
          muted 
          playsInline 
          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
        />
        {/* Overlay gelap agar UI terlihat jelas */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Header UI: Menggunakan terjemahan untuk judul */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-30 bg-gradient-to-b from-black/80 to-transparent">
        <h2 className="text-white text-xs font-black tracking-widest uppercase">
          {t.scannerTitle}
        </h2>
        <div className="flex gap-4">
          {/* Tombol Flip Camera */}
          <button 
            onClick={toggleCamera}
            className="text-white w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-90"
            title="Switch Camera"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 4v5h-5" />
              <path d="M4 20v-5h5" />
              <path d="M20 9A9 9 0 0 0 5.64 5.64L11 11" />
              <path d="M4 15a9 9 0 0 0 14.36 3.36L13 13" />
            </svg>
          </button>
          
          {/* Tombol Close */}
          <button 
            onClick={() => { stopCamera(); onClose(); }} 
            className="text-white w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Frame Scanner */}
      <div className="relative z-20 flex flex-col items-center">
        <div className={`relative w-64 h-64 border-2 transition-all duration-500 rounded-[2.5rem] ${isSuccess ? 'border-green-400 scale-110 shadow-[0_0_30px_rgba(74,222,128,0.3)]' : 'border-white/30'}`}>
          {/* Siku Frame */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-2xl" />
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-2xl" />
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-2xl" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-2xl" />

          {/* Animasi Laser: Berhenti jika sukses */}
          {!isSuccess && (
            <div className="absolute left-4 right-4 h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] animate-laser opacity-70" />
          )}
          
          {/* Overlay Berhasil */}
          {isSuccess && (
            <div className="absolute inset-0 bg-green-400/20 flex flex-col items-center justify-center animate-pulse rounded-[2.5rem]">
              <span className="text-6xl drop-shadow-lg">✅</span>
            </div>
          )}
        </div>

        {/* Teks Instruksi Bawah: Menggunakan terjemahan dinamis */}
        <p className="mt-10 text-white text-[10px] font-bold tracking-[0.2em] bg-black/60 backdrop-blur-md px-6 py-2.5 rounded-full uppercase border border-white/10 transition-all">
          {isSuccess ? t.scannerSuccess : t.scannerHint}
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      
      <style jsx>{`
        @keyframes laserMove { 
          0% { top: 15%; opacity: 0.3; } 
          50% { top: 85%; opacity: 1; } 
          100% { top: 15%; opacity: 0.3; } 
        }
        .animate-laser { animation: laserMove 2.5s infinite ease-in-out; }
      `}</style>
    </div>
  );
}

// ── Halaman Utama ──
export default function CataloguePage() {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scanFeedback, setScanFeedback] = useState<string | null>(null);

  const t = translations[lang];
  const filters = ["All", "Sweet", "Sour", "Spicy", "Bitter"];

  // Fungsi pembantu translasi data dinamis
  const getTranslatedName = (item: any) => {
    return (translations[lang] as any)[item.id]?.name || item.name;
  };

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
        lang={lang}
        onClose={() => setShowScanner(false)}
        onResult={handleQRResult}
      />
    )}

    {/* ── TOMBOL TOGGLE BAHASA (FLOATING) ── */}
    <button 
      onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
      className="fixed bottom-28 right-6 z-[50] w-14 h-14 bg-white shadow-2xl rounded-full border-2 border-[#5A6B3A] flex items-center justify-center font-black text-sm text-[#5A6B3A] active:scale-90 transition-all hover:bg-[#5A6B3A] hover:text-white"
    >
      {lang === 'en' ? 'ID' : 'EN'}
    </button>

    {/* ── FEEDBACK SCAN ── */}
    {scanFeedback && (
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] bg-red-500 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-lg animate-bounce">
        {scanFeedback}
      </div>
    )}

    {/* ── HEADER & SEARCH ── */}
    <header className="sticky top-0 z-20 w-full" style={{ backgroundColor: '#F5F0E8' }}>
      <div className="max-w-5xl mx-auto p-6">
        <div className="relative mb-4 flex gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-10 rounded-2xl focus:outline-none transition text-sm shadow-sm"
              style={{ backgroundColor: '#EDE8DE', border: '1px solid #D8D0C0' }}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-lg">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tombol Scan QR */}
          <button
            onClick={() => setShowScanner(true)}
            className="w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 hover:opacity-90"
            style={{ backgroundColor: '#5A6B3A' }}
            title={t.scannerTitle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3H5C3.89543 3 3 3.89543 3 5V7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17 3H19C20.1046 3 21 3.89543 21 5V7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 21H5C3.89543 21 3 20.1046 3 19V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17 21H19C20.1046 21 21 20.1046 21 19V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <rect x="7" y="7" width="3" height="3" fill="white"/>
              <rect x="14" y="7" width="3" height="3" fill="white"/>
              <rect x="7" y="14" width="3" height="3" fill="white"/>
              <rect x="14" y="14" width="3" height="3" fill="white"/>
              <line x1="2" y1="12" x2="22" y2="12" stroke="#A8D18D" strokeWidth="2" strokeLinecap="round" className="animate-pulse"/>
            </svg>
          </button>
        </div>

        {/* Filter Capsule Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === filter ? 'text-white shadow-md' : 'text-gray-500'
              }`}
              style={{
                backgroundColor: activeFilter === filter ? '#5A6B3A' : '#EDE8DE',
                border: activeFilter === filter ? 'none' : '1px solid #D0C8B8',
              }}
            >
              {(t as any)[`filter${filter}`] || filter}
            </button>
          ))}
        </div>
      </div>
    </header>

    {/* ── MAIN CONTENT ── */}
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 space-y-12 mt-4">

      {/* ── JAMU INGREDIENTS ── */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-6">
          {t.ingredientsTitle}
        </h2>
        <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar -mx-6 px-6">
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((item) => (
              <Link href={`/detail/${item.id}`} key={item.id} className="flex-shrink-0 group w-36 md:w-44">
                <div className="flex flex-col items-center gap-3 active:scale-95 transition-transform">
                  <div className="aspect-square w-full rounded-full overflow-hidden shadow-lg border-4 border-white bg-[#D8D0C0]">
                    <img 
                      src={item.img} 
                      alt={getTranslatedName(item)} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-sm md:text-base leading-tight">
                      {getTranslatedName(item)}
                    </h3>
                    <p className="text-[11px] md:text-xs text-gray-500 italic mt-1">
                      {item.scientific}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic px-2">{t.noIngredients}</p>
          )}
        </div>
      </section>

      {/* ── JAMU INVENTORY ── */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-6">
          {t.inventoryTitle}
        </h2>
        <div className="relative">
          <div className="flex overflow-x-auto gap-8 pb-6 items-end no-scrollbar -mx-6 px-6">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => {
                const bottleColor = bottleColorMap[item.id] ?? DEFAULT_BOTTLE_COLOR;
                return (
                  <Link href={`/detail/${item.id}`} key={item.id} className="flex-shrink-0 group">
                    <div className="flex flex-col items-center gap-3 active:scale-95 transition-transform">
                      <div className="w-20 h-44 md:w-24 md:h-52 drop-shadow-xl group-hover:-translate-y-3 transition-transform duration-300">
                        <JamuBottle color={bottleColor} />
                      </div>
                      <h4 className="text-[11px] md:text-sm font-black text-center w-24 leading-tight uppercase tracking-wider text-gray-600 group-hover:text-gray-900">
                        {getTranslatedName(item)}
                      </h4>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="text-sm text-gray-400 italic px-2">{t.noJamu}</p>
            )}
          </div>
          {/* Lantai / Rak Botol */}
          <div className="h-2 w-full rounded-full mt-2 shadow-inner" style={{ backgroundColor: '#D0C8B8' }} />
        </div>
      </section>
    </main>

    <style jsx global>{`
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  </div>
);
}