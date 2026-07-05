import React from 'react';
import Hero from '../../components/Hero/Hero';
import SearchCard from '../../components/SearchCard/SearchCard';
import TrendingRecipe from '../../components/TrendingRecipe/TrendingRecipe';
import CategorySection from '../../components/CategorySection/CategorySection';

export default function Home() {
  return (
    // Menggunakan space-y-20 agar memberi margin bawah yang cukup antar section
    <div className="space-y-20 pb-12 animate-fade-in">
      
      {/* 1. Hero Banner & Search Area */}
      <div className="relative">
        <Hero />
        {/* Kotak pencarian melayang dengan pembatas z-index agar di atas hero */}
        <div className="relative -mt-12 md:-mt-16 z-20 max-w-4xl mx-auto px-4 sm:px-6">
          <SearchCard />
        </div>
      </div>

      {/* 2. Grid Resep Populer */}
      <div className="w-full">
        <TrendingRecipe />
      </div>

      {/* 3. Grid Jelajahi Kategori */}
      <div className="w-full">
        <CategorySection />
      </div>

    </div>
  );
}