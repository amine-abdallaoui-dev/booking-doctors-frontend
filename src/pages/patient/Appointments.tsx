import { useState } from "react";
import { Calendar, Clock, Video, MapPin, X, MessageSquare } from "lucide-react";

const appointments = [
  { id: 1, doctor: "Dr. James Wilson", specialty: "Cardiology", date: "Jan 20, 2025", time: "10:00 AM", type: "Video", status: "Confirmed", price: 120 },
  { id: 2, doctor: "Dr. Sarah Chen", specialty: "Dermatology", date: "Jan 22, 2025", time: "2:30 PM", type: "In-Person", status: "Confirmed", price: 150 },
  { id: 3, doctor: "Dr. Michael Roberts", specialty: "Neurology", date: "Jan 15, 2025", time: "9:00 AM", type: "Video", status: "Completed", price: 170 },
  { id: 4, doctor: "Dr. Emily Johnson", specialty: "Orthopedics", date: "Jan 10, 2025", time: "11:00 AM", type: "In-Person", status: "Completed", price: 180 },
  { id: 5, doctor: "Dr. Lisa Anderson", specialty: "Pediatrics", date: "Dec 28, 2024", time: "3:00 PM", type: "Video", status: "Cancelled", price: 110 },
];

const statusColors: Record<string, string> = {
  Confirmed: "bg-emerald-500/10 text-emerald-600",
  Completed: "bg-primary/10 text-primary",
  Cancelled: "bg-rose-500/10 text-rose-600",
  Pending: "bg-amber-500/10 text-amber-600",
};

export default function PatientAppointments() {
  const [tab, setTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const filtered = appointments.filter((a) => tab === "upcoming" ? a.status === "Confirmed" : tab === "past" ? a.status === "Completed" : a.status === "Cancelled");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1">
          {(["upcoming", "past", "cancelled"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${tab === t ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_120px_100px_100px_140px] gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <span>Doctor</span><span>Date</span><span>Type</span><span>Status</span><span>Actions</span>
        </div>
        {filtered.map((apt) => (
          <div key={apt.id} className="grid md:grid-cols-[1fr_120px_100px_100px_140px] gap-4 p-4 border-t border-slate-100 dark:border-slate-700 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-sm font-bold">{apt.doctor.split(" ").pop()?.[0]}</span></div>
              <div><p className="text-sm font-semibold text-slate-800 dark:text-white">{apt.doctor}</p><p className="text-xs text-primary">{apt.specialty}</p></div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300"><p>{apt.date}</p><p className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</p></div>
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${apt.type === "Video" ? "text-primary" : "text-slate-500"}`}>{apt.type === "Video" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}{apt.type}</span>
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>{apt.status}</span>
            <div className="flex gap-2">
              {tab === "upcoming" && <><button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100">Reschedule</button><button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><X className="w-4 h-4" /></button></>}
              {tab === "past" && <><button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium">Review</button><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><MessageSquare className="w-4 h-4" /></button></>}
              {tab === "cancelled" && <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400">Rebook</button>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-12 text-center"><Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500 dark:text-slate-400 font-medium">No {tab} appointments</p></div>
        )}
      </div>
    </div>
  );
}
