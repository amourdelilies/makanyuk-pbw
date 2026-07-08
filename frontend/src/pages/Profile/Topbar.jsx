import {
  Search,
  Bell,
  CircleUserRound,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-white px-8 py-5 shadow-sm">

      {/* Search */}

      <div className="flex h-12 w-[420px] items-center rounded-full bg-gray-100 px-5">

        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Search recipes, ingredients..."
          className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell
            size={21}
            className="text-gray-600"
          />

        </button>

        <button>

          <CircleUserRound
            size={34}
            className="text-green-700"
          />

        </button>

      </div>

    </header>
  );
}