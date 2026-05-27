import { Link } from "react-router-dom";
import { Calendar, Users, Star, DollarSign } from "lucide-react";

const stats = [
  { icon: Calendar, label: "Today's Appointments", value: "5", trend: "+2 vs yesterday" },
  { icon: Users, label: "Total Patients", value: "156", trend: "+12 this month" },
  { icon: Star, label: "Average Rating", value: "4.8", trend: "124 reviews" },
  { icon: DollarSign, label: "This Month's Earnings", value: "$3,240", trend: "+15% vs last month", color: "text-emerald-500" },
];

const todaySchedule = [
  { time: "09:00 AM", patient: "Margaret Thompson", reason: "Heart Checkup", type: "Video", status: "confirmed" },
  { time: "10:00 AM", patient: "David Kim", reason: "Dermatology Follow-up", type: "In-Person", status: "confirmed" },
  { time: "10:30 AM", patient: "", reason: "", type: "", status: "empty" },
  { time: "11:00 AM", patient: "Jennifer Martinez", reason: "Hypertension Review", type: "Video", status: "confirmed" },
  { time: "02:00 PM", patient: "", reason: "", type: "", status: "empty" },
  { time: "02:30 PM", patient: "Robert Williams", reason: "Post-Surgery Check", type: "In-Person", status: "confirmed" },
  { time: "03:00 PM", patient: "", reason: "", type: "", status: "empty" },
  { time: "04:00 PM", patient: "Lisa Anderson", reason: "Cholesterol Consultation", type: "Video", status: "confirmed" },
];

const recentPatients = [
  { name: "Margaret T.", id: "PT-001", lastVisit: "Jan 20, 2025", condition: "Hypertension", status: "Active" },
  { name: "David K.", id: "PT-002", lastVisit: "Jan 18, 2025", condition: "Eczema", status: "Active" },
  { name: "Jennifer M.", id: "PT-003", lastVisit: "Jan 15, 2025", condition: "High Cholesterol", status: "Follow-up" },
  { name: "Robert W.", id: "PT-004", lastVisit: "Jan 10, 2025", condition: "Post-CABG", status: "Recovering" },
];

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div className="gradient-primary rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h3 className="text-xl font-bold text-white mb-1">Welcome back, Dr. Wilson!</h3><p className="text-white/80 text-sm">You have 5 appointments scheduled for today.</p></div>
        <Link to="/doctor/schedule" className="px-5 py-2.5 rounded-xl bg-white text-primary font-semibold text-sm hover:scale-105 transition-transform whitespace-nowrap">View Schedule</Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-primary"><s.icon className="w-5 h-5" /></div><span className="text-[10px] text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{s.trend}</span></div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4"><h4 className="font-semibold text-slate-800 dark:text-white">Today's Schedule</h4><span className="text-xs text-slate-400">Monday, Jan 20</span></div>
            <div className="relative pl-4 space-y-0">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
              {todaySchedule.map((slot, i) => (
                <div key={i} className="relative flex gap-4 py-3">
                  <div className="absolute -left-[5px] top-5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 z-10" style={{ background: slot.status === "confirmed" ? "#0F766E" : slot.status === "empty" ? "#CBD5E1" : "#CBD5E1" }} />
                  <span className="w-16 text-xs text-slate-400 flex-shrink-0 pt-1">{slot.time}</span>
                  {slot.status === "confirmed" ? (
                    <div className="flex-1 p-3 rounded-xl bg-white dark:bg-slate-700 border-l-[3px] border-l-primary shadow-sm">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{slot.patient}</p>
                      <p className="text-xs text-primary">{slot.reason}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${slot.type === "Video" ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300"}`}>{slot.type}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">Confirmed</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-600 text-center">
                      <p className="text-xs text-slate-400">Available</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4"><h4 className="font-semibold text-slate-800 dark:text-white">Recent Patients</h4><Link to="/doctor/patients" className="text-xs text-primary font-medium">View All</Link></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-xs text-slate-400 uppercase"><th className="text-left pb-3 font-medium">Patient</th><th className="text-left pb-3 font-medium">Last Visit</th><th className="text-left pb-3 font-medium">Condition</th><th className="text-left pb-3 font-medium">Status</th></tr></thead>
                <tbody>
                  {recentPatients.map((p, i) => (
                    <tr key={i} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-xs font-bold">{p.name[0]}</span></div><div><p className="font-medium text-slate-700 dark:text-slate-200">{p.name}</p><p className="text-[10px] text-slate-400">{p.id}</p></div></div></td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">{p.lastVisit}</td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">{p.condition}</td>
                      <td className="py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "Active" ? "bg-emerald-50 text-emerald-600" : p.status === "Recovering" ? "bg-primary/10 text-primary" : "bg-amber-50 text-amber-600"}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Performance</h4>
            <div className="space-y-3">
              {[{ day: "Mon", val: 5 }, { day: "Tue", val: 8 }, { day: "Wed", val: 6 }, { day: "Thu", val: 4 }, { day: "Fri", val: 7 }, { day: "Sat", val: 3 }, { day: "Sun", val: 0 }].map((d, i) => (
                <div key={i} className="flex items-center gap-3"><span className="text-xs text-slate-400 w-8">{d.day}</span><div className="flex-1 h-5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(d.val / 8) * 100}%` }} /></div><span className="text-xs text-slate-600 dark:text-slate-300 w-4">{d.val}</span></div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: "Set Availability", href: "/doctor/schedule", primary: true }, { label: "Patient Records", href: "/doctor/patients", primary: false }, { label: "Write Prescription", href: "#", primary: false }, { label: "View Earnings", href: "/doctor/earnings", primary: false }].map((a, i) => (
                <Link key={i} to={a.href} className={`p-3 rounded-xl text-center text-xs font-medium transition-colors ${a.primary ? "bg-primary text-white hover:bg-primary-light" : "border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"}`}>{a.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
