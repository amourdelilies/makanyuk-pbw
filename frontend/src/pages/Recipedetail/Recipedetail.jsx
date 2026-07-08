import React, { useState, useEffect } from 'react';
import { 
  FaClock, FaFireAlt, FaRegBookmark, FaBookmark, FaFilter, 
  FaStar, FaRegHeart, FaShareAlt, FaChevronLeft, FaCheckCircle 
} from 'react-icons/fa';

export default function Recipes() {
  // ==================== STATE UTAMA ====================
  const [view, setView] = useState('list'); // 'list' atau 'detail'
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]); // State tunggal untuk menyimpan data riil dari API
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State untuk melacak ID Kategori aktif (0 = Semua)
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // Data Kategori disesuaikan dengan skema ID database FastAPI-mu
  const ingredientCategories = [ 
    { id: 0, name: 'Semua' }, 
    { id: 1, name: 'Ayam' }, 
    { id: 2, name: 'Ikan' }, 
    { id: 3, name: 'Kambing' }, 
    { id: 4, name: 'Sapi' }, 
    { id: 5, name: 'Tahu' },
    { id: 6, name: 'Telur' },
    { id: 7, name: 'Tempe' },
    { id: 8, name: 'Udang' }, 
  ];

  const mockReviews = [
    {
      name: 'Siska Maharani',
      rating: 4,
      time: '2 hari yang lalu',
      comment: 'Resep paling gampang buat sarapan mewah di akhir pekan, paprikanya bikin aromanya keluar banget! Anak-anak juga suka.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
    },
    {
      name: 'Budi Santoso',
      rating: 5,
      time: '2 hari yang lalu',
      comment: 'Teknik poaching telurnya bener-bener membantu. Kuning telurnya lumer sempurna. Saran: tambahin sedikit bubuk cabai kalau kamu pedas.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'
    }
  ];

  // ==================== FETCH DATA RECOVERY LIST ====================
  const fetchRecipesByCategory = async (categoryId = 0, limit = 12) => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://makan-yuk.vercel.app/api/recipe/ingredients-category?limit=${limit}`;
      
      // Jika categoryId bukan 0 (Semua), tambahkan ke query param URL
      if (categoryId !== 0) {
        url += `&category_id=${categoryId}`;
      }

      console.log("Menghubungi API:", url);

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Server merespon dengan status: ${response.status}`);
      }

      const resJson = await response.json();
      console.log("Data Diterima:", resJson);

      if (resJson.status === "success") {
        setRecipes(resJson.results || []);
      } else {
        throw new Error(resJson.message || "Terjadi kesalahan pada internal server.");
      }
    } catch (err) {
      console.error("Detail Error API:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Memicu fetch ulang otomatis setiap kali user mengubah tombol kategori
  useEffect(() => {
    fetchRecipesByCategory(activeCategoryId);
  }, [activeCategoryId]);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]);
  };

  // ==================== LOGIKA PEMETAAN GAMBAR BACKUP ====================
  const getStrictIndonesianImage = (title) => {
    const cleanTitle = (title || '').toLowerCase().trim();
    const salt = cleanTitle.length;

    if (cleanTitle.includes('baso') || cleanTitle.includes('bakso')) {
      return cleanTitle.includes('ayam')
        ? ['https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=500&auto=format&fit=crop', 'https://images.unsplash.com/photo-1675765954497-2bbbd78e0ab2?q=80&w=500&auto=format&fit=crop'][salt % 2]
        : 'https://images.unsplash.com/photo-1651473117978-43e8ea476a6e?q=80&w=500&auto=format&fit=crop';
    }
    if (cleanTitle.includes('woku')) return 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=500&auto=format&fit=crop';
    if (cleanTitle.includes('bakar') && cleanTitle.includes('ayam')) {
      return ['https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop', 'https://images.unsplash.com/photo-1594911776993-bdba2c1bb0a1?q=80&w=500&auto=format&fit=crop'][salt % 2];
    }
    if (cleanTitle.includes('goreng') && cleanTitle.includes('ayam')) {
      return [
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=500&auto=format&fit=crop',
        'https://images.istockphoto.com/id/2271066713/photo/fried-chicken-rice-lemak.jpg?s=612x612&w=0&k=20&c=L4lO6R1V8Lp2_X8N4x7Yp_Lp_P-3_P9Yp_Lp_P-3_P9Y=',
        'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=500&auto=format&fit=crop'
      ][salt % 4];
    }
    if (cleanTitle.includes('ayam')) return 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=500&auto=format&fit=crop';
    if (cleanTitle.includes('sup') || cleanTitle.includes('soup')) {
      return ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?q=80&w=500&auto=format&fit=crop', 'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=500&auto=format&fit=crop'][salt % 2];
    }
    if (cleanTitle.includes('capcay') || cleanTitle.includes('oseng') || cleanTitle.includes('tumis')) {
      if (cleanTitle.includes('capcay')) {
        return 'https://images.istockphoto.com/id/2275725710/photo/chinese-indonesian-chicken-noodle-soup-with-mixed-vegetables-and-meatballs-in-white.jpg?s=612x612&w=0&k=20&c=L4lO6R1V8Lp2_X8N4x7Yp_Lp_P-3_P9Yp_Lp_P-3_P9Y=';
      }
      return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop';
    }
    if (cleanTitle.includes('salad') || cleanTitle.includes('diet')) return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500&auto=format&fit=crop';
    if (cleanTitle.includes('kambing') || cleanTitle.includes('sapi') || cleanTitle.includes('daging')) return 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=500&auto=format&fit=crop';
    if (cleanTitle.includes('ikan') || cleanTitle.includes('tongkol') || cleanTitle.includes('tuna') || cleanTitle.includes('puff') || cleanTitle.includes('seafood')) {
      return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500&auto=format&fit=crop';
    }

    const backupKulinerIndonesia = [
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=500&auto=format&fit=crop',
      'https://images.imagejuicy.com/png/612x612/bakso.jpg',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=500&auto=format&fit=crop'
    ];
    return backupKulinerIndonesia[salt % 5];
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

  const handleBackToList = () => {
    setView('list');
    setSelectedRecipe(null);
  };

  // ==================== CONDITION: TRANSISI DETAIL LOADING ====================
  if (detailLoading) {
    return (
      <div className="text-center py-40 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-100 border-t-green-700"></div>
        <p className="text-gray-500 text-sm mt-5 font-semibold tracking-wide animate-pulse">Menyiapkan resep rahasia bumbu nusantara...</p>
      </div>
    );
  }

  // ==================== RENDER TAMPILAN UTAMA (LIST) ====================
  if (view === 'list') {
    const activeCategoryName = ingredientCategories.find(c => c.id === activeCategoryId)?.name || 'Semua';

    return (
      <div className="space-y-8 min-h-[70vh] px-4 sm:px-6 py-6">
        {/* Header Seksi */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">Jelajahi Resep Masakan</h1>
            <p className="text-xs sm:text-sm text-gray-400">Menampilkan resep masakan riil hasil database kuliner tim MakanYuk.</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm border border-green-100/50">
            <FaFilter className="text-[10px]" />
            <span>Kategori Bahan: {activeCategoryName} ({recipes.length} Resep)</span>
          </div>
        </div>

        {/* Filter Buttons Kategori Terintegrasi ID */}
        <div className="flex items-center gap-3 overflow-x-auto p-2 pb-4 -ml-2 scrollbar-none">
          {ingredientCategories.map((cat) => (
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

        {/* Main Content Handler */}
        {loading ? (
          <div className="text-center py-24 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-green-700"></div>
            <p className="text-gray-400 text-xs sm:text-sm mt-4 font-medium tracking-wide animate-pulse">Memuat kuliner nusantara pilihan...</p>
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
              const titleText = recipe.title || recipe.recipe_name || "Judul Tidak Tersedia";
              const currentImage = getStrictIndonesianImage(titleText);
            
              const estimatedTime = recipe.estimated_time || (15 + (titleText.length * 3) % 45);
              const estimatedCalories = 240 + (titleText.length * 7) % 310;
              const generatedRating = (4.5 + (titleText.length * 0.05) % 0.5).toFixed(1);

              return (
                <div key={recipeId} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={currentImage}
                      alt={titleText}
                      className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500&auto=format&fit=crop';
                      }}
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-green-800 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                      {recipe.category || activeCategoryName}
                    </span>
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
            <p className="text-gray-400 text-sm">Tidak ada resep masakan di kategori ini.</p>
          </div>
        )}
      </div>
    );
  }

  // ==================== PROCESSING DATA DETAIL RESEP ====================
  const titleText = selectedRecipe?.title || selectedRecipe?.recipe_name || 'Detail Resep';
  const durationText = selectedRecipe?.estimated_time || selectedRecipe?.estimatedTime || 30;
  const caloriesText = selectedRecipe?.estimatedCalories || 250;
  const categoryText = selectedRecipe?.category || (activeCategoryId !== 0 ? ingredientCategories.find(c => c.id === activeCategoryId)?.name : 'Nusantara');
  const ratingText = selectedRecipe?.rating || "4.8";

  // Memecah string data real-time DB
  const rawIngredients = selectedRecipe?.ingredients || "";
  const ingredientList = typeof rawIngredients === 'string'
    ? rawIngredients.split(',').map(item => item.trim()).filter(Boolean)
    : Array.isArray(rawIngredients) ? rawIngredients : [];

  const rawSteps = selectedRecipe?.steps || "";
  const stepList = typeof rawSteps === 'string'
    ? rawSteps.split(',').map(item => item.trim()).filter(Boolean)
    : Array.isArray(rawSteps) ? rawSteps : [];

  // ==================== RENDER TAMPILAN DETAIL RESEP ====================
  return (
    <div className="min-h-screen bg-gray-50/50 pb-16 -mx-4 sm:-mx-8 px-4 sm:px-8 relative z-10 animate-[fadeInUp_0.4s_ease-out]">
      <button
        onClick={handleBackToList}
        className="fixed top-24 left-6 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md shadow-md border border-gray-200/50 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-700 hover:bg-white hover:text-green-700 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <FaChevronLeft className="text-xs" /> Kembali
      </button>

      <div className="relative w-full h-[50vh] sm:h-[60vh] bg-gray-950 overflow-hidden rounded-3xl shadow-lg group/hero">
        <img
          src={selectedRecipe?.image}
          alt={titleText}
          className="w-full h-full object-cover opacity-85 scale-100 group-hover/hero:scale-102 transition-transform duration-[2s] ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-10 space-y-4 text-white">
          <span className="bg-green-600 border border-green-500/30 text-white text-[10px] sm:text-xs font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md inline-block">
            {categoryText}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-lg leading-tight max-w-4xl">{titleText}</h1>
        </div>
      </div>

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
              <span className="text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wide">Rating</span>
              <span className="text-amber-600 bg-amber-50 border border-amber-100 px-3 py-0.5 rounded-full text-xs font-extrabold shadow-2xs flex items-center gap-1">⭐ {ratingText}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(selectedRecipe.id || 0)}
              className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition duration-300 shadow-md shadow-green-700/20 active:scale-[0.98] flex-grow sm:flex-grow-0"
            >
              {bookmarkedIds.includes(selectedRecipe.id) ? <FaBookmark /> : <FaRegHeart />}
              <span>{bookmarkedIds.includes(selectedRecipe.id) ? 'Tersimpan' : 'Simpan Ke Daftar'}</span>
            </button>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl text-gray-500 hover:text-gray-700 transition shadow-2xs">
              <FaShareAlt className="text-xs sm:text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition">
            <h3 className="font-black text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
              <FaCheckCircle className="text-green-700 text-base" />
              Bahan-bahan ({selectedRecipe?.total_ingredients || ingredientList.length})
            </h3>
            <ul className="space-y-1">
              {ingredientList.length > 0 ? ingredientList.map((ing, i) => (
                <li key={i} className="group/item flex items-center gap-3.5 text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed py-2 px-2.5 rounded-xl hover:bg-green-50/50 hover:text-green-900 transition duration-200">
                  <input type="checkbox" className="rounded text-green-700 focus:ring-green-600 cursor-pointer h-4 w-4 border-gray-300 focus:ring-offset-0 transition" />
                  <span className="flex-1">{ing}</span>
                </li>
              )) : (
                <p className="text-gray-400 text-xs italic">Bahan tidak tertera.</p>
              )}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition">
            <div>
              <h3 className="font-black text-gray-900 text-lg">Langkah Mengolah ({selectedRecipe?.total_steps || stepList.length} Tahapan)</h3>
              <p className="text-gray-400 text-xs mt-0.5">Panduan memasak riil yang ditarik otomatis dari database MakanYuk.</p>
            </div>
            <div className="space-y-4 pt-1">
              {stepList.length > 0 ? stepList.map((step, i) => (
                <div key={i} className="group/card border border-gray-100 rounded-2xl p-5 relative overflow-hidden bg-white shadow-3xs hover:shadow-md hover:border-green-700/20 hover:scale-[1.01] transition-all duration-300">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover/card:bg-green-700 transition duration-300"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center bg-gray-100 text-gray-700 group-hover/card:bg-green-700 group-hover/card:text-white font-black h-7 w-7 rounded-full text-xs shadow-3xs transition duration-300">{i + 1}</span>
                    <h4 className="font-black text-gray-800 text-xs sm:text-sm group-hover/card:text-green-800 transition">Tahapan Resep</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed pl-0.5 group-hover/card:text-gray-700 transition">{step}</p>
                </div>
              )) : (
                <p className="text-gray-400 text-xs italic">Langkah-langkah tidak tertera.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Komunitas Reviews Box */}
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

