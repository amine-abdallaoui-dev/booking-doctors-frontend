import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, MapPin, Building, Clock, Heart, Phone, Award } from "lucide-react";
import { getDoctorBySlug, timeSlots, bookedSlots } from "@/data/doctors";
import type { Doctor } from "@/data/doctors";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "w-6 h-6" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => <Star key={i} className={`${s} ${i<=Math.round(rating)?"text-amber-400 fill-amber-400":"text-slate-300 dark:text-slate-600"}`} />)}
    </div>
  );
}

export default function DoctorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const d = getDoctorBySlug(slug || "");
    setDoctor(d || null);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { day: d.toLocaleDateString("en", { weekday: "short" }), date: d.getDate(), full: d.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" }) };
  });

  const reviews = [
    { name: "Margaret T.", rating: 5, date: "2 weeks ago", text: "Dr. Wilson is exceptional. He took the time to explain my condition in detail and made me feel at ease. His expertise in interventional cardiology is evident. Highly recommend!", tag: "Heart Checkup" },
    { name: "David K.", rating: 5, date: "1 month ago", text: "The best cardiologist I've ever visited. Thorough examination, clear communication, and a genuine care for his patients. The staff at Mount Sinai is also wonderful.", tag: "Hypertension" },
    { name: "Jennifer M.", rating: 4, date: "2 months ago", text: "Great doctor with excellent credentials. Wait time was a bit long but the consultation quality made up for it. Very knowledgeable about preventive care.", tag: "Cholesterol" },
    { name: "Robert W.", rating: 5, date: "3 months ago", text: "After my heart attack, Dr. Wilson guided me through recovery with patience and expertise. Forever grateful for his care.", tag: "Post-Surgery" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-[72px]">
      {/* Profile Header */}
      <div className="gradient-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/60 text-xs mb-4">
            <Link to="/" className="hover:text-white">Home</Link><span>/</span><Link to="/doctors" className="hover:text-white">Find Doctors</Link><span>/</span><span className="text-white">{doctor.name}</span>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
            <div className="flex gap-5">
              <img src={doctor.image} alt={doctor.name} className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover border-2 border-white/30" />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">{doctor.name}, MD</h1>
                <p className="text-white/80 text-sm mt-1">Board Certified {doctor.specialty}ist | Fellow, American College of {doctor.specialty}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[{ label: doctor.specialty }, { label: `${doctor.experience}+ Years` }, { label: "FACC" }, { label: doctor.languages.join(", ") }].map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">{t.label}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <div className="flex gap-6 text-white mb-4">
                <div className="text-center"><div className="flex items-center gap-1 justify-center"><span className="text-2xl font-bold">{doctor.rating}</span><Star className="w-5 h-5 fill-white text-white" /></div><p className="text-xs text-white/60">{doctor.reviewCount} Reviews</p></div>
                <div className="text-center"><span className="text-2xl font-bold">500+</span><p className="text-xs text-white/60">Patients Treated</p></div>
                <div className="text-center"><span className="text-2xl font-bold">${doctor.price}</span><p className="text-xs text-white/60">Per Visit</p></div>
              </div>
              <Link to={`/booking?doctor=${doctor.id}`} className="inline-block px-8 py-3 rounded-full bg-white text-primary font-semibold text-sm hover:scale-105 transition-transform">Book Appointment</Link>
              <button onClick={() => setLiked(!liked)} className="ml-3 px-4 py-3 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"><Heart className={`w-4 h-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">About {doctor.name}</h4>
              <div className="border-t border-slate-100 dark:border-slate-700 mb-4" />
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{doctor.about}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">Dr. {doctor.name.split(" ")[1]} specializes in providing comprehensive {doctor.specialty.toLowerCase()} care with a patient-centered approach. With over {doctor.experience} years of experience, {doctor.name.split(" ")[1]} has helped thousands of patients achieve better health outcomes through personalized treatment plans and cutting-edge medical techniques.</p>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Education & Training</h4>
              <div className="border-t border-slate-100 dark:border-slate-700 mb-4" />
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
                {doctor.education.map((edu, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-slate-800" />
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">{edu.institution}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{edu.detail}</p>
                    <p className="text-xs text-slate-400">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Certs */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Experience & Certifications</h4>
              <div className="border-t border-slate-100 dark:border-slate-700 mb-4" />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Work Experience</p>
                  {doctor.experienceList.map((exp, i) => (
                    <div key={i} className="mb-3"><p className="text-sm font-semibold text-slate-800 dark:text-white">{exp.hospital}</p><p className="text-xs text-slate-500">{exp.role}</p><p className="text-xs text-slate-400">{exp.period}</p></div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Certifications</p>
                  {doctor.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2"><Award className="w-4 h-4 text-primary flex-shrink-0" /><span className="text-sm text-slate-600 dark:text-slate-300">{cert}</span></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Services & Treatments</h4>
              <div className="border-t border-slate-100 dark:border-slate-700 mb-4" />
              <div className="flex flex-wrap gap-2">
                {doctor.services.map((s, i) => <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium">{s}</span>)}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white">Patient Reviews</h4>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{doctor.reviewCount} Reviews</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-700 mb-4" />
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <span className="text-4xl font-bold text-slate-800 dark:text-white">{doctor.rating}</span>
                  <StarRating rating={doctor.rating} size="md" />
                  <p className="text-xs text-slate-400 mt-1">{doctor.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 w-8">{star} star</span>
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : 1}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="border-t border-slate-100 dark:border-slate-700 pt-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-primary text-sm font-bold">{r.name[0]}</span></div><div><p className="text-sm font-semibold text-slate-800 dark:text-white">{r.name}</p><p className="text-xs text-slate-400">{r.date}</p></div><StarRating rating={r.rating} size="sm" /></div><p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{r.text}</p><span className="inline-block mt-2 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-900/20 text-primary text-xs">{r.tag}</span></div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Load More Reviews</button>
            </div>
          </div>

          {/* Right Column - Sticky */}
          <div className="space-y-6 lg:sticky lg:top-[88px] lg:self-start">
            {/* Availability */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-slate-800 dark:text-white">Available Slots</h5>
                <span className="px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-xs font-medium">Next: Today</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                {dates.map((d, i) => (
                  <button key={i} onClick={() => setSelectedDate(i)} className={`flex-shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center text-xs transition-colors ${selectedDate === i ? "bg-primary text-white" : "bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"}`}>
                    <span className="text-[10px] uppercase">{d.day}</span><span className="font-bold text-lg">{d.date}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">{dates[selectedDate].full}</p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  return (
                    <button key={slot} disabled={isBooked} onClick={() => setSelectedTime(slot)} className={`py-2 rounded-lg text-xs font-medium transition-colors ${selectedTime === slot ? "bg-primary text-white" : isBooked ? "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed" : "border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary"}`}>
                      {slot}
                    </button>
                  );
                })}
              </div>
              <Link to={`/booking?doctor=${doctor.id}${selectedTime ? `&time=${selectedTime}` : ""}`} className={`block w-full mt-4 py-3 rounded-xl text-center text-sm font-semibold transition-colors ${selectedTime ? "bg-primary text-white hover:bg-primary-light" : "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed"}`}>Book This Slot</Link>
            </div>

            {/* Fees */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h5 className="font-semibold text-slate-800 dark:text-white mb-4">Consultation Fees</h5>
              <div className="border-t border-slate-100 dark:border-slate-700 mb-4" />
              {[{ label: "In-Person", price: doctor.price }, { label: "Video", price: doctor.videoPrice }].map((f, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-700 last:border-0"><span className="text-sm text-slate-600 dark:text-slate-300">{f.label} Consultation</span><span className="text-lg font-bold text-primary">${f.price}</span></div>
              ))}
              <p className="text-xs text-slate-400 mt-3">Accepted: Aetna, BlueCross, Cigna, UnitedHealthcare</p>
            </div>

            {/* Clinic Info */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h5 className="font-semibold text-slate-800 dark:text-white mb-4">Clinic Information</h5>
              <div className="border-t border-slate-100 dark:border-slate-700 mb-4" />
              <div className="space-y-3">
                <div className="flex items-start gap-2.5"><Building className="w-4 h-4 text-primary mt-0.5" /><div><p className="text-sm font-semibold text-slate-800 dark:text-white">{doctor.hospital}</p><p className="text-xs text-slate-400">{doctor.specialty} Department</p></div></div>
                <div className="flex items-start gap-2.5"><MapPin className="w-4 h-4 text-primary mt-0.5" /><p className="text-sm text-slate-600 dark:text-slate-300">{doctor.location}</p></div>
                <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-primary" /><p className="text-sm text-primary">{doctor.phone}</p></div>
                <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-primary" /><p className="text-sm text-slate-600 dark:text-slate-300">{doctor.hours}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
