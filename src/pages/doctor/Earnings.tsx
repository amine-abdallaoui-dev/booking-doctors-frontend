import { ArrowUpRight, Download } from "lucide-react";

const transactions = [
  { date: "Jan 20, 2025", patient: "Margaret Thompson", type: "Video", amount: 120, status: "Paid" },
  { date: "Jan 18, 2025", patient: "David Kim", type: "In-Person", amount: 150, status: "Paid" },
  { date: "Jan 15, 2025", patient: "Jennifer Martinez", type: "Video", amount: 120, status: "Paid" },
  { date: "Jan 10, 2025", patient: "Robert Williams", type: "In-Person", amount: 150, status: "Pending" },
  { date: "Jan 8, 2025", patient: "Lisa Anderson", type: "Video", amount: 120, status: "Paid" },
  { date: "Jan 5, 2025", patient: "Sarah Mitchell", type: "In-Person", amount: 150, status: "Refunded" },
];

const statusColors: Record<string, string> = { Paid: "bg-emerald-500/10 text-emerald-600", Pending: "bg-amber-500/10 text-amber-600", Refunded: "bg-rose-500/10 text-rose-600" };

export default function DoctorEarnings() {
  const monthlyData = [2100, 2400, 2800, 2600, 3100, 2900, 3500, 3200, 3800, 3600, 3400, 3240];
  const maxVal = Math.max(...monthlyData);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ label: "This Month", value: "$3,240", trend: "+15%" }, { label: "This Year", value: "$28,500", trend: "+22%" }, { label: "Consultations", value: "156", sub: "This month: 24" }, { label: "Avg Per Visit", value: "$135", sub: "Last 30 days" }].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <p className="text-xs text-slate-400 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p>
            {s.trend ? <span className="text-[10px] text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 mt-1 inline-flex"><ArrowUpRight className="w-3 h-3" />{s.trend}</span> : <p className="text-xs text-slate-400 mt-1">{s.sub}</p>}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6"><h4 className="font-semibold text-slate-800 dark:text-white">Earnings Overview</h4><select className="h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white"><option>This Year</option><option>Last Year</option></select></div>
        <div className="flex items-end gap-2 h-48">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1"><div className="w-full bg-teal-50 dark:bg-teal-900/20 rounded-t-lg relative overflow-hidden" style={{ height: `${(monthlyData[i] / maxVal) * 100}%` }}><div className="absolute inset-0 bg-primary rounded-t-lg opacity-80" /></div><span className="text-[10px] text-slate-400">{m}</span></div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4"><h4 className="font-semibold text-slate-800 dark:text-white">Recent Transactions</h4><button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-700"><Download className="w-3.5 h-3.5" /> Export CSV</button></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-slate-400 uppercase"><th className="text-left pb-3 font-medium">Date</th><th className="text-left pb-3 font-medium">Patient</th><th className="text-left pb-3 font-medium">Type</th><th className="text-left pb-3 font-medium">Amount</th><th className="text-left pb-3 font-medium">Status</th></tr></thead>
            <tbody>{transactions.map((t, i) => (<tr key={i} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30"><td className="py-3 text-slate-500">{t.date}</td><td className="py-3 font-medium text-slate-700 dark:text-slate-200">{t.patient}</td><td className="py-3 text-slate-500">{t.type}</td><td className="py-3 font-semibold text-slate-800 dark:text-white">${t.amount}</td><td className="py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[t.status]}`}>{t.status}</span></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
