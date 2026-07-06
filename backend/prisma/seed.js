const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Membaca file JSON dataset...');
  
  // Menyesuaikan dengan nama file JSON kamu
  const jsonPath = path.join(__dirname, 'indonesian_recipes.json');
  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`Menemukan ${rawData.length} data resep. Memulai proses input ke MySQL...`);

  for (const item of rawData) {
    // 1. Ambil data kolom dari dataset Kaggle kamu
    const title = item['Title Cleaned'] || item['Title'];
    const steps = item['Steps'] || '';
    const category = item['Category'] || 'Lainnya';
    const imageUrl = item['URL'] || null;
    
    // 2. Olah teks bahan makanan menjadi array bersih
    // Dataset Kaggle biasanya memisahkan bahan dengan koma atau tanda lain
    const rawIngredients = item['Ingredients Cleaned'] 
      ? item['Ingredients Cleaned'].split(',') 
      : [];

    const ingredientLinks = [];

    // 3. Loop setiap bahan baku di dalam resep ini
    for (const rawIng of rawIngredients) {
      const cleanName = rawIng.trim().toLowerCase();
      if (!cleanName) continue;

      // Masukkan ke tabel Master Bahan (jika belum ada)
      const ingredientRecord = await prisma.ingredient.upsert({
        where: { name: cleanName },
        update: {},
        create: { name: cleanName }
      });

      // Simpan id bahannya untuk dihubungkan ke resep nanti
      ingredientLinks.push({
        ingredientId: ingredientRecord.id
      });
    }

    // 4. Hitung estimasi kalori acak/sederhana dulu (karena di dataset belum ada)
    const estimatedCalories = Math.floor(Math.random() * (500 - 200 + 1)) + 200;

    // 5. Simpan data resep utuh beserta relasi Many-to-Many bahannya ke database
    await prisma.recipe.create({
      data: {
        title: title,
        steps: steps,
        category: category,
        image: imageUrl,
        calories: estimatedCalories,
        ingredients: {
          create: ingredientLinks
        }
      }
    });
  }

  console.log('Proses Seeding Selesai! Semua data sukses masuk ke MySQL.');
}

main()
  .catch((e) => {
    console.error('Terjadi error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });