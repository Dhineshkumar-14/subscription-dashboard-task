import { useState } from "react";
import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
              S
            </div>

            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              SubDash
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/plans"
              className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300"
            >
              Plans
            </a>

            <a
              href="/dashboard"
              className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300"
            >
              Dashboard
            </a>

            <a
              href="/profile"
              className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300"
            >
              Profile
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2">
              <User size={18} />

              <span className="text-sm">Dinesh</span>
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-red-500 px-3 py-2 text-white">
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex flex-col gap-4 p-4">
            <a href="/plans">Plans</a>

            <a href="/dashboard">Dashboard</a>

            <a href="/profile">Profile</a>

            <button onClick={toggleTheme} className="flex items-center gap-2">
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

            <button className="flex items-center gap-2 text-red-500">
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
