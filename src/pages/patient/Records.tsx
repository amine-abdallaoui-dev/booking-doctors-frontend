import { useState } from "react";
import { FileText, ChevronDown, UploadCloud } from "lucide-react";

const records = [
  { id: 1, name: "Prescription_Amoxicillin.pdf", doctor: "Dr. James Wilson", date: "Jan 15, 2025", type: "Prescription", desc: "7-day course of Amoxicillin 500mg for sinus infection." },
  { id: 2, name: "Blood_Test_Results.pdf", doctor: "Dr. Sarah Chen", date: "Jan 10, 2025", type: "Lab Result", desc: "Complete blood count, lipid panel, and metabolic panel results within normal ranges." },
  { id: 3, name: "Annual_Physical_Summary.pdf", doctor: "Dr. James Wilson", date: "Dec 28, 2024", type: "Report", desc: "Annual physical examination summary. Overall health status: Good." },
  { id: 4, name: "Chest_XRay_Report.pdf", doctor: "Dr. Robert Martinez", date: "Dec 15, 2024", type: "Imaging", desc: "Chest X-ray shows clear lungs with no abnormalities detected." },
  { id: 5, name: "EKG_Results.pdf", doctor: "Dr. James Wilson", date: "Dec 10, 2024", type: "Lab Result", desc: "Electrocardiogram shows normal sinus rhythm. No arrhythmias detected." },
];

const typeColors: Record<string, string> = {
  Prescription: "bg-primary/10 text-primary",
  "Lab Result": "bg-emerald-500/10 text-emerald-600",
  Report: "bg-amber-500/10 text-amber-600",
  Imaging: "bg-purple-500/10 text-purple-600",
};

export default function PatientRecords() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const filtered = filter === "All" ? records : records.filter((r) => r.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 overflow-x-auto">
          {["All", "Prescription", "Lab Result", "Report", "Imaging"].map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${filter === t ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400"}`}>{t}</button>
          ))}
        </div>
        <button onClick={() => setShowUpload(!showUpload)} className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors flex items-center gap-2"><UploadCloud className="w-4 h-4" /> Upload New</button>
      </div>

      {showUpload && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 border-dashed">
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-8 text-center">
            <UploadCloud className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Drag & drop files here or click to browse</p>
            <p className="text-xs text-slate-400">PDF, JPG, PNG up to 10MB</p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {filtered.map((r) => (
          <div key={r.id} className="border-t border-slate-100 dark:border-slate-700 first:border-0">
            <button onClick={() => setExpanded(expanded === r.id ? null : r.id)} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors text-left">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="min-w-0"><p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{r.name}</p><p className="text-xs text-slate-400">{r.doctor}</p></div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-slate-400 hidden sm:block">{r.date}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${typeColors[r.type]}`}>{r.type}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expanded === r.id ? "rotate-180" : ""}`} />
              </div>
            </button>
            {expanded === r.id && (
              <div className="px-4 pb-4 pl-12">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{r.desc}</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium">Download PDF</button>
                  <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400">Share</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
