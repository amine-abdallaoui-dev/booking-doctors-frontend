import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, MapPin, Star, Heart, SlidersHorizontal, Grid3X3, List, Clock, X } from "lucide-react";
import { doctors as allDoctors, specialties } from "@/data/doctors";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const s = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`} />
      ))}
    </div>
  );
}

export default function Doctors() {
  useScrollReveal();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get("specialty") || "All Specialties");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "All Locations");
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating") || 0));
  const [sortBy, setSortBy] = useState("Recommended");

  const locations = ["All Locations", "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "San Francisco, CA", "Boston, MA", "Philadelphia, PA"];

  const filteredDoctors = useMemo(() => {
    let result = [...allDoctors];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.hospital.toLowerCase().includes(q));
    }
    if (selectedSpecialty !== "All Specialties") {
      result = result.filter((d) => d.specialty === selectedSpecialty);
    }
    if (selectedLocation !== "All Locations") {
      result = result.filter((d) => d.location === selectedLocation);
    }
    if (minRating > 0) {
      result = result.filter((d) => d.rating >= minRating);
    }
    switch (sortBy) {
      case "Rating: High to Low": result.sort((a, b) => b.rating - a.rating); break;
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Experience": result.sort((a, b) => b.experience - a.experience); break;
    }
    return result;
  }, [searchQuery, selectedSpecialty, selectedLocation, minRating, sortBy]);

  const toggleFavorite = (id: number) => {
    if (!user) {
      addToast("warning", "Please login to save favorites");
      return;
    }
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
    addToast("success", favorites.includes(id) ? "Removed from favorites" : "Added to favorites");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("All Specialties");
    setSelectedLocation("All Locations");
    setMinRating(0);
  };

  const activeFilterCount = [selectedSpecialty !== "All Specialties", selectedLocation !== "All Locations", minRating > 0].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-[72px]">
      {/* Header */}
      <div className="gradient-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Find Your Doctor</h1>
          <p className="text-white/80">Search through our network of 500+ verified doctors across 25+ specialties</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-white/60 text-xs">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Find Doctors</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 sticky top-[72px] z-30 shadow-sm">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by doctor name, specialty, hospital..." className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-primary dark:text-white" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filters {activeFilterCount > 0 && <span className="bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Specialty</label>
                <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white">
                  <option>All Specialties</option>
                  {specialties.map((s) => <option key={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Location</label>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-white">
                  {locations.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Min Rating: {minRating > 0 ? `${minRating}+ Stars` : "Any"}</label>
                <input type="range" min="0" max="5" step="0.5" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-full h-10 accent-primary" />
              </div>
              <div className="flex items-end">
                <button onClick={clearFilters} className="h-10 px-4 rounded-lg text-sm text-primary hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium transition-colors">Clear All Filters</button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">Showing {filteredDoctors.length} doctors</p>
          <div className="flex items-center gap-3">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-9 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm dark:text-white">
              {["Recommended", "Rating: High to Low", "Price: Low to High", "Price: High to Low", "Experience"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <div className="hidden sm:flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "text-slate-400 hover:text-slate-600"}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "text-slate-400 hover:text-slate-600"}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedSpecialty !== "All Specialties" && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"><X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSpecialty("All Specialties")} /> {selectedSpecialty}</span>}
            {selectedLocation !== "All Locations" && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"><X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation("All Locations")} /> {selectedLocation}</span>}
            {minRating > 0 && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"><X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} /> {minRating}+ Stars</span>}
          </div>
        )}

        {/* Doctor Grid */}
        {viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all group">
                <div className="relative h-[200px] overflow-hidden">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {doctor.videoAvailable && <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium backdrop-blur">Video</span>}
                  <button onClick={() => toggleFavorite(doctor.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className={`w-4 h-4 ${favorites.includes(doctor.id) ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
                  </button>
                  <span className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-white/90 text-slate-700 text-xs font-medium">{doctor.experience}+ Years Exp</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link to={`/doctors/${doctor.slug}`} className="font-semibold text-slate-800 dark:text-white hover:text-primary transition-colors">{doctor.name}</Link>
                      <p className="text-xs text-primary mt-0.5">{doctor.specialty}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {doctor.hospital}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <StarRating rating={doctor.rating} />
                    <span className="text-xs text-slate-400">({doctor.reviewCount})</span>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-700 my-3" />
                  <div className="flex items-center justify-between">
                    <div><span className="text-lg font-bold text-primary">${doctor.price}</span><span className="text-xs text-slate-400">/visit</span></div>
                    <Link to={`/booking?doctor=${doctor.id}`} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-colors">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex gap-5 hover:shadow-md transition-all">
                <img src={doctor.image} alt={doctor.name} className="w-28 h-28 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link to={`/doctors/${doctor.slug}`} className="font-semibold text-slate-800 dark:text-white hover:text-primary transition-colors">{doctor.name}</Link>
                      <p className="text-xs text-primary">{doctor.specialty} &middot; <span className="text-slate-400">{doctor.hospital}</span></p>
                    </div>
                    <button onClick={() => toggleFavorite(doctor.id)} className="text-slate-400 hover:text-rose-500"><Heart className={`w-5 h-5 ${favorites.includes(doctor.id) ? "fill-rose-500 text-rose-500" : ""}`} /></button>
                  </div>
                  <div className="flex items-center gap-2 mt-2"><StarRating rating={doctor.rating} size="md" /><span className="text-xs text-slate-400">({doctor.reviewCount} reviews)</span></div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-300">{doctor.experience}+ Years</span>
                    {doctor.videoAvailable && <span className="text-xs bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded-full text-primary">Video</span>}
                    <span className="text-xs bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full text-emerald-600 flex items-center gap-1"><Clock className="w-3 h-3" /> Next: {doctor.nextAvailable}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> {doctor.location}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end justify-between min-w-[140px]">
                  <div className="text-right"><span className="text-xl font-bold text-primary">${doctor.price}</span><span className="text-xs text-slate-400">/per visit</span></div>
                  <Link to={`/booking?doctor=${doctor.id}`} className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors">Book Now</Link>
                  <Link to={`/doctors/${doctor.slug}`} className="text-xs text-primary font-medium hover:underline">View Profile</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDoctors.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">No doctors found</h4>
            <p className="text-sm text-slate-400 mb-6">Try adjusting your filters or search terms to find more results.</p>
            <button onClick={clearFilters} className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
