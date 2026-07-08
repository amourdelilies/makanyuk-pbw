export default function ModeSelection({
  mode,
  setMode,
}) {
  return (
    <div className="space-y-4">

      <label className="flex items-center gap-3 border rounded-xl p-4 hover:border-green-600 cursor-pointer">

        <input
          type="radio"
          name="mode"
          value="manual"
          checked={mode === "manual"}
          onChange={(e) => setMode(e.target.value)}
        />

        <div>
          <h3 className="font-semibold">
            Cari Resep Manual
          </h3>

          <p className="text-sm text-gray-500">
            Cari resep berdasarkan judul.
          </p>
        </div>

      </label>

      <label className="flex items-center gap-3 border rounded-xl p-4 hover:border-green-600 cursor-pointer">

        <input
          type="radio"
          name="mode"
          value="recommendation"
          checked={mode === "recommendation"}
          onChange={(e) => setMode(e.target.value)}
        />

        <div>
          <h3 className="font-semibold">
            Gunakan Rekomendasi
          </h3>

          <p className="text-sm text-gray-500">
            Sistem akan membantu memilihkan resep.
          </p>
        </div>

      </label>

    </div>
  );
}