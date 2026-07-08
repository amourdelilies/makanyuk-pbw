import RecipeSearch from "../MyRecipes/RecipeSearch";
import AddRecipeButton from "../MyRecipes/AddRecipeButton";
import RecipeCard from "../MyRecipes/RecipeCard";

import { recipes } from "../MyRecipes/recipes";

export default function MyRecipesTab() {
  return (
    <section className="mt-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            My Recipes
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all your recipes.
          </p>

        </div>

        <AddRecipeButton />

      </div>

      <div className="mt-8">

        <RecipeSearch />

      </div>

      <div className="mt-8 grid grid-cols-3 gap-8">

        {recipes.map((recipe) => (

          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />

        ))}

      </div>

    </section>
  );
}