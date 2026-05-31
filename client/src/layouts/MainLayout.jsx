import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <Header />

      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
