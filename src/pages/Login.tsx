import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Apple } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

type RoleTab = "user" | "doctor" | "admin";

export default function Login() {
  const { login, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<RoleTab>("user");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    //const success = await login(email, password);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    const paths: Record<string, string> = {
      admin: "/admin/dashboard",
      doctor: "/doctor/dashboard",
      user: "/patient/dashboard",
    };
    navigate(paths[user.role] || "/patient/dashboard");
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-[45%] gradient-primary flex-col justify-between p-12">
        <Link to="/" className="text-xl font-bold text-white"><span>Medi</span><span className="text-white/80">Book</span></Link>
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Health, Simplified</h2>
          <p className="text-white/80 leading-relaxed max-w-sm">Join thousands of patients and doctors on the most trusted healthcare booking platform.</p>
        </div>
        <div className="glassmorphism rounded-xl p-4 max-w-sm">
          <div className="flex gap-1 mb-2">
            {[1,2,3,4,5].map((i) => <div key={i} className="w-4 h-4 rounded-full bg-amber-400" />)}
          </div>
          <p className="text-white/80 text-sm italic mb-3">"The easiest way to book doctor appointments. Saved me hours of calling around."</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><span className="text-white text-xs font-bold">S</span></div>
            <div><p className="text-white text-xs font-semibold">Sarah Mitchell</p><p className="text-white/60 text-[10px]">Patient</p></div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="text-xl font-bold"><span className="text-slate-800 dark:text-white">Medi</span><span className="text-primary">Book</span></Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Welcome Back</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Sign in to your MediBook account</p>

          {/* Role Tabs */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 mb-6">
            {(["user", "doctor", "admin"] as RoleTab[]).map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2 rounded-md text-xs font-semibold capitalize transition-colors ${role === r ? "bg-white dark:bg-slate-700 text-primary shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>{r} Login</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full h-12 pl-11 pr-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full h-12 pl-11 pr-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" /> Remember me</label>
              <Link to="/forgot-password" className="text-primary hover:text-primary-light font-medium text-xs">Forgot Password?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-slate-50 dark:bg-slate-900 px-3 text-slate-400">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="h-11 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"><svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Google</button>
            <button className="h-11 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"><Apple className="w-4 h-4" /> Apple</button>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">Don&apos;t have an account? <Link to="/register" className="text-primary font-semibold hover:text-primary-light">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}
