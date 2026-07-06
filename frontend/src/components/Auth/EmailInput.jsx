import { Mail } from "lucide-react";

export default function EmailInput() {
  return (
    <div className="mt-9">

      <label
        htmlFor="email"
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        Email
      </label>

      <div className="flex h-14 items-center rounded-xl border border-gray-300 bg-white px-4 transition-all duration-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">

        <Mail
          size={20}
          className="mr-3 text-gray-400"
        />

        <input
          id="email"
          type="email"
          placeholder="Masukkan email"
          className="w-full bg-transparent outline-none placeholder:text-gray-400"
        />

      </div>

    </div>
  );
}