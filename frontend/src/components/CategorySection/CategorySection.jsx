import React from 'react';

export default function CategorySection() {
  // Data dummy kategori makanan khas Indonesia dengan gambar representatif yang estetik
  const categories = [
    {
      id: 1,
      name: 'Sarapan Pagi',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Menu Diet Sehat',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Olahan Ayam',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Hidangan Malam',
      image: 'https://images.unsplash.com/photo-1590412200988-a436bb705300?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <section className="space-y-6">
      {/* Header Judul Kategori */}
      <div className="space-y-1 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Jelajahi Kategori
        </h2>
        <p className="text-sm text-gray-500">
          Temukan inspirasi menu masakan lezat sesuai selera dan kebutuhan harianmu
        </p>
      </div>

      {/* Grid Kategori Layout */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {/* Background Image Kategori */}
            <img
              src={cat.image}
              alt={cat.name}
              className="h-full w-full object-cover object-center opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-50"
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Nama Kategori di Tengah-Tengah Card */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <h3 className="text-center text-sm md:text-base font-bold text-white tracking-wide uppercase drop-shadow-md transition duration-300 group-hover:text-green-400">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}