import { useState } from "react";
import { Search } from "lucide-react";

const patients = [
  { name: "Margaret Thompson", age: 58, gender: "Female", phone: "(555) 101-0001", email: "margaret@email.com", lastVisit: "Jan 20, 2025", condition: "Hypertension", status: "Active" },
  { name: "David Kim", age: 42, gender: "Male", phone: "(555) 101-0002", email: "david@email.com", lastVisit: "Jan 18, 2025", condition: "Eczema", status: "Active" },
  { name: "Jennifer Martinez", age: 35, gender: "Female", phone: "(555) 101-0003", email: "jennifer@email.com", lastVisit: "Jan 15, 2025", condition: "High Cholesterol", status: "Follow-up" },
  { name: "Robert Williams", age: 67, gender: "Male", phone: "(555) 101-0004", email: "robert@email.com", lastVisit: "Jan 10, 2025", condition: "Post-CABG", status: "Recovering" },
  { name: "Lisa Anderson", age: 45, gender: "Female", phone: "(555) 101-0005", email: "lisa@email.com", lastVisit: "Jan 8, 2025", condition: "Cholesterol", status: "Active" },
  { name: "Sarah Mitchell", age: 29, gender: "Female", phone: "(555) 101-0006", email: "sarah@email.com", lastVisit: "Dec 28, 2024", condition: "Anxiety", status: "Active" },
];

const statusColors: Record<string, string> = { Active: "bg-emerald-500/10 text-emerald-600", "Follow-up": "bg-amber-500/10 text-amber-600", Recovering: "bg-primary/10 text-primary", New: "bg-blue-500/10 text-blue-600" };

export default function DoctorPatients() {
  const [search, setSearch] = useState("");
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patients..." className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary dark:text-white" /></div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_80px_80px_120px_120px_100px_120px] gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase"><span>Patient</span><span>Age</span><span>Gender</span><span>Contact</span><span>Last Visit</span><span>Condition</span><span>Actions</span></div>
        {filtered.map((p, i) => (
          <div key={i} className="grid md:grid-cols-[1fr_80px_80px_120px_120px_100px_120px] gap-4 p-4 border-t border-slate-100 dark:border-slate-700 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30">
            <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-sm font-bold">{p.name[0]}</span></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{p.name}</p></div></div>
            <span className="text-sm text-slate-500">{p.age}</span>
            <span className="text-sm text-slate-500">{p.gender}</span>
            <span className="text-xs text-slate-500">{p.phone}</span>
            <span className="text-sm text-slate-500">{p.lastVisit}</span>
            <span className="text-xs text-slate-500">{p.condition}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
