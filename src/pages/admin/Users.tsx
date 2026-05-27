import { useState } from "react";
import { Search, Eye, Pencil, Ban } from "lucide-react";

const users = [
  { name: "John Doe", email: "john@example.com", role: "Patient", status: "Active", joined: "Jan 10, 2025", lastActive: "2 hours ago" },
  { name: "Sarah Mitchell", email: "sarah@email.com", role: "Patient", status: "Active", joined: "Dec 15, 2024", lastActive: "5 min ago" },
  { name: "Dr. James Wilson", email: "dr.wilson@medibook.com", role: "Doctor", status: "Active", joined: "Nov 20, 2024", lastActive: "1 hour ago" },
  { name: "Dr. Sarah Chen", email: "dr.chen@medibook.com", role: "Doctor", status: "Active", joined: "Oct 5, 2024", lastActive: "30 min ago" },
  { name: "Admin User", email: "admin@medibook.com", role: "Admin", status: "Active", joined: "Sep 1, 2024", lastActive: "Just now" },
  { name: "Michael Torres", email: "michael@email.com", role: "Patient", status: "Inactive", joined: "Aug 12, 2024", lastActive: "3 days ago" },
  { name: "Dr. Emily Johnson", email: "dr.johnson@medibook.com", role: "Doctor", status: "Pending", joined: "Jan 18, 2025", lastActive: "1 day ago" },
  { name: "Lisa Anderson", email: "lisa@email.com", role: "Patient", status: "Active", joined: "Jul 22, 2024", lastActive: "4 hours ago" },
];

const roleColors: Record<string, string> = { Patient: "bg-slate-100 text-slate-600", Doctor: "bg-primary/10 text-primary", Admin: "bg-amber-500/10 text-amber-600" };
const statusColors: Record<string, string> = { Active: "bg-emerald-500/10 text-emerald-600", Inactive: "bg-slate-100 text-slate-500", Pending: "bg-amber-500/10 text-amber-600", Suspended: "bg-rose-500/10 text-rose-600" };

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selected, setSelected] = useState<number[]>([]);
  const filtered = users.filter((u) => (roleFilter === "All" || u.role === roleFilter) && (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())));

  const toggleSelect = (i: number) => setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map((_, i) => i));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary dark:text-white" /></div>
        <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 overflow-x-auto">
          {["All", "Patient", "Doctor", "Admin"].map((r) => (<button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${roleFilter === r ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400"}`}>{r}</button>))}
        </div>
      </div>

      {selected.length > 0 && (<div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20"><span className="text-sm text-primary font-medium">{selected.length} selected</span><button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs">Activate</button><button className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs">Suspend</button><button className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs">Delete</button></div>)}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="hidden md:grid grid-cols-[40px_1fr_150px_100px_100px_120px_100px_140px] gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
          <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
          <span>User</span><span>Email</span><span>Role</span><span>Status</span><span>Joined</span><span>Last Active</span><span>Actions</span>
        </div>
        {filtered.map((u, i) => (
          <div key={i} className="grid md:grid-cols-[40px_1fr_150px_100px_100px_120px_100px_140px] gap-4 p-4 border-t border-slate-100 dark:border-slate-700 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30">
            <input type="checkbox" checked={selected.includes(i)} onChange={() => toggleSelect(i)} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
            <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-sm font-bold">{u.name[0]}</span></div><span className="text-sm font-medium text-slate-700 dark:text-slate-200">{u.name}</span></div>
            <span className="text-xs text-slate-500 truncate">{u.email}</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[u.role]}`}>{u.role}</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[u.status]}`}>{u.status}</span>
            <span className="text-xs text-slate-500">{u.joined}</span>
            <span className="text-xs text-slate-500">{u.lastActive}</span>
            <div className="flex gap-1"><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Pencil className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><Ban className="w-3.5 h-3.5" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
