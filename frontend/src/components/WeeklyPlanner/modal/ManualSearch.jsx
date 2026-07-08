import { useMemo, useState } from "react";

export default function ManualSearch({
  recipes = [],
  selectedRecipe,
  setSelectedRecipe,
}) {
  const [keyword, setKeyword] = useState("");

  const filteredRecipes = useMemo(() => {
    if (!keyword) return recipes;

    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, recipes]);

  return (
    <div>

      <h3 className="text-lg font-semibold mb-4">
        Cari Resep
      </h3>

      <input
        type="text"
        placeholder="Ketik nama resep..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full border rounded-lg p-3 mb-5"
      />

      <div className="space-y-3 max-h-80 overflow-y-auto">

        {filteredRecipes.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Resep tidak ditemukan.
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className={`border rounded-xl p-4 cursor-pointer transition ${
                selectedRecipe?.id === recipe.id
                  ? "border-green-600 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <h3 className="font-semibold text-lg">
                {recipe.title}
              </h3>

              <p className="text-sm text-gray-500">
                {recipe.category}
              </p>

              <div className="flex gap-5 mt-2 text-sm text-gray-600">
                <span>⏱️ {recipe.duration}</span>
                <span>🔥 {recipe.calories} kcal</span>
              </div>
</div>
          ))
        )}

      </div>

    </div>
  );
}