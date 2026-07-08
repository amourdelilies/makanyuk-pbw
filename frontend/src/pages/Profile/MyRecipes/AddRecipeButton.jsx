import { Plus } from "lucide-react";

export default function AddRecipeButton() {
  return (
    <button className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-white hover:bg-green-800">

      <Plus size={18} />

      Add Recipe

    </button>
  );
}