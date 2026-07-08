import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import Home from '../pages/Home/Home'; // Perhatikan jalur folder Home/Home.jsx
import Recipes from '../pages/Recipedetail/Recipedetail'; // Dummy sementara untuk menu resep
import Achievement from '../pages/Achievement/Achievement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Ini yang bertugas memanggil Navbar & Footer secara global
    children: [
      {
        index: true, // Halaman utama saat akses (/)
        element: <Home />, // Konten utama Home.jsx akan masuk ke bagian <Outlet /> di MainLayout
      },
      {
        path: 'resep',
        element: <Recipes />,
      },
      {
        path: 'achievement',
        element: <Achievement />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}