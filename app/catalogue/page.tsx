"use client";

import React from 'react';
import Link from 'next/link';

// Data Bahan Herbal (Baris 1)
const row1Ingredients = [
  { id: 1, name: 'Jahe Merah', scientific: 'Zingiber officinale', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300' },
  { id: 2, name: 'Kunyit', scientific: 'Curcuma longa', img: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=300' },
  { id: 3, name: 'Temulawak', scientific: 'Curcuma xanthorrhiza', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=300' },
  { id: 4, name: 'Kencur', scientific: 'Kaempferia galanga', img: 'https://images.unsplash.com/photo-1627318359223-911b3334237c?auto=format&fit=crop&q=80&w=300' },
  { id: 5, name: 'Kayu Manis', scientific: 'Cinnamomum verum', img: 'https://images.unsplash.com/photo-1599318181673-98305c6d37aa?auto=format&fit=crop&q=80&w=300' },
  { id: 6, name: 'Sirih', scientific: 'Piper betle', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300' },
  { id: 7, name: 'Sambiloto', scientific: 'Andrographis paniculata', img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=300' },
  { id: 8, name: 'Cengkeh', scientific: 'Syzygium aromaticum', img: 'https://images.unsplash.com/photo-1608500218890-c5f01c7049d1?auto=format&fit=crop&q=80&w=300' },
  { id: 9, name: 'Kapulaga', scientific: 'Elettaria cardamomum', img: 'https://images.unsplash.com/photo-1515543504111-8e3489e24876?auto=format&fit=crop&q=80&w=300' },
  { id: 10, name: 'Pandan', scientific: 'Pandanus amaryllifolius', img: 'https://images.unsplash.com/photo-1591981772121-51ff7344930d?auto=format&fit=crop&q=80&w=300' },
];

// Data Bahan Herbal (Baris 2)
const row2Ingredients = [
 { id: 1, name: 'Jahe Merah', scientific: 'Zingiber officinale', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300' },
  { id: 2, name: 'Kunyit', scientific: 'Curcuma longa', img: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=300' },
  { id: 3, name: 'Temulawak', scientific: 'Curcuma xanthorrhiza', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=300' },
  { id: 4, name: 'Kencur', scientific: 'Kaempferia galanga', img: 'https://images.unsplash.com/photo-1627318359223-911b3334237c?auto=format&fit=crop&q=80&w=300' },
  { id: 5, name: 'Kayu Manis', scientific: 'Cinnamomum verum', img: 'https://images.unsplash.com/photo-1599318181673-98305c6d37aa?auto=format&fit=crop&q=80&w=300' },
    { id: 6, name: 'Sirih', scientific: 'Piper betle', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300' },
  { id: 7, name: 'Sambiloto', scientific: 'Andrographis paniculata', img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=300' },
  { id: 8, name: 'Cengkeh', scientific: 'Syzygium aromaticum', img: 'https://images.unsplash.com/photo-1608500218890-c5f01c7049d1?auto=format&fit=crop&q=80&w=300' },
  { id: 9, name: 'Kapulaga', scientific: 'Elettaria cardamomum', img: 'https://images.unsplash.com/photo-1515543504111-8e3489e24876?auto=format&fit=crop&q=80&w=300' },
  { id: 10, name: 'Pandan', scientific: 'Pandanus amaryllifolius', img: 'https://images.unsplash.com/photo-1591981772121-51ff7344930d?auto=format&fit=crop&q=80&w=300' },

];

// Data Inventori Jamu (Baris 3)
const inventory = [
  { id: 101, name: 'Beras Kencur', size: '250ml', color: 'bg-stone-100' },
  { id: 102, name: 'Kunyit Asam', size: '500ml', color: 'bg-yellow-500' },
  { id: 103, name: 'Gula Asam', size: '250ml', color: 'bg-orange-900' },
  { id: 104, name: 'Pahitan', size: '250ml', color: 'bg-green-900' },
  { id: 105, name: 'Sinom', size: '500ml', color: 'bg-yellow-200' },
  { id: 106, name: 'Cabe Puyang', size: '250ml', color: 'bg-red-700' },
  { id: 107, name: 'Uyup-uyup', size: '500ml', color: 'bg-emerald-300' },
  { id: 108, name: 'Kudu Laos', size: '250ml', color: 'bg-orange-400' },
  { id: 101, name: 'Beras Kencur', size: '250ml', color: 'bg-stone-100' },
  { id: 102, name: 'Kunyit Asam', size: '500ml', color: 'bg-yellow-500' },
  { id: 103, name: 'Gula Asam', size: '250ml', color: 'bg-orange-900' },
  { id: 104, name: 'Pahitan', size: '250ml', color: 'bg-green-900' },
  { id: 105, name: 'Sinom', size: '500ml', color: 'bg-yellow-200' },
  { id: 106, name: 'Cabe Puyang', size: '250ml', color: 'bg-red-700' },
  { id: 107, name: 'Uyup-uyup', size: '500ml', color: 'bg-emerald-300' },
  { id: 108, name: 'Kudu Laos', size: '250ml', color: 'bg-orange-400' },
];

export default function CataloguePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col pb-24">
      
      {/* Search Bar */}
      <header className="p-6 bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="max-w-md mx-auto relative">
          <input 
            type="text" 
            placeholder="Search Jamudex..." 
            className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-10">
        
        {/* SECTION: JAMU INGREDIENTS */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Jamu Ingredients</h2>
          
          {/* Baris 1: Ingredients */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
  {row1Ingredients.map((item) => (
    /* 1. Tambahkan Link dengan template literal untuk ID dinamis */
    <Link 
      href={`/detail/${item.name.toLowerCase().replace(/\s+/g, '-')}`} 
      key={item.id}
      className="flex-shrink-0"
    >
      <div className="w-40 space-y-3 cursor-pointer group">
        {/* 2. Tambahkan efek hover agar lebih interaktif */}
        <div className="w-40 h-40 rounded-3xl shadow-md overflow-hidden bg-gray-200 border-b-4 border-gray-300 group-hover:border-emerald-500 transition-colors">
          <img 
            src={item.img} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
          />
        </div>
        <div className="px-1">
          <h3 className="font-bold text-sm truncate group-hover:text-emerald-700">{item.name}</h3>
          <p className="text-[10px] text-gray-400 italic truncate">{item.scientific}</p>
        </div>
      </div>
    </Link>
  ))}
  
  {/* Indikator Panah */}
  <div className="flex-shrink-0 w-12 flex items-center justify-center text-2xl text-gray-300 select-none">
    ▷
  </div>
</div>

          {/* Baris 2: Ingredients */}
          <div className="flex overflow-x-auto gap-4 pb-4 mt-6 scrollbar-hide">
            {row2Ingredients.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-40 space-y-3">
                <div className="w-40 h-40 rounded-3xl shadow-md overflow-hidden bg-gray-200 border-b-4 border-gray-300">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="px-1">
                  <h3 className="font-bold text-sm truncate">{item.name}</h3>
                  <p className="text-[10px] text-gray-400 italic truncate">{item.scientific}</p>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-12 flex items-center justify-center text-2xl text-gray-300">▷</div>
          </div>
        </section>

        {/* SECTION: JAMU INVENTORY (Baris 3) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Jamu Inventory</h2>
          <div className="flex overflow-x-auto gap-8 pb-4 items-end scrollbar-hide">
            {inventory.map((item) => (
              <div key={item.id} className="flex-shrink-0 flex flex-col items-center group">
                {/* Botol Polos */}
                <div className={`w-20 h-48 rounded-t-full rounded-b-xl border-2 border-gray-800 relative overflow-hidden ${item.color} transition-transform group-active:scale-90 shadow-lg`}>
                  <div className="absolute top-0 w-full h-4 bg-white/20 border-b border-gray-800/20"></div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-xs font-bold w-24 truncate">{item.name}</h4>
                  <p className="text-[10px] text-gray-400">{item.size}</p>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-12 flex items-center justify-center text-2xl text-gray-300 mb-16">▷</div>
          </div>
          {/* Rak Bawah */}
          <div className="h-2 bg-gray-200 w-full rounded-full -mt-2"></div>
        </section>

      </main>

    

    </div>
  );
}