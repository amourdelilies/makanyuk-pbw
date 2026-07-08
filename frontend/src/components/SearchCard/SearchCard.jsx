import React, { useState } from 'react';
import { FaSearch, FaSlidersH, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function SearchCard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [maxDuration, setMaxDuration] = useState(30);
  const [maxCalories, setMaxCalories] = useState(800);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Mencari:", searchQuery, "Durasi:", maxDuration, "Kalori:", maxCalories);
    // Jalankan logika routing atau hit API backend di sini nanti
  };

  return (
    <div className="w-full bg-white/95 rounded-2xl p-5 shadow-xl border border-gray-100 backdrop-blur-md text-gray-800 transition-all duration-300">
      <form onSubmit={handleSearch} className="space-y-4">
        
        {/* Row Utama: Input Pencarian & Tombol */}
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="w-full flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 focus-within:bg-white focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition duration-200">
            <FaSearch className="text-gray-400 text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Masukkan masakan atau input bahan baku (contoh: telur, tomat)..."
              className="w-full bg-transparent text-sm md:text-base text-gray-800 outline-none placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex w-full md:w-auto gap-2 justify-end">
            {/* Tombol Toggle Filter Lanjutan */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition duration-200 whitespace-nowrap ${
                showFilters 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaSlidersH />
              <span>Filter</span>
              {showFilters ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
            </button>

            {/* Tombol Cari */}
            <button
              type="submit"
              className="w-full md:w-auto bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition duration-200 whitespace-nowrap"
            >
              Cari Resep
            </button>
          </div>
        </div>

        {/* Panel Filter Lanjutan (Collapsible dengan animasi transisi tinggi) */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 transition-all duration-300 origin-top overflow-hidden ${
            showFilters 
              ? 'opacity-100 max-h-[500px] scale-y-100 mt-4' 
              : 'opacity-0 max-h-0 scale-y-0 pointer-events-none'
          }`}
        >
          {/* Slider Durasi Memasak */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span className="flex items-center gap-1.5">⏱️ Durasi Masak</span>
              <span className="text-green-700 font-bold">Maks. {maxDuration} Menit</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="60" 
              step="5"
              value={maxDuration} 
              onChange={(e) => setMaxDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700 focus:outline-none"
            />
            <div className="flex justify-between text-xs text-gray-400 px-1">
              <span>5m</span>
              <span>30m</span>
              <span>60m+</span>
            </div>
          </div>

          {/* Slider Batas Kalori */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span className="flex items-center gap-1.5">🔥 Batas Kalori</span>
              <span className="text-green-700 font-bold">{maxCalories} kkal</span>
            </div>
            <input 
              type="range" 
              min="200" 
              max="1500" 
              step="50"
              value={maxCalories} 
              onChange={(e) => setMaxCalories(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700 focus:outline-none"
            />
            <div className="flex justify-between text-xs text-gray-400 px-1">
              <span>200</span>
              <span>800</span>
              <span>1500</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}