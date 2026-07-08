import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  Heart,
  Settings,
  Plus,
  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Meal Plan",
    icon: CalendarDays,
  },
  {
    title: "Recipes",
    icon: UtensilsCrossed,
  },
  {
    title: "Favorites",
    icon: Heart,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r bg-white">

      {/* ================= Logo ================= */}
      <div className="px-8 pt-10">

        <h1 className="text-3xl font-bold text-green-700">
          MakanYuk!
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Culinary Vitality
        </p>

      </div>

      {/* ================= Menu ================= */}
      <nav className="mt-12 flex flex-1 flex-col">

        {menus.map((menu) => {

          const Icon = menu.icon;

          return (
            <button
              key={menu.title}
              className="
                flex
                items-center
                gap-4
                px-8
                py-4
                text-left
                text-gray-600
                transition
                hover:bg-green-50
                hover:text-green-700
              "
            >
              <Icon size={20} />

              <span className="font-medium">
                {menu.title}
              </span>

            </button>
          );

        })}

        {/* Spacer */}
        <div className="flex-1"></div>

      </nav>

      {/* ================= Bottom ================= */}
      <div className="border-t px-7 py-8">

        <button
          className="
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-green-700
            font-semibold
            text-white
            transition
            hover:bg-green-800
          "
        >

          <Plus size={20} />

          Create Recipe

        </button>

        <button
          className="
            mt-6
            flex
            items-center
            gap-3
            text-red-500
            transition
            hover:text-red-600
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}