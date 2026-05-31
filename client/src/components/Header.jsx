import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Sun,
  Moon,
  LayoutDashboard,
  CreditCard,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme } from "../context/ThemeContext";
import { logout } from "../store/slices/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, subscription } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-[#0f172a]/95 dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30">
              S
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                SubDash
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Subscription Manager
              </p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {user?.role === "admin" ? (
              <>
                <Link
                  to="/admin/subscriptions"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard size={16} />
                    Subscriptions
                  </div>
                </Link>

                <Link
                  to="/plans"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    Plans
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/plans"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    Plans
                  </div>
                </Link>

                {subscription?.status === "active" && (
                  <Link
                    to="/dashboard"
                    className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    <div className="flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      Dashboard
                    </div>
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="
flex h-11 w-11 items-center justify-center
rounded-2xl
border border-slate-200
bg-white
shadow-sm
transition-all duration-300
hover:scale-105
hover:bg-slate-100

dark:border-slate-700
dark:bg-slate-800
dark:text-white
dark:hover:bg-slate-700
"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div
              className="
flex items-center gap-3
rounded-2xl
border border-slate-200
bg-white/80
px-4 py-2
shadow-sm
backdrop-blur-md

dark:border-slate-700
dark:bg-slate-800/80
"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                <User size={16} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.name || "User"}
                </p>

                <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                  {user?.role}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="
flex items-center gap-2
rounded-2xl
border border-red-200
px-4 py-2
text-red-500
transition-all duration-300
hover:bg-red-50

dark:border-red-900
dark:hover:bg-red-950/30
"
            >
              <LogOut size={18} />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800 md:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-[#0f172a] md:hidden">
          <div className="space-y-2">
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <User size={16} />
              </div>

              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.role}
                </p>
              </div>
            </div>

            <Link
              to="/plans"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              <CreditCard size={16} />
              Plans
            </Link>

            {subscription?.status === "active" && (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="flex w-full items-center cursor-pointer gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} />
                  Dark Mode
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3  cursor-pointer rounded-xl px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
