import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Sun, Moon, Menu, LogOut, User } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";

const pageTitles: Record<string, string> = {
  "/patient/dashboard": "Overview",
  "/patient/appointments": "My Appointments",
  "/patient/records": "Medical Records",
  "/patient/favorites": "Favorite Doctors",
  "/patient/profile": "Profile Settings",
  "/doctor/dashboard": "Overview",
  "/doctor/appointments": "Appointments",
  "/doctor/patients": "My Patients",
  "/doctor/reviews": "Reviews",
  "/doctor/schedule": "My Schedule",
  "/doctor/earnings": "Earnings",
  "/doctor/profile": "My Profile",
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/doctors": "Doctors",
  "/admin/appointments": "Appointments",
  "/admin/specialties": "Specialties",
  "/admin/payments": "Payments",
  "/admin/reviews": "Reviews",
  "/admin/blog": "Blog Posts",
  "/admin/settings": "Settings",
};

export default function Topbar({ role }: { role: UserRole }) {
  const { isDark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h1>
            <p className="text-xs text-slate-400 capitalize hidden sm:block">{role} Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-badge-pulse" />
          </button>
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center ml-1"
            >
              <span className="text-primary text-sm font-bold">{user?.name?.charAt(0) || "U"}</span>
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
                  <Link
                    to={`/${role}/profile`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[260px] bg-white dark:bg-slate-800 shadow-xl">
            <Sidebar role={role} collapsed={false} onToggle={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
