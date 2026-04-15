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
  const [scanning, setScanning] = useState(true);

  // Load jsQR dari CDN
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).jsQR) return; // sudah ada

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsqr/1.4.0/jsQR.min.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Mulai kamera
  useEffect(() => {
    let active = true;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // kamera belakang di HP
        });
        if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (e) {
        setError('Tidak bisa mengakses kamera. Pastikan izin kamera sudah diberikan.');
      }
    }

    startCamera();
    return () => {
      active = false;
      streamRef.current?.getTracks().forEach(t => t.stop());
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Scan QR tiap frame
  const tick = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !scanning) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const jsQR = (window as any).jsQR;

      if (jsQR) {
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        if (code) {
          setScanning(false);
          streamRef.current?.getTracks().forEach(t => t.stop());
          onResult(code.data);
          return;
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(tick);
  }, [scanning, onResult]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [tick]);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}>
        <h2 className="text-white font-black text-sm uppercase tracking-widest">Scan QR Jamu</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-sm transition-all"
        >
          ✕
        </button>
      </div>

      {/* Video kamera */}
      {!error ? (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />

          {/* Overlay frame QR */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Sudut-sudut frame */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-white rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-white rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-white rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-white rounded-br-lg" />

              {/* Garis scan animasi */}
              <div
                className="absolute left-2 right-2 h-0.5 bg-green-400"
                style={{ animation: 'scan 2s linear infinite', top: '50%' }}
              />
            </div>
          </div>

          {/* Petunjuk */}
          <div className="absolute bottom-0 left-0 right-0 pb-12 flex flex-col items-center"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
            <p className="text-white text-xs text-center px-8 py-4 opacity-80">
              Arahkan kamera ke QR code yang ingin discan
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 px-8 text-center">
          <span className="text-5xl">📷</span>
          <p className="text-white text-sm">{error}</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold text-sm"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Canvas tersembunyi untuk proses QR */}
      <canvas ref={canvasRef} className="hidden" />

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
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

    // QR bisa berisi: id langsung (mis. "kunyit"), atau URL (mis. "http://.../detail/kunyit")
    let jamuId = result.trim();

    // Jika berisi URL, ambil segmen terakhir sebagai id
    if (jamuId.includes('/')) {
      jamuId = jamuId.split('/').filter(Boolean).pop() ?? jamuId;
    }

    // Cek apakah id ada di data
    const found = jamuData.find(j => j.id === jamuId);
    if (found) {
      router.push(`/detail/${found.id}`);
    } else {
      // Coba cari berdasarkan nama
      const byName = jamuData.find(j =>
        j.name.toLowerCase().replace(/\s+/g, '-') === jamuId.toLowerCase()
      );
      if (byName) {
        router.push(`/detail/${byName.id}`);
      } else {
        setScanFeedback(`QR tidak dikenali: "${result}"`);
        setTimeout(() => setScanFeedback(null), 3000);
      }
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
            {/* QR Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="3" height="3" />
              <rect x="19" y="14" width="2" height="2" />
              <rect x="14" y="19" width="2" height="2" />
              <rect x="18" y="18" width="3" height="3" />
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
            <div className="h-2 rounded-full mt-1" style={{ backgroundColor: '#D0C8B8' }} />
          </div>
        </section>
      </main>
    </div>
  );
}