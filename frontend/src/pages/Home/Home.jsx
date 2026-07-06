import React from 'react';
import Hero from '../../components/Hero/Hero';
import SearchCard from '../../components/SearchCard/SearchCard';
import Features from '../../components/Features/Features';
import TrendingRecipe from '../../components/TrendingRecipe/TrendingRecipe';
import CategorySection from '../../components/CategorySection/CategorySection';
import Reviews from '../../components/Reviews/Reviews'; // <-- Impor
import Faq from '../../components/Faq/Faq'; // <-- Impor

export default function Home() {
  return (
    <div className="space-y-28 pb-16 animate-fade-in">
      
      {/* 1. Hero & Search Area */}
      <div className="relative">
        <Hero />
        <div className="relative -mt-12 md:-mt-16 z-20 max-w-4xl mx-auto px-4 sm:px-6">
          <SearchCard />
        </div>
      </div>

      {/* 2. Fitur Utama */}
      <div className="w-full">
        <Features />
      </div>

      {/* 3. Resep Populer */}
      <div className="w-full">
        <TrendingRecipe />
      </div>

      {/* 4. Jelajahi Kategori */}
      <div className="w-full">
        <CategorySection />
      </div>

      {/* 5. CTA Banner & Testimoni Pengguna */}
      <div className="w-full">
        <Reviews />
      </div>

      {/* 6. FAQ Akordion */}
      <div className="w-full">
        <Faq />
      </div>

    </div>
  );
}