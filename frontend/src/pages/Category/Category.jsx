import React, { useState, useEffect } from 'react';
import { 
  FaClock, FaFireAlt, FaRegBookmark, FaBookmark, FaFilter, 
  FaStar, FaRegHeart, FaShareAlt, FaChevronLeft, FaCheckCircle 
} from 'react-icons/fa';

export default function FoodCategories() {
  // ==================== STATE UTAMA ====================
  const [view, setView] = useState('list'); // 'list' atau 'detail'
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]); // State data riil dari endpoint food-category
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State untuk melacak ID Kategori aktif (Default: 101 untuk Sarapan)
  const [activeCategoryId, setActiveCategoryId] = useState(101);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // Data Kategori sesuai spesifikasi ID baru
  const foodCategories = [
    { id: 101, name: 'Sarapan' },
    { id: 102, name: 'Menu Sehat' },
    { id: 103, name: 'Aneka Nasi' },
    { id: 104, name: 'Mie / Bakmi' },
    { id: 105, name: 'Cepat Saji' },
    { id: 106, name: 'Seafood' }
  ];

  const mockReviews = [
    {
      name: 'Rian Hidayat',
      rating: 5,
      time: '3 hari yang lalu',
      comment: 'Menu yang bener-bener pas buat dicoba di rumah. Bahan-bahannya simpel dan rasanya authentic banget!',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'
    },
    {
      name: 'Amalia Putri',
      rating: 4,
      time: '1 minggu yang lalu',
      comment: 'Suka banget sama porsinya yang pas. Instruksi memasaknya sangat jelas untuk pemula seperti saya.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
    }
  ];

  // ==================== FETCH DATA BY FOOD CATEGORY ====================
  const fetchRecipesByFoodCategory = async (categoryId, limit = 12) => {
    setLoading(true);
    setError(null);

    try {
      // Menembak endpoint khusus food-category
      const url = `https://makan-yuk.vercel.app/api/recipe/food-category?limit=${limit}&category_id=${categoryId}`;
      console.log("Menghubungi API Kategori Makanan:", url);

      const response = await fetch(url, {
        method: 'GET' // Tanpa header custom untuk menghindari isu CORS preflight
      });

      if (!response.ok) {
        throw new Error(`Server merespon dengan status: ${response.status}`);
      }

      const resJson = await response.json();
      console.log("Data Kategori Makanan Diterima:", resJson);

      if (resJson.status === "success") {
        setRecipes(resJson.results || []);
      } else {
        throw new Error(resJson.message || "Terjadi kesalahan pada internal server.");
      }
    } catch (err) {
      console.error("Detail Error API Food Category:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch ulang setiap kali user mendeteksi pergantian tab kategori makanan
  useEffect(() => {
    fetchRecipesByFoodCategory(activeCategoryId);
  }, [activeCategoryId]);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]);
  };

  // ==================== LOGIKA PEMETAAN GAMBAR BACKUP ====================
  const getStrictIndonesianImage = (title) => {
    const cleanTitle = (title || '').toLowerCase().trim();
    const salt = cleanTitle.length;

    if (cleanTitle.includes('mie') || cleanTitle.includes('bakmi') || cleanTitle.includes('noodle')) {
      return 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=500&auto=format&fit=crop';
    }
    if (cleanTitle.includes('nasi') || cleanTitle.includes('rice')) {
      return 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=500&auto=format&fit=crop';
    }
    if (cleanTitle.includes('salad') || cleanTitle.includes('sehat') || cleanTitle.includes('diet')) {
      return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500&auto=format&fit=crop';
    }
    if (cleanTitle.includes('seafood') || cleanTitle.includes('ikan') || cleanTitle.includes('udang') || cleanTitle.includes('cumi')) {
      return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500&auto=format&fit=crop';
    }
    if (cleanTitle.includes('roti') || cleanTitle.includes('sandwich') || cleanTitle.includes('bubur')) {
      return 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=500&auto=format&fit=crop';
    }

    const backupImages = [
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=500&auto=format&fit=crop'
    ];
    return backupImages[salt % 3];
  };

  // ==================== FETCH DETAIL RESEP ====================
  const handleOpenDetail = async (recipe, currentImage, estimatedTime, estimatedCalories, generatedRating) => {
    const recipeId = recipe.id || recipe.recipe_id;
    setDetailLoading(true);
    try {
      const response = await fetch(`https://makan-yuk.vercel.app/api/recipe/detail/${recipeId}`);
      if (!response.ok) throw new Error("Gagal mengambil detail masakan.");
     
      const resJson = await response.json();
      if (resJson.status === "success") {
        setSelectedRecipe({
          ...resJson.data,
          image: currentImage,
          estimatedCalories: estimatedCalories,
          rating: generatedRating
        });
        setView('detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Error: " + resJson.message);
      }
    } catch (err) {
      alert("Gagal terhubung ke API detail: " + err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  // ==================== LOADING TAMPILAN DETAIL ====================
  if (detailLoading) {
    return (
      <div className="text-center py-40 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-100 border-t-green-700"></div>
        <p className="text-gray-500 text-sm mt-5 font-semibold tracking-wide animate-pulse">Menyiapkan resep hidangan terbaik...</p>
      </div>
    );
  }

  // ==================== RENDER TAMPILAN UTAMA (LIST) ====================
  if (view === 'list') {
    const activeCategoryName = foodCategories.find(c => c.id === activeCategoryId)?.name || 'Kategori';

    return (
      <div className="space-y-8 min-h-[70vh] px-4 sm:px-6 py-6">
        {/* Header Seksi */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">Kategori Hidangan</h1>
            <p className="text-xs sm:text-sm text-gray-400">Temukan inspirasi masak berdasarkan tipe sajian meja makanmu.</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm border border-green-100/50">
            <FaFilter className="text-[10px]" />
            <span>Kategori: {activeCategoryName} ({recipes.length} Menu)</span>
          </div>
        </div>

        {/* Filter Buttons Kategori Eksklusif ID 101-106 */}
        <div className="flex items-center gap-3 overflow-x-auto p-2 pb-4 -ml-2 scrollbar-none">
          {foodCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeCategoryId === cat.id 
                  ? 'bg-green-700 text-white shadow-lg shadow-green-700/30 scale-105' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Main Grid Content */}
        {loading ? (
          <div className="text-center py-24 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-green-700"></div>
            <p className="text-gray-400 text-xs sm:text-sm mt-4 font-medium tracking-wide animate-pulse">Menghubungkan sajian lezat...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-sm max-w-xl mx-auto px-4 shadow-sm">
            ⚠️ Gagal memuat data: {error}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, index) => {
              const recipeId = recipe.id || recipe.recipe_id || index;
              const isSaved = bookmarkedIds.includes(recipeId);
              const titleText = recipe.title || recipe.recipe_name || "Judul Hidangan";
              const currentImage = getStrictIndonesianImage(titleText);
            
              const estimatedTime = recipe.estimated_time || (20 + (titleText.length * 2) % 40);
              const estimatedCalories = 300 + (titleText.length * 5) % 250;
              const generatedRating = (4.4 + (titleText.length * 0.03) % 0.6).toFixed(1);

              return (
                <div key={recipeId} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={currentImage}
                      alt={titleText}
                      className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-green-800 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                      {activeCategoryName}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(recipeId); }}
                      className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-md rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      {isSaved ? <FaBookmark className="text-red-500 text-xs sm:text-sm" /> : <FaRegBookmark className="text-gray-400 text-xs sm:text-sm" />}
                    </button>
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <FaStar /> <span className="text-gray-700">{generatedRating}</span>
                      </div>
                      <h3 className="font-extrabold text-gray-800 text-base sm:text-lg group-hover:text-green-700 transition duration-200 line-clamp-2 min-h-[3.5rem] leading-snug">
                        {titleText}
                      </h3>
                    </div>
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-5 text-[11px] sm:text-xs font-bold text-gray-500 border-t border-gray-50 pt-3">
                        <span className="flex items-center gap-1.5"><FaClock className="text-gray-400 text-sm" /> {estimatedTime} mnt</span>
                        <span className="flex items-center gap-1.5"><FaFireAlt className="text-gray-400 text-sm" /> {estimatedCalories} kkal</span>
                      </div>
                      <button
                        onClick={() => handleOpenDetail(recipe, currentImage, estimatedTime, estimatedCalories, generatedRating)}
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
            <p className="text-gray-400 text-sm">Tidak ada resep masakan di kategori hidangan ini.</p>
          </div>
        )}
      </div>
    );
  }

  // ==================== PROCESSING DATA DETAIL RESEP ====================
  const titleText = selectedRecipe?.title || selectedRecipe?.recipe_name || 'Detail Resep';
  const durationText = selectedRecipe?.estimated_time || selectedRecipe?.estimatedTime || 30;
  const caloriesText = selectedRecipe?.estimatedCalories || 320;
  const categoryText = foodCategories.find(c => c.id === activeCategoryId)?.name || 'Sajian';
  const ratingText = selectedRecipe?.rating || "4.7";

  const ingredientList = typeof selectedRecipe?.ingredients === 'string'
    ? selectedRecipe.ingredients.split(',').map(item => item.trim()).filter(Boolean)
    : Array.isArray(selectedRecipe?.ingredients) ? selectedRecipe.ingredients : [];

  const stepList = typeof selectedRecipe?.steps === 'string'
    ? selectedRecipe.steps.split(',').map(item => item.trim()).filter(Boolean)
    : Array.isArray(selectedRecipe?.steps) ? selectedRecipe.steps : [];

  // ==================== RENDER TAMPILAN DETAIL RESEP ====================
  return (
    <div className="min-h-screen bg-gray-50/50 pb-16 -mx-4 sm:-mx-8 px-4 sm:px-8 relative z-10 animate-[fadeInUp_0.4s_ease-out]">
      <button
        onClick={() => { setView('list'); setSelectedRecipe(null); }}
        className="fixed top-24 left-6 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md shadow-md border border-gray-200/50 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-700 hover:bg-white hover:text-green-700 transition-all duration-300"
      >
        <FaChevronLeft className="text-xs" /> Kembali
      </button>

      <div className="relative w-full h-[50vh] sm:h-[60vh] bg-gray-950 overflow-hidden rounded-3xl shadow-lg">
        <img src={selectedRecipe?.image} alt={titleText} className="w-full h-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-10 space-y-4 text-white">
          <span className="bg-green-600 border border-green-500/30 text-white text-[10px] sm:text-xs font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md inline-block">
            {categoryText}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-lg leading-tight max-w-4xl">{titleText}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 relative z-20 px-2 sm:px-0">
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-gray-100 shadow-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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
              <span className="text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wide">Rating</span>
              <span className="text-amber-600 bg-amber-50 border border-amber-100 px-3 py-0.5 rounded-full text-xs font-extrabold flex items-center gap-1">⭐ {ratingText}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(selectedRecipe.id || 0)}
              className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition duration-300 shadow-md flex-grow sm:flex-grow-0"
            >
              {bookmarkedIds.includes(selectedRecipe?.id) ? <FaBookmark /> : <FaRegHeart />}
              <span>{bookmarkedIds.includes(selectedRecipe?.id) ? 'Tersimpan' : 'Simpan Resep'}</span>
            </button>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl text-gray-500 shadow-2xs">
              <FaShareAlt className="text-xs sm:text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-black text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
              <FaCheckCircle className="text-green-700 text-base" /> Bahan Pokok
            </h3>
            <ul className="space-y-1">
              {ingredientList.length > 0 ? ingredientList.map((ing, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 font-semibold py-2 px-2.5 rounded-xl hover:bg-green-50/50 transition">
                  <input type="checkbox" className="rounded text-green-700 focus:ring-green-600 h-4 w-4 border-gray-300" />
                  <span className="flex-1">{ing}</span>
                </li>
              )) : <p className="text-gray-400 text-xs italic">Bahan tidak terdaftar.</p>}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-black text-gray-900 text-lg">Langkah Pembuatan</h3>
            <div className="space-y-4">
              {stepList.length > 0 ? stepList.map((step, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-5 relative overflow-hidden bg-white hover:border-green-700/20 transition">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center bg-gray-100 text-gray-700 font-black h-7 w-7 rounded-full text-xs">{i + 1}</span>
                    <h4 className="font-black text-gray-800 text-xs sm:text-sm">Langkah</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">{step}</p>
                </div>
              )) : <p className="text-gray-400 text-xs italic">Langkah tidak terdaftar.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Box */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-black text-gray-900 text-lg border-b border-gray-100 pb-3">Ulasan Komunitas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mockReviews.map((rev, i) => (
              <div key={i} className="bg-gray-50/50 border border-gray-100/70 p-4 rounded-2xl flex gap-4">
                <img src={rev.avatar} alt={rev.name} className="h-10 w-10 rounded-full object-cover" />
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-bold text-gray-800 text-xs sm:text-sm">{rev.name}</h5>
                    <span className="text-[10px] text-gray-400">{rev.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium italic">"{rev.comment}"</p>
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
