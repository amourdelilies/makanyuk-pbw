import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import Home from '../pages/Home/Home'; 
import Recipes from '../pages/Recipedetail/Recipedetail'; 
import Login from '../pages/Login/Login';         
import Register from '../pages/Register/Register';   
import Dashboard from '../pages/Dashboard/Dashboard'; 
import Kategori from '../pages/Category/Category'; // Sesuaikan dengan folder tempat kamu menyimpan file Kategori.jsx

const router = createBrowserRouter([
  // 1. KELOMPOK HALAMAN PUBLIC (DENGAN NAVBAR & FOOTER)
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      {
        index: true, 
        element: <Home />, 
      },
      {
        path: 'beranda', 
        element: <Home />,
      },
      {
        path: 'resep',
        element: <Recipes />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />, 
      },
      // 2. TAMBAHKAN RUTE KATEGORI DI SINI
      {
        path: 'kategori',
        element: <Kategori />,
      },
    ],
  },
  
  // 2. KELOMPOK HALAMAN AUTENTIKASI (BERSIH TANPA NAVBAR)
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}