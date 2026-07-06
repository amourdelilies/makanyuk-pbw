import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Reviews() {
  const reviewsList = [
    {
      id: 1,
      name: "Andini Putri",
      role: "Ibu Rumah Tangga",
      text: "Sangat terbantu! Dulu bingung kalau punya sisa telur dan tomat di kulkas mau dimasak apa. Sekarang tinggal input, langsung keluar resepnya.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Bagas Pratama",
      role: "Mahasiswa Kos",
      text: "Fitur Menu Planner-nya juara sih. Saya bisa atur jadwal makan seminggu penuh jadi pengeluaran bulanan jauh lebih hemat dan terkontrol.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <div className="space-y-24">
      {/* SECTION CTA BANNER */}
      <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-3xl p-8 md:p-16 text-center shadow-xl relative overflow-hidden text-white">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-600/20 rounded-full blur-2xl"></div>
        
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Punya Bahan Makanan Sisa di Kulkas Anda?
          </h2>
          <p className="text-green-100 text-sm md:text-base leading-relaxed">
            Jangan biarkan bahan makanan membusuk sia-sia. Temukan keajaiban resep kuliner lezat yang bisa Anda ciptakan hari ini juga.
          </p>
          <div className="pt-2">
            <Link 
              to="/resep" 
              className="inline-block bg-white text-green-900 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-green-50 hover:scale-105 transition duration-200"
            >
              Mulai Masak Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION TESTIMONIALS */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            Apa Kata Mereka?
          </h2>
          <p className="text-sm text-gray-500">
            Cerita dari pengguna setia yang telah mengubah cara memasak harian mereka bersama MakanYuk!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm space-y-4 relative">
              <FaQuoteLeft className="text-green-100 text-4xl absolute top-6 right-6" />
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[...Array(rev.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic relative z-10">
                "{rev.text}"
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
                <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{rev.name}</h4>
                  <p className="text-xs text-gray-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}