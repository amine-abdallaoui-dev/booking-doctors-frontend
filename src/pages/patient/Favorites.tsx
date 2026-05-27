import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Building } from "lucide-react";
import { doctors } from "@/data/doctors";

export default function PatientFavorites() {
  const [favs, setFavs] = useState(doctors.slice(0, 6));

  const removeFav = (id: number) => setFavs((prev) => prev.filter((d) => d.id !== id));

  return (
    <div>
      {favs.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favs.map((doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 text-center relative hover:-translate-y-1 hover:shadow-lg transition-all">
              <button onClick={() => removeFav(doctor.id)} className="absolute top-3 right-3 text-rose-500 hover:scale-110 transition-transform"><Heart className="w-5 h-5 fill-rose-500" /></button>
              <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
              <h5 className="font-semibold text-slate-800 dark:text-white">{doctor.name}</h5>
              <p className="text-xs text-primary mt-0.5">{doctor.specialty}</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1"><Building className="w-3 h-3" />{doctor.hospital}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1,2,3,4,5].map((i) => <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(doctor.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />)}
              </div>
              <Link to={`/booking?doctor=${doctor.id}`} className="block w-full mt-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors">Book Appointment</Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20"><Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" /><h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">No favorite doctors yet</h4><Link to="/doctors" className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold inline-block mt-4">Browse Doctors</Link></div>
      )}
    </div>
  );
}
