import React from 'react';
import { FaClock, FaFireAlt, FaRegHeart, FaShareAlt, FaChevronLeft, FaCheckCircle, FaStar } from 'react-icons/fa';

export default function RecipeDetailView({ selectedRecipe, activeTab, handleBackToList, toggleBookmark, mockReviews }) {
  const titleText = selectedRecipe?.title || 'Detail Resep';
  const durationText = selectedRecipe?.estimatedTime || 30;
  const caloriesText = selectedRecipe?.estimatedCalories || 250;
  const categoryText = selectedRecipe?.category || (activeTab !== 'Semua' ? activeTab : 'Nusantara');

  const rawIngredients = selectedRecipe?.ingredients || "Bahan-bahan sedang dimuat...";
  const ingredientList = Array.isArray(rawIngredients) ? rawIngredients : rawIngredients.split('\n').filter(item => item.trim() !== '');

  const rawSteps = selectedRecipe?.steps || "Langkah memasak sedang dimuat...";
  const stepList = Array.isArray(rawSteps) ? rawSteps : rawSteps.split('\n').filter(item => item.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16 -mx-4 sm:-mx-8 px-4 sm:px-8 relative z-10 animate-[fadeInUp_0.4s_ease-out]">
      {/* Tombol Kembali */}
      <button 
        onClick={handleBackToList}
        className="fixed top-24 left-6 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md shadow-md border border-gray-200/50 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-700 hover:bg-white hover:text-green-700 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <FaChevronLeft className="text-xs" /> Kembali
      </button>

      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] bg-gray-950 overflow-hidden rounded-3xl shadow-lg group/hero">
        <img src={selectedRecipe?.image} alt={titleText} className="w-full h-full object-cover opacity-85 scale-100 group-hover/hero:scale-102 transition-transform duration-[2s] ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-10 space-y-4 text-white">
          <span className="bg-green-600 border border-green-500/30 text-white text-[10px] sm:text-xs font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md inline-block">{categoryText}</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-lg leading-tight max-w-4xl">{titleText}</h1>
        </div>
      </div>

      {/* Bar Nutrisi */}
      <div className="max-w-5xl mx-auto mt-6 relative z-20 px-2 sm:px-0">
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-gray-100 shadow-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-2xl transition duration-300">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-bold text-gray-600 divide-x divide-gray-100">
            <div className="flex flex-col items-center gap-1">
              <span className="text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wide flex items-center gap-1"><FaClock className="text-green-600" /> Waktu</span>
              <span className="text-gray-900 text-base sm:text-lg font-black">{durationText} <span className="text-xs text-gray-400 font-bold">mnt</span></span>
            </div>
            <div className="flex flex-col items-center gap-1 pl-8">
              <span className="text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wide flex items-center gap-1"><FaFireAlt className="text-orange-500" /> Energi</span>
              <span className="text-gray-900 text-base sm:text-lg font-black">{caloriesText} <span className="text-xs text-gray-400 font-bold">kkal</span></span>
            </div>
            <div className="flex flex-col items-center gap-1 pl-8">
              <span className="text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wide">Porsi</span>
              <span className="text-green-700 bg-green-50 border border-green-100 px-3 py-0.5 rounded-full text-xs font-extrabold shadow-2xs">4 Orang</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleBookmark(selectedRecipe.id || 0)} className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition duration-300 shadow-md shadow-green-700/20 active:scale-[0.98] flex-grow sm:flex-grow-0">
              <FaRegHeart /> <span>Simpan Ke Daftar</span>
            </button>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl text-gray-500 hover:text-gray-700 transition shadow-2xs">
              <FaShareAlt className="text-xs sm:text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Bahan & Langkah */}
      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition">
            <h3 className="font-black text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center gap-2"><FaCheckCircle className="text-green-700 text-base" /> Bahan-bahan</h3>
            <ul className="space-y-1">
              {ingredientList.map((ing, i) => (
                <li key={i} className="group/item flex items-center gap-3.5 text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed py-2 px-2.5 rounded-xl hover:bg-green-50/50 hover:text-green-900 transition duration-200">
                  <input type="checkbox" className="rounded text-green-700 focus:ring-green-600 cursor-pointer h-4 w-4 border-gray-300 group-hover/item:border-green-500 focus:ring-offset-0 transition" />
                  <span className="flex-1">{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition">
            <div>
              <h3 className="font-black text-gray-900 text-lg">Langkah Mengolah</h3>
              <p className="text-gray-400 text-xs mt-0.5">Panduan memasak riil yang ditarik otomatis dari database MakanYuk.</p>
            </div>
            <div className="space-y-4 pt-1">
              {stepList.map((step, i) => (
                <div key={i} className="group/card border border-gray-100 rounded-2xl p-5 relative overflow-hidden bg-white shadow-3xs hover:shadow-md hover:border-green-700/20 hover:scale-[1.01] transition-all duration-300">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover/card:bg-green-700 transition duration-300"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center bg-gray-100 text-gray-700 group-hover/card:bg-green-700 group-hover/card:text-white font-black h-7 w-7 rounded-full text-xs shadow-3xs transition duration-300">{i + 1}</span>
                    <h4 className="font-black text-gray-800 text-xs sm:text-sm group-hover/card:text-green-800 transition">Tahapan Resep</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed pl-0.5 group-hover/card:text-gray-700 transition">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ulasan Komunitas */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 hover:shadow-md transition">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-black text-gray-900 text-lg">Ulasan Komunitas</h3>
            <button className="text-green-700 text-xs sm:text-sm font-bold hover:text-green-800 hover:underline transition">Bagikan ulasanmu</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mockReviews.map((rev, i) => (
              <div key={i} className="bg-gray-50/50 border border-gray-100/70 p-4 rounded-2xl flex gap-4 shadow-3xs hover:bg-white hover:shadow-md transition-all duration-300">
                <img src={rev.avatar} alt={rev.name} className="h-10 w-10 rounded-full object-cover border border-white" />
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-bold text-gray-800 text-xs sm:text-sm">{rev.name}</h5>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400">{rev.time}</span>
                  </div>
                  <div className="flex gap-0.5 text-amber-400 text-[10px]">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar key={idx} className={idx < rev.rating ? 'text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed italic mt-1 bg-white/40 p-2 rounded-xl border border-gray-50">"{rev.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}