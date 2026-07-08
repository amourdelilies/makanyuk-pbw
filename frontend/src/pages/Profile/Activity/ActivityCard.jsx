export default function ActivityCard({ activity }) {

  const Icon = activity.icon;

  return (
    <div className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${activity.color}`}
      >

        <Icon
          size={24}
          className={activity.iconColor}
        />

      </div>

      <div className="flex-1">

        <h3 className="font-semibold text-gray-800">
          {activity.title}
        </h3>

        <p className="mt-1 text-gray-500">
          {activity.subtitle}
        </p>

      </div>

      <span className="text-sm text-gray-400">
        {activity.time}
      </span>

    </div>
  );
}