import {
  Lock,
  Bell,
  ChevronRight,
} from "lucide-react";

const settings = [
  {
    icon: Lock,
    title: "Password & Security",
    description: "Update your password and 2FA settings",
    bg: "bg-green-100",
    color: "text-green-700",
  },
  {
    icon: Bell,
    title: "Notification Preferences",
    description: "Choose what alerts you want to receive",
    bg: "bg-orange-100",
    color: "text-orange-500",
  },
];

export default function AccountSettings() {
  return (
    <div className="rounded-3xl bg-white p-10 shadow-sm">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">
        Account Settings
      </h2>

      {/* Card */}
      <div className="mt-8 space-y-5">

        {settings.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                transition-all
                duration-300
                hover:border-green-300
                hover:shadow-lg
              "
            >

              <div className="flex items-center gap-5">

                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    ${item.bg}
                  `}
                >

                  <Icon
                    size={24}
                    className={item.color}
                  />

                </div>

                <div className="text-left">

                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>

                </div>

              </div>

              <ChevronRight
                size={22}
                className="text-gray-400"
              />

            </button>

          );

        })}

      </div>

    </div>
  );
}