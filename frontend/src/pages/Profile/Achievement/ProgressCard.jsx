export default function ProgressCard() {

  const unlocked = 8;
  const total = 12;

  const progress = (unlocked / total) * 100;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Overall Progress
        </h2>

        <span className="font-bold text-green-700">
          {unlocked}/{total}
        </span>

      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-green-600"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="mt-3 text-sm text-gray-500">

        {unlocked} of {total} achievements unlocked.

      </p>

    </div>
  );
}