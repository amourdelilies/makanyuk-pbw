import loginImage from "../../assets/images/login/login-bg.jpg";

import AuthTabs from "./AuthTabs";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import RememberMe from "./RememberMe";
import TombolLogin from "./TombolLogin";
import GoogleButton from "./GoogleButton";

export default function AuthLayout() {
  return (
    <section className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="mx-auto flex min-h-[95vh] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Left Side */}
        <div
          className="relative hidden lg:flex lg:w-1/2"
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
              Mulailah perjalanan kuliner Anda dengan rekomendasi resep,
              perencanaan menu, dan pengalaman memasak yang lebih mudah.
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-center py-12">

          <div className="w-full max-w-md px-10 pt-10">

            <h2 className="mt-4 text-center text-4xl font-bold">
              Selamat Datang
            </h2>

            <p className="mt-3 text-center text-gray-500">
              Masuk untuk mengakses akun MakanYuk Anda
            </p>

            <AuthTabs />

            <EmailInput />

            <PasswordInput />

            <RememberMe />

            <TombolLogin />

            <div className="my-4 flex items-center">

              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="mx-4 text-gray-400">
                atau
              </span>

              <div className="h-px flex-1 bg-gray-300"></div>

            </div>

            <GoogleButton />

          </div>

        </div>

      </div>

    </section>
  );
}