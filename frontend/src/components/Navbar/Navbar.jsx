import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Ditambahkan useNavigate untuk handle logout redirect
import { FaBell, FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  // 1. MEMBACA STATUS LOGIN DARI LOCALSTORAGE SECARA DINAMIS
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // 2. TIMBAL BALIK OTOMATIS: Update status saklar login setiap kali user berpindah halaman
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [location]);

  // 3. FUNGSI UNTUK KELUAR AKUN (LOGOUT)
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Bersihkan session tiruan
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/login'); // Tendang kembali ke halaman masuk
  };

  // Helper function untuk memberikan style aktif pada tab menu tengah
  const getTabClass = (path) => {
    // Memastikan rute utama '/' atau '/beranda' menyalakan tab Beranda
    const isCurrent = location.pathname === path || (path === '/beranda' && location.pathname === '/');
    return `text-sm font-bold transition duration-200 pb-1 ${
      isCurrent 
        ? 'text-green-700 border-b-2 border-green-700' 
        : 'text-gray-500 hover:text-green-700'
    }`;
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      
      {/* AREA KIRI: Brand Logo */}
      <Link to="/beranda" className="flex items-center gap-2 cursor-pointer">
        <span className="text-xl font-black text-green-700 tracking-tight">MakanYuk!</span>
      </Link>

      {/* AREA TENGAH: Menu Navigasi Dinamis Berbasis React Router */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/beranda" className={getTabClass('/beranda')}>Beranda</Link>
        <Link to="/resep" className={getTabClass('/resep')}>Resep</Link>
        <Link to="/kategori" className={getTabClass('/kategori')}>Kategori</Link>
        <Link to="/planner" className={getTabClass('/planner')}>Menu Planner</Link>
      </div>

      {/* AREA KANAN: PENGGANTI IKON BUMI (Kondisional UI) */}
      <div className="flex items-center gap-4">
        
        {!isLoggedIn ? (
          // ==================== KONDISI 1: BELUM LOGIN ====================
          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-green-700 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition duration-200"
            >
              Masuk
            </Link>
            <Link 
              to="/register" 
              className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm shadow-green-700/10 transition duration-200"
            >
              Daftar
            </Link>
          </div>
        ) : (
          // ==================== KONDISI 2: SUDAH LOGIN (SESSION AKTIF) ====================
          <div className="flex items-center gap-4 relative">
            {/* Tombol Notifikasi Bell */}
            <button className="p-2.5 bg-gray-50 text-gray-500 hover:text-green-700 hover:bg-green-50 rounded-xl transition relative">
              <FaBell className="text-sm sm:text-base" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Menu Dropdown Profil Akun Custom */}
            <div 
              className="flex items-center gap-1.5 cursor-pointer bg-gray-50/80 hover:bg-gray-50 border border-gray-100 p-1.5 rounded-2xl transition duration-200"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" 
                alt="Profile" 
                className="w-7 h-7 rounded-full object-cover border border-white shadow-2xs"
              />
              <FaChevronDown className="text-[10px] text-gray-400 mx-1" />
            </div>

            {/* Panel Overlay Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-[fadeInUp_0.2s_ease-out]">
                <Link 
                  to="/dashboard" 
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  Dashboard Saya
                </Link>
                <Link 
                  to="/settings" 
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  Pengaturan
                </Link>
                <hr className="border-gray-50 my-1" />
                {/* DIHUBUNGKAN KE FUNGSI HANDLOGOUT */}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 transition"
                >
                  Keluar Akun
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* CSS Animasi untuk Dropdown */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}