import { useState } from "react";
import { Plus, Clock, Pencil, Trash2 } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const scheduleData: Record<string, { start: string; end: string; type: string }[]> = {
  Mon: [{ start: "09:00 AM", end: "12:00 PM", type: "Both" }, { start: "02:00 PM", end: "05:00 PM", type: "Video" }],
  Tue: [{ start: "09:00 AM", end: "12:00 PM", type: "In-Person" }, { start: "02:00 PM", end: "05:00 PM", type: "Both" }],
  Wed: [{ start: "09:00 AM", end: "01:00 PM", type: "Both" }],
  Thu: [{ start: "09:00 AM", end: "12:00 PM", type: "Video" }, { start: "02:00 PM", end: "04:00 PM", type: "In-Person" }],
  Fri: [{ start: "09:00 AM", end: "12:00 PM", type: "Both" }, { start: "02:00 PM", end: "05:00 PM", type: "Both" }],
  Sat: [{ start: "09:00 AM", end: "01:00 PM", type: "In-Person" }],
  Sun: [],
};

const blockedDates = [
  { range: "Dec 25, 2024 - Jan 2, 2025", reason: "Holiday Vacation" },
];

export default function DoctorSchedule() {
  const [activeDay, setActiveDay] = useState("Mon");
  const slots = scheduleData[activeDay] || [];

  return (
    <div className="space-y-6">
      <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 overflow-x-auto">
        {days.map((d) => (
          <button key={d} onClick={() => setActiveDay(d)} className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeDay === d ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>{d}</button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4"><h4 className="font-semibold text-slate-800 dark:text-white">{activeDay} Schedule</h4><button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Slot</button></div>
        {slots.length > 0 ? (
          <div className="space-y-3">
            {slots.map((slot, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4"><Clock className="w-5 h-5 text-primary" /><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{slot.start} - {slot.end}</span><span className={`text-xs px-2 py-0.5 rounded-full ${slot.type === "Both" ? "bg-primary/10 text-primary" : slot.type === "Video" ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600"}`}>{slot.type}</span><span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Active</span></div>
                <div className="flex gap-2"><button className="p-2 rounded-lg text-slate-400 hover:bg-white dark:hover:bg-slate-600"><Pencil className="w-4 h-4" /></button><button className="p-2 rounded-lg text-rose-400 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></button></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12"><p className="text-slate-400">No scheduled slots for {activeDay}</p></div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Time Off / Blocked Dates</h4>
        {blockedDates.map((b, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{b.range}</p><p className="text-xs text-slate-400">{b.reason}</p></div><button className="p-2 rounded-lg text-rose-400 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></button></div>
        ))}
        <button className="mt-4 px-5 py-2.5 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">+ Add Blocked Dates</button>
      </div>
    </div>
  );
}
