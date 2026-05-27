import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db";
import { User } from "./models/User";
import { Specialty } from "./models/Specialty";
import { BlogPost } from "./models/BlogPost";
import { Setting } from "./models/Setting";

const specialties = [
  { name: "Cardiology", description: "Heart and cardiovascular system", isActive: true },
  { name: "Dermatology", description: "Skin, hair, and nails", isActive: true },
  { name: "Neurology", description: "Brain and nervous system", isActive: true },
  { name: "Pediatrics", description: "Children's health", isActive: true },
  { name: "Orthopedics", description: "Bones, joints, and muscles", isActive: true },
  { name: "Ophthalmology", description: "Eye care and vision", isActive: true },
  { name: "Dentistry", description: "Oral health and dental care", isActive: true },
  { name: "Psychiatry", description: "Mental health", isActive: true },
  { name: "Gynecology", description: "Women's reproductive health", isActive: true },
  { name: "ENT", description: "Ear, nose, and throat", isActive: true },
];

const demoDoctors = [
  {
    name: "Dr. James Wilson",
    email: "james.wilson@medibook.com",
    password: "doctor123",
    role: "doctor" as const,
    phone: "+1 (555) 123-4567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1",
    doctorProfile: {
      slug: "dr-james-wilson",
      specialty: "Cardiology",
      hospital: "City Heart Hospital",
      location: "New York, NY",
      about: "Experienced cardiologist specializing in preventive cardiology and heart disease management with over 15 years of practice.",
      experience: 15,
      price: 200,
      videoPrice: 150,
      rating: 4.8,
      reviewCount: 124,
      online: true,
      videoAvailable: true,
      languages: ["English", "Spanish"],
      services: ["Heart Checkup", "ECG", "Echocardiogram", "Stress Test"],
      education: [
        { institution: "Harvard Medical School", detail: "MD, Cardiology", year: "2005" },
        { institution: "Johns Hopkins Hospital", detail: "Residency, Internal Medicine", year: "2008" },
      ],
      experienceList: [
        { hospital: "City Heart Hospital", role: "Senior Cardiologist", period: "2012 - Present", location: "New York, NY" },
        { hospital: "Mount Sinai Hospital", role: "Cardiologist", period: "2008 - 2012", location: "New York, NY" },
      ],
      certifications: ["American Board of Cardiology", "Advanced Cardiac Life Support"],
      hours: "Mon - Fri, 9:00 AM - 5:00 PM",
      nextAvailable: "Tomorrow",
      isApproved: true,
      license: "LIC-12345",
    },
  },
  {
    name: "Dr. Sarah Chen",
    email: "sarah.chen@medibook.com",
    password: "doctor123",
    role: "doctor" as const,
    phone: "+1 (555) 234-5678",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor2",
    doctorProfile: {
      slug: "dr-sarah-chen",
      specialty: "Dermatology",
      hospital: "Advanced Dermatology Center",
      location: "Los Angeles, CA",
      about: "Board-certified dermatologist passionate about medical and cosmetic dermatology.",
      experience: 10,
      price: 180,
      videoPrice: 130,
      rating: 4.9,
      reviewCount: 98,
      online: false,
      videoAvailable: true,
      languages: ["English", "Mandarin"],
      services: ["Skin Checkup", "Acne Treatment", "Laser Therapy", "Cosmetic Dermatology"],
      education: [
        { institution: "Stanford Medical School", detail: "MD, Dermatology", year: "2010" },
        { institution: "UCLA Medical Center", detail: "Residency, Dermatology", year: "2013" },
      ],
      experienceList: [
        { hospital: "Advanced Dermatology Center", role: "Lead Dermatologist", period: "2015 - Present", location: "Los Angeles, CA" },
      ],
      certifications: ["American Board of Dermatology"],
      hours: "Mon - Sat, 8:00 AM - 6:00 PM",
      nextAvailable: "Today",
      isApproved: true,
      license: "LIC-23456",
    },
  },
  {
    name: "Dr. Michael Brown",
    email: "michael.brown@medibook.com",
    password: "doctor123",
    role: "doctor" as const,
    phone: "+1 (555) 345-6789",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor3",
    doctorProfile: {
      slug: "dr-michael-brown",
      specialty: "Neurology",
      hospital: "Neurological Institute",
      location: "Chicago, IL",
      about: "Dedicated neurologist focused on diagnosis and treatment of neurological disorders.",
      experience: 12,
      price: 250,
      videoPrice: 200,
      rating: 4.7,
      reviewCount: 87,
      online: true,
      videoAvailable: true,
      languages: ["English"],
      services: ["Neurological Consultation", "EEG", "Migraine Treatment", "Memory Assessment"],
      education: [
        { institution: "University of Chicago Medical School", detail: "MD, Neurology", year: "2008" },
        { institution: "Mayo Clinic", detail: "Residency, Neurology", year: "2011" },
      ],
      experienceList: [
        { hospital: "Neurological Institute", role: "Senior Neurologist", period: "2013 - Present", location: "Chicago, IL" },
      ],
      certifications: ["American Board of Neurology", "American Board of Clinical Neurophysiology"],
      hours: "Mon - Fri, 9:00 AM - 4:00 PM",
      nextAvailable: "Tomorrow",
      isApproved: true,
      license: "LIC-34567",
    },
  },
  {
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@medibook.com",
    password: "doctor123",
    role: "doctor" as const,
    phone: "+1 (555) 456-7890",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor4",
    doctorProfile: {
      slug: "dr-emily-rodriguez",
      specialty: "Pediatrics",
      hospital: "Children's Medical Center",
      location: "Houston, TX",
      about: "Compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.",
      experience: 8,
      price: 160,
      videoPrice: 120,
      rating: 4.9,
      reviewCount: 156,
      online: true,
      videoAvailable: true,
      languages: ["English", "Spanish"],
      services: ["Well-Child Visits", "Vaccinations", "Developmental Screening", "Pediatric Urgent Care"],
      education: [
        { institution: "Baylor College of Medicine", detail: "MD, Pediatrics", year: "2012" },
        { institution: "Texas Children's Hospital", detail: "Residency, Pediatrics", year: "2015" },
      ],
      experienceList: [
        { hospital: "Children's Medical Center", role: "Pediatrician", period: "2015 - Present", location: "Houston, TX" },
      ],
      certifications: ["American Board of Pediatrics"],
      hours: "Mon - Fri, 8:00 AM - 5:00 PM",
      nextAvailable: "Today",
      isApproved: true,
      license: "LIC-45678",
    },
  },
  {
    name: "Dr. David Kim",
    email: "david.kim@medibook.com",
    password: "doctor123",
    role: "doctor" as const,
    phone: "+1 (555) 567-8901",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor5",
    doctorProfile: {
      slug: "dr-david-kim",
      specialty: "Orthopedics",
      hospital: "Sports Medicine Institute",
      location: "Boston, MA",
      about: "Orthopedic surgeon specializing in sports medicine and joint reconstruction.",
      experience: 14,
      price: 300,
      videoPrice: 200,
      rating: 4.8,
      reviewCount: 112,
      online: false,
      videoAvailable: true,
      languages: ["English", "Korean"],
      services: ["Joint Replacement", "Sports Injury", "Arthroscopy", "Physical Therapy"],
      education: [
        { institution: "Harvard Medical School", detail: "MD, Orthopedics", year: "2006" },
        { institution: "Massachusetts General Hospital", detail: "Residency, Orthopedic Surgery", year: "2011" },
      ],
      experienceList: [
        { hospital: "Sports Medicine Institute", role: "Chief Orthopedic Surgeon", period: "2013 - Present", location: "Boston, MA" },
      ],
      certifications: ["American Board of Orthopedic Surgery"],
      hours: "Mon - Fri, 7:00 AM - 3:00 PM",
      nextAvailable: "In 2 days",
      isApproved: true,
      license: "LIC-56789",
    },
  },
  {
    name: "Dr. Lisa Thompson",
    email: "lisa.thompson@medibook.com",
    password: "doctor123",
    role: "doctor" as const,
    phone: "+1 (555) 678-9012",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor6",
    doctorProfile: {
      slug: "dr-lisa-thompson",
      specialty: "Ophthalmology",
      hospital: "Vision Care Center",
      location: "San Francisco, CA",
      about: "Experienced ophthalmologist providing comprehensive eye care and surgical treatments.",
      experience: 11,
      price: 220,
      videoPrice: 160,
      rating: 4.7,
      reviewCount: 78,
      online: true,
      videoAvailable: true,
      languages: ["English", "French"],
      services: ["Eye Exam", "Cataract Surgery", "LASIK", "Glaucoma Treatment"],
      education: [
        { institution: "UCSF Medical School", detail: "MD, Ophthalmology", year: "2009" },
        { institution: "Wilmer Eye Institute", detail: "Residency, Ophthalmology", year: "2012" },
      ],
      experienceList: [
        { hospital: "Vision Care Center", role: "Senior Ophthalmologist", period: "2014 - Present", location: "San Francisco, CA" },
      ],
      certifications: ["American Board of Ophthalmology"],
      hours: "Mon - Sat, 9:00 AM - 5:00 PM",
      nextAvailable: "Tomorrow",
      isApproved: true,
      license: "LIC-67890",
    },
  },
];

