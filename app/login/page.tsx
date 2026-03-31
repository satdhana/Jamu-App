"use client";
import { useApp } from "@/app/context/appContext";

export default function LoginPage() {
  const { login } = useApp();

  return (
    <div className="min-h-screen bg-[#2A1B17] flex flex-col items-center justify-center p-8 text-white">
      <div className="mb-8 text-6xl">🍃</div>
      <h1 className="text-4xl font-black italic tracking-tighter mb-12">JAMUDEX</h1>
      
      <div className="w-full max-w-xs space-y-4">
        <input type="email" placeholder="Email" className="w-full p-4 bg-white/10 rounded-2xl border border-white/10 outline-none" />
        <button 
          onClick={login} 
          className="w-full py-4 bg-white text-[#2A1B17] rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-transform"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}