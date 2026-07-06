import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Faq() {
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 1,
      q: "Bagaimana cara kerja fitur pencarian bahan baku kulkas?",
      a: "Anda cukup mengetik nama bahan mentah yang Anda miliki di kolom pencarian (misal: 'telur, kecap, tahu'). Sistem pintar kami akan otomatis mencocokkan dan menyajikan daftar resep masakan yang bisa dibuat dari kombinasi bahan-bahan tersebut."
    },
    {
      id: 2,
      q: "Apakah fitur Menu Planner di web ini berbayar?",
      a: "Tidak! Seluruh fitur penyusunan Menu Planner mingguan dan fitur simpan resep favorit ke Daftar Saya dapat Anda akses secara gratis sepenuhnya."
    },
    {
      id: 3,
      q: "Dari mana asal data kalkulasi kalori resep makanan?",
      a: "Kalkulasi nilai nutrisi dan kalori diperoleh berdasarkan ekstraksi data gizi terpercaya dari ribuan basis data kuliner nusantara yang sudah dianalisis secara akurat."
    }
  ];

  return (
    <section className="space-y-12 max-w-4xl mx-auto py-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Pertanyaan Umum
        </h2>
        <p className="text-sm text-gray-500">
          Masih bingung seputar platform kami? Temukan jawaban ringkasnya di bawah ini.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition duration-300 shadow-sm">
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-gray-800 text-sm md:text-base hover:bg-gray-50 transition"
              >
                <span>{faq.q}</span>
                {isOpen ? <FaChevronUp className="text-green-700 text-xs flex-shrink-0" /> : <FaChevronDown className="text-gray-400 text-xs flex-shrink-0" />}
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0'}`}>
                <p className="p-6 text-sm text-gray-500 leading-relaxed bg-gray-50/30">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}