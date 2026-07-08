import { useState } from "react";

import ProfileLayout from "./ProfileLayout";
import ProfileHero from "./ProfileHero";
import ProfileTabs from "./ProfileTabs";
import ProfileContent from "./ProfileContent";

export default function Profile() {

  const [activeTab, setActiveTab] = useState("Data User");

  return (
    <ProfileLayout>

      <ProfileHero />

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ProfileContent
        activeTab={activeTab}
      />

    </ProfileLayout>
  );
}