import { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

const appointments = [
  { id: "APT-20250120-001", patient: "John Doe", doctor: "Dr. James Wilson", date: "Jan 20, 2025", time: "10:00 AM", type: "Video", status: "Confirmed", fee: 120 },
  { id: "APT-20250120-002", patient: "Sarah Mitchell", doctor: "Dr. Sarah Chen", date: "Jan 20, 2025", time: "11:30 AM", type: "In-Person", status: "Confirmed", fee: 150 },
  { id: "APT-20250120-003", patient: "Mike Roberts", doctor: "Dr. Raj Patel", date: "Jan 20, 2025", time: "02:00 PM", type: "Video", status: "Pending", fee: 100 },
  { id: "APT-20250119-001", patient: "Lisa Anderson", doctor: "Dr. Emily Johnson", date: "Jan 19, 2025", time: "09:00 AM", type: "In-Person", status: "Completed", fee: 180 },
  { id: "APT-20250119-002", patient: "Tom Harris", doctor: "Dr. Michael Roberts", date: "Jan 19, 2025", time: "03:30 PM", type: "Video", status: "Cancelled", fee: 170 },
  { id: "APT-20250118-001", patient: "Jennifer Martinez", doctor: "Dr. James Wilson", date: "Jan 18, 2025", time: "11:00 AM", type: "In-Person", status: "Completed", fee: 150 },
];

const statusColors: Record<string, string> = { Confirmed: "bg-emerald-500/10 text-emerald-600", Pending: "bg-amber-500/10 text-amber-600", Completed: "bg-primary/10 text-primary", Cancelled: "bg-rose-500/10 text-rose-600", "No-Show": "bg-slate-100 text-slate-500" };

export default function AdminAppointments() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 overflow-x-auto">
          {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((f) => (<button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400"}`}>{f}</button>))}
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="hidden md:grid grid-cols-[120px_1fr_1fr_120px_100px_100px_80px_140px] gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase"><span>ID</span><span>Patient</span><span>Doctor</span><span>Date</span><span>Type</span><span>Status</span><span>Fee</span><span>Actions</span></div>
        {filtered.map((apt) => (
          <div key={apt.id} className="grid md:grid-cols-[120px_1fr_1fr_120px_100px_100px_80px_140px] gap-4 p-4 border-t border-slate-100 dark:border-slate-700 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30">
            <span className="text-xs font-mono text-slate-400">{apt.id}</span>
            <span className="text-sm text-slate-700 dark:text-slate-200">{apt.patient}</span>
            <span className="text-sm text-slate-700 dark:text-slate-200">{apt.doctor}</span>
            <span className="text-xs text-slate-500">{apt.date}<br/>{apt.time}</span>
            <span className="text-xs text-slate-500">{apt.type}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[apt.status]}`}>{apt.status}</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">${apt.fee}</span>
            <div className="flex gap-1"><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50"><CheckCircle className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><XCircle className="w-3.5 h-3.5" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
