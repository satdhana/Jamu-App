import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#2A1B17] flex flex-col items-center justify-center p-8 text-center">
      {/* Branding Section */}
      <div className="mb-16">
        <div className="w-20 h-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl backdrop-blur-md border border-white/10">
          🍃
        </div>
        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">
          JAMUDEX <span className="block text-sm not-italic font-bold tracking-[0.3em] text-orange-400 mt-2 opacity-80">ECOSYSTEM</span>
        </h1>
      </div>

      {/* Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        
        {/* Project 1: Jamu Catalogue */}
        <Link href="/catalogue" className="group relative p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all duration-500 overflow-hidden">
          <div className="absolute -right-8 -bottom-8 text-9xl opacity-5 group-hover:opacity-10 transition-opacity">📚</div>
          <div className="relative z-10">
            <span className="text-4xl mb-4 block">Encyclopedia</span>
            <h2 className="text-2xl font-black text-white italic tracking-tight">JAMU CATALOGUE</h2>
            <p className="text-sm text-white/40 mt-3 font-medium leading-relaxed">
              Explore the sacred 8 Jamu Gendong, ingredients, and traditional Javanese wisdom.
            </p>
            <div className="mt-8 text-xs font-black uppercase tracking-widest text-white underline underline-offset-8 decoration-emerald-500">
              Open Library ➔
            </div>
          </div>
        </Link>

        {/* Project 2: Jamu App (Tracker) */}
        <Link href="/dashboard" className="group relative p-10 bg-emerald-900/20 border border-emerald-500/20 rounded-[3rem] hover:bg-emerald-900/30 transition-all duration-500 overflow-hidden">
          <div className="absolute -right-8 -bottom-8 text-9xl opacity-5 group-hover:opacity-10 transition-opacity">✨</div>
          <div className="relative z-10">
            <span className="text-4xl mb-4 block">Personalized</span>
            <h2 className="text-2xl font-black text-emerald-400 italic tracking-tight">JAMU APP</h2>
            <p className="text-sm text-emerald-400/40 mt-3 font-medium leading-relaxed">
              Log your daily brews, track your energy, and reflect on your wellness journey.
            </p>
            <div className="mt-8 text-xs font-black uppercase tracking-widest text-emerald-400 underline underline-offset-8 decoration-orange-500">
              Start Tracking ➔
            </div>
          </div>
        </Link>

      </div>

      {/* Footer Info */}
      <footer className="mt-16 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
        © 2026 Jamudex Digital Ecosystem • Built for Modern Wellness
      </footer>
    </div>
  );
}