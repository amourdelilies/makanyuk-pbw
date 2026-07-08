import {
  Clock3,
  Star,
  Pencil,
  Trash2,
} from "lucide-react";

export default function RecipeCard({
  recipe,
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

      <img
        src={recipe.image}
        alt={recipe.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-semibold">
          {recipe.title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {recipe.category}
        </p>

        <div className="mt-4 flex justify-between">

          <div className="flex items-center gap-1">

            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            {recipe.rating}

          </div>

          <div className="flex items-center gap-1">

            <Clock3 size={18} />

            {recipe.time}

          </div>

        </div>

        <div className="mt-5 flex gap-3">

          <button className="flex-1 rounded-xl bg-blue-600 py-2 text-white">

            <Pencil
              size={16}
              className="inline"
            />

            Edit

          </button>

          <button className="flex-1 rounded-xl bg-red-600 py-2 text-white">

            <Trash2
              size={16}
              className="inline"
            />

            Delete

          </button>

        </div>

      </div>

    </div>
  );
}