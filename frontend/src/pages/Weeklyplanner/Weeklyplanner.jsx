import { useState } from "react";

import WeeklyPlannerGrid from "../../components/WeeklyPlanner/WeeklyPlannerGrid";
import RecipeModal from "../../components/WeeklyPlanner/RecipeModal";
import GeneratePlannerButton from "../../components/WeeklyPlanner/GeneratePlannerButton";
import GeneratePlannerModal from "../../components/WeeklyPlanner/GeneratePlannerModal";

import {
  getRecommendation,
  searchByIngredients,
  filterRecipe,
} from "../../services/recipeApi";

import getRecipeImage from "../../utils/getRecipeImage";

export default function WeeklyPlanner() {
  const [plannerData, setPlannerData] = useState({});

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const days = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  const meals = [
    "Sarapan",
    "Makan Siang",
    "Makan Malam",
  ];

  // ===========================
  // Klik Cell
  // ===========================

  const handleCellClick = (day, meal) => {
    setSelectedDay(day);
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  // ===========================
  // Simpan Manual
  // ===========================

  const handleSaveRecipe = (recipe) => {
    const plannerRecipe = {
      title: recipe.title,
      image: getRecipeImage(recipe.title),
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      url: recipe.url,
    };

    setPlannerData((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedMeal]: plannerRecipe,
      },
    }));

    setIsModalOpen(false);
  };

  // ===========================
  // Generate Planner
  // ===========================

  const handleGeneratePlanner = async ({
    mode,
    criteria,
  }) => {
    try {
      let response;

      if (criteria.ingredients) {
        response = await searchByIngredients(
          criteria.ingredients
        );
      } else if (
        criteria.category ||
        criteria.cookTime
      ) {
        response = await filterRecipe({
          category: criteria.category,
          cookTime: criteria.cookTime,
        });
      } else {
        response = await getRecommendation();
      }

      const recipes = response.results || [];

      if (recipes.length === 0) {
        alert("Tidak ada resep ditemukan.");
        return;
      }

      const planner = {};

      let index = 0;

      const nextRecipe = () => {
        const recipe = recipes[index % recipes.length];
        index++;

        return {
          title: recipe.title,
          image: getRecipeImage(recipe.title),
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          url: recipe.url,
        };
      };

      switch (mode) {
        case "FULL_WEEK":

          days.forEach((day) => {
            planner[day] = {};

            meals.forEach((meal) => {
              planner[day][meal] = nextRecipe();
            });
          });

          break;

        case "BREAKFAST":

          days.forEach((day) => {
            planner[day] = {
              Sarapan: nextRecipe(),
            };
          });

          break;

        case "LUNCH":

          days.forEach((day) => {
            planner[day] = {
              "Makan Siang": nextRecipe(),
            };
          });

          break;

        case "DINNER":

          days.forEach((day) => {
            planner[day] = {
              "Makan Malam": nextRecipe(),
            };
          });

          break;

        case "DAY":

          planner[criteria.day] = {};

          meals.forEach((meal) => {
            planner[criteria.day][meal] =
              nextRecipe();
          });

          break;

        default:
          break;
      }

      setPlannerData((prev) => ({
        ...prev,
        ...planner,
      }));
    } catch (err) {
      console.error(err);
      alert("Gagal generate planner.");
    }
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-green-700">
            Weekly Meal Planner
          </h1>

          <p className="text-gray-500 mt-1">
            Atur menu mingguan sesuai kebutuhanmu.
          </p>

        </div>

        <GeneratePlannerButton
          onClick={() => setIsGenerateOpen(true)}
        />

      </div>

      <WeeklyPlannerGrid
        plannerData={plannerData}
        onCellClick={handleCellClick}
      />

      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDay={selectedDay}
        selectedMeal={selectedMeal}
        onSave={handleSaveRecipe}
      />

      <GeneratePlannerModal
        isOpen={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        onGenerate={handleGeneratePlanner}
      />

    </div>
  );
}