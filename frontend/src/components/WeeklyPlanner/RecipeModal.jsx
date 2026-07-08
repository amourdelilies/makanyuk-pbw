import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import RecipeCriteriaForm from "./common/RecipeCriteriaForm";
import getRecipeImage from "../../utils/getRecipeImage";

import {
  searchByIngredients,
  filterRecipe,
  getRecommendation,
} from "../../services/recipeApi";

export default function RecipeModal({
  isOpen,
  onClose,
  selectedDay,
  selectedMeal,
  onSave,
}) {
  // ==========================
  // Mode
  // ==========================

  const [mode, setMode] = useState("manual");

  // ==========================
  // Manual Search
  // ==========================

  const [keyword, setKeyword] = useState("");

  // ==========================
  // Recommendation Criteria
  // ==========================

  const [criteria, setCriteria] = useState({
    category: "",
    ingredients: "",
    cookTime: "",
  });

  // ==========================
  // Result
  // ==========================

  const [recipes, setRecipes] = useState([]);

  const [selectedRecipe, setSelectedRecipe] =
    useState(null);

  // ==========================
  // Loading
  // ==========================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ==========================
  // Reset Modal
  // ==========================

  useEffect(() => {
    if (!isOpen) return;

    setMode("manual");

    setKeyword("");

    setCriteria({
      category: "",
      ingredients: "",
      cookTime: "",
    });

    setRecipes([]);

    setSelectedRecipe(null);

    setLoading(false);

    setError("");
  }, [isOpen]);

  if (!isOpen) return null;

  // =====================================================
  // Manual Search
  // =====================================================

      const handleManualSearch = async () => {

        try {

          setLoading(true);
          setError("");

          console.log("Keyword:", keyword);

          const data =
            await searchByIngredients(keyword);

          console.log("DATA DARI API", data);

          setRecipes(data.results ?? []);

        } catch (err) {

          console.error(err);

          setError(err.message);

        } finally {

          setLoading(false);

        }

      };

  // =====================================================
  // Recommendation
  // =====================================================

  const handleRecommendation = async (formData) => {

    const criteria = formData;

    try {

      setLoading(true);

      setError("");

      let data;

      if (criteria.ingredients.trim() !== "") {

        data = await searchByIngredients(
          criteria.ingredients
        );

      } else if (
        criteria.category ||
        criteria.cookTime
      ) {

        data = await filterRecipe({
          category: criteria.category,
          cookTime: criteria.cookTime,
        });

      } else {

        data = await getRecommendation();

      }

      setRecipes(data.results || []);

    } catch (err) {

      setError("Gagal mengambil rekomendasi.");

    } finally {

      setLoading(false);

    }

  };

  // =====================================================
  // Save
  // =====================================================

  const handleSave = () => {

    if (!selectedRecipe) {

      alert("Silakan pilih salah satu menu.");

      return;

    }

    onSave(selectedRecipe);

  };

    return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">

        {/* ================= HEADER ================= */}

        <div className="flex justify-between items-center px-6 py-5 border-b">

          <div>

            <h2 className="text-2xl font-bold text-green-700">
              Tambah Menu
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {selectedDay} • {selectedMeal}
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes size={18}/>
          </button>

        </div>

        {/* ================= MODE ================= */}

        <div className="px-6 pt-5">

          <div className="flex gap-3">

            <button
              onClick={() => {
                setMode("manual");
                setRecipes([]);
                setSelectedRecipe(null);
              }}
              className={`flex-1 rounded-xl py-3 font-semibold transition ${
                mode === "manual"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Manual Search
            </button>

            <button
              onClick={() => {
                setMode("recommendation");
                setRecipes([]);
                setSelectedRecipe(null);
              }}
              className={`flex-1 rounded-xl py-3 font-semibold transition ${
                mode === "recommendation"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Recommendation
            </button>

          </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="flex-1 overflow-y-auto p-6">

        {/* ================= MANUAL ================= */}

        {mode === "manual" && (

          <>

            <div className="mb-4">

              <h3 className="font-semibold text-lg">
                Cari Berdasarkan Bahan
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Masukkan satu atau beberapa bahan yang tersedia.
              </p>

            </div>

            <div className="flex gap-3 mb-5">

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Contoh: ayam, tomat, bawang"
                className="flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                onClick={handleManualSearch}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6"
              >
                <FaSearch />
              </button>

            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800 mb-4">

              💡 Pisahkan beberapa bahan menggunakan tanda koma.
              <br />
              Contoh: <b>ayam, telur, bawang</b>

            </div>

          </>

        )}

          {/* ================= RECOMMENDATION ================= */}

            {mode === "recommendation" && (

                <RecipeCriteriaForm
                    mode="FULL_WEEK"
                    buttonText="Cari Rekomendasi"
                    onSubmit={handleRecommendation}
                />

            )}

          {/* ================= LOADING ================= */}

          {loading && (

            <div className="flex justify-center py-12">

              <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"/>

            </div>

          )}

          {/* ================= ERROR ================= */}

          {!loading && error && (

            <div className="text-center text-red-500 py-8">

              {error}

            </div>

          )}

          {/* ================= RESULT ================= */}

          {!loading && recipes.length > 0 && (

            <div className="space-y-3 max-h-[330px] overflow-y-auto pr-2">

              {recipes.map((recipe, index) => {

                const isSelected =
                  selectedRecipe?.title === recipe.title;

                return (

                  <div
                    key={index}
                    onClick={() =>
                      setSelectedRecipe(recipe)
                    }
                    className={`border rounded-xl p-3 cursor-pointer transition flex gap-4 items-center ${
                      isSelected
                        ? "border-green-600 bg-green-50"
                        : "hover:bg-gray-50"
                    }`}
                  >

                      <img
                          src={
                              recipe.image ||
                              getRecipeImage(recipe.title)
                          }
                          alt={recipe.title}
                          className="w-24 h-20 rounded-lg object-cover"
                          onError={(e)=>{
                              e.target.src =
                                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
                          }}
                      />

                    <div className="flex-1">

                      <h3 className="font-semibold">

                        {recipe.title}

                      </h3>

                      {recipe.category && (

                        <p className="text-sm text-gray-500 mt-1">

                          {recipe.category}

                        </p>

                      )}

                      {recipe.duration && (

                        <p className="text-xs text-gray-500 mt-1">

                          ⏱ {recipe.duration}

                        </p>

                      )}

                    </div>

                    {isSelected && (

                      <div className="text-green-600 font-bold">

                        Dipilih

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          )}

          {/* ================= EMPTY ================= */}

          {!loading &&
            recipes.length === 0 &&
            !error && (

            <div className="text-center py-16 text-gray-400">

              <div className="text-5xl mb-4">

                🍽️

              </div>

              <p>

                Belum ada hasil.

              </p>

              <p className="text-sm mt-2">

                Gunakan pencarian atau rekomendasi.

              </p>

            </div>

          )}

        </div>

            {/* ================= FOOTER ================= */}

        <div className="border-t px-6 py-4 flex justify-between items-center bg-white">

          <div>

            {selectedRecipe && (

              <div>

                <p className="text-sm text-gray-500">
                  Menu dipilih
                </p>

                <p className="font-semibold text-green-700">
                  {selectedRecipe.title}
                </p>

              </div>

            )}

          </div>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
            >
              Batal
            </button>

            <button
              onClick={handleSave}
              disabled={!selectedRecipe}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedRecipe
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Gunakan Menu
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}