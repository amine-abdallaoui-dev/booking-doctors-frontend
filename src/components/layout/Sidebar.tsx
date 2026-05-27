import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Heart, User, FileText,
  Stethoscope, Users, Star, Clock, DollarSign, CreditCard,
  Settings, Briefcase, ChevronLeft, ChevronRight, LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/contexts/AuthContext";

const navConfig: Record<UserRole, { label: string; icon: typeof LayoutDashboard; href: string }[]> = {
  user: [
    { label: "Overview", icon: LayoutDashboard, href: "/patient/dashboard" },
    { label: "My Appointments", icon: Calendar, href: "/patient/appointments" },
    { label: "Medical Records", icon: FileText, href: "/patient/records" },
    { label: "Favorite Doctors", icon: Heart, href: "/patient/favorites" },
    { label: "Profile Settings", icon: User, href: "/patient/profile" },
  ],
  doctor: [
    { label: "Overview", icon: LayoutDashboard, href: "/doctor/dashboard" },
    { label: "Appointments", icon: Calendar, href: "/doctor/appointments" },
    { label: "My Patients", icon: Users, href: "/doctor/patients" },
    { label: "Reviews", icon: Star, href: "/doctor/reviews" },
    { label: "Schedule", icon: Clock, href: "/doctor/schedule" },
    { label: "Earnings", icon: DollarSign, href: "/doctor/earnings" },
    { label: "Profile", icon: User, href: "/doctor/profile" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Users", icon: Users, href: "/admin/users" },
    { label: "Doctors", icon: Stethoscope, href: "/admin/doctors" },
    { label: "Appointments", icon: Calendar, href: "/admin/appointments" },
    { label: "Specialties", icon: Briefcase, href: "/admin/specialties" },
    { label: "Payments", icon: CreditCard, href: "/admin/payments" },
    { label: "Reviews", icon: Star, href: "/admin/reviews" },
    { label: "Blog", icon: FileText, href: "/admin/blog" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
  ],
};

interface SidebarProps {
  role: UserRole;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const items = navConfig[role];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40 transition-all duration-300 hidden md:flex flex-col ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className={`h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-700 ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">
              Medi<span className="text-primary">Book</span>
            </span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-primary"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : ""}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-sm font-bold">{user?.name?.charAt(0) || "U"}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{user?.name || "User"}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role || "Patient"}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={logout}
              className="text-slate-400 hover:text-rose-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
