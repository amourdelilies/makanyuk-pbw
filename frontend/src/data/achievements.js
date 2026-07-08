export const achievementsList = [
  {
    id: 'beginner_chef',
    name: 'Beginner Chef',
    stars: 1,
    description: 'Terbuka setelah menyimpan minimal 5 resep favorit.',
    maxProgress: 5,
    key: 'favoritesCount'
  },
  {
    id: 'home_cook',
    name: 'Home Cook',
    stars: 2,
    description: 'Terbuka setelah membuka minimal 10 halaman detail resep.',
    maxProgress: 10,
    key: 'detailViewsCount'
  },
  {
    id: 'weekly_planner',
    name: 'Weekly Planner',
    stars: 3,
    description: 'Terbuka setelah membuat meal planner selama 7 hari.',
    maxProgress: 7,
    key: 'plannerDaysCount'
  },
  {
    id: 'recipe_explorer',
    name: 'Recipe Explorer',
    stars: 4,
    description: 'Terbuka setelah melihat minimal 20 resep berbeda yang berasal dari dataset.',
    maxProgress: 20,
    key: 'exploredRecipesCount'
  },
  {
    id: 'master_chef',
    name: 'Master Chef',
    stars: 5,
    description: 'Terbuka setelah seluruh achievement sebelumnya berhasil diperoleh.',
    maxProgress: 4,
    key: 'unlockedOthersCount'
  }
];
