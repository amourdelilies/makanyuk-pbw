import { User } from "lucide-react";

export default function NameInput() {
  return (
    <div>

      <label
        htmlFor="name"
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        Nama Lengkap
      </label>

      <div className="flex h-14 items-center rounded-xl border border-gray-300 bg-white px-4 transition-all duration-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">

        <User
          size={20}
          className="mr-3 text-gray-400"
        />

        <input
          id="name"
          type="text"
          placeholder="Masukkan nama lengkap"
          className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
        />

      </div>

    </div>
  );
}