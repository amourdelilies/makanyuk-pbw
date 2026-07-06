import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <p className="mt-8 text-center text-sm text-gray-600">

      Belum punya akun?

      <Link
        to="/register"
        className="ml-1 font-semibold text-green-700 hover:underline"
      >
        Daftar
      </Link>

    </p>
  );
}