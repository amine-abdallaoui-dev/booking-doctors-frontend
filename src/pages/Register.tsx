import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Stethoscope, ArrowRight, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

type AccountType = "user" | "doctor" | null;

export default function Register() {
  const { register, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      addToast("error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      addToast("error", "Passwords do not match");
      return;
    }
    if (!agreed) {
      addToast("error", "Please agree to the terms");
      return;
    }
    setLoading(true);
    const success = await register(name, email, password, accountType || "user");
    setLoading(false);
    if (success) {
      addToast("success", "Account created successfully!");
    }
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
      <div className="hidden lg:flex lg:w-[45%] gradient-primary flex-col justify-between p-12">
        <Link to="/" className="text-xl font-bold text-white"><span>Medi</span><span className="text-white/80">Book</span></Link>
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Health, Simplified</h2>
          <p className="text-white/80 leading-relaxed max-w-sm">Join thousands of patients and doctors on the most trusted healthcare booking platform.</p>
        </div>
        <div className="glassmorphism rounded-xl p-4 max-w-sm">
          <p className="text-white/80 text-sm italic mb-3">"I found my specialist in under 5 minutes. The whole experience was seamless from booking to consultation."</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><span className="text-white text-xs font-bold">M</span></div>
            <div><p className="text-white text-xs font-semibold">Michael Torres</p><p className="text-white/60 text-[10px]">Patient since 2024</p></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Link to="/" className="text-xl font-bold"><span className="text-slate-800 dark:text-white">Medi</span><span className="text-primary">Book</span></Link></div>

          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Create Account</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Join MediBook to book appointments and manage your healthcare</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[{ type: "user" as const, icon: User, title: "I'm a Patient", desc: "Book appointments, manage health records, and connect with doctors" }, { type: "doctor" as const, icon: Stethoscope, title: "I'm a Doctor", desc: "Manage appointments, grow your practice, and connect with patients" }].map((opt) => (
                  <button key={opt.type} onClick={() => setAccountType(opt.type)} className={`p-5 rounded-xl border-2 text-left transition-all ${accountType === opt.type ? "border-primary bg-teal-50 dark:bg-teal-900/20" : "border-slate-200 dark:border-slate-700 hover:border-primary/30"}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${accountType === opt.type ? "bg-primary text-white" : "bg-teal-50 dark:bg-teal-900/20 text-primary"}`}><opt.icon className="w-5 h-5" /></div>
                    <h5 className="font-semibold text-slate-800 dark:text-white text-sm">{opt.title}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => accountType && setStep(2)} disabled={!accountType} className={`w-full h-12 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${accountType ? "bg-primary hover:bg-primary-light" : "bg-slate-200 dark:bg-slate-700 cursor-not-allowed"}`}>
                Continue <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">Already have an account? <Link to="/login" className="text-primary font-semibold">Sign In</Link></p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600"><ArrowLeft className="w-5 h-5" /></button>
                <span className="text-xs text-slate-400">Step 2 of 2</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Account Details</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Complete your registration as a {accountType}</p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mb-6"><div className="bg-primary h-1.5 rounded-full w-1/2" /></div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" /><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full h-12 pl-11 pr-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary dark:text-white" /></div>
                <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full h-12 pl-11 pr-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary dark:text-white" /></div>
                <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" /><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" className="w-full h-12 pl-11 pr-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary dark:text-white" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}</button></div>
                <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" /><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="w-full h-12 pl-11 pr-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary dark:text-white" /></div>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" /><span className="text-xs text-slate-500 dark:text-slate-400">I agree to the Terms of Service and Privacy Policy</span></label>
                <button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Create Account"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
