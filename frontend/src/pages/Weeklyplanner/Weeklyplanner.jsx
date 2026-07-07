import { useState } from "react";
import WeeklyPlannerGrid from "../../components/WeeklyPlanner/WeeklyPlannerGrid";
import RecipeModal from "../../components/WeeklyPlanner/RecipeModal";

function WeeklyPlanner() {

  const [isModalOpen, setIsModalOpen] = useState(true);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [plannerData, setPlannerData] = useState({
    Senin: {
      Sarapan: {
        title: "Nasi Goreng",
        duration: "20 menit",
      },
    },
  });

  const handleCellClick = (day, meal) => {
    setSelectedDay(day);
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Weekly Planner
      </h1>

      <WeeklyPlannerGrid
        plannerData={plannerData}
        onCellClick={handleCellClick}
      />

      {isModalOpen && (
        <RecipeModal />
      )}

    </div>
  );
}

export default WeeklyPlanner;