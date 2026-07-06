import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaGlobeAsia, FaUserCircle } from "react-icons/fa";

function Navbar() {
  // Helper class untuk mengatur style menu yang sedang aktif vs tidak aktif
  const navLinkStyle = ({ isActive }) => 
    `cursor-pointer transition font-medium text-sm md:text-base ${
      isActive 
        ? "text-green-600 font-bold border-b-2 border-green-600 pb-1" 
        : "text-gray-600 hover:text-green-700"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo - Dibungkus Link agar saat diklik kembali ke Beranda */}
        <Link to="/" className="text-2xl font-bold text-green-700 tracking-tight">
          MakanYuk!
        </Link>

        {/* Menu Navigasi Utama */}
        <ul className="flex items-center gap-10">
          <li>
            <NavLink to="/" className={navLinkStyle}>
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink to="/resep" className={navLinkStyle}>
              Resep
            </NavLink>
          </li>
          <li>
            <NavLink to="/kategori" className={navLinkStyle}>
              Kategori
            </NavLink>
          </li>
          <li>
            <NavLink to="/planner" className={navLinkStyle}>
              Menu Planner
            </NavLink>
          </li>
          <li>
            <NavLink to="/daftar-saya" className={navLinkStyle}>
              Daftar Saya
            </NavLink>
          </li>
        </ul>

        {/* Ikon Kanan */}
        <div className="flex items-center gap-5 text-green-700 text-2xl">
          <FaGlobeAsia className="cursor-pointer hover:scale-110 transition duration-200" title="Bahasa" />
          
          {/* Arahkan ikon profil langsung ke halaman /profile */}
          <Link to="/profile" className="text-gray-700 hover:text-green-700">
            <FaUserCircle className="cursor-pointer hover:scale-110 transition duration-200" />
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;