import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, ArrowLeft, ArrowRight, Calendar, Clock, Video, User, MapPin } from "lucide-react";
import { doctors, timeSlots, bookedSlots } from "@/data/doctors";
import { useAuth } from "@/contexts/AuthContext";

const steps = ["Date & Time", "Your Info", "Confirm", "Done"];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const doctorId = Number(searchParams.get("doctor")) || 1;
  const prefillTime = searchParams.get("time");
  const { user } = useAuth();

  const doctor = useMemo(() => doctors.find((d) => d.id === doctorId) || doctors[0], [doctorId]);

  const [step, setStep] = useState(prefillTime ? 2 : 1);
  const [consultType, setConsultType] = useState<"inperson" | "video">("video");
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(prefillTime || "");
  const [formData, setFormData] = useState({ name: user?.name || "", email: user?.email || "", phone: "", dob: "", reason: "" });
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { day: d.toLocaleDateString("en", { weekday: "short" }), date: d.getDate(), month: d.toLocaleDateString("en", { month: "short" }), full: d.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) };
  });

  const price = consultType === "video" ? doctor.videoPrice : doctor.price;
  const platformFee = 5;
  const discount = promoApplied ? price * 0.1 : 0;
  const total = price + platformFee - discount;

  const canContinue = step === 1 ? selectedTime !== "" : step === 2 ? formData.name && formData.email && formData.reason : true;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-[72px]">
      {/* Header */}
      <div className="gradient-primary py-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Book Your Appointment</h1>
        <p className="text-white/80 text-sm">Complete the steps below to schedule your visit with {doctor.name}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isDone = step > stepNum;
            return (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isDone ? "bg-emerald-500 text-white" : isActive ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400"}`}>
                    {isDone ? <CheckCircle className="w-5 h-5" /> : stepNum}
                  </div>
                  <span className={`text-[10px] mt-1.5 font-medium hidden sm:block ${isActive || isDone ? "text-slate-700 dark:text-slate-200" : "text-slate-400"}`}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 sm:mx-4 ${step > stepNum ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`} />}
              </div>
            );
          })}
        </div>

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
            {/* Doctor Summary */}
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 flex items-center gap-4 mb-6">
              <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1"><p className="font-semibold text-slate-800 dark:text-white text-sm">{doctor.name}</p><p className="text-xs text-primary">{doctor.specialty}</p></div>
              <div className="flex gap-2">
                {(["inperson", "video"] as const).map((t) => (
                  <button key={t} onClick={() => setConsultType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${consultType === t ? "bg-primary text-white" : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300"}`}>{t === "inperson" ? "In-Person" : "Video"} ${t === "inperson" ? doctor.price : doctor.videoPrice}</button>
                ))}
              </div>
            </div>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Select Date & Time</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Choose your preferred appointment slot</p>

            {/* Date Picker */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
              {dates.map((d, i) => (
                <button key={i} onClick={() => setSelectedDate(i)} className={`flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center transition-colors ${selectedDate === i ? "bg-primary text-white" : "bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-primary"}`}>
                  <span className="text-[10px] uppercase">{d.day}</span><span className="font-bold text-xl">{d.date}</span><span className="text-[10px]">{d.month}</span>
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <h5 className="font-medium text-slate-700 dark:text-slate-200 mb-3">Available Times &mdash; {dates[selectedDate].full}</h5>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                return (
                  <button key={slot} disabled={isBooked} onClick={() => setSelectedTime(slot)} className={`py-2.5 rounded-lg text-xs font-medium transition-colors ${selectedTime === slot ? "bg-primary text-white" : isBooked ? "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed" : "border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary"}`}>{slot}</button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Your Info */}
        {step === 2 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Patient Information</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Please provide your details for the appointment</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[{ label: "Full Name", key: "name", type: "text", placeholder: "John Doe" }, { label: "Email", key: "email", type: "email", placeholder: "john@example.com" }, { label: "Phone", key: "phone", type: "tel", placeholder: "+1 (555) 123-4567" }, { label: "Date of Birth", key: "dob", type: "date", placeholder: "" }].map((field) => (
                <div key={field.key}><label className="text-xs font-semibold text-slate-500 mb-1.5 block">{field.label}</label><input type={field.type} placeholder={field.placeholder} value={formData[field.key as keyof typeof formData]} onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))} className="w-full h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white" /></div>
              ))}
              <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Reason for Visit *</label><textarea rows={4} placeholder="Briefly describe your symptoms or reason..." value={formData.reason} onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))} className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white resize-none" /></div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Review & Confirm</h4>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-5 space-y-3 mb-6">
              <div className="flex items-center gap-3"><img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover" /><div><p className="font-semibold text-slate-800 dark:text-white text-sm">{doctor.name}</p><p className="text-xs text-primary">{doctor.specialty}</p></div></div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Calendar className="w-4 h-4 text-primary" />{dates[selectedDate].full}</div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Clock className="w-4 h-4 text-primary" />{selectedTime} &mdash; 30 min</div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">{consultType === "video" ? <Video className="w-4 h-4 text-primary" /> : <MapPin className="w-4 h-4 text-primary" />}{consultType === "video" ? "Video Consultation" : "In-Person Visit"}</div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><User className="w-4 h-4 text-primary" />{formData.name} &middot; {formData.email}</div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-2 mb-6">
              {[{ label: "Consultation Fee", value: `$${price}` }, { label: "Platform Fee", value: `$${platformFee}` }, { label: "Subtotal", value: `$${price + platformFee}` }, ...(promoApplied ? [{ label: "Discount (WELCOME10)", value: `-$${discount.toFixed(2)}` }] : [])].map((item, i) => (
                <div key={i} className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">{item.label}</span><span className={`font-medium ${item.label.includes("Discount") ? "text-emerald-500" : "text-slate-700 dark:text-slate-200"}`}>{item.value}</span></div>
              ))}
              <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-700"><span className="font-semibold text-slate-800 dark:text-white">Total</span><span className="text-xl font-bold text-primary">${total.toFixed(2)}</span></div>
            </div>
            <div className="flex gap-2 mb-6">
              <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Promo code" className="flex-1 h-11 px-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-primary dark:text-white" />
              <button onClick={() => { if (promoCode.toLowerCase() === "welcome10") { setPromoApplied(true); } }} className="px-5 h-11 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Apply</button>
            </div>
            <div className="flex items-start gap-2 mb-6"><input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" defaultChecked /><p className="text-xs text-slate-500 dark:text-slate-400">I agree to the Terms of Service and Privacy Policy. I understand cancellations made less than 2 hours before may incur a fee.</p></div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-500 animate-scale-in" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Booking Confirmed!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">Your appointment has been successfully scheduled. A confirmation email has been sent to {formData.email || user?.email || "your email"}.</p>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 max-w-sm mx-auto text-left space-y-3 mb-8">
              <div className="flex justify-between"><span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">#APT-{new Date().toISOString().slice(0,10).replace(/-/g,"")}-001</span></div>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong className="text-slate-800 dark:text-white">Doctor:</strong> {doctor.name} &mdash; {doctor.specialty}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong className="text-slate-800 dark:text-white">Date:</strong> {dates[selectedDate].full}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong className="text-slate-800 dark:text-white">Time:</strong> {selectedTime} &mdash; {selectedTime.replace(/:\d+/, (m) => String(Number(m.slice(1)) + 30).padStart(2, "0")).replace(/(\d+):(\d+)/, (_, h, m) => `${h}:${m} ${Number(h) >= 12 ? "PM" : "AM"}`)}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong className="text-slate-800 dark:text-white">Type:</strong> {consultType === "video" ? "Video Consultation" : "In-Person"}</p>
              <p className="text-sm font-bold text-primary">Total Paid: ${total.toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <Link to={user?.role === "user" ? "/patient/dashboard" : user?.role === "doctor" ? "/doctor/dashboard" : "/"} className="py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-colors">Go to Dashboard</Link>
              <Link to="/doctors" className="py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Book Another Appointment</Link>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back</button>
            ) : <div />}
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canContinue}
              className={`px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors ${canContinue ? "bg-primary text-white hover:bg-primary-light shadow-teal" : "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed"}`}
            >
              {step === 3 ? "Confirm Booking" : "Continue"} {step < 3 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
