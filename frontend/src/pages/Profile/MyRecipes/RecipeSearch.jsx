import { Search } from "lucide-react";

export default function RecipeSearch() {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        placeholder="Search recipes..."
        className="h-12 w-full rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-green-600"
      />

    </div>
  );
}