const blogPosts = [
  {
    title: "Understanding Heart Health: A Comprehensive Guide",
    category: "Cardiology",
    content: "Heart disease remains one of the leading causes of death worldwide. In this comprehensive guide, we explore the fundamentals of heart health, including risk factors, preventive measures, and the latest treatment options. Learn how lifestyle changes can significantly reduce your risk of cardiovascular disease...",
    published: true,
  },
  {
    title: "The Importance of Regular Skin Checkups",
    category: "Dermatology",
    content: "Regular skin examinations are crucial for early detection of skin cancer and other dermatological conditions. Board-certified dermatologists recommend annual full-body skin exams, especially for individuals with a history of sun exposure or family history of skin cancer...",
    published: true,
  },
  {
    title: "Managing Stress for Better Mental Health",
    category: "Psychiatry",
    content: "In today's fast-paced world, stress management is more important than ever. Chronic stress can lead to serious health issues including anxiety, depression, and cardiovascular problems. This article explores evidence-based techniques for managing stress and improving overall mental wellbeing...",
    published: true,
  },
  {
    title: "Pediatric Care: What Every Parent Should Know",
    category: "Pediatrics",
    content: "From well-child visits to vaccinations, pediatric care forms the foundation of a child's long-term health. Understanding the recommended schedule of checkups and immunizations can help parents ensure their children receive optimal medical care throughout development...",
    published: true,
  },
];

