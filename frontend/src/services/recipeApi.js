const BASE_URL = "https://makan-yuk.vercel.app/api/recipe";


// =========================
// Recommendation Random
// =========================

export async function getRecommendation() {

  const response = await fetch(
    `${BASE_URL}/recommendation`
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil rekomendasi.");
  }

  return response.json();

}


// =========================
// Cari berdasarkan bahan
// =========================

export async function searchByIngredients(
  ingredients,
  limit = 10
) {
  const url =
    `${BASE_URL}/cari-bahan?bahan=${encodeURIComponent(
      ingredients
    )}&limit=${limit}`;

  console.log("Request URL:", url);

  const response = await fetch(url);

  console.log("Status:", response.status);

  const data = await response.json();

  console.log("Response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Gagal mencari resep.");
  }

  return data;
}


// =========================
// Filter kategori
// =========================

export async function filterRecipe({
  category,
  cookTime,
  limit = 10,
}) {

  let url =
    `${BASE_URL}/filter?limit=${limit}`;

  if (category) {
    url += `&category=${category.toLowerCase()}`;
  }

  if (cookTime) {
    url += `&waktu_max=${cookTime}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Gagal mengambil data.");
  }

  return response.json();

}


// =========================
// Food Category
// =========================

export async function getFoodCategory(
  categoryId
) {

  const response = await fetch(

    `${BASE_URL}/food-category?category_id=${categoryId}`

  );

  if (!response.ok) {
    throw new Error("Gagal mengambil kategori.");
  }

  return response.json();

}


// =========================
// Ingredient Category
// =========================

export async function getIngredientCategory(
  categoryId
) {

  const response = await fetch(

    `${BASE_URL}/ingredients-category?category_id=${categoryId}`

  );

  if (!response.ok) {
    throw new Error("Gagal mengambil kategori.");
  }

  return response.json();

}