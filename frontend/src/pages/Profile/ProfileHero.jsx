import chefImage from "../../assets/images/Profile/Avatar.jpg";
import { CheckCircle2, Share2 } from "lucide-react";

export default function ProfileHero() {

  // ==============================
  // LANGKAH 6.3
  // Membuat data statistik
  // ==============================
  const stats = [
    {
      value: "1.2K",
      label: "Followers",
    },
    {
      value: "482",
      label: "Following",
    },
    {
      value: "64",
      label: "Recipes",
    },
  ];

  return (
    <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">

        {/* ==============================
            LEFT
        ============================== */}
        <div className="flex items-center gap-8">

          {/* Avatar */}
          <div className="relative flex-shrink-0">

            <img
              src={chefImage}
              alt="Chef Budi"
              className="h-32 w-32 rounded-full object-cover"
            />

            <div className="absolute bottom-1 right-1 rounded-full bg-white p-1">

              <CheckCircle2
                size={22}
                className="text-green-600"
              />

            </div>

          </div>

          {/* User Information */}
          <div>

            {/* Nama */}
            <h2 className="text-4xl font-bold text-gray-800">
              Chef Budi
            </h2>

            {/* Bio */}
            <p className="mt-3 max-w-xl leading-7 text-gray-500">
              Passionate about authentic Indonesian flavors and healthy
              living. Teaching the world how to cook simple, nutritious
              meals one recipe at a time.
            </p>

            {/* ==============================
                LANGKAH 6.4
                Menampilkan statistik
            ============================== */}

            <div className="mt-8 flex items-center gap-10">

              {stats.map((item) => (

                <div
                  key={item.label}
                  className="text-center"
                >

                  <h3 className="text-2xl font-bold text-green-700">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.label}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ==============================
            RIGHT
        ============================== */}

        <div className="flex flex-col gap-3">

          <button className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-8 py-3 font-medium text-white transition hover:bg-green-800">

            <Share2 size={18} />

            Share Profile

          </button>

          <button className="rounded-xl border border-gray-300 px-8 py-3 font-medium transition hover:bg-gray-100">

            View Public Profile

          </button>

        </div>

      </div>

    </section>
  );
}