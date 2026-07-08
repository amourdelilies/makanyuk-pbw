import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
// 🛠️ INTEGRASI: Memanggil otak custom hook Gemini AI
import useGemini from '../../hooks/useGemini'; 

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  
  // Ambil state pesan, fungsi kirim, dan status loading dari hook useGemini
  const { messages, sendMessage, isTyping } = useGemini();

  // Auto-scroll halus otomatis ke bawah tiap kali ada pesan baru masuk
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    sendMessage(input);
    setInput('');
  };

  return (
    // 🛠️ PENYESUAIAN: Ditambahkan class 'relative' agar tombol melayang terkunci di pojok kanan bawah layar
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans selection:bg-green-100 selection:text-green-800 relative">
      {/* Navbar global tetap stay di paling atas */}
      <Navbar />

      {/* Pembungkus Konten Utama dengan Margin & Padding yang Rapi */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-300">
        <Outlet />
      </main>

      {/* ==================== 🤖 WIDGET YUKBOT AI MELAYANG ==================== */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        
        {/* Tombol Bundar Chatbot */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            isOpen ? 'bg-red-500 rotate-90' : 'bg-green-700 hover:bg-green-800'
          }`}
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-2xl animate-pulse" />}
        </button>

        {/* Kotak Jendela Percakapan Chatbox */}
        {isOpen && (
          <div className="absolute bottom-18 right-0 w-80 sm:w-96 h-[460px] bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-[chatOpen_0.25s_ease-out]">
            
            {/* Header Jendela Chat */}
            <div className="bg-green-700 text-white p-4 flex items-center gap-3 shadow-md">
              <div className="p-2 bg-white/10 rounded-xl"><FaRobot className="text-lg" /></div>
              <div>
                <h4 className="font-black text-sm leading-tight tracking-wide">YukBot AI</h4>
                <p className="text-[10px] text-green-200 font-semibold tracking-wide">Asisten Kuliner Premium MakanYuk!</p>
              </div>
            </div>

            {/* Area Isi Balon Obrolan */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold shadow-3xs leading-relaxed ${
                    msg.isBot ? 'bg-white text-gray-700 rounded-tl-xs border border-gray-100/70' : 'bg-green-700 text-white rounded-tr-xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Animasi Balon Ngetik (Loading Menunggu Respon API Gemini) */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-400 rounded-2xl rounded-tl-xs border border-gray-100 px-4 py-3 shadow-3xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Form Input Ketik Pesan */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                placeholder={isTyping ? "YukBot lagi meracik jawaban..." : "Tanya resep masakan atau tips dapur..."} 
                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-xs font-semibold text-gray-700 outline-none focus:bg-white focus:border-green-700 transition disabled:opacity-60"
              />
              <button 
                type="submit" 
                disabled={isTyping || !input.trim()} 
                className="bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition shadow-sm active:scale-95 disabled:bg-gray-100 disabled:text-gray-300"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>

          </div>
        )}
      </div>

      {/* Footer global di bagian paling bawah */}
      <Footer />

      {/* Style Animasi Pop-Up Halus Chatbox */}
      <style>{`
        @keyframes chatOpen { from { opacity: 0; transform: translateY(15px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}