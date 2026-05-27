import { useState } from "react";
import { Upload, Save } from "lucide-react";

const tabs = ["Personal Info", "Health Profile", "Security", "Notifications", "Insurance"];

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState("Personal Info");

  return (
    <div className="grid lg:grid-cols-[200px_1fr] gap-6">
      {/* Tabs */}
      <div className="flex lg:flex-col gap-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 h-fit overflow-x-auto">
        {tabs.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors text-left ${activeTab === t ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"}`}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        {activeTab === "Personal Info" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-2xl font-bold">J</span></div>
              <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700"><Upload className="w-4 h-4" /> Change Photo</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[{ label: "Full Name", val: "John Doe" }, { label: "Email", val: "john@example.com", disabled: true }, { label: "Phone", val: "+1 (555) 123-4567" }, { label: "Date of Birth", val: "1985-01-15", type: "date" }, { label: "Address", val: "123 Main Street" }, { label: "City", val: "New York" }].map((f) => (
                <div key={f.label}><label className="text-xs font-semibold text-slate-500 mb-1.5 block">{f.label}</label><input type={f.type || "text"} defaultValue={f.val} disabled={f.disabled} className={`w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white ${f.disabled ? "opacity-60" : "focus:outline-none focus:border-primary"}`} /></div>
              ))}
            </div>
            <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
          </div>
        )}

        {activeTab === "Health Profile" && (
          <div className="space-y-4">
            {[{ label: "Blood Type", val: "O+" }, { label: "Height (cm)", val: "175" }, { label: "Weight (kg)", val: "70" }].map((f) => (
              <div key={f.label} className="grid sm:grid-cols-2 gap-4 items-center"><label className="text-sm text-slate-600 dark:text-slate-300">{f.label}</label><input defaultValue={f.val} className="h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white focus:outline-none focus:border-primary" /></div>
            ))}
            <div><label className="text-sm text-slate-600 dark:text-slate-300 mb-2 block">Known Allergies</label><div className="flex gap-2 flex-wrap">{["Penicillin", "Peanuts"].map((a) => <span key={a} className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-600 text-xs font-medium">{a} &times;</span>)}<input placeholder="Add allergy..." className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 text-sm dark:text-white bg-transparent" /></div></div>
            <div><label className="text-sm text-slate-600 dark:text-slate-300 mb-2 block">Medical Conditions</label><div className="flex gap-2 flex-wrap">{["Hypertension"].map((c) => <span key={c} className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-xs font-medium">{c} &times;</span>)}</div></div>
            <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
          </div>
        )}

        {activeTab === "Security" && (
          <div className="space-y-6">
            <div><h5 className="font-semibold text-slate-800 dark:text-white mb-4">Change Password</h5>
              {["Current Password", "New Password", "Confirm New Password"].map((l) => (
                <div key={l} className="mb-3"><label className="text-xs font-semibold text-slate-500 mb-1.5 block">{l}</label><input type="password" className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white focus:outline-none focus:border-primary" /></div>
              ))}
              <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors">Update Password</button>
            </div>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="space-y-4">
            {[{ label: "Email Notifications", desc: "Receive appointment reminders and updates via email", defaultOn: true }, { label: "SMS Notifications", desc: "Get text messages for appointment reminders", defaultOn: true }, { label: "Push Notifications", desc: "Browser notifications for important updates", defaultOn: false }, { label: "Marketing Emails", desc: "Receive health tips and promotional offers", defaultOn: false }].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{n.label}</p><p className="text-xs text-slate-400">{n.desc}</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={n.defaultOn} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Insurance" && (
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <h5 className="font-semibold text-slate-800 dark:text-white mb-1">BlueCross BlueShield</h5>
              <p className="text-xs text-primary mb-2">Gold PPO</p>
              <div className="grid grid-cols-2 gap-2 text-xs"><span className="text-slate-500 dark:text-slate-400">Policy: BCB123456789</span><span className="text-slate-500 dark:text-slate-400">Group: GRP987654</span><span className="text-slate-500 dark:text-slate-400">Valid: 01/01/24 - 12/31/25</span></div>
              <div className="flex gap-2 mt-3"><button className="text-xs text-primary font-medium hover:underline">Edit</button><button className="text-xs text-rose-500 font-medium hover:underline">Remove</button></div>
            </div>
            <button className="px-5 py-2.5 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">+ Add Insurance</button>
          </div>
        )}
      </div>
    </div>
  );
}
