import {
  Star,
  Gift,
  ArrowRight,
} from "lucide-react";

export default function DailyQuest() {
  return (
    <div className="rounded-3xl bg-orange-50 p-6 shadow-sm border border-orange-100">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">

          <Star
            size={22}
            className="text-orange-500"
          />

        </div>

        <div>

          <h2 className="text-lg font-semibold text-gray-800">
            Daily Quest
          </h2>

          <p className="text-sm text-gray-500">
            Complete today's mission
          </p>

        </div>

      </div>

      {/* Description */}
      <div className="mt-6">

        <h3 className="text-lg font-semibold text-gray-800">
          Cook 2 Healthy Recipes Today
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Complete today's challenge to earn extra experience
          points and increase your cooking level.
        </p>

      </div>

      {/* Reward */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-4">

        <Gift
          size={22}
          className="text-orange-500"
        />

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-400">
            Reward
          </p>

          <p className="font-semibold text-gray-800">
            +50 XP
          </p>

        </div>

      </div>

      {/* Button */}
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">

        View Quests

        <ArrowRight size={18} />

      </button>

    </div>
  );
}