import PersonalInfo from "../PersonalInfo";
import AccountSettings from "../AccountSettings";
import CookingLevel from "../CookingLevel";
import PortfolioCard from "../PortfolioCard";
import DailyQuest from "../DailyQuest";

export default function DataUserTab() {
  return (
    <section className="grid grid-cols-3 gap-8">

      <div className="col-span-2 space-y-8">
        <PersonalInfo />
        <AccountSettings />
      </div>

      <div className="space-y-8">
        <CookingLevel />
        <PortfolioCard />
        <DailyQuest />
      </div>

    </section>
  );
}