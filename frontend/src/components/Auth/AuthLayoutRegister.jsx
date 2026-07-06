import { Link } from "react-router-dom";

import loginImage from "../../assets/images/login/login-bg.jpg";

import AuthTabs from "./AuthTabs";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import TermsCheckbox from "./TermsCheckbox";
import GoogleButton from "./GoogleButton";

export default function AuthLayoutRegister() {
  return (
    <section className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="mx-auto flex min-h-[95vh] max-w-7xl rounded-3xl bg-white shadow-2xl">

        {/* Left Side */}

        <div
          className="relative hidden w-1/2 lg:flex"
          style={{
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-12 left-12 z-10 text-white">

            <h1 className="text-5xl font-bold">
              MakanYuk!
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8">
              Bergabunglah dengan MakanYuk dan nikmati pengalaman memasak
              yang lebih mudah dan menyenangkan.
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex flex-1 items-start justify-center pt-12 pb-8">

          <div className="w-full max-w-md px-10">

            {/* Title */}

            <h2 className="mt-5 text-center text-4xl font-bold">
              Buat Akun
            </h2>

            <p className="mt-8 text-center text-gray-500">
              Daftar untuk mulai menggunakan MakanYuk
            </p>

            {/* Tabs */}

            <div className="mt-5">
              <AuthTabs />
            </div>

            {/* Form */}

            <div className="mt-8">
              <NameInput />
              <EmailInput />
              <PasswordInput />
              <ConfirmPasswordInput />
            </div>

            {/* Terms */}

            <div className="mt-7">

              <TermsCheckbox />

            </div>

            {/* Button */}

            <button
              className="mt-7 h-14 w-full rounded-xl bg-green-700 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-800"
            >
              Daftar
            </button>

            {/* Divider */}

            <div className="my-6 flex items-center">

              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="mx-4 text-sm text-gray-400">
                atau
              </span>

              <div className="h-px flex-1 bg-gray-300"></div>

            </div>

            {/* Google */}

            <GoogleButton />

            {/* Footer */}

            <p className="mt-4 text-center text-sm text-gray-600">

              Sudah punya akun?

              <Link
                to="/login"
                className="ml-1 font-semibold text-green-700 hover:underline"
              >
                Masuk
              </Link>

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}