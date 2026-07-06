import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-6">

      <label
        htmlFor="password"
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        Password
      </label>

      <div className="flex h-14 items-center rounded-xl border border-gray-300 bg-white px-4 transition-all duration-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">

        <Lock
          size={20}
          className="mr-3 text-gray-400"
        />

        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan password"
          className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff
              size={20}
              className="text-gray-400"
            />
          ) : (
            <Eye
              size={20}
              className="text-gray-400"
            />
          )}
        </button>

      </div>

    </div>
  );
}