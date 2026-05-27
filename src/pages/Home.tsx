import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, PlayCircle, Star, ChevronRight, Search, MapPin,
  Calendar, Stethoscope, Clock, ShieldCheck, Zap, MessageCircle,
  FileText, Lock, CheckCircle, Apple, Play, Users, Briefcase,
} from "lucide-react";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { doctors, specialties } from "@/data/doctors";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* Star Rating */
function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`} />
      ))}
    </div>
  );
}

/* Specialty Icon */
function SpecialtyIcon({ name }: { name: string }) {
  const iconMap: Record<string, typeof Stethoscope> = {
     Stethoscope, Users, FileText, Clock, MapPin, Star, Lock,
  };
  const Icon = iconMap[name] || Stethoscope;
  return (
    <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mx-auto">
      <Icon className="w-8 h-8 text-primary" />
    </div>
  );
}

/* FAQ Item */
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all ${isOpen ? "border-l-[3px] border-l-primary" : ""}`}>
      <button onClick={onClick} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-semibold text-slate-800 dark:text-white text-sm pr-4">{question}</span>
        <ChevronRight className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function Home() {
  useScrollReveal();
  const [openFAQ, setOpenFAQ] = useState(0);

  const featuredDoctors = doctors.slice(0, 4);

  const features = [
    { icon: ShieldCheck, title: "Verified Doctors", desc: "Every doctor is thoroughly vetted with verified credentials, licenses, and background checks." },
    { icon: Clock, title: "24/7 Availability", desc: "Book appointments anytime, anywhere. Many doctors offer evening and weekend slots." },
    { icon: Lock, title: "Secure & Private", desc: "HIPAA-compliant platform. Your medical data is encrypted and protected." },
    { icon: Zap, title: "Instant Booking", desc: "No phone calls or waiting. Get confirmed appointments in under 60 seconds." },
    { icon: MessageCircle, title: "Video Consultations", desc: "Connect with doctors from the comfort of your home via secure HD video calls." },
    { icon: FileText, title: "Digital Health Records", desc: "Access your prescriptions, lab reports, and medical history anytime." },
  ];

  const testimonials = [
    { name: "Margaret Thompson", role: "Cardiology Patient", rating: 5, text: "The platform made it so easy to find a great cardiologist. I booked an appointment within minutes and the video consultation was seamless. Highly recommend!", avatar: "/assets/patient-1.jpg" },
    { name: "David Kim", role: "Dermatology Patient", rating: 5, text: "Dr. Chen was fantastic! She diagnosed my skin condition quickly and the treatment plan worked wonders. The whole booking process was incredibly smooth.", avatar: "/assets/patient-2.jpg" },
    { name: "Robert Williams", role: "Pediatrics Parent", rating: 5, text: "As a parent, finding a good pediatrician was stressful. MediBook made it simple. Dr. Anderson is wonderful with our kids and always available.", avatar: "/assets/doctor-3.jpg" },
    { name: "Jennifer Martinez", role: "Orthopedics Patient", rating: 4, text: "After my knee injury, I found an excellent orthopedic surgeon through MediBook. The recovery has been great and the follow-up care is top-notch.", avatar: "/assets/doctor-4.jpg" },
  ];

  const faqs = [
    { q: "How do I book an appointment with a doctor?", a: "Simply search for a doctor by specialty, location, or name. Select your preferred doctor, choose an available date and time slot, and confirm your booking. You'll receive instant confirmation via email and SMS." },
    { q: "Can I cancel or reschedule my appointment?", a: "Yes, you can cancel or reschedule appointments up to 2 hours before the scheduled time through your patient dashboard. Cancellations made within the allowed timeframe are fully refunded." },
    { q: "Are video consultations available?", a: "Absolutely! Many of our doctors offer secure HD video consultations. Look for the 'Video Available' badge on the doctor's profile. You'll receive a secure link before your appointment." },
    { q: "How are doctors verified on MediBook?", a: "All doctors undergo a rigorous verification process including license validation, credential checks, background verification, and review of their practice history. Only verified doctors can list on our platform." },
    { q: "Is my medical information secure?", a: "Yes, MediBook is fully HIPAA-compliant. All data is encrypted using AES-256 encryption, and our platform undergoes regular security audits. Your privacy is our top priority." },
    { q: "What payment methods are accepted?", a: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and select health insurance plans. Payment is processed securely through our encrypted payment gateway." },
    { q: "How do I get a prescription after my consultation?", a: "After your consultation, the doctor can issue a digital prescription directly through our platform. You'll receive it in your patient dashboard and via email. You can download or share it with any pharmacy." },
  ];

  const steps = [
    { num: "1", img: "/assets/how-search.jpg", title: "Find Your Doctor", desc: "Search by specialty, location, or doctor name. Browse profiles, read reviews, and compare ratings to find your perfect match." },
    { num: "2", img: "/assets/how-book.jpg", title: "Book Appointment", desc: "Select a convenient date and time slot. Choose between in-person visits or video consultations. Instant confirmation." },
    { num: "3", img: "/assets/how-visit.jpg", title: "Get Quality Care", desc: "Visit the clinic or connect via secure video call. Get prescriptions, follow-ups, and health records managed digitally." },
  ];

  const floatingCards = [
    { img: "/assets/doctor-1.jpg", name: "Dr. James Wilson", spec: "Cardiologist", rotate: "-rotate-6", z: "z-30", anim: "animate-float", top: "top-8", left: "left-0" },
    { img: "/assets/doctor-4.jpg", name: "Dr. Emily Johnson", spec: "Orthopedic Surgeon", rotate: "rotate-3", z: "z-20", anim: "animate-float-delayed-1", top: "top-24", left: "left-32" },
    { img: "/assets/doctor-5.jpg", name: "Dr. Raj Patel", spec: "Neurologist", rotate: "-rotate-2", z: "z-10", anim: "animate-float-delayed-2", top: "top-48", left: "left-16" },
  ];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center pt-[72px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent dark:from-slate-900/95 dark:via-slate-900/70" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-primary uppercase mb-4">Trusted Healthcare Platform</p>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-5">
                Find the <span className="gradient-text">Right</span> Doctor, Book Instantly
              </h1>
              <p className="text-base lg:text-lg text-slate-500 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
                Connect with top-rated specialists across 50+ medical fields. Schedule appointments online, manage your health records, and get the care you deserve.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/doctors" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all shadow-teal hover:scale-[1.02]">
                  Find a Doctor <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <PlayCircle className="w-4 h-4" /> How It Works
                </button>
              </div>
              <div className="flex items-center gap-8">
                {[{ n: "500+", l: "Verified Doctors" }, { n: "50K+", l: "Happy Patients" }, { n: "4.9", l: "Average Rating", star: true }].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-1">
                      {s.star && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                      {s.n}
                    </span>
                    <span className="text-xs text-slate-400">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block relative h-[500px]">
              {floatingCards.map((card, i) => (
                <div key={i} className={`absolute ${card.top} ${card.left} w-[200px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 ${card.rotate} ${card.z} ${card.anim} animate-scale-in`} style={{ animationDelay: `${i * 150}ms` }}>
                  <img src={card.img} alt={card.name} className="w-[60px] h-[60px] rounded-full object-cover mx-auto mb-3" />
                  <p className="text-sm font-semibold text-center text-slate-800 dark:text-white">{card.name}</p>
                  <p className="text-xs text-primary text-center">{card.spec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Widget */}
      <div className="relative z-20 -mt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 animate-slide-up" style={{ animationDelay: "300ms", opacity: 0, animationFillMode: "forwards" }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { icon: Search, placeholder: "Search by specialty" },
              { icon: MapPin, placeholder: "City or location" },
              { icon: Stethoscope, placeholder: "Doctor's name" },
              { icon: Calendar, placeholder: "", type: "date" },
            ].map((field, i) => (
              <div key={i} className="relative">
                <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={field.type || "text"} placeholder={field.placeholder} className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white dark:placeholder:text-slate-400" />
              </div>
            ))}
            <Link to="/doctors" className="h-12 flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-colors shadow-teal">
              <Search className="w-4 h-4" /> Search
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Counter */}
      <section className="gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, value: 500, suffix: "+", label: "Expert Doctors" },
              { icon: Users, value: 50000, suffix: "+", label: "Patients Served" },
              { icon: Briefcase, value: 25, suffix: "+", label: "Specialties" },
              { icon: Star, value: 4.9, suffix: "", label: "Patient Satisfaction", isDecimal: true },
            ].map((stat, i) => (
              <div key={i} className="text-center reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <stat.icon className="w-8 h-8 text-white/70 mx-auto mb-3" />
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">
                  {stat.isDecimal ? <CountUp end={stat.value} decimals={1} enableScrollSpy scrollSpyOnce duration={2} /> : <CountUp end={stat.value} separator="," enableScrollSpy scrollSpyOnce duration={2} />}
                  {stat.suffix}
                </div>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="text-xs font-semibold tracking-[0.08em] text-primary uppercase mb-2">Our Specialties</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">Find Specialists Across Every Field</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">From routine checkups to specialized treatments, connect with the right doctor for your needs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specialties.map((s, i) => (
              <div key={i} className="reveal-scale bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer" style={{ transitionDelay: `${i * 80}ms` }}>
                <SpecialtyIcon name={s.icon} />
                <h5 className="font-semibold text-slate-800 dark:text-white mt-4 mb-1">{s.name}</h5>
                <p className="text-xs text-slate-400 mb-3">{s.count} Doctors</p>
                <span className="text-xs font-semibold text-primary">Explore &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-primary uppercase mb-2">Top Doctors</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">Recommended for You</h2>
            </div>
            <Link to="/doctors" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doctor, i) => (
              <div key={doctor.id} className="reveal bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="relative h-[220px] overflow-hidden group">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${doctor.online ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-500/10 text-slate-500"}`}>{doctor.online ? "Online" : "Offline"}</span>
                </div>
                <div className="p-5">
                  <h5 className="font-semibold text-slate-800 dark:text-white">{doctor.name}</h5>
                  <p className="text-xs text-primary mt-0.5">{doctor.specialty}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {doctor.hospital}</p>
                  <div className="border-t border-slate-100 dark:border-slate-700 my-3" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5"><StarRating rating={doctor.rating} /><span className="text-xs text-slate-400">({doctor.reviewCount})</span></div>
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-300">{doctor.experience}+ Years</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div><span className="text-lg font-bold text-primary">${doctor.price}</span><span className="text-xs text-slate-400">/visit</span></div>
                    <Link to={`/booking?doctor=${doctor.id}`} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-colors">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="text-xs font-semibold tracking-[0.08em] text-primary uppercase mb-2">Simple Process</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">Book Your Appointment in 3 Easy Steps</h2>
            <p className="text-slate-500 dark:text-slate-400">Getting the healthcare you need has never been simpler.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
            {steps.map((step, i) => (
              <div key={i} className="reveal text-center relative" style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto relative z-10">{step.num}</div>
                <img src={step.img} alt={step.title} className="w-full max-w-[280px] mx-auto mt-8 rounded-xl shadow-md" />
                <h4 className="text-xl font-semibold text-slate-800 dark:text-white mt-6">{step.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">Why Patients Trust MediBook</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">We're committed to making healthcare accessible, transparent, and patient-centered.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="reveal bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:-translate-y-1 hover:shadow-md transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-semibold text-slate-800 dark:text-white mb-2">{f.title}</h5>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24 gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <p className="text-xs font-semibold tracking-[0.08em] text-white/70 uppercase mb-2">Testimonials</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">What Our Patients Say</h2>
          </div>
          <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={24} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} navigation pagination={{ clickable: true }} autoplay={{ delay: 5000 }} loop>
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="glassmorphism rounded-2xl p-8 h-full">
                  <StarRating rating={t.rating} size="md" />
                  <p className="text-white/90 text-sm italic mt-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-6">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-white/60 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Mobile App */}
      <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <p className="text-xs font-semibold tracking-[0.08em] text-primary uppercase mb-2">Download Our App</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Healthcare at Your Fingertips</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Book appointments, manage your health records, get medication reminders, and chat with your doctor — all from your phone.</p>
              <div className="space-y-3 mb-8">
                {["Easy appointment booking", "Video consultations on the go", "Prescription management", "Health reminders & alerts"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-emerald-500" /><span className="text-sm text-slate-600 dark:text-slate-300">{item}</span></div>
                ))}
              </div>
              <div className="flex gap-3">
                {[{ icon: Apple, label1: "Download on", label2: "App Store" }, { icon: Play, label1: "Get it on", label2: "Google Play" }].map((btn, i) => (
                  <button key={i} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                    <btn.icon className="w-5 h-5" />
                    <div className="text-left"><p className="text-[10px] opacity-70 leading-none">{btn.label1}</p><p className="text-sm font-semibold leading-tight">{btn.label2}</p></div>
                  </button>
                ))}
              </div>
            </div>
            <div className="reveal-right flex justify-center">
              <img src="/assets/app-mockup.jpg" alt="MediBook App" className="max-w-md w-full animate-float rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-500 dark:text-slate-400">Everything you need to know about booking with MediBook.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <FAQItem question={faq.q} answer={faq.a} isOpen={openFAQ === i} onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 gradient-primary">
        <div className="max-w-2xl mx-auto px-4 text-center reveal">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-white/80 mb-8">Join thousands of patients who trust MediBook for their healthcare needs. Book your first appointment today.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold hover:scale-105 transition-transform animate-pulse-glow">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/50 text-xs mt-4">No credit card required</p>
        </div>
      </section>
    </div>
  );
}
