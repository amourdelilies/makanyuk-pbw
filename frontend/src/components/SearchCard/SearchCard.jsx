import React, { useState } from 'react';
import { FaSearch, FaSlidersH, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// 1. Tambahkan props 'onSearchResult' dan 'onLoading' di deklarasi komponen
export default function SearchCard({ onSearchResult, onLoading }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [maxDuration, setMaxDuration] = useState(30);
    const [maxCalories, setMaxCalories] = useState(800);

    const [daftarResep, setDaftarResep] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

  
    // 2. Ubah fungsi handleSearch menjadi async
    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchQuery) return;
      
        setIsLoading(true);
        try {
          // 1. PASTIKAN URL memakai https:// dan diakhiri /api/resep/cari-bahan
          const url = `https://makan-yuk.vercel.app/api/recipe`;
          
          console.log("Sedang menembak URL:", url); // Untuk validasi URL di konsol
      
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
      
          // Jika server merespon tapi statusnya bukan 200 OK (misal 404 atau 500)
          if (!response.ok) {
            throw new Error(`Server merespon dengan status: ${response.status}`);
          }
      
          const data = await response.json();
    console.log("Data Berhasil Diterima:", data);

    // KARENA DATA LANGSUNG BERUPA ARRAY, KITA LANGSUNG CEK APAKAH DIA ARRAY
    if (Array.isArray(data)) {
      setDaftarResep(data); // Simpan langsung array data ke state
    } else if (data && data.status === "success") {
      // Ini cadangan jika di kemudian hari backend-mu dibungkus objek success
      setDaftarResep(data.results);
    } else {
      console.error("Format data tidak dikenal");
    }

        } catch (error) {
          // 2. Menampilkan detail error yang sebenarnya (CORS, Network Error, dll)
          console.error("Detail Error Konek API:", error.message || error);
          alert(`Gagal konek ke API: ${error.message || "Periksa CORS backend atau koneksi internet"}`);
        } finally {
          setIsLoading(false);
        }
      };
      
      return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
          {/* Form Pencarian Utama */}
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
                    disabled={isLoading}
                    className="w-full md:w-auto bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition duration-200 whitespace-nowrap disabled:bg-green-400"
                  >
                    {isLoading ? 'Mencari...' : 'Cari Resep'}
                  </button>
                </div>
              </div>
    
              {/* Panel Filter Lanjutan */}
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
    
          {/* ========================================================================= */}
          {/* 🔴 BAGIAN BARU: MENAMPILKAN HASIL RESEP DI BAWAH KARTU PENCARIAN         */}
          {/* ========================================================================= */}
          
          {/* Indikator Loading Spinner Premium */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium text-sm animate-pulse">Sedang meracik resep terbaik...</p>
            </div>
          )}
    
          {/* Grid List Kartu Hasil Resep */}
          {!isLoading && daftarResep && daftarResep.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-fadeIn">
              {daftarResep.map((resep, index) => (
                <div 
                  key={resep.id || index} 
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between"
                >
                  <div>
                    {/* Judul Resep */}
                    <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 hover:text-green-700 transition duration-150">
                      {resep.title || "Resep Tanpa Judul"}
                    </h3>
                    
                    {/* Potongan Bahan Baku */}
                    <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">
                      <strong className="text-green-700 font-semibold">Bahan:</strong>{' '}
                      {resep.ingredients || resep.ingredients_list || "Bahan-bahan tidak tercantum"}
                    </p>
                  </div>
    
                  {/* Footer kartu kecil jika ada metadata tambahan */}
                  <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                    <span>🍽️ Porsi Tersedia</span>
                    <span className="text-green-600 font-medium">Lihat Detail →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
    
          {/* Tampilan Jika Pencarian Tidak Menemukan Hasil */}
          {!isLoading && searchQuery && daftarResep && daftarResep.length === 0 && (
            <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <span className="text-4xl">🍳</span>
              <p className="text-gray-500 mt-2 font-medium">Resep dengan bahan "{searchQuery}" tidak ditemukan.</p>
              <p className="text-gray-400 text-xs mt-1">Coba gunakan variasi kata kunci bahan lainnya!</p>
            </div>
          )}
        </div>
      );    
}