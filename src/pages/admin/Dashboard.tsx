import { Users, Stethoscope, Calendar, DollarSign, Star, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, label: "Total Users", value: "2,450", trend: "+120 this month", color: "text-blue-500" },
  { icon: Stethoscope, label: "Active Doctors", value: "156", trend: "+8 this week", color: "text-primary" },
  { icon: Calendar, label: "Appointments", value: "3,240", trend: "This month", color: "text-emerald-500" },
  { icon: DollarSign, label: "Revenue", value: "$48,500", trend: "+18% vs last month", color: "text-amber-500" },
  { icon: Star, label: "Platform Rating", value: "4.7", trend: "2,400 reviews", color: "text-purple-500" },
  { icon: TrendingUp, label: "Booking Rate", value: "85%", trend: "+5% this month", color: "text-rose-500" },
];

const recentAppointments = [
  { patient: "John D.", doctor: "Dr. Wilson", date: "Jan 20, 10:00 AM", type: "Video", status: "Confirmed", amount: 120 },
  { patient: "Sarah M.", doctor: "Dr. Chen", date: "Jan 20, 11:30 AM", type: "In-Person", status: "Confirmed", amount: 150 },
  { patient: "Mike R.", doctor: "Dr. Patel", date: "Jan 20, 02:00 PM", type: "Video", status: "Pending", amount: 100 },
  { patient: "Lisa A.", doctor: "Dr. Johnson", date: "Jan 20, 03:00 PM", type: "In-Person", status: "Completed", amount: 180 },
  { patient: "Tom H.", doctor: "Dr. Roberts", date: "Jan 21, 09:00 AM", type: "Video", status: "Confirmed", amount: 170 },
];

const statusColors: Record<string, string> = { Confirmed: "bg-emerald-500/10 text-emerald-600", Pending: "bg-amber-500/10 text-amber-600", Completed: "bg-primary/10 text-primary", Cancelled: "bg-rose-500/10 text-rose-600" };

const topDoctors = [
  { name: "Dr. James Wilson", patients: 45 },
  { name: "Dr. Sarah Chen", patients: 38 },
  { name: "Dr. Emily Johnson", patients: 35 },
  { name: "Dr. Michael Roberts", patients: 32 },
  { name: "Dr. Raj Patel", patients: 28 },
];
const maxPatients = Math.max(...topDoctors.map((d) => d.patients));

const activityLog = [
  { text: "New doctor registered: Dr. Amanda Lee (Dermatologist)", time: "2 hours ago", color: "bg-primary" },
  { text: "Appointment completed: John Doe with Dr. Wilson", time: "3 hours ago", color: "bg-emerald-500" },
  { text: "Payment received: $120 from Sarah Mitchell", time: "4 hours ago", color: "bg-amber-500" },
  { text: "Appointment cancelled: Robert Williams", time: "5 hours ago", color: "bg-rose-500" },
  { text: "New patient registered: Jennifer Martinez", time: "6 hours ago", color: "bg-primary" },
];

export default function AdminDashboard() {
  const revenueData = [32000, 35000, 38000, 42000, 40000, 45000, 48000, 50000, 47000, 52000, 55000, 60000];
  const maxRevenue = Math.max(...revenueData);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
            <div className={`w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center ${s.color} mb-3`}><s.icon className="w-5 h-5" /></div>
            <p className="text-xl font-bold text-slate-800 dark:text-white">{s.value}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6"><h4 className="font-semibold text-slate-800 dark:text-white">Revenue Overview</h4><select className="h-8 px-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs dark:text-white"><option>2025</option></select></div>
          <div className="flex items-end gap-1.5 h-40">
            {revenueData.map((v, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="w-full bg-primary/10 rounded-t-md relative overflow-hidden" style={{ height: `${(v / maxRevenue) * 100}%` }}><div className="absolute inset-0 bg-gradient-to-t from-primary to-primary-light rounded-t-md opacity-80" /></div><span className="text-[8px] text-slate-400">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span></div>))}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Recent Appointments</h4>
          <div className="space-y-3">
            {recentAppointments.map((apt, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-xs font-bold">{apt.patient[0]}</span></div><div><p className="text-xs font-medium text-slate-700 dark:text-slate-200">{apt.patient} <span className="text-slate-400">with</span> {apt.doctor}</p><p className="text-[10px] text-slate-400">{apt.date}</p></div></div>
                <div className="flex items-center gap-2"><span className="text-xs font-semibold text-slate-700 dark:text-slate-200">${apt.amount}</span><span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[apt.status]}`}>{apt.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Top Doctors */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Top Performing Doctors</h4>
          <div className="space-y-3">
            {topDoctors.map((d, i) => (
              <div key={i} className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-primary text-xs font-bold">{d.name.split(" ").pop()?.[0]}</span></div><span className="text-xs text-slate-600 dark:text-slate-300 w-32 flex-shrink-0">{d.name}</span><div className="flex-1 h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(d.patients / maxPatients) * 100}%` }} /></div><span className="text-xs font-semibold text-slate-700 dark:text-slate-200 w-6">{d.patients}</span></div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Recent Activity</h4>
          <div className="relative pl-4 space-y-4">
            <div className="absolute left-[3px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
            {activityLog.map((a, i) => (
              <div key={i} className="relative"><div className={`absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full ${a.color}`} /><p className="text-xs text-slate-600 dark:text-slate-300">{a.text}</p><p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
