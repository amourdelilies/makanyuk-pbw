const personalInfo = [
  {
    title: "FULL NAME",
    value: "Budi Sudarsono",
  },
  {
    title: "EMAIL ADDRESS",
    value: "chef.budi@makanyuk.id",
  },
  {
    title: "PHONE NUMBER",
    value: "+62 812 3456 7890",
  },
  {
    title: "LOCATION",
    value: "Jakarta, Indonesia",
  },
];

export default function PersonalInfo() {
  return (
    <div className="rounded-3xl bg-white p-10 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-800">
        Personal Details
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">

        {personalInfo.map((item) => (
          <div key={item.title}>

            <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-400">
              {item.title}
            </p>

            <p className="mt-3 text-lg font-medium text-gray-800">
              {item.value}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}