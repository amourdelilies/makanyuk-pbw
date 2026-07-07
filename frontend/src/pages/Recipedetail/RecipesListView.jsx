import React from 'react';
import { FaClock, FaFireAlt, FaRegBookmark, FaBookmark, FaFilter, FaStar } from 'react-icons/fa';

export default function RecipesListView({ 
  filteredRecipes, 
  loading, 
  error, 
  activeTab, 
  setActiveTab, 
  categories, 
  bookmarkedIds, 
  toggleBookmark, 
  getStrictIndonesianImage, 
  handleOpenDetail 
}) {
  return (
    <div className="space-y-8 min-h-[70vh] px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">Jelajahi Resep Masakan</h1>
          <p className="text-xs sm:text-sm text-gray-400">Menampilkan resep masakan riil hasil database kuliner tim MakanYuk.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm border border-green-100/50">
          <FaFilter className="text-[10px]" />
          <span>Kategori: {activeTab} ({filteredRecipes.length} Resep)</span>
        </div>
      </div>

      {/* Filter Tab Kapsul */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === cat
                ? 'bg-green-700 text-white shadow-lg shadow-green-700/30 scale-105'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid View */}
      {loading ? (
        <div className="text-center py-24 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-green-700"></div>
          <p className="text-gray-400 text-xs sm:text-sm mt-4 font-medium tracking-wide animate-pulse">Memuat kuliner nusantara pilihan...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-sm max-w-xl mx-auto px-4 shadow-sm">
          ⚠️ Gagal memuat data: {error}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe, index) => {
            const recipeId = recipe.id || recipe.recipe_id || index;
            const isSaved = bookmarkedIds.includes(recipeId);
            const titleText = recipe.title || "Judul Tidak Tersedia";
            const currentImage = getStrictIndonesianImage(titleText);
            
            const estimatedTime = 15 + (titleText.length * 3) % 45; 
            const estimatedCalories = 240 + (titleText.length * 7) % 310;
            const generatedRating = (4.5 + (titleText.length * 0.05) % 0.5).toFixed(1);

            return (
              <div key={recipeId} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img src={currentImage} alt={titleText} className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-green-800 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">{activeTab === 'Semua' ? 'Nusantara' : activeTab}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(recipeId); }}
                    className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-md rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    {isSaved ? <FaBookmark className="text-red-500 text-xs sm:text-sm" /> : <FaRegBookmark className="text-gray-400 text-xs sm:text-sm hover:text-red-500" />}
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <FaStar /> <span className="text-gray-700">{generatedRating}</span>
                    </div>
                    <h3 className="font-extrabold text-gray-800 text-base sm:text-lg group-hover:text-green-700 transition duration-200 line-clamp-2 min-h-[3.5rem] leading-snug">{titleText}</h3>
                  </div>
                  
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-5 text-[11px] sm:text-xs font-bold text-gray-500 border-t border-gray-50 pt-3">
                      <span className="flex items-center gap-1.5"><FaClock className="text-gray-400 text-sm" /> {estimatedTime} mnt</span>
                      <span className="flex items-center gap-1.5"><FaFireAlt className="text-gray-400 text-sm" /> {estimatedCalories} kkal</span>
                    </div>
                    <button 
                      onClick={() => handleOpenDetail({ ...recipe, image: currentImage, estimatedTime, estimatedCalories })}
                      className="w-full bg-green-700 hover:bg-green-800 text-white text-xs sm:text-sm font-bold py-3 rounded-xl transition duration-300 shadow-md shadow-green-700/10 active:scale-[0.99]"
                    >
                      Lihat Resep
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">Tidak ada resep masakan di kategori ini.</p>
        </div>
      )}
    </div>
  );
}