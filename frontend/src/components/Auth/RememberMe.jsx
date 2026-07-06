import { Link } from "react-router-dom";

export default function RememberMe() {
  return (
    <div className="mt-5 flex items-center justify-between">

      <label className="flex items-center gap-2 text-sm text-gray-600">

        <input
          type="checkbox"
          className="accent-green-600"
        />

        Ingat Saya

      </label>

      <Link
        to="/forgot-password"
        className="text-sm font-medium text-green-700 hover:underline"
      >
        Lupa Password?
      </Link>

    </div>
  );
}