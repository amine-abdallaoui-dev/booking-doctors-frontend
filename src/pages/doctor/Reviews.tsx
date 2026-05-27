import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";

const reviews = [
  { name: "Margaret T.", rating: 5, date: "2 weeks ago", text: "Dr. Wilson is exceptional. He took the time to explain my condition in detail and made me feel at ease.", tag: "Heart Checkup", reply: "" },
  { name: "David K.", rating: 5, date: "1 month ago", text: "The best cardiologist I've ever visited. Thorough examination, clear communication.", tag: "Hypertension", reply: "Thank you for your kind words, David. It was a pleasure treating you." },
  { name: "Jennifer M.", rating: 4, date: "2 months ago", text: "Great doctor with excellent credentials. Wait time was a bit long but worth it.", tag: "Cholesterol", reply: "" },
  { name: "Robert W.", rating: 5, date: "3 months ago", text: "After my heart attack, Dr. Wilson guided me through recovery with patience and expertise.", tag: "Post-Surgery", reply: "" },
];

export default function DoctorReviews() {
  const [filter, setFilter] = useState("All");
  const avgRating = 4.8;
  const total = 124;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col sm:flex-row gap-8 items-center">
        <div className="text-center"><span className="text-5xl font-bold text-slate-800 dark:text-white">{avgRating}</span>
          <div className="flex gap-0.5 justify-center mt-2">{[1,2,3,4,5].map((i) => <Star key={i} className={`w-5 h-5 ${i <= Math.round(avgRating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />)}</div>
          <p className="text-xs text-slate-400 mt-1">{total} total reviews</p>
        </div>
        <div className="flex-1 w-full space-y-1.5">
          {[5,4,3,2,1].map((star) => (
            <div key={star} className="flex items-center gap-2"><span className="text-xs text-slate-400 w-8">{star} star</span><div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-amber-400 rounded-full" style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : 1}%` }} /></div></div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-sm font-bold">{r.name[0]}</span></div><div><p className="text-sm font-semibold text-slate-800 dark:text-white">{r.name}</p><p className="text-xs text-slate-400">{r.date}</p></div></div>
              <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <Star key={s} className={`w-4 h-4 ${s <= r.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />)}</div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{r.text}</p>
            <span className="inline-block px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-900/20 text-primary text-xs mb-3">{r.tag}</span>
            {r.reply ? (
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 mt-3"><p className="text-xs font-semibold text-primary mb-1">Your Response</p><p className="text-sm text-slate-600 dark:text-slate-300">{r.reply}</p></div>
            ) : (
              <button className="mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-700"><MessageSquare className="w-3.5 h-3.5" /> Reply</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
