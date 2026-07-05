import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans selection:bg-green-100 selection:text-green-800">
      {/* Navbar global tetap stay di paling atas */}
      <Navbar />

      {/* Pembungkus Konten Utama dengan Margin & Padding yang Rapi */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-300">
        <Outlet />
      </main>

      {/* Footer global di bagian paling bawah */}
      <Footer />
    </div>
  );
}