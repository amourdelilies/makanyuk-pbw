import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function ProfileLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <div className="mt-8">
          {children}
        </div>

      </main>

    </div>
  );
}