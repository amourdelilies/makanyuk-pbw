import { FaGlobeAsia, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-700">
          MakanYuk!
        </h1>

        {/* Menu */}
        <ul className="flex items-center gap-10 text-gray-600 font-medium">

          <li className="text-green-600 cursor-pointer hover:text-green-700 transition">
            Beranda
          </li>

          <li className="cursor-pointer hover:text-green-700 transition">
            Resep
          </li>

          <li className="cursor-pointer hover:text-green-700 transition">
            Kategori
          </li>

          <li className="cursor-pointer hover:text-green-700 transition">
            Planner
          </li>

          <li className="cursor-pointer hover:text-green-700 transition">
            Tentang
          </li>

        </ul>

        {/* Icon */}
        <div className="flex items-center gap-5 text-green-700 text-2xl">

          <FaGlobeAsia className="cursor-pointer hover:scale-110 transition" />

          <FaUserCircle className="cursor-pointer hover:scale-110 transition" />

        </div>

      </div>
    </nav>
  );
}
export default Navbar;