import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobeAsia, FaShareAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto text-gray-600">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Kolom 1: Branding */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-700">MakanYuk!</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Solusi untuk dapur Anda, memberikan rekomendasi terbaik. Masak sehat, hidup bahagia.
          </p>
        </div>

        {/* Kolom 2: Tautan internal */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider">Tautan</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tentang" className="hover:text-green-700 transition">Tentang Kami</Link></li>
            <li><Link to="/ketentuan" className="hover:text-green-700 transition">Ketentuan Layanan</Link></li>
            <li><Link to="/privasi" className="hover:text-green-700 transition">Kebijakan Privasi</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Komunitas */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider">Komunitas</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#kontak" className="hover:text-green-700 transition">Kontak Koki</a></li>
            <li><Link to="/resep" className="hover:text-green-700 transition">Indeks Resep</Link></li>
          </ul>
        </div>

        {/* Kolom 4: Social Media */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider">Ikuti Sosial Media Kami</h3>
          <div className="flex items-center gap-4 text-xl text-gray-500">
            <FaGlobeAsia className="cursor-pointer hover:text-green-700 transition" />
            <FaShareAlt className="cursor-pointer hover:text-green-700 transition" />
          </div>
        </div>

      </div>

      {/* Hak Cipta Bawah */}
      <div className="border-t border-gray-50 py-6 text-center text-xs text-gray-400">
        &copy; 2026 MakanYuk! - Platform Resep Personalisasi Indonesia. All rights reserved.
      </div>
    </footer>
  );
}