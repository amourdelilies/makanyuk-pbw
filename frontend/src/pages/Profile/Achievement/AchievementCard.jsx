import { CheckCircle, Lock } from "lucide-react";

export default function AchievementCard({ achievement }) {

  const Icon = achievement.icon;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-center gap-4">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${achievement.color}`}
        >

          <Icon
            size={24}
            className={achievement.iconColor}
          />

        </div>

        <div>

          <h3 className="font-semibold text-gray-800">
            {achievement.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {achievement.description}
          </p>

        </div>

      </div>

      {achievement.unlocked ? (
        <CheckCircle
          size={24}
          className="text-green-600"
        />
      ) : (
        <Lock
          size={22}
          className="text-gray-400"
        />
      )}

    </div>
  );
}