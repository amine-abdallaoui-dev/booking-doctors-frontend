import { useState } from "react";
import { Pencil, Trash2, Plus, Stethoscope } from "lucide-react";

const initialSpecialties = [
  { name: "Cardiology", count: 65, desc: "Diagnosis and treatment of heart conditions", icon: "Heart", active: true },
  { name: "Dermatology", count: 48, desc: "Skin, hair, and nail conditions", icon: "Sparkles", active: true },
  { name: "Neurology", count: 42, desc: "Brain, spine, and nervous system disorders", icon: "Brain", active: true },
  { name: "Orthopedics", count: 55, desc: "Bones, joints, and musculoskeletal system", icon: "Bone", active: true },
  { name: "Pediatrics", count: 70, desc: "Medical care for infants, children, and adolescents", icon: "Baby", active: true },
  { name: "ENT", count: 38, desc: "Ear, nose, and throat conditions", icon: "Ear", active: true },
  { name: "Ophthalmology", count: 45, desc: "Eye and vision care", icon: "Eye", active: true },
  { name: "Dentistry", count: 52, desc: "Oral health and dental care", icon: "Smile", active: true },
];

export default function AdminSpecialties() {
  const [specs, setSpecs] = useState(initialSpecialties);
  const toggleActive = (i: number) => setSpecs((prev) => prev.map((s, idx) => idx === i ? { ...s, active: !s.active } : s));

  return (
    <div className="space-y-6">
      <div className="flex justify-end"><button className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center gap-2 hover:bg-primary-light transition-colors"><Plus className="w-4 h-4" /> Add Specialty</button></div>
      <div className="grid sm:grid-cols-2 gap-4">
        {specs.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center"><Stethoscope className="w-7 h-7 text-primary" /></div>
              <div className="flex gap-1"><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Pencil className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
            <h4 className="font-semibold text-slate-800 dark:text-white">{s.name}</h4>
            <p className="text-xs text-slate-400 mt-1 mb-3">{s.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{s.count} Doctors</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={s.active} onChange={() => toggleActive(i)} className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-600 peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
