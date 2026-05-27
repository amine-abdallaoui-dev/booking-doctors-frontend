import { useState } from "react";
import { Search, Eye, CheckCircle, XCircle, Star } from "lucide-react";
import { doctors } from "@/data/doctors";

const statusColors: Record<string, string> = { Active: "bg-emerald-500/10 text-emerald-600", Pending: "bg-amber-500/10 text-amber-600", Suspended: "bg-rose-500/10 text-rose-600" };

export default function AdminDoctors() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "pending">("all");
  const filtered = doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search doctors..." className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary dark:text-white" /></div>
        <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1">
          {(["all", "pending"] as const).map((t) => (<button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${tab === t ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400"}`}>{t} {t === "pending" && <span className="ml-1 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full">3</span>}</button>))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_120px_150px_80px_80px_100px_140px] gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase"><span>Doctor</span><span>License</span><span>Location</span><span>Rating</span><span>Patients</span><span>Status</span><span>Actions</span></div>
        {filtered.map((d) => (
          <div key={d.id} className="grid md:grid-cols-[1fr_120px_150px_80px_80px_100px_140px] gap-4 p-4 border-t border-slate-100 dark:border-slate-700 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30">
            <div className="flex items-center gap-3"><img src={d.image} alt={d.name} className="w-10 h-10 rounded-xl object-cover" /><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{d.name}</p><p className="text-xs text-primary">{d.specialty}</p></div></div>
            <span className="text-xs text-slate-500">NY-{100000 + d.id}</span>
            <span className="text-xs text-slate-500">{d.location}</span>
            <span className="text-xs text-slate-600 flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{d.rating}</span>
            <span className="text-xs text-slate-500">{d.reviewCount}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[d.online ? "Active" : "Pending"]}`}>{d.online ? "Active" : "Pending"}</span>
            <div className="flex gap-1"><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50"><CheckCircle className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><XCircle className="w-3.5 h-3.5" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
