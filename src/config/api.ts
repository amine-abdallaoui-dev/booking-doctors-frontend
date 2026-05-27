const API_BASE = import.meta.env.VITE_API_URL || "";

export const API = `${API_BASE}/api/auth`;
export const API_DOCTORS = `${API_BASE}/api/doctors`;
export const API_APPOINTMENTS = `${API_BASE}/api/appointments`;
export const API_PATIENTS = `${API_BASE}/api/patients`;
export const API_ADMIN = `${API_BASE}/api/admin`;