async function seed() {
  await connectDB();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Specialty.deleteMany({}),
    BlogPost.deleteMany({}),
    Setting.deleteMany({}),
  ]);

  // Create demo users
  const demoPassword = "password123";

  const user = await User.create({
    name: "John Doe",
    email: "user@demo.com",
    password: demoPassword,
    role: "user",
    phone: "+1 (555) 000-0000",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  });

  const admin = await User.create({
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
    phone: "+1 (555) 999-9999",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  });

  const doctors = await User.create(demoDoctors);

  // Create specialties
  await Specialty.create(specialties);

  // Create blog posts with admin as author
  const blogData = blogPosts.map((post) => ({ ...post, author: admin._id }));
  await BlogPost.create(blogData);

  // Create default settings
  await Setting.create({});

  // Create doctor demo account
  if (doctors.length > 0) {
    const firstDoctor = doctors[0];
    await User.create({
      name: "Demo Doctor",
      email: "doctor@demo.com",
      password: demoPassword,
      role: "doctor",
      phone: firstDoctor.phone,
      avatar: firstDoctor.avatar,
      doctorProfile: {
        ...firstDoctor.doctorProfile,
        slug: "demo-doctor",
      },
    });
  }

  console.log("Database seeded successfully!");
  console.log("Demo accounts:");
  console.log("  User:   user@demo.com / password123");
  console.log("  Doctor: doctor@demo.com / password123");
  console.log("  Admin:  admin@gmail.com / admin123");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
