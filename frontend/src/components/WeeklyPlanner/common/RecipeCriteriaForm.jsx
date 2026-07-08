import { useState } from "react";

export default function RecipeCriteriaForm({
  onSubmit,
  buttonText = "Generate Planner",
  mode,
}) {
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [day, setDay] = useState("");

  const ingredientCategories = [
    "Ayam",
    "Sapi",
    "Kambing",
    "Ikan",
    "Udang",
    "Telur",
    "Tempe",
    "Tahu",
  ];

  const days = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      category,
      ingredients,
      cookTime,
      day,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* ================= Kategori ================= */}

      <div>

        <label className="block font-medium mb-2">
          Kategori Bahan
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        >

          <option value="">
            Semua Kategori
          </option>

          {ingredientCategories.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

      {/* ================= Waktu ================= */}

      <div>

        <label className="block font-medium mb-2">
          Maksimum Waktu Memasak
        </label>

        <div className="relative">

          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            placeholder="Contoh: 20"
            className="w-full rounded-lg border px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <span className="absolute right-4 top-3 text-gray-500">
            menit
          </span>

        </div>

      </div>

      {/* ================= Bahan ================= */}

      <div>

        <label className="block font-medium mb-2">
          Bahan yang Dimiliki
        </label>

        <textarea
          rows={3}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Contoh: ayam, tomat, bawang"
          className="w-full rounded-lg border px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <p className="text-xs text-gray-500 mt-2">
          Pisahkan setiap bahan menggunakan tanda koma (,)
        </p>

      </div>

      {/* ================= Hari ================= */}

      {mode === "DAY" && (

        <div>

          <label className="block font-medium mb-2">
            Hari
          </label>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >

            <option value="">
              Pilih Hari
            </option>

            {days.map((day) => (

              <option
                key={day}
                value={day}
              >
                {day}
              </option>

            ))}

          </select>

        </div>

      )}

      {/* ================= Info ================= */}

      <div className="rounded-xl bg-green-50 border border-green-200 p-4">

        <h4 className="font-semibold text-green-700 mb-2">
          Tips
        </h4>

        <ul className="text-sm text-green-700 space-y-1 list-disc ml-5">

          <li>
            Isi kategori jika ingin menu berdasarkan bahan utama.
          </li>

          <li>
            Isi bahan yang dimiliki agar rekomendasi lebih sesuai.
          </li>

          <li>
            Kosongkan semua isian jika ingin rekomendasi acak.
          </li>

        </ul>

      </div>

      {/* ================= Button ================= */}

      <button
        type="submit"
        className="w-full rounded-xl bg-green-600 hover:bg-green-700 py-3 text-white font-semibold transition"
      >
        {buttonText}
      </button>

    </form>
  );
}