import AchievementHeader from "../Achievement/AchievementHeader";
import ProgressCard from "../Achievement/ProgressCard";
import AchievementCard from "../Achievement/AchievementCard";

import { achievements } from "../Achievement/achievementData";

export default function AchievementTab() {
  return (
    <section className="mt-8">

      <AchievementHeader />

      <div className="mt-8">

        <ProgressCard />

      </div>

      <div className="mt-8 space-y-5">

        {achievements.map((achievement) => (

          <AchievementCard
            key={achievement.id}
            achievement={achievement}
          />

        ))}

      </div>

    </section>
  );
}