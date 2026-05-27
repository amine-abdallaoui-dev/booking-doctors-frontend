import { useState } from "react";
import { Video, MapPin, Clock, X } from "lucide-react";

const appointments = [
  { id: 1, patient: "Margaret Thompson", date: "Jan 20, 2025", time: "09:00 AM", type: "Video", reason: "Heart Checkup", status: "Confirmed" },
  { id: 2, patient: "David Kim", date: "Jan 20, 2025", time: "10:00 AM", type: "In-Person", reason: "Follow-up", status: "Confirmed" },
  { id: 3, patient: "Jennifer Martinez", date: "Jan 20, 2025", time: "11:00 AM", type: "Video", reason: "Hypertension Review", status: "Confirmed" },
  { id: 4, patient: "Robert Williams", date: "Jan 20, 2025", time: "02:30 PM", type: "In-Person", reason: "Post-Surgery Check", status: "Confirmed" },
  { id: 5, patient: "Lisa Anderson", date: "Jan 20, 2025", time: "04:00 PM", type: "Video", reason: "Cholesterol", status: "Pending" },
  { id: 6, patient: "Sarah Mitchell", date: "Jan 21, 2025", time: "09:30 AM", type: "In-Person", reason: "Annual Checkup", status: "Confirmed" },
  { id: 7, patient: "Tom Harris", date: "Jan 21, 2025", time: "11:00 AM", type: "Video", reason: "Prescription Refill", status: "Cancelled" },
];

const statusColors: Record<string, string> = { Confirmed: "bg-emerald-500/10 text-emerald-600", Pending: "bg-amber-500/10 text-amber-600", Cancelled: "bg-rose-500/10 text-rose-600", Completed: "bg-primary/10 text-primary" };

export default function DoctorAppointments() {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1">
          {(["calendar", "list"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${view === v ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400"}`}>{v}</button>
          ))}
        </div>
        <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 overflow-x-auto">
          {["All", "Confirmed", "Pending", "Cancelled", "Completed"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${filter === f ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_120px_100px_100px_100px_140px] gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
          <span>Patient</span><span>Date</span><span>Time</span><span>Type</span><span>Status</span><span>Actions</span>
        </div>
        {filtered.map((apt) => (
          <div key={apt.id} className="grid md:grid-cols-[1fr_120px_100px_100px_100px_140px] gap-4 p-4 border-t border-slate-100 dark:border-slate-700 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30">
            <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-sm font-bold">{apt.patient[0]}</span></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{apt.patient}</p><p className="text-xs text-slate-400">{apt.reason}</p></div></div>
            <span className="text-sm text-slate-500 dark:text-slate-400">{apt.date}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
            <span className={`text-xs flex items-center gap-1 ${apt.type === "Video" ? "text-primary" : "text-slate-500"}`}>{apt.type === "Video" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}{apt.type}</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[apt.status]}`}>{apt.status}</span>
            <div className="flex gap-2">
              {apt.status === "Confirmed" && <><button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs">Start</button><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Clock className="w-3.5 h-3.5" /></button></>}
              <button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
