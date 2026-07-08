const tabs = [
  "Data User",
  "Edit Profile",
  "My Recipes",
  "Activity",
  "Achievement",
];

export default function ProfileTabs({
  activeTab,
  setActiveTab,
}) {
  console.log(activeTab);
  return (
    <div className="mt-8 rounded-2xl bg-white p-3 shadow-sm">

      <div className="flex flex-wrap gap-3">

        {tabs.map((tab) => (

          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`
              rounded-xl
              px-6
              py-3
              text-sm
              font-medium
              transition-all
              duration-300
              ${
                activeTab === tab
                  ? "bg-green-700 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {tab}
          </button>

        ))}

      </div>

    </div>
  );
}