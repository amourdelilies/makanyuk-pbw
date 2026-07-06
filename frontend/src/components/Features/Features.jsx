import React from 'react';
import { FaUtensils, FaRegCalendarAlt, FaSearchPlus } from 'react-icons/fa';

export default function Features() {
  const featuresList = [
    {
      id: 1,
      icon: <FaSearchPlus className="text-3xl text-green-600" />,
      title: "Pencarian Pintar",
      desc: "Cari resep akurat hanya dengan memasukkan bahan baku yang tersisa di dalam kulkas Anda."
    },
    {
      id: 2,
      icon: <FaRegCalendarAlt className="text-3xl text-green-600" />,
      title: "Menu Planner",
      desc: "Susun jadwal menu masakan sehat harian dan mingguan secara terstruktur tanpa bingung."
    },
    {
      id: 3,
      icon: <FaUtensils className="text-3xl text-green-600" />,
      title: "Ribuan Resep Lokal",
      desc: "Akses berbagai macam panduan kuliner khas Indonesia terlengkap dengan kalkulasi kalori harian."
    }
  ];

  return (
    <section className="py-8">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Masak Lebih Mudah Setiap Hari
        </h2>
        <p className="text-sm text-gray-500">
          Platform andalan untuk mengelola dapur, menghemat bahan makanan, dan menjaga pola makan sehat keluarga.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresList.map((feat) => (
          <div 
            key={feat.id} 
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4 group hover:-translate-y-1"
          >
            <div className="p-4 bg-green-50 rounded-2xl group-hover:bg-green-700 transition duration-300 group-hover:text-white">
              {React.cloneElement(feat.icon, { 
                className: "text-3xl text-green-600 transition duration-300 group-hover:text-white" 
              })}
            </div>
            <h3 className="font-bold text-gray-800 text-lg">
              {feat.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}