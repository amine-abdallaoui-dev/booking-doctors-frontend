import { doctors, specialties, type Doctor } from "@/data/doctors";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDoctors = async (filters?: {
  specialty?: string;
  location?: string;
  search?: string;
  minRating?: number;
  maxPrice?: number;
  consultationType?: string;
}): Promise<Doctor[]> => {
  await delay(400);
  let result = [...doctors];

  if (filters?.specialty && filters.specialty !== "All Specialties") {
    result = result.filter((d) => d.specialty === filters.specialty);
  }
  if (filters?.location && filters.location !== "All Locations") {
    result = result.filter((d) =>
      d.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        d.specialty.toLowerCase().includes(s) ||
        d.hospital.toLowerCase().includes(s)
    );
  }
  if (filters?.minRating) {
    result = result.filter((d) => d.rating >= filters.minRating!);
  }
  if (filters?.maxPrice) {
    result = result.filter((d) => d.price <= filters.maxPrice!);
  }

  return result;
};

export const getDoctorBySlug = async (slug: string): Promise<Doctor | null> => {
  await delay(300);
  return doctors.find((d) => d.slug === slug) || null;
};

export const getDoctorById = async (id: number): Promise<Doctor | null> => {
  await delay(300);
  return doctors.find((d) => d.id === id) || null;
};

export const getSpecialties = async () => {
  await delay(200);
  return specialties;
};

export const getSimilarDoctors = async (
  specialty: string,
  excludeId: number
): Promise<Doctor[]> => {
  await delay(300);
  return doctors
    .filter((d) => d.specialty === specialty && d.id !== excludeId)
    .slice(0, 3);
};
