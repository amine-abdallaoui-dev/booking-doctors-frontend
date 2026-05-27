import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold gradient-text mb-4">404</div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => window.history.back()} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium flex items-center gap-2 hover:bg-white dark:hover:bg-slate-800 transition-colors"><ArrowLeft className="w-4 h-4" /> Go Back</button>
          <Link to="/" className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold flex items-center gap-2 hover:bg-primary-light transition-colors"><Home className="w-4 h-4" /> Home</Link>
        </div>
      </div>
    </div>
  );
}
