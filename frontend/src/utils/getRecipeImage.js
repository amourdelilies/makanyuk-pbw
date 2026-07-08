export default function getRecipeImage(title) {
  if (!title) {
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
  }

  const keyword = title
    .toLowerCase()
    .replace(/\s+/g, ",");

  return `https://source.unsplash.com/400x300/?${keyword},food`;
}