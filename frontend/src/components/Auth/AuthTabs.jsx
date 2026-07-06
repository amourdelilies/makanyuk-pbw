import { NavLink } from "react-router-dom";

export default function AuthTabs() {
  return (
    <div className="mt-10 mb-10 rounded-xl bg-gray-200 p-1">

      <div className="grid grid-cols-2">

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `rounded-lg py-3 text-center text-lg font-medium transition-all duration-300 ${
              isActive
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Masuk
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `rounded-lg py-3 text-center text-lg font-medium transition-all duration-300 ${
              isActive
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Daftar
        </NavLink>

      </div>

    </div>
  );
}