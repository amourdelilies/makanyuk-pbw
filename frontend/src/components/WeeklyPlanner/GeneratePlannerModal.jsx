import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import RecipeCriteriaForm from "./common/RecipeCriteriaForm";

export default function GeneratePlannerModal({
  isOpen,
  onClose,
  onGenerate,
}) {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setMode(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modes = [
    {
      id: "FULL_WEEK",
      title: "📅 Satu Minggu Penuh",
      description:
        "Generate menu Senin–Minggu (Sarapan, Makan Siang, Makan Malam).",
    },
    {
      id: "BREAKFAST",
      title: "🍳 Sarapan",
      description:
        "Generate menu sarapan untuk seluruh minggu.",
    },
    {
      id: "LUNCH",
      title: "🍛 Makan Siang",
      description:
        "Generate menu makan siang untuk seluruh minggu.",
    },
    {
      id: "DINNER",
      title: "🌙 Makan Malam",
      description:
        "Generate menu makan malam untuk seluruh minggu.",
    },
    {
      id: "DAY",
      title: "📆 Hari Tertentu",
      description:
        "Generate seluruh menu pada satu hari.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* HEADER */}

        <div className="flex justify-between items-center border-b px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold text-green-700">
              Generate Weekly Planner
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Pilih mode generate planner.
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>

        </div>

        {/* BODY */}

        <div className="flex-1 overflow-y-auto p-6">

          {!mode && (

            <div className="space-y-4">

              {modes.map((item) => (

                <button
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  className="w-full text-left border rounded-xl p-5 hover:border-green-600 hover:bg-green-50 transition"
                >

                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {item.description}
                  </p>

                </button>

              ))}

            </div>

          )}

          {mode && (

            <>

              <button
                onClick={() => setMode(null)}
                className="text-green-700 font-medium mb-5"
              >
                ← Kembali
              </button>

              <RecipeCriteriaForm
                mode={mode}
                buttonText="Generate Planner"
                onSubmit={(criteria) => {

                  onGenerate({
                    mode,
                    criteria,
                  });

                  onClose();

                }}
              />

            </>

          )}

        </div>

      </div>

    </div>
  );
}