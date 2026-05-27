import { Link } from "react-router-dom";
import { Calendar, CheckCircle, Heart, FileText, Video, Clock, Activity, Droplet, AlertTriangle } from "lucide-react";

const appointments = [
  { id: 1, day: "Jan 20", doctor: "Dr. James Wilson", specialty: "Cardiology", time: "10:00 AM", type: "Video", status: "confirmed", canJoin: true },
  { id: 2, day: "Jan 22", doctor: "Dr. Sarah Chen", specialty: "Dermatology", time: "2:30 PM", type: "In-Person", status: "confirmed" },
  { id: 3, day: "Jan 25", doctor: "Dr. Michael Roberts", specialty: "Neurology", time: "9:00 AM", type: "Video", status: "confirmed" },
];

const records = [
  { name: "Prescription_Amoxicillin.pdf", date: "Jan 15, 2025", type: "Prescription" },
  { name: "Blood_Test_Results.pdf", date: "Jan 10, 2025", type: "Lab Result" },
  { name: "Annual_Physical_Summary.pdf", date: "Dec 28, 2024", type: "Report" },
];

const recommendedDoctors = [
  { name: "Dr. Emily Johnson", specialty: "Orthopedics", image: "/assets/doctor-4.jpg" },
  { name: "Dr. Lisa Anderson", specialty: "Pediatrics", image: "/assets/doctor-6.jpg" },
  { name: "Dr. Raj Patel", specialty: "Neurology", image: "/assets/doctor-5.jpg" },
  { name: "Dr. David Thompson", specialty: "ENT", image: "/assets/doctor-7.jpg" },
];

const typeColors: Record<string, string> = { Prescription: "bg-primary/10 text-primary", "Lab Result": "bg-emerald-500/10 text-emerald-600", Report: "bg-amber-500/10 text-amber-600" };

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h3 className="text-xl font-bold text-white mb-1">Good Morning, John!</h3><p className="text-white/80 text-sm">You have {appointments.length} upcoming appointments this week.</p></div>
        <Link to="/doctors" className="px-5 py-2.5 rounded-xl bg-white text-primary font-semibold text-sm hover:scale-105 transition-transform whitespace-nowrap">Book New Appointment</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ icon: Calendar, label: "Upcoming", value: "3", color: "text-primary" }, { icon: CheckCircle, label: "Completed", value: "12", color: "text-emerald-500" }, { icon: Heart, label: "Favorites", value: "5", color: "text-rose-500" }, { icon: FileText, label: "Records", value: "8", color: "text-amber-500", badge: "New" }].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3"><div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>{s.badge && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{s.badge}</span>}</div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p><p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4"><h4 className="font-semibold text-slate-800 dark:text-white">Upcoming Appointments</h4><Link to="/patient/appointments" className="text-xs text-primary font-medium">View All</Link></div>
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                  <div className="w-14 text-center flex-shrink-0"><p className="text-xs text-primary font-semibold">{apt.day.split(" ")[0]}</p><p className="text-xl font-bold text-slate-800 dark:text-white">{apt.day.split(" ")[1]}</p></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-800 dark:text-white">{apt.doctor}</p><p className="text-xs text-primary">{apt.specialty}</p><p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{apt.time} &middot; <span className="capitalize">{apt.type}</span></p></div>
                  <div className="flex gap-2">
                    {apt.canJoin && <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium"><Video className="w-3 h-3 inline mr-1" />Join</button>}
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">Reschedule</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Records */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4"><h4 className="font-semibold text-slate-800 dark:text-white">Recent Medical Records</h4><Link to="/patient/records" className="text-xs text-primary font-medium">View All</Link></div>
            <div className="space-y-2">
              {records.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3"><FileText className="w-4 h-4 text-primary" /><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{r.name}</p><p className="text-xs text-slate-400">{r.date}</p></div></div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${typeColors[r.type] || ""}`}>{r.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Health Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Health at a Glance</h4>
            <div className="grid grid-cols-2 gap-4">
              {[{ icon: Activity, label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal", statusColor: "text-emerald-500 bg-emerald-50" }, { icon: Activity, label: "BMI", value: "22.4", unit: "", status: "Normal", statusColor: "text-emerald-500 bg-emerald-50" }, { icon: Droplet, label: "Blood Type", value: "O+", unit: "", status: "" }, { icon: AlertTriangle, label: "Allergies", value: "Penicillin", unit: "", status: "Alert", statusColor: "text-rose-500 bg-rose-50" }].map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div className="flex items-center gap-2 mb-2"><h.icon className={`w-4 h-4 ${i === 3 ? "text-rose-500" : "text-primary"}`} /><span className="text-xs text-slate-500 dark:text-slate-400">{h.label}</span></div>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">{h.value} <span className="text-xs font-normal text-slate-400">{h.unit}</span></p>
                  {h.status && <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${h.statusColor}`}>{h.status}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Recommended for You</h4>
            <p className="text-xs text-slate-400 mb-4">Based on your visit history</p>
            <div className="grid grid-cols-2 gap-3">
              {recommendedDoctors.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center">
                  <img src={d.image} alt={d.name} className="w-12 h-12 rounded-full object-cover mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{d.name}</p>
                  <p className="text-[10px] text-primary mb-2">{d.specialty}</p>
                  <Link to={`/doctors`} className="text-[10px] px-3 py-1 rounded-lg bg-primary text-white font-medium inline-block">Book</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
