import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email dan kata sandi wajib diisi!');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        'http://localhost:8000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      console.log("LOGIN RESULT:", result);


      if (response.ok && result.success) {

        localStorage.setItem(
          'isLoggedIn',
          'true'
        );

        localStorage.setItem(
          'token_makanyuk',
          result.token
        );

        localStorage.setItem(
          'user_makanyuk',
          JSON.stringify(result.user)
        );


        navigate('/dashboard');

      } else {

        setErrorMessage(
          result.message || 'Email atau password salah!'
        );

      }


    } catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      setErrorMessage(
        'Tidak dapat terhubung ke server. Pastikan backend aktif!'
      );


    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center justify-center bg-gray-50/60 p-4 sm:p-6 select-none font-sans animate-[fadeIn_0.4s_ease-out]">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100/80 overflow-hidden flex flex-col md:flex-row min-h-[580px]">


        {/* FORM LOGIN */}
        <div className="w-full md:w-3/5 p-8 sm:p-12 flex flex-col justify-center items-center bg-white">

          <div className="w-full max-w-sm space-y-6 text-center">


            <div>
              <h2 className="text-3xl font-black text-green-700 tracking-tight">
                Masuk Ke Akun
              </h2>

              <p className="text-gray-400 text-xs mt-1">
                Silakan masuk untuk mengakses fitur personalmu
              </p>
            </div>



            <div className="flex items-center justify-center gap-3">

              <button type="button"
                className="w-10 h-10 border rounded-xl flex items-center justify-center">
                <FaFacebookF />
              </button>

              <button type="button"
                className="w-10 h-10 border rounded-xl flex items-center justify-center">
                <FaGoogle />
              </button>

              <button type="button"
                className="w-10 h-10 border rounded-xl flex items-center justify-center">
                <FaLinkedinIn />
              </button>

            </div>



            <div className="relative flex py-2 items-center">

              <div className="flex-grow border-t"></div>

              <span className="mx-4 text-gray-400 text-[10px] font-bold uppercase">
                atau gunakan akun email
              </span>

              <div className="flex-grow border-t"></div>

            </div>




            {
              errorMessage && (

                <div className="bg-red-50 text-red-600 text-xs font-bold px-4 py-3 rounded-xl border border-red-100 text-left">

                  ⚠️ {errorMessage}

                </div>

              )
            }





            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 text-left"
            >



              <div>

                <label className="text-xs font-bold text-gray-500">
                  Alamat Email
                </label>


                <div className="relative">

                  <FaEnvelope className="absolute left-4 top-4 text-gray-400 text-xs"/>


                  <input

                    type="email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                    placeholder="Masukkan alamat email"

                    className="w-full bg-gray-50 border rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-green-700"

                  />

                </div>

              </div>




              <div>

                <label className="text-xs font-bold text-gray-500">
                  Kata Sandi
                </label>


                <div className="relative">


                  <FaLock className="absolute left-4 top-4 text-gray-400 text-xs"/>


                  <input

                    type="password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    placeholder="Masukkan kata sandi"

                    className="w-full bg-gray-50 border rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-green-700"

                  />

                </div>


              </div>




              <button

                type="submit"

                disabled={loading}

                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"

              >

                {
                  loading 
                  ? "Memeriksa akun..."
                  : "Masuk Sekarang"
                }


              </button>


            </form>


          </div>


        </div>





        {/* PANEL REGISTER */}

        <div className="w-full md:w-2/5 bg-gradient-to-br from-green-700 to-green-800 text-white p-8 sm:p-12 flex flex-col justify-center items-center text-center">


          <div className="space-y-6">


            <span className="text-xs font-black tracking-widest text-green-200 uppercase">
              MakanYuk!
            </span>


            <h2 className="text-3xl font-black">
              Halo, Teman Makan!
            </h2>


            <p className="text-sm text-green-100">
              Daftarkan dirimu dan mulai merencanakan menu masakan nusantara sehat bersama kami.
            </p>



            <Link

              to="/register"

              className="inline-block border-2 border-white px-10 py-3 rounded-full font-bold"

            >

              Daftar Di Sini

            </Link>



          </div>


        </div>


      </div>


    </div>
  );
}