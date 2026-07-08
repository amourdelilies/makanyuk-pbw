export default function recommendRecipes(recipes, criteria) {
  return recipes.filter((recipe) => {

    // ===============================
    // Judul
    // ===============================
    if (
      criteria.title &&
      !recipe.title.toLowerCase().includes(criteria.title.toLowerCase())
    ) {
      return false;
    }

    // ===============================
    // Kalori
    // ===============================
    if (
      criteria.calories &&
      recipe.calories > Number(criteria.calories)
    ) {
      return false;
    }

    // ===============================
    // Kategori
    // ===============================
    if (
      criteria.category &&
      recipe.category !== criteria.category
    ) {
      return false;
    }

    // ===============================
    // Bahan
    // ===============================
    if (criteria.ingredients) {

      const inputIngredients = criteria.ingredients
        .split(",")
        .map((item) => item.trim().toLowerCase());

      const recipeIngredients =
        recipe.ingredients.map((item) =>
          item.toLowerCase()
        );

      const match = inputIngredients.every((item) =>
        recipeIngredients.includes(item)
      );

      if (!match) return false;
    }

    return true;
  });
}