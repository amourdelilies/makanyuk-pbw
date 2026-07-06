import { Link } from "react-router-dom";

export default function TermsCheckbox() {
  return (
    <div className="mt-5">

      <label className="flex items-start gap-3">

        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-green-600"
        />

        <span className="text-sm leading-6 text-gray-600">

          Saya menyetujui{" "}

          <Link
            to="/terms"
            className="font-semibold text-green-700 hover:underline"
          >
            Syarat & Ketentuan
          </Link>

          {" "}dan{" "}

          <Link
            to="/privacy"
            className="font-semibold text-green-700 hover:underline"
          >
            Kebijakan Privasi
          </Link>

        </span>

      </label>

    </div>
  );
}