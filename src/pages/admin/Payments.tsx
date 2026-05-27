import { useState } from "react";
import { Download, RotateCcw } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$48,500" },
  { label: "This Month", value: "$5,200" },
  { label: "Pending", value: "$1,200" },
  { label: "Refunds", value: "$450" },
];

const transactions = [
  { id: "TXN-001", date: "Jan 20, 2025", patient: "John Doe", doctor: "Dr. Wilson", amount: 120, fee: 12, payout: 108, status: "Paid" },
  { id: "TXN-002", date: "Jan 20, 2025", patient: "Sarah Mitchell", doctor: "Dr. Chen", amount: 150, fee: 15, payout: 135, status: "Paid" },
  { id: "TXN-003", date: "Jan 19, 2025", patient: "Mike Roberts", doctor: "Dr. Patel", amount: 100, fee: 10, payout: 90, status: "Pending" },
  { id: "TXN-004", date: "Jan 18, 2025", patient: "Lisa Anderson", doctor: "Dr. Johnson", amount: 180, fee: 18, payout: 162, status: "Paid" },
  { id: "TXN-005", date: "Jan 15, 2025", patient: "Tom Harris", doctor: "Dr. Wilson", amount: 120, fee: 12, payout: 108, status: "Refunded" },
  { id: "TXN-006", date: "Jan 10, 2025", patient: "Jennifer Martinez", doctor: "Dr. Roberts", amount: 170, fee: 17, payout: 153, status: "Paid" },
];

const statusColors: Record<string, string> = { Paid: "bg-emerald-500/10 text-emerald-600", Pending: "bg-amber-500/10 text-amber-600", Refunded: "bg-rose-500/10 text-rose-600", Failed: "bg-slate-100 text-slate-500" };

export default function AdminPayments() {
  const [showRefund, setShowRefund] = useState<number | null>(null);
  const revenueData = [32000, 35000, 38000, 42000, 40000, 45000, 48000, 50000, 47000, 52000, 55000, 60000];
  const maxRevenue = Math.max(...revenueData);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (<div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"><p className="text-xs text-slate-400 mb-1">{s.label}</p><p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p></div>))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6"><h4 className="font-semibold text-slate-800 dark:text-white">Revenue Overview</h4><select className="h-8 px-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs dark:text-white"><option>This Year</option></select></div>
        <div className="flex items-end gap-1.5 h-40">
          {revenueData.map((v, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t-md relative overflow-hidden" style={{ height: `${(v / maxRevenue) * 100}%` }}><div className="absolute inset-0 bg-gradient-to-t from-primary to-primary-light rounded-t-md opacity-80" /></div><span className="text-[8px] text-slate-400">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span></div>))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4"><h4 className="font-semibold text-slate-800 dark:text-white">Transactions</h4><button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 hover:bg-slate-50"><Download className="w-3.5 h-3.5" /> Export</button></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm"><thead><tr className="text-xs text-slate-400 uppercase"><th className="text-left pb-3 font-medium">ID</th><th className="text-left pb-3 font-medium">Date</th><th className="text-left pb-3 font-medium">Patient</th><th className="text-left pb-3 font-medium">Doctor</th><th className="text-left pb-3 font-medium">Amount</th><th className="text-left pb-3 font-medium">Fee</th><th className="text-left pb-3 font-medium">Payout</th><th className="text-left pb-3 font-medium">Status</th><th className="text-left pb-3 font-medium">Actions</th></tr></thead>
          <tbody>{transactions.map((t, i) => (<tr key={i} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30"><td className="py-3 text-xs font-mono text-slate-400">{t.id}</td><td className="py-3 text-xs text-slate-500">{t.date}</td><td className="py-3 text-slate-700 dark:text-slate-200">{t.patient}</td><td className="py-3 text-slate-700 dark:text-slate-200">{t.doctor}</td><td className="py-3 font-semibold">${t.amount}</td><td className="py-3 text-slate-500">${t.fee}</td><td className="py-3 text-primary">${t.payout}</td><td className="py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[t.status]}`}>{t.status}</span></td><td className="py-3">{t.status !== "Refunded" && <button onClick={() => setShowRefund(showRefund === i ? null : i)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><RotateCcw className="w-3.5 h-3.5" /></button>}</td></tr>))}</tbody></table>
        </div>
      </div>
    </div>
  );
}
