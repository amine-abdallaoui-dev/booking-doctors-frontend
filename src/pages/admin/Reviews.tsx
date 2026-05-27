import { useState } from "react";
import { Star, Eye, CheckCircle, XCircle, Trash2 } from "lucide-react";

const reviews = [
  { patient: "Margaret T.", doctor: "Dr. James Wilson", rating: 5, text: "Dr. Wilson is exceptional. He took the time to explain my condition in detail.", date: "Jan 15, 2025", status: "Published" },
  { patient: "David K.", doctor: "Dr. Sarah Chen", rating: 5, text: "The best dermatologist I've ever visited. Highly recommend!", date: "Jan 12, 2025", status: "Published" },
  { patient: "Anonymous", doctor: "Dr. Michael Roberts", rating: 2, text: "Wait time was over an hour. Very frustrating experience.", date: "Jan 10, 2025", status: "Flagged" },
  { patient: "Jennifer M.", doctor: "Dr. Emily Johnson", rating: 4, text: "Great doctor, professional staff. Would visit again.", date: "Jan 8, 2025", status: "Published" },
  { patient: "Robert W.", doctor: "Dr. James Wilson", rating: 1, text: "Rude staff and doctor seemed rushed.", date: "Jan 5, 2025", status: "Flagged" },
  { patient: "Lisa A.", doctor: "Dr. Raj Patel", rating: 5, text: "Excellent care and very thorough examination.", date: "Jan 3, 2025", status: "Published" },
];

const statusColors: Record<string, string> = { Published: "bg-emerald-500/10 text-emerald-600", Flagged: "bg-amber-500/10 text-amber-600", Removed: "bg-rose-500/10 text-rose-600" };

export default function AdminReviews() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? reviews : reviews.filter((r) => r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 overflow-x-auto">
          {["All", "Published", "Flagged", "Removed"].map((f) => (<button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400"}`}>{f}</button>))}
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_1fr_80px_1fr_100px_100px_140px] gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase"><span>Patient</span><span>Doctor</span><span>Rating</span><span>Review</span><span>Date</span><span>Status</span><span>Actions</span></div>
        {filtered.map((r, i) => (
          <div key={i} className="grid md:grid-cols-[1fr_1fr_80px_1fr_100px_100px_140px] gap-4 p-4 border-t border-slate-100 dark:border-slate-700 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30">
            <span className="text-sm text-slate-700 dark:text-slate-200">{r.patient}</span>
            <span className="text-sm text-slate-700 dark:text-slate-200">{r.doctor}</span>
            <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /><span className="text-sm text-slate-600">{r.rating}</span></span>
            <span className="text-xs text-slate-500 truncate">{r.text}</span>
            <span className="text-xs text-slate-500">{r.date}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[r.status]}`}>{r.status}</span>
            <div className="flex gap-1"><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50"><CheckCircle className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><XCircle className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Trash2 className="w-3.5 h-3.5" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
