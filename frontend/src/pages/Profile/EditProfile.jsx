import profileImage from "../../assets/images/Profile/Avatar.jpg";
import {
  Camera,
  Save,
  X,
} from "lucide-react";

export default function EditProfile() {
  return (
    <section className="mt-8">

      <div className="rounded-3xl bg-white p-10 shadow-sm">

        {/* Header */}
        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Edit Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Perbarui informasi akun Anda.
          </p>

        </div>

        {/* Avatar */}
        <div className="mt-10 flex flex-col items-center">

          <img
            src={profileImage}
            alt="Profile"
            className="h-36 w-36 rounded-full object-cover shadow"
          />

          <button
            className="
              mt-5
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-300
              px-5
              py-3
              transition
              hover:bg-gray-100
            "
          >

            <Camera size={18} />

            Change Photo

          </button>

        </div>

        {/* Form */}
        <div className="mt-12 grid grid-cols-2 gap-8">

          {/* Nama */}
          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Nama Lengkap
            </label>

            <input
              defaultValue="Budi Sudarsono"
              className="h-14 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
            />

          </div>

          {/* Username */}
          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Username
            </label>

            <input
              defaultValue="chefbudi"
              className="h-14 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
            />

          </div>

          {/* Email */}
          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>

            <input
              defaultValue="chef.budi@makanyuk.id"
              className="h-14 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
            />

          </div>

          {/* Nomor HP */}
          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Nomor HP
            </label>

            <input
              defaultValue="+62 812 3456 7890"
              className="h-14 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
            />

          </div>

          {/* Lokasi */}
          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Lokasi
            </label>

            <input
              defaultValue="Jakarta"
              className="h-14 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
            />

          </div>

          {/* Tanggal Lahir */}
          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Tanggal Lahir
            </label>

            <input
              type="date"
              className="h-14 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
            />

          </div>

        </div>

        {/* Bio */}

        <div className="mt-8">

          <label className="mb-2 block font-medium text-gray-700">
            Bio
          </label>

          <textarea
            rows={5}
            defaultValue="Passionate about authentic Indonesian flavors and healthy living."
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-green-600"
          />

        </div>

        {/* Button */}

        <div className="mt-10 flex justify-end gap-4">

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-300
              px-6
              py-3
              hover:bg-gray-100
            "
          >

            <X size={18} />

            Cancel

          </button>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-green-700
              px-6
              py-3
              text-white
              transition
              hover:bg-green-800
            "
          >

            <Save size={18} />

            Save Changes

          </button>

        </div>

      </div>

    </section>
  );
}