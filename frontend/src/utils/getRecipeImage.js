export default function getRecipeImage(title) {
  if (!title) {
    return "https://placehold.co/320x240?text=Recipe";
  }

  const keyword = title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim()
    .replace(/\s+/g, ",");

  return `https://loremflickr.com/320/240/${keyword}?lock=${keyword}`;
}