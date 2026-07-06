export default function GoogleButton() {
  return (
    <button
      className="mt-2 flex h-14 w-full items-center justify-center rounded-xl border border-gray-300 bg-white font-medium transition hover:bg-gray-50"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="mr-3 h-5 w-5"
      />

      Masuk dengan Google

    </button>
  );
}
import { Link } from "react-router-dom";
<p className="mt-8 text-center text-sm text-gray-600">

  Sudah punya akun?

  <Link
    to="/login"
    className="ml-1 font-semibold text-green-700 hover:underline"
  >
    Masuk
  </Link>

</p>