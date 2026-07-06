import { defineConfig } from 'prisma';

export default defineConfig({
  migrations: {
    // Memberitahu Prisma untuk menjalankan seed.js menggunakan Node
    seed: 'node ./prisma/seed.js',
  },
});