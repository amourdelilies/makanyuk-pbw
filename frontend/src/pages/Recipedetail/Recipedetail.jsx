import React, { useState } from 'react';
import { FaClock, FaFireAlt, FaRegBookmark, FaFilter } from 'react-icons/fa';

export default function Recipes() {
  // Hapus baris return lama yang menyelinap di sini tadi!

  const [activeTab, setActiveTab] = useState('Semua');
  const categories = ['Semua', 'Sarapan Pagi', 'Menu Diet Sehat', 'Olahan Ayam', 'Hidangan Malam'];

  // Dummy data katalog resep
  const allRecipes = [
    { id: 1, title: 'Ayam Goreng Krutuk', category: 'Olahan Ayam', time: '35 mnt', calories: '420 kkal', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop' },
    { id: 2, title: 'Chicken Breast Salad', category: 'Menu Diet Sehat', time: '15 mnt', calories: '280 kkal', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop' },
    { id: 3, title: 'Capcay Seafood', category: 'Hidangan Malam', time: '20 mnt', calories: '190 kkal', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=500&auto=format&fit=crop' },
    { id: 4, title: 'Nasi Goreng Ayam Mentega', category: 'Hidangan Malam', time: '25 mnt', calories: '450 kkal', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500&auto=format&fit=crop' },
    { id: 5, title: 'Omelet Sayur Sehat', category: 'Sarapan Pagi', time: '10 mnt', calories: '210 kkal', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500&auto=format&fit=crop' },
    { id: 6, title: 'Soto Ayam Lamongan', category: 'Olahan Ayam', time: '45 mnt', calories: '310 kkal', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop' },
  ];

  const filteredRecipes = activeTab === 'Semua' 
    ? allRecipes 
    : allRecipes.filter(recipe => recipe.category === activeTab);

  // Biarkan return utama di paling bawah ini yang bekerja mengurus seluruh layout halaman
  return (
    <div className="space-y-8 min-h-[60vh]">
      
      {/* Bagian Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Daftar Resep Masakan
          </h1>
          <p className="text-sm text-gray-500">
            Jelajahi ratusan resep masakan Indonesia pilihan yang siap Anda coba di dapur.
          </p>
        </div>
        
        {/* Info Total Resep */}
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold self-start md:self-auto">
          <FaFilter className="text-xs" />
          <span>Menampilkan {filteredRecipes.length} Resep</span>
        </div>
      </div>

      {/* Bar Filter Kategori Ringkas (Pills Style) */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition duration-200 whitespace-nowrap ${
              activeTab === cat
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Katalog Resep */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Gambar Resep + Overlay Badge Kategori */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-green-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {recipe.category}
                </span>
                
                {/* Tombol Bookmark/Favorit */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Ditambahkan ke Daftar Saya: ${recipe.title}`);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 shadow-sm hover:scale-110 transition duration-200"
                >
                  <FaRegBookmark className="text-sm" />
                </button>
              </div>

              {/* Konten Detail Resep */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-green-700 transition duration-200 line-clamp-1">
                  {recipe.title}
                </h3>
                
                {/* Durasi & Kalori */}
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 border-t border-gray-50 pt-3">
                  <span className="flex items-center gap-1.5">
                    <FaClock className="text-gray-300 text-sm" /> {recipe.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaFireAlt className="text-gray-300 text-sm" /> {recipe.calories}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">Belum ada resep dalam kategori ini.</p>
        </div>
      )}

    </div>
  );
}