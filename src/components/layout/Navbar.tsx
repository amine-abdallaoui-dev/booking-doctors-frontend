import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/doctors" },
  { label: "Specialties", href: "/#specialties" },
  { label: "How It Works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  const scrollToSection = (href: string) => {
    if (!isHome) return;
    const id = href.replace("/#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const dashboardLink = user
    ? user.role === "admin"
      ? "/admin/dashboard"
      : user.role === "doctor"
      ? "/doctor/dashboard"
      : "/patient/dashboard"
    : null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-slate-800 dark:text-slate-100">Medi</span>
              <span className="text-primary">Book</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    scrolled || !isHome
                      ? "text-slate-600 dark:text-slate-300"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.href
                      ? "text-primary"
                      : scrolled || !isHome
                      ? "text-slate-600 dark:text-slate-300"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <Link
                to={dashboardLink || "/"}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors shadow-teal"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link

                  to="/login"
                  className="hidden sm:inline-flex items-center px-5 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors shadow-teal"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-slate-900 pt-[72px]">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg font-semibold text-slate-800 dark:text-slate-100 py-2 hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-lg font-semibold text-slate-800 dark:text-slate-100 py-2 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 flex flex-col gap-3">
              {user ? (
                <Link
                  to={dashboardLink || "/"}
                  className="text-center py-3 rounded-full bg-primary text-white font-semibold"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-center py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-center py-3 rounded-full bg-primary text-white font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
