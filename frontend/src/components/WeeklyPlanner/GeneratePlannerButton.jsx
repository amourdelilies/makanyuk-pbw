import { FaMagic } from "react-icons/fa";

export default function GeneratePlannerButton({
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow"
    >
      <FaMagic />
      Generate Planner
    </button>
  );
}