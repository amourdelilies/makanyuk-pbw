export default function CookingLevel() {
  const currentXP = 240;
  const maxXP = 300;

  const progress = (currentXP / maxXP) * 100;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold text-gray-800">
          Cooking Level
        </h2>

        <span className="text-sm font-bold text-green-700">
          Lv. 14
        </span>

      </div>

      {/* Progress */}
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-green-600 transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* XP */}
      <p className="mt-3 text-xs text-gray-500">
        {currentXP} XP to next level (Sous Chef)
      </p>

    </div>
  );
}