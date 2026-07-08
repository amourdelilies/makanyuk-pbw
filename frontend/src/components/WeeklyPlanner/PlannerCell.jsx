import getRecipeImage from "../../utils/getRecipeImage";

export default function PlannerCell({
  title,
  image,
  ingredients,
  url,
}) {
  const hasRecipe = !!title;

  if (!hasRecipe) {
    return (
      <div className="w-full h-64 rounded-xl border-2 border-dashed border-green-300 bg-white flex flex-col items-center justify-center hover:bg-green-50 hover:border-green-500 transition">

        <div className="text-5xl">
          🍽️
        </div>

        <h3 className="mt-3 font-semibold text-gray-700">
          Tambah Menu
        </h3>

        <p className="text-xs text-gray-500 mt-1 text-center px-3">
          Klik untuk memilih resep
        </p>

      </div>
    );
  }

  let ingredientCount = 0;

  if (ingredients) {

    if (Array.isArray(ingredients)) {

      ingredientCount = ingredients.length;

    } else {

      ingredientCount = ingredients
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .filter(item => item.trim() !== "").length;

    }

  }

  return (

    <div className="h-64 rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all flex flex-col">

      {/* Gambar */}

      <div className="h-32 w-full bg-gray-100 flex-shrink-0 overflow-hidden">

        <img
          src={image || getRecipeImage(title)}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600";
          }}
        />

      </div>

      {/* Isi */}

      <div className="flex-1 p-3 flex flex-col">

        <h3 className="font-semibold text-sm leading-5 line-clamp-2 h-10">

          {title}

        </h3>

        <div className="mt-2 text-xs text-gray-500">

          {ingredientCount > 0 && (
            <p>
              🥕 {ingredientCount} bahan
            </p>
          )}

        </div>

        <div className="mt-auto">

          {url && (

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-green-700 hover:text-green-800"
            >
              Lihat Resep →
            </a>

          )}

        </div>

      </div>

    </div>

  );
}