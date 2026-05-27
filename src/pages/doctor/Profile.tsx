import { Upload, Save, Plus } from "lucide-react";

const sections = [
  { title: "Personal Information", fields: [{ label: "Full Name", val: "Dr. James Wilson" }, { label: "Email", val: "dr.wilson@medibook.com" }, { label: "Phone", val: "(212) 241-6500" }, { label: "Date of Birth", val: "1975-03-15", type: "date" }, { label: "Gender", val: "Male" }] },
  { title: "Professional Information", fields: [{ label: "Medical License", val: "NY-123456" }, { label: "License State", val: "New York" }, { label: "NPI Number", val: "1234567890" }, { label: "Specialty", val: "Cardiology" }, { label: "Years of Experience", val: "15" }] },
  { title: "Clinic Information", fields: [{ label: "Hospital/Clinic", val: "Mount Sinai Hospital" }, { label: "Address", val: "1468 Madison Ave" }, { label: "City", val: "New York" }, { label: "Consultation Fee", val: "150" }, { label: "Video Fee", val: "120" }] },
];

export default function DoctorProfilePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-4 mb-6">
          <img src="/assets/doctor-1.jpg" alt="Dr. James Wilson" className="w-20 h-20 rounded-2xl object-cover" />
          <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700"><Upload className="w-4 h-4" /> Change Photo</button>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="mb-8 last:mb-0">
            <h5 className="font-semibold text-slate-800 dark:text-white mb-4">{section.title}</h5>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.fields.map((f) => (
                <div key={f.label}><label className="text-xs font-semibold text-slate-500 mb-1.5 block">{f.label}</label><input type={f.type || "text"} defaultValue={f.val} className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white focus:outline-none focus:border-primary" /></div>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-6">
          <h5 className="font-semibold text-slate-800 dark:text-white mb-3">Services</h5>
          <div className="flex flex-wrap gap-2">{["Coronary Angiography", "Stent Placement", "Cardiac Catheterization", "Echocardiography", "Stress Testing", "Heart Failure Management"].map((s) => (<span key={s} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium">{s} &times;</span>))}<button className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-xs text-slate-400 flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button></div>
        </div>

        <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
      </div>
    </div>
  );
}
