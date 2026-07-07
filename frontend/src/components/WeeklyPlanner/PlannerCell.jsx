import getRecipeImage from "../../utils/getRecipeImage";

export default function PlannerCell({ title, duration, image }) {

  const hasRecipe = !!title;

  if (!hasRecipe) {
    return (
        <div className="w-full h-full min-h-32 rounded-xl border-2 border-dashed border-green-300 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 hover:border-green-500 transition-all duration-200">

        <div className="text-4xl mb-2">
            🍽️
        </div>

        <h3 className="text-sm font-semibold text-gray-700">
            Tambah Menu
        </h3>

        <p className="text-xs text-gray-500 mt-1">
            Klik untuk memilih resep
        </p>

        </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white">

      <img
        src={image || getRecipeImage(title)}
        alt={title}
        className="w-full h-28 object-cover"
      />

      <div className="p-2">

        <h3 className="font-semibold text-sm">
          {title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          ⏱️ {duration}
        </p>

      </div>

    </div>
  );
}