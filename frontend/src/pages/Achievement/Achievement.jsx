import React from 'react';
import { motion } from 'framer-motion';
import { useAchievement } from '../../hooks/useAchievement';
import AchievementCard from '../../components/AchievementCard';
import { FaTrophy, FaLockOpen, FaLock, FaChartLine, FaPlus, FaRotateLeft } from 'react-icons/fa6';

export default function Achievement() {
  const { achievements, stats, updateProgress, resetProgress } = useAchievement();

  // Find individual current values for simulation
  const getVal = (id) => {
    const found = achievements.find((a) => a.id === id);
    return found ? found.current : 0;
  };

  return (
    <div className="space-y-10 min-h-[70vh] pb-10">
      
      {/* Header Halaman */}
      <div className="border-b border-gray-100 pb-6 space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          Achievements Star
        </h1>
        <p className="text-sm text-gray-500">
          Kumpulkan bintang dan buka lencana memasak berdasarkan aktivitas Anda di MakanYuk!.
        </p>
      </div>

      {/* Grid Statistik di Atas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Achievement */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
            <FaTrophy className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Achievement</p>
            <p className="text-2xl font-black text-gray-800">{stats.total}</p>
          </div>
        </div>

        {/* Unlocked */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-green-50 text-green-600 rounded-xl">
            <FaLockOpen className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Unlocked</p>
            <p className="text-2xl font-black text-green-600">{stats.unlocked}</p>
          </div>
        </div>

        {/* Locked */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl">
            <FaLock className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Locked</p>
            <p className="text-2xl font-black text-amber-500">{stats.locked}</p>
          </div>
        </div>

        {/* Completion */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl">
            <FaChartLine className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Completion</p>
            <p className="text-2xl font-black text-purple-600">{stats.percentage}%</p>
          </div>
        </div>
      </div>

      {/* Panel Simulasi untuk Keperluan Pengujian */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-6 shadow-md space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span>⚙️ Panel Simulasi Aktivitas</span>
            <span className="text-xs bg-gray-700 text-gray-300 font-medium px-2 py-0.5 rounded-full">Developer Mode</span>
          </h2>
          <p className="text-xs text-gray-400">
            Gunakan tombol-tombol di bawah ini untuk mensimulasikan interaksi pengguna dan menguji perubahan status achievement secara realtime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Favorite simulation */}
          <button
            onClick={() => {
              const current = getVal('beginner_chef');
              updateProgress('favoritesCount', current + 1);
            }}
            className="flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/5 rounded-2xl text-xs font-semibold tracking-wide transition duration-150 text-left"
          >
            <span>+1 Simpan Favorit</span>
            <FaPlus className="text-[10px] text-green-400" />
          </button>

          {/* Detail View simulation */}
          <button
            onClick={() => {
              const current = getVal('home_cook');
              updateProgress('detailViewsCount', current + 1);
            }}
            className="flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/5 rounded-2xl text-xs font-semibold tracking-wide transition duration-150 text-left"
          >
            <span>+1 Detail View Resep</span>
            <FaPlus className="text-[10px] text-green-400" />
          </button>

          {/* Weekly planner simulation */}
          <button
            onClick={() => {
              const current = getVal('weekly_planner');
              const next = current < 7 ? current + 1 : 7;
              updateProgress('plannerDaysCount', next);
            }}
            className="flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/5 rounded-2xl text-xs font-semibold tracking-wide transition duration-150 text-left"
          >
            <span>+1 Hari Meal Planner</span>
            <FaPlus className="text-[10px] text-green-400" />
          </button>

          {/* Recipe explorer simulation */}
          <button
            onClick={() => {
              const current = getVal('recipe_explorer');
              updateProgress('exploredRecipesCount', current + 1);
            }}
            className="flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/5 rounded-2xl text-xs font-semibold tracking-wide transition duration-150 text-left"
          >
            <span>+1 Resep Dataset</span>
            <FaPlus className="text-[10px] text-green-400" />
          </button>
        </div>

        <div className="flex justify-end border-t border-white/10 pt-3">
          <button
            onClick={resetProgress}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 active:scale-95 text-red-300 border border-red-500/10 text-xs font-bold rounded-xl transition duration-150"
          >
            <FaRotateLeft className="text-[10px]" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>

      {/* Grid List Achievement Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <AchievementCard key={ach.id} achievement={ach} />
        ))}
      </div>

    </div>
  );
}
