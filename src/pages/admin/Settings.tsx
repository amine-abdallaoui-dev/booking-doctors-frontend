import { useState } from "react";
import { Upload, Save, Database } from "lucide-react";

const tabs = ["General", "Appearance", "Notifications", "Security", "Integrations", "Backup"];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="grid lg:grid-cols-[200px_1fr] gap-6">
      <div className="flex lg:flex-col gap-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 h-fit overflow-x-auto">
        {tabs.map((t) => (<button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors text-left ${activeTab === t ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"}`}>{t}</button>))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        {activeTab === "General" && (
          <div className="space-y-4 max-w-lg">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">General Settings</h4>
            {[{ label: "Platform Name", val: "MediBook" }, { label: "Tagline", val: "Your health, simplified" }, { label: "Contact Email", val: "support@medibook.com" }, { label: "Support Phone", val: "+1 (800) 123-4567" }].map((f) => (
              <div key={f.label}><label className="text-xs font-semibold text-slate-500 mb-1.5 block">{f.label}</label><input defaultValue={f.val} className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white focus:outline-none focus:border-primary" /></div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Currency</label><select className="w-full h-11 px-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white"><option>USD ($)</option><option>EUR</option><option>GBP</option></select></div>
              <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Time Zone</label><select className="w-full h-11 px-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white"><option>America/New_York</option><option>America/Los_Angeles</option><option>Europe/London</option></select></div>
            </div>
            <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
          </div>
        )}

        {activeTab === "Appearance" && (
          <div className="space-y-4 max-w-lg">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Appearance</h4>
            <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Primary Color</label><div className="flex gap-2">{["#0F766E", "#2563EB", "#7C3AED", "#DC2626", "#EA580C"].map((c) => (<div key={c} className="w-8 h-8 rounded-full cursor-pointer border-2 border-white dark:border-slate-700 shadow-sm" style={{ background: c }} />))}</div></div>
            <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Logo</label><button className="px-4 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-sm text-slate-500 flex items-center gap-2"><Upload className="w-4 h-4" /> Upload Logo</button></div>
            <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Default Theme</label><select className="w-full h-11 px-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white"><option>Light</option><option>Dark</option><option>System</option></select></div>
            <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="space-y-4 max-w-lg">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Notification Settings</h4>
            {[{ label: "New Registration", desc: "Notify when a new user registers" }, { label: "New Booking", desc: "Notify when an appointment is booked" }, { label: "Cancellation", desc: "Notify when an appointment is cancelled" }, { label: "Payment Received", desc: "Notify when a payment is processed" }, { label: "New Review", desc: "Notify when a new review is submitted" }, { label: "Support Ticket", desc: "Notify when a new support ticket is created" }].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700"><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{n.label}</p><p className="text-xs text-slate-400">{n.desc}</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" /></label></div>
            ))}
          </div>
        )}

        {activeTab === "Security" && (
          <div className="space-y-4 max-w-lg">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Security Settings</h4>
            {[{ label: "Password Min Length", val: "8" }, { label: "Max Login Attempts", val: "5" }, { label: "Session Timeout (hours)", val: "24" }].map((f) => (
              <div key={f.label}><label className="text-xs font-semibold text-slate-500 mb-1.5 block">{f.label}</label><input defaultValue={f.val} className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white focus:outline-none focus:border-primary" /></div>
            ))}
            <div className="flex items-center justify-between py-3"><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Require 2FA for Admins</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" /></label></div>
            <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
          </div>
        )}

        {activeTab === "Integrations" && (
          <div className="space-y-4 max-w-lg">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Integrations</h4>
            {[{ name: "Stripe", desc: "Payment processing", placeholder: "sk_live_..." }, { name: "SendGrid", desc: "Email service", placeholder: "SG.xxx" }, { name: "Twilio", desc: "SMS service", placeholder: "ACxxx" }, { name: "Zoom", desc: "Video calls", placeholder: "API Key" }].map((int) => (
              <div key={int.name} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700"><div className="flex items-center justify-between mb-2"><div><p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{int.name}</p><p className="text-xs text-slate-400">{int.desc}</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-9 h-5 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" /></label></div><input placeholder={int.placeholder} className="w-full h-9 px-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs dark:text-white" /></div>
            ))}
          </div>
        )}

        {activeTab === "Backup" && (
          <div className="space-y-4 max-w-lg">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Backup & Restore</h4>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Last Backup: <span className="font-medium">Jan 15, 2025 at 03:00 AM</span></p>
              <p className="text-xs text-slate-400 mb-3">Auto-backup: Daily at 3:00 AM</p>
              <div className="flex gap-3"><button className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Backup Now</button><button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400">Download Latest</button></div>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-2">Restore from Backup</p>
              <p className="text-xs text-amber-600 dark:text-amber-300 mb-3">This will replace all current data. Use with caution.</p>
              <button className="px-4 py-2 rounded-lg bg-amber-500 text-white text-xs font-medium">Upload Backup File</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
