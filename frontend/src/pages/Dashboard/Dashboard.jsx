import React, { useState } from 'react';
import { FaBookmark, FaCalendarAlt, FaUserEdit, FaUtensils, FaClock, FaSignOutAlt } from 'react-icons/fa';

export default function Dashboard() {
  // Data dummy profil pengguna (Nanti setelah merge tinggal diganti state auth riil)
  const [user, setUser] = useState({
    name: 'Tugek Putri',
    email: 'cihuy@gmail.com',
    joinDate: 'September 2025',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    savedCount: 12,
    plannedCount: 4
  });

  const savedRecipesMock = [
    { id: 1, title: 'Shakshuka Autentik', time: 30, cal: 320, img: 'https://images.unsplash.com/photo-1590412200988-a436bb7050a8?q=80&w=400&fit=crop' },
    { id: 2, title: 'Bakso Sapi Solo', time: 45, cal: 420, img: 'https://images.unsplash.com/photo-1651473117978-43e8ea476a6e?q=80&w=400&fit=crop' },
    { id: 3, title: 'Ayam Woku Manado', time: 40, cal: 350, img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400&fit=crop' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-[fadeInUp_0.4s_ease-out] min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* KOLOM KIRI: Profil Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto group">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full border-2 border-green-700/20 p-1 group-hover:border-green-700 transition duration-300" />
              <button className="absolute bottom-0 right-0 bg-green-700 text-white p-2 rounded-full shadow-md text-xs hover:scale-110 transition">
                <FaUserEdit />
              </button>
            </div>
            <div>
              <h2 className="font-black text-gray-800 text-lg leading-tight">{user.name}</h2>
              <p className="text-gray-400 text-xs mt-1 truncate">{user.email}</p>
            </div>
            <div className="pt-2 border-t border-gray-50 text-[11px] text-gray-400 font-semibold flex items-center justify-center gap-1.5">
              <FaCalendarAlt className="text-green-700" /> Anggota sejak {user.joinDate}
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-100/50 hover:bg-red-100 font-bold text-xs py-2.5 rounded-xl transition duration-200">
              <FaSignOutAlt /> Keluar Akun
            </button>
          </div>
        </div>

        {/* KOLOM KANAN: Statistik & Koleksi */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-700 text-lg"><FaBookmark /></div>
              <div>
                <span className="text-gray-400 text-[11px] font-bold block uppercase tracking-wider">Tersimpan</span>
                <span className="text-xl font-black text-gray-800">{user.savedCount} Resep</span>
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-700 text-lg"><FaUtensils /></div>
              <div>
                <span className="text-gray-400 text-[11px] font-bold block uppercase tracking-wider">Menu Planner</span>
                <span className="text-xl font-black text-gray-800">{user.plannedCount} Jadwal</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-gray-800 text-lg">Koleksi Resep Tersimpan</h3>
              <a href="#/resep" className="text-green-700 text-xs font-bold hover:underline">Lihat Semua</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedRecipesMock.map((recipe) => (
                <div key={recipe.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition duration-300">
                  <div className="h-32 bg-gray-100 overflow-hidden relative">
                    <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-103 transition duration-500" />
                  </div>
                  <div className="p-4 space-y-3">
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-green-700 transition">{recipe.title}</h4>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 border-t border-gray-50 pt-2">
                      <span className="flex items-center gap-1"><FaClock /> {recipe.time} mnt</span>
                      <span>{recipe.cal} kkal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}