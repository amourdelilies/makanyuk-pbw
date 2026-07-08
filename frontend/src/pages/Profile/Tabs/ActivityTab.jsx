import ActivityHeader from "../Activity/ActivityHeader";
import ActivityCard from "../Activity/ActivityCard";

import { activities } from "../Activity/activityData";

export default function ActivityTab() {
  return (
    <section className="mt-8">

      <ActivityHeader />

      <div className="mt-8 space-y-5">

        {activities.map((activity) => (

          <ActivityCard
            key={activity.id}
            activity={activity}
          />

        ))}

      </div>

    </section>
  );
}