import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

export default function ForgotPassword() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { addToast("error", "Please enter your email"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    addToast("success", "Reset link sent to your email");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <div className="hidden lg:flex lg:w-[45%] gradient-primary flex-col justify-between p-12">
        <Link to="/" className="text-xl font-bold text-white"><span>Medi</span><span className="text-white/80">Book</span></Link>
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Health, Simplified</h2>
          <p className="text-white/80 leading-relaxed max-w-sm">Join thousands of patients and doctors on the most trusted healthcare booking platform.</p>
        </div>
        <div className="glassmorphism rounded-xl p-4 max-w-sm">
          <p className="text-white/80 text-sm italic mb-3">"The easiest way to book doctor appointments. Saved me hours of calling around."</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><span className="text-white text-xs font-bold">S</span></div>
            <div><p className="text-white text-xs font-semibold">Sarah Mitchell</p><p className="text-white/60 text-[10px]">Patient</p></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Link to="/" className="text-xl font-bold"><span className="text-slate-800 dark:text-white">Medi</span><span className="text-primary">Book</span></Link></div>

          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Reset Password</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Enter your email address and we&apos;ll send you a link to reset your password.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="w-full h-12 pl-11 pr-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary dark:text-white" /></div>
                <button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-colors flex items-center justify-center disabled:opacity-60">{loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Send Reset Link"}</button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-4"><Mail className="w-8 h-8 text-primary" /></div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Check Your Email</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">We&apos;ve sent a password reset link to</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-white mb-6">{email}</p>
              <button onClick={() => setSubmitted(false)} className="text-sm text-primary hover:text-primary-light font-medium">Didn&apos;t receive it? Resend</button>
            </div>
          )}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6"><Link to="/login" className="inline-flex items-center gap-1 text-primary font-semibold hover:text-primary-light"><ArrowLeft className="w-4 h-4" /> Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
}
