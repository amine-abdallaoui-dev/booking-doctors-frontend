import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

const posts = [
  { title: "10 Tips for Heart Health in 2025", author: "Admin", category: "Health Tips", status: "Published", views: 1240, date: "Jan 15, 2025" },
  { title: "Understanding Seasonal Allergies", author: "Dr. Sarah Chen", category: "Medical Guide", status: "Published", views: 890, date: "Jan 10, 2025" },
  { title: "The Future of Telemedicine", author: "Admin", category: "Industry", status: "Published", views: 2100, date: "Jan 5, 2025" },
  { title: "Pediatric Vaccination Schedule", author: "Dr. Lisa Anderson", category: "Parenting", status: "Draft", views: 0, date: "Jan 20, 2025" },
  { title: "Managing Chronic Pain", author: "Admin", category: "Health Tips", status: "Archived", views: 560, date: "Dec 20, 2024" },
];

const statusColors: Record<string, string> = { Published: "bg-emerald-500/10 text-emerald-600", Draft: "bg-slate-100 text-slate-500", Archived: "bg-slate-100 text-slate-400" };

export default function AdminBlog() {
  const [showEditor, setShowEditor] = useState(false);

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-slate-800 dark:text-white">{showEditor === true ? "New Post" : "Edit Post"}</h2><button onClick={() => setShowEditor(false)} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-500">Cancel</button></div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Title</label><input placeholder="Post title" className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white focus:outline-none focus:border-primary" /></div>
          <div className="grid sm:grid-cols-2 gap-4"><div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Category</label><select className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white"><option>Health Tips</option><option>Medical Guide</option><option>Industry</option><option>Parenting</option></select></div><div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Status</label><select className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white"><option>Draft</option><option>Published</option></select></div></div>
          <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Excerpt</label><textarea rows={3} placeholder="Short description..." className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white resize-none focus:outline-none focus:border-primary" /></div>
          <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Content</label><textarea rows={12} placeholder="Write your post content here..." className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white resize-none focus:outline-none focus:border-primary" /></div>
          <div className="flex gap-3"><button className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium">Save Draft</button><button onClick={() => setShowEditor(false)} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold">Publish</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end"><button onClick={() => setShowEditor(true)} className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center gap-2 hover:bg-primary-light transition-colors"><Plus className="w-4 h-4" /> Add Post</button></div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_120px_120px_100px_80px_120px_140px] gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase"><span>Title</span><span>Author</span><span>Category</span><span>Status</span><span>Views</span><span>Date</span><span>Actions</span></div>
        {posts.map((p, i) => (
          <div key={i} className="grid md:grid-cols-[1fr_120px_120px_100px_80px_120px_140px] gap-4 p-4 border-t border-slate-100 dark:border-slate-700 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{p.title}</span>
            <span className="text-xs text-slate-500">{p.author}</span>
            <span className="text-xs text-slate-500">{p.category}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span>
            <span className="text-xs text-slate-500">{p.views.toLocaleString()}</span>
            <span className="text-xs text-slate-500">{p.date}</span>
            <div className="flex gap-1"><button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button><button onClick={() => setShowEditor(true)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Pencil className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"><Trash2 className="w-3.5 h-3.5" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
