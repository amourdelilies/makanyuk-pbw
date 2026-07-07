import PlannerCell from "./PlannerCell";

export default function WeeklyPlannerGrid({
  plannerData,
  onCellClick,
}) {
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">

        {/* Header */}
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-4 text-left">
              Waktu
            </th>

            {days.map((day) => (
              <th
                key={day}
                className="p-4"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>

          {meals.map((meal) => (

            <tr key={meal} className="border-b">

              <td className="font-semibold bg-gray-100 p-4">
                {meal}
              </td>

              {days.map((day) => {

                const recipe = plannerData?.[day]?.[meal];

                return (

                  <td
                    key={`${day}-${meal}`}
                    className="border p-4 h-32 align-middle"
                  >

                    <div
                      onClick={() => onCellClick(day, meal)}
                      className="w-full h-full cursor-pointer"
                    >
                      <PlannerCell
                        title={recipe?.title}
                        duration={recipe?.duration}
                        image={recipe?.image}
                      />
                    </div>

                  </td>

                );

              })}

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}