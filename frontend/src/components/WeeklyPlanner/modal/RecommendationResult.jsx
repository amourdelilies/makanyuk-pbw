export default function RecommendationResult({
  recommendations,
  selectedRecipe,
  setSelectedRecipe,
}) {

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Tidak ada resep yang sesuai dengan kriteria.
      </div>
    );
  }

  return (
    <div>

      <h3 className="text-lg font-semibold mb-4">
        Hasil Rekomendasi
      </h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">

        {recommendations.map((recipe) => (

          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className={`border rounded-xl p-4 cursor-pointer transition ${
              selectedRecipe?.id === recipe.id
                ? "border-green-600 bg-green-50"
                : "hover:bg-gray-50"
            }`}
          >

            <h4 className="font-semibold text-lg">
              {recipe.title}
            </h4>

            <p className="text-sm text-gray-500">
              {recipe.category}
            </p>

            <div className="flex gap-4 mt-2 text-sm text-gray-600">

              <span>
                🔥 {recipe.calories} kcal
              </span>

              <span>
                ⏱️ {recipe.duration}
              </span>

            </div>

            <p className="text-xs text-gray-500 mt-2">
              Bahan: {recipe.ingredients.join(", ")}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}