import PersonalInfo from "./PersonalInfo";
import AccountSettings from "./AccountSettings";
import CookingLevel from "./CookingLevel";
import PortfolioCard from "./PortfolioCard";
import DailyQuest from "./DailyQuest";
import EditProfile from "./EditProfile";
import AchievementTab from "./Tabs/AchievementTab";
import MyRecipesTab from "./Tabs/MyRecipesTab";
import ActivityTab from "./Tabs/ActivityTab";
// Nanti ketika dibuat
// import AchievementTab from "./Tabs/AchievementTab";

export default function ProfileContent({ activeTab }) {

  // ==========================
  // DATA USER
  // ==========================
  if (activeTab === "Data User") {
    return (
      <section className="mt-8">

        <div className="grid grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="col-span-2 space-y-8">

            <PersonalInfo />

            <AccountSettings />

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            <CookingLevel />

            <PortfolioCard />

            <DailyQuest />

          </div>

        </div>

      </section>
    );
  }

  // ==========================
  // EDIT PROFILE
  // ==========================
  if (activeTab === "Edit Profile") {
    return <EditProfile />;
  }

  // ==========================
  // MY RECIPES
  // ==========================
  if (activeTab === "My Recipes") {
    return <MyRecipesTab />;
  }
  if (activeTab === "Achievement") {
    return <AchievementTab />;
  }

  // ==========================
  // ACTIVITY
  // ==========================
  if (activeTab === "Activity") {
    return <ActivityTab />;
  }

  // ==========================
  // ACHIEVEMENT
  // ==========================
  if (activeTab === "Achievement") {
    return (
      <section className="mt-8">

        <div className="rounded-3xl bg-white p-10 shadow-sm">

          <h1 className="text-3xl font-bold text-gray-800">
            Achievement
          </h1>

          <p className="mt-3 text-gray-500">
            Badge dan pencapaian pengguna akan ditampilkan di sini.
          </p>

        </div>

      </section>
    );
  }

  return null;
}