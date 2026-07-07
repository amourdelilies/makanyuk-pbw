import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';

export default function Register() {
  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center justify-center bg-gray-50/60 p-4 sm:p-6 select-none font-sans animate-[fadeIn_0.4s_ease-out]">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100/80 overflow-hidden flex flex-col md:flex-row min-h-[580px]">
        
        {/* PANEL BANNER HIJAU GRADASI (Kiri) */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-green-700 to-green-800 text-white p-8 sm:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Ornamen Estetik Latar Belakang */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-3xl rotate-12 pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <span className="text-xs font-black tracking-widest text-green-200 uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">MakanYuk!</span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">Selamat Datang Kembali!</h2>
            <p className="text-xs sm:text-sm text-green-100/90 font-medium max-w-xs mx-auto leading-relaxed">
              Untuk tetap terhubung dengan kami, silakan masuk menggunakan informasi akun pribadimu.
            </p>
            <Link 
              to="/login"
              className="mt-4 inline-block border-2 border-white/90 hover:bg-white hover:text-green-800 text-white font-bold text-xs sm:text-sm px-10 py-3 rounded-full tracking-wide uppercase shadow-sm hover:scale-105 active:scale-98 transition-all duration-300"
            >
              Masuk Di Sini
            </Link>
          </div>
        </div>

        {/* PANEL FORMULIR INPUT (Kanan) */}
        <div className="w-full md:w-3/5 p-8 sm:p-12 flex flex-col justify-center items-center bg-white">
          <div className="w-full max-w-sm space-y-6 text-center">
            <div>
              <h2 className="text-3xl font-black text-green-700 tracking-tight">Buat Akun Baru</h2>
              <p className="text-gray-400 text-xs mt-1">Mulai petualangan kuliner nusantaramu hari ini</p>
            </div>

            {/* Tombol Media Sosial */}
            <div className="flex items-center justify-center gap-3">
              <button className="w-10 h-10 border border-gray-100 hover:border-green-700 hover:text-green-700 text-gray-400 rounded-xl flex items-center justify-center text-sm transition-all duration-300 shadow-2xs bg-gray-50/50 hover:bg-white"><FaFacebookF /></button>
              <button className="w-10 h-10 border border-gray-100 hover:border-green-700 hover:text-green-700 text-gray-400 rounded-xl flex items-center justify-center text-sm transition-all duration-300 shadow-2xs bg-gray-50/50 hover:bg-white"><FaGoogle /></button>
              <button className="w-10 h-10 border border-gray-100 hover:border-green-700 hover:text-green-700 text-gray-400 rounded-xl flex items-center justify-center text-sm transition-all duration-300 shadow-2xs bg-gray-50/50 hover:bg-white"><FaLinkedinIn /></button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">atau gunakan email:</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-green-700 transition"><FaUser className="text-xs" /></span>
                  <input type="text" placeholder="Masukkan nama lengkapmu" className="w-full bg-gray-50/80 border border-gray-200/60 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm font-semibold text-gray-700 outline-none focus:bg-white focus:border-green-700 focus:ring-4 focus:ring-green-700/5 transition duration-200 shadow-3xs" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1">Alamat Email</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-green-700 transition"><FaEnvelope className="text-xs" /></span>
                  <input type="email" placeholder="contoh@email.com" className="w-full bg-gray-50/80 border border-gray-200/60 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm font-semibold text-gray-700 outline-none focus:bg-white focus:border-green-700 focus:ring-4 focus:ring-green-700/5 transition duration-200 shadow-3xs" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1">Kata Sandi</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-green-700 transition"><FaLock className="text-xs" /></span>
                  <input type="password" placeholder="Minimal 8 karakter" className="w-full bg-gray-50/80 border border-gray-200/60 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm font-semibold text-gray-700 outline-none focus:bg-white focus:border-green-700 focus:ring-4 focus:ring-green-700/5 transition duration-200 shadow-3xs" />
                </div>
              </div>

              <div className="text-center pt-4">
                <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl tracking-wide uppercase shadow-lg shadow-green-700/20 hover:shadow-green-700/30 transition duration-300 hover:scale-[1.01] active:scale-[0.99]">
                  Daftar Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}