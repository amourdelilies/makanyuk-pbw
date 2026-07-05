import React from 'react';
import { FaClock, FaFireAlt, FaChevronRight } from 'react-icons/fa';

export default function TrendingRecipe() {
  // Dummy data resep lokal kuliner Indonesia sesuai mockup keduamu
  const trendingRecipes = [
    {
      id: 1,
      title: 'Ayam Goreng Krutuk',
      desc: 'Gurih dan kriuk praktis untuk dimasak sehari-hari.',
      time: '35 mnt',
      calories: '420 kkal',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Chicken Breast Salad with Toast',
      desc: 'Dada ayam dan sayur salad segar kaya protein untuk diet.',
      time: '15 mnt',
      calories: '280 kkal',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Capcay Seafood',
      desc: 'Campuran aneka seafood dan sayur segar menggugah selera.',
      time: '20 mnt',
      calories: '190 kkal',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Nasi Goreng Ayam Mentega',
      desc: 'Paduan mentega gurih dengan potongan daging ayam lezat.',
      time: '25 mnt',
      calories: '450 kkal',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500&auto=format&fit=crop'
    }
  ];

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex items-end justify-between border-b border-gray-100 pb-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            Sedang Tren
          </h2>
          <p className="text-sm text-gray-500">
            Resep yang paling banyak difavoritkan oleh pengguna minggu ini
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-bold text-green-700 hover:text-green-800 transition group">
          <span>Lihat Semua</span>
          <FaChevronRight className="text-xs transform group-hover:translate-x-1 transition duration-200" />
        </button>
      </div>

      {/* Grid Cards Container */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trendingRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Image Wrapper dengan Aspect Ratio Tetap */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" 
              />
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800 text-base group-hover:text-green-700 transition duration-200 line-clamp-1">
                  {recipe.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {recipe.desc}
                </p>
              </div>

              {/* Info Durasi & Kalori Minimalis */}
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 border-t border-gray-50 pt-3">
                <span className="flex items-center gap-1">
                  <FaClock className="text-gray-300" /> {recipe.time}
                </span>
                <span className="flex items-center gap-1">
                  <FaFireAlt className="text-gray-300" /> {recipe.calories}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